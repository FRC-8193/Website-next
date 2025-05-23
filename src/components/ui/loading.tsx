const sizeClasses = {
  sm: "w-5 h-5 border-[2.5px]",
  md: "w-10 h-10 border-4",
  lg: "w-16 h-16 border-4",
};

const colorClasses = {
  white:
    "border-gray-500 border-t-white dark:border-gray-300 dark:border-t-black",
  black:
    "border-gray-200 border-t-black dark:border-zinc-500 dark:border-t-white",
};

interface LoadingSpinnerProps {
  size?: keyof typeof sizeClasses;
  color?: keyof typeof colorClasses;
}

export default function LoadingSpinner({
  size = "md",
  color = "black",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin rounded-full`}
    ></div>
  );
}
