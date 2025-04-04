"use client";
import CommentCard from "./CommentCard";
import type { Comment } from "../types/comment";
import { motion } from "framer-motion";

type Props = {
  comments: Comment[];
};

export default function CommentList({ comments }: Props) {
  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-slate-500 font-geist-sans">
          Showing {comments.length}{" "}
          {comments.length === 1 ? "result" : "results"}
        </div>
        <div className="text-xs px-2 py-1 bg-violet-100 text-violet-700 rounded-full font-geist-sans">
          Page Results
        </div>
      </div>

      <ul className="space-y-4">
        {comments.map((comment, index) => (
          <CommentCard key={comment.id} comment={comment} index={index} />
        ))}
      </ul>
    </motion.div>
  );
}
