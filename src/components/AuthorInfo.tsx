import type { Author } from "@/lib/types";

interface AuthorInfoProps {
  author: Author;
  size?: "sm" | "md" | "lg";
  className?: string;
  showBio?: boolean;
}

export const AuthorInfo = ({
  author,
  size = "md",
  className = "",
  showBio = false,
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
          <div className={`font-medium ${sizeClasses[size]}`}>
            {author.name}
          </div>
          {author.role && (
            <div
              className={`${size === "sm" ? "text-xs" : "text-sm"} text-gray-500`}
            >
              {author.role}
            </div>
          )}
        </div>
      </div>

      {showBio && author.bio && (
        <div
          className={`${size === "sm" ? "text-xs" : "text-sm"} mt-1 text-gray-700`}
        >
          {author.bio}
        </div>
      )}
    </div>
  );
};
