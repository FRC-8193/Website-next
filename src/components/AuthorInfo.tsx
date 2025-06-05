interface AuthorData {
  authorName?: string | null;
  role?: string | null;
}

interface AuthorInfoProps {
  author: AuthorData | null;
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

  // Return null if author is not provided
  if (!author) {
    return null;
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3">
        <div>
          {author.authorName && (
            <div className={`font-medium ${sizeClasses[size]} dark:text-white`}>
              {author.authorName}
            </div>
          )}
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
