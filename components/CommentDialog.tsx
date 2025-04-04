"use client";

import type { Comment } from "../types/comment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, MessageSquare, User } from "lucide-react";

type CommentDialogProps = {
  comment: Comment | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function CommentDialog({
  comment,
  isOpen,
  onClose,
}: CommentDialogProps) {
  if (!comment) return null;

  const initials = comment.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-violet-100 text-violet-700",
      "bg-pink-100 text-pink-700",
      "bg-blue-100 text-blue-700",
      "bg-emerald-100 text-emerald-700",
      "bg-amber-100 text-amber-700",
      "bg-rose-100 text-rose-700",
      "bg-cyan-100 text-cyan-700",
    ];

    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const avatarColor = getAvatarColor(comment.name);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-violet-500" />
            Comment Details
          </DialogTitle>
          <DialogDescription>
            Full comment information and content
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-start gap-4 mb-6">
            <Avatar
              className={`h-16 w-16 border border-slate-200 ${avatarColor}`}
            >
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium text-slate-900 text-lg font-geist-sans">
                {comment.name}
              </h3>
              <div className="flex items-center text-sm text-slate-500">
                <Mail className="h-3 w-3 mr-1" />
                <span className="text-xs font-geist-mono">{comment.email}</span>
              </div>
              <div className="flex items-center text-xs text-slate-400">
                <User className="h-3 w-3 mr-1" />
                <span>Post ID: {comment.postId}</span>
                <span className="mx-2">•</span>
                <span>Comment ID: {comment.id}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="flex items-start gap-2">
              {/* <MessageSquare className="h-4 w-4 text-slate-400 mt-1 flex-shrink-0" /> */}
              <p className="text-slate-700 text-sm leading-relaxed font-geist-sans">
                {comment.body}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
