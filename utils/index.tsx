export const getAvatarColor = (name: string) => {
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

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function truncate(text: string, max = 64): string {
  return text.length > max ? `${text.slice(0, max)}...` : text;
}
