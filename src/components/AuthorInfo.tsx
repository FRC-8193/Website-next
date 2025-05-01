import type { Author } from "@/lib/types";

interface AuthorInfoProps {
  author: Author;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const AuthorInfo = ({
  author,
  size = "md",
  className = "",
}: AuthorInfoProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div>
        <div className={`font-medium ${sizeClasses[size]}`}>{author.name}</div>
        {author.role && (
          <div
            className={`${size === "sm" ? "text-xs" : "text-sm"} text-gray-500`}
          >
            {author.role}
          </div>
        )}
      </div>
    </div>
  );
};
