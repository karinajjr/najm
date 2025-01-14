import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-primary/10 ${className}`}
      {...props}
    />
  );
}

export { Skeleton };
