"use client";

import type { Comment } from "../types/comment";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import CommentDialog from "./CommentDialog";
import { getAvatarColor, getInitials, truncate } from "@/utils";

type Props = {
  comment: Comment;
  index: number;
};

export default function CommentCard({ comment, index }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { name, email, body } = comment;
  const truncatedBody = truncate(body);
  const avatarColor = getAvatarColor(name);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card
          className="overflow-hidden transition-all hover:shadow-sm border-l-4  border-slate-200 border-l-violet-500 cursor-pointer hover:bg-slate-50"
          onClick={() => setIsDialogOpen(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar
                className={`h-12 w-12 border border-slate-200 ${avatarColor}`}
              >
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <h3 className="font-medium text-slate-900 line-clamp-1 font-geist-sans">
                  {name}
                </h3>
                <div className="flex items-center text-sm text-slate-500">
                  <Mail className="h-3 w-3 mr-1" />
                  <span className="text-xs font-geist-mono">{email}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pl-16">
              <div className="relative">
                <div className="absolute -left-6 top-0 h-full flex items-start">
                  <MessageSquare className="h-3 w-3 text-slate-300 mt-1" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed font-geist-sans">
                  {truncatedBody}
                </p>
                {body.length > 64 && (
                  <span className="text-xs text-violet-500 mt-1 inline-block">
                    Click to read more
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <CommentDialog
        comment={comment}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
