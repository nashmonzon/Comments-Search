"use client";

import type React from "react";
import { useState } from "react";
import SearchBox from "../components/SearchBox";
import CommentList from "../components/CommentList";
import { fetchComments } from "../lib/fetchComments";
import type { Comment } from "../types/comment";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Pagination from "../components/Pagination";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Comment[]>([]);
  const [allResults, setAllResults] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(allResults.length / ITEMS_PER_PAGE);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length <= 3) return;

    setLoading(true);
    setError("");
    setCurrentPage(1);

    try {
      const filtered = await fetchComments(query);
      setAllResults(filtered);
      setResults(filtered.slice(0, ITEMS_PER_PAGE));
    } catch {
      setError("Error fetching comments");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    setResults(allResults.slice(startIndex, startIndex + ITEMS_PER_PAGE));
    document
      .getElementById("results-top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;
    if (results.length > 0)
      return (
        <MainContent
          results={results}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      );
    if (query.length > 3) return <NoResults query={query} />;
    if (query.length > 0) return <MinLengthWarning />;
    return <StartSearching />;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="border-none shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white mb-2">Comment Search</h1>
          <p className="text-violet-100">
            Search through thousands of comments with instant results
          </p>
        </div>

        <CardContent className="p-6">
          <SearchBox
            query={query}
            onChange={setQuery}
            onSubmit={handleSearch}
          />

          <div id="results-top"></div>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative">
      <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-violet-500 animate-spin"></div>
      <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin absolute top-2 left-2"></div>
    </div>
    <p className="mt-4 text-slate-500 animate-pulse">Searching comments...</p>
  </div>
);

const ErrorState = ({ error }: { error: string }) => (
  <Alert variant="destructive" className="my-4">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{error}</AlertDescription>
  </Alert>
);

const MainContent = ({
  results,
  totalPages,
  currentPage,
  handlePageChange,
}: {
  results: Comment[];
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}) => (
  <>
    <CommentList comments={results} />
    {totalPages > 1 && (
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    )}
  </>
);

const NoResults = ({ query }: { query: string }) => (
  <div className="text-center py-12">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
      <span className="text-2xl">🔍</span>
    </div>
    <h3 className="text-lg font-medium text-slate-800 mb-2">
      No results found
    </h3>
    <p className="text-slate-500">
      We couldn&apos;t find any comments matching &quot;{query}&quot;
    </p>
  </div>
);

const MinLengthWarning = () => (
  <div className="text-center py-8 text-slate-500">
    <p>Please enter at least 4 characters to search</p>
  </div>
);

const StartSearching = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mb-4">
      <span className="text-3xl">💬</span>
    </div>
    <h3 className="text-lg font-medium text-slate-800 mb-2">Start searching</h3>
    <p className="text-slate-500 max-w-md">
      Enter a search term above to find comments containing specific text
    </p>
  </div>
);
