import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlaCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  deadline: Date | string | number;
}

export const SlaCountdown = React.forwardRef<HTMLDivElement, SlaCountdownProps>(
  ({ className, deadline, ...props }, ref) => {
    const [timeLeftMs, setTimeLeftMs] = React.useState<number>(0);

    const targetTime = React.useMemo(() => {
      return typeof deadline === "string" ? new Date(deadline).getTime() : new Date(deadline).getTime();
    }, [deadline]);

    React.useEffect(() => {
      const updateTimer = () => {
        const diff = targetTime - Date.now();
        setTimeLeftMs(diff > 0 ? diff : 0);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }, [targetTime]);

    // Format time left
    const formatTime = (ms: number) => {
      if (ms <= 0) return "SLA Breached";

      const seconds = Math.floor((ms / 1000) % 60);
      const minutes = Math.floor((ms / (1000 * 60)) % 60);
      const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));

      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      parts.push(`${hours.toString().padStart(2, "0")}h`);
      parts.push(`${minutes.toString().padStart(2, "0")}m`);
      parts.push(`${seconds.toString().padStart(2, "0")}s`);

      return parts.join(" ");
    };

    const isBreached = timeLeftMs <= 0;
    const hoursLeft = timeLeftMs / (1000 * 60 * 60);

    let statusStyle = "bg-success/10 text-success border-success/20";
    let clockStyle = "text-success";
    let dotStyle = "bg-success";
    let isPulse = false;

    if (isBreached) {
      statusStyle = "bg-destructive/15 text-destructive border-destructive/30 animate-pulse font-bold";
      clockStyle = "text-destructive";
      dotStyle = "bg-destructive";
      isPulse = true;
    } else if (hoursLeft < 12) {
      statusStyle = "bg-destructive/10 text-destructive border-destructive/20 font-bold";
      clockStyle = "text-destructive";
      dotStyle = "bg-destructive animate-ping";
      isPulse = true;
    } else if (hoursLeft < 24) {
      statusStyle = "bg-warning/10 text-warning border-warning/20 font-semibold";
      clockStyle = "text-warning";
      dotStyle = "bg-warning";
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-xs select-none",
          statusStyle,
          className
        )}
        {...props}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          {isPulse && (
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotStyle)} />
          )}
          <span className={cn("relative inline-flex rounded-full h-2 w-2", dotStyle)} />
        </span>
        <Clock className={cn("w-3.5 h-3.5 shrink-0", clockStyle)} />
        <span className="font-mono tracking-tight shrink-0">{formatTime(timeLeftMs)}</span>
      </div>
    );
  }
);

SlaCountdown.displayName = "SlaCountdown";
