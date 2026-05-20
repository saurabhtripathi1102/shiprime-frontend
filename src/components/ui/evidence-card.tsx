import * as React from "react";
import { Camera, Calendar, Scale, Maximize2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EvidenceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  meta: {
    timestamp: string;
    scaleId: string;
    weightKg: number;
    dimensionsCm?: string;
  };
}

export const EvidenceCard = React.forwardRef<HTMLDivElement, EvidenceCardProps>(
  ({ className, imageUrl, meta, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "group relative overflow-hidden bg-card border-border hover:border-primary/50 rounded-lg aspect-video w-full select-none cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {/* Semi-transparent Dark overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
        
        {/* Static Header Indicator */}
        <div className="absolute top-2 left-2 inline-flex items-center gap-1 bg-black/70 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-white select-none">
          <Camera className="w-3 h-3 text-[#FF6B35]" />
          <span>{meta.scaleId}</span>
        </div>

        {/* Static Footer (Weight Overlay) */}
        <div className="absolute bottom-2 left-2 bg-black/80 border border-white/10 px-2.5 py-1 rounded text-xs text-white font-mono flex items-center gap-1.5 shadow-md">
          <Scale className="w-3.5 h-3.5 text-[#4ADE80]" />
          <span className="font-semibold font-mono tracking-tight">{meta.weightKg.toFixed(2)} kg</span>
        </div>

        {/* Hover/Overlay Details */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="flex flex-col gap-1 text-[11px] font-mono text-white mb-8">
            <div className="flex items-center gap-1 text-white/80">
              <Calendar className="w-3 h-3 shrink-0" />
              <span>{meta.timestamp}</span>
            </div>
            {meta.dimensionsCm && (
              <div className="flex items-center gap-1 text-white/80">
                <Maximize2 className="w-3 h-3 shrink-0" />
                <span>{meta.dimensionsCm}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }
);

EvidenceCard.displayName = "EvidenceCard";
