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
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3">
        <div>
          <div className={`font-medium ${sizeClasses[size]} dark:text-white`}>
            {author.name}
          </div>
          {author.role && (
            <div
              className={`${size === "sm" ? "text-xs" : "text-sm"} text-gray-500 dark:text-zinc-400`}
            >
              {author.role}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
