import type { Comment } from "../types/comment";

export async function fetchComments(query: string): Promise<Comment[]> {
  // await new Promise((resolve) => setTimeout(resolve, 800));

  const res = await fetch("https://jsonplaceholder.typicode.com/comments");

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  const data: Comment[] = await res.json();

  const filtered = data
    .filter((c) => c.body.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 20);

  return filtered;
}
