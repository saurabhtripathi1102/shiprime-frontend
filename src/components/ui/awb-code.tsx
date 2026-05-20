import * as React from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AwbCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AwbCode = React.forwardRef<HTMLDivElement, AwbCodeProps>(
  ({ className, value, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent row click events
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        toast.success(`AWB Copied`, {
          description: `${value} is saved to your clipboard.`,
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error("Failed to copy", {
          description: "An error occurred while copying to clipboard.",
        });
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-xs select-all text-foreground",
          className
        )}
        {...props}
      >
        <span className="font-semibold font-mono tracking-tight">{value}</span>
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-secondary border border-transparent hover:border-border/30 text-muted-foreground hover:text-foreground cursor-pointer shrink-0 focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          title="Copy AWB Code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-success" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    );
  }
);

AwbCode.displayName = "AwbCode";
