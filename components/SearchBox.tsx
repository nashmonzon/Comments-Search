"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

type Props = {
  query: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function SearchBox({ query, onChange, onSubmit }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative mb-6">
      <div className={`relative flex-1 transition-all duration-200 `}>
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search comments..."
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pl-10 pr-10 py-6 bg-white border border-slate-200 shadow-xs font-geist-sans transition-all duration-200 ${
            isFocused ? "ring-1 ring-violet-200 " : ""
          }`}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="flex mt-3 justify-between items-center">
        <div className="text-xs text-slate-500 font-geist-sans">
          {query.length > 0 && (
            <span
              className={
                query.length <= 3 ? "text-amber-500" : "text-green-500"
              }
            >
              {query.length} character{query.length !== 1 ? "s" : ""}
              {query.length <= 3 ? " (min 4 required)" : ""}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="btn py-2 px-4"
          disabled={query.length <= 3}
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
}
