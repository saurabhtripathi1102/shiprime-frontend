import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 sm:p-20 font-sans bg-background text-foreground dark">
      <main className="flex flex-col items-center max-w-2xl gap-8 text-center bg-card border border-border p-8 sm:p-12 rounded-lg">
        {/* Title in Fraunces (Display Serif) */}
        <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-primary">
          {siteConfig.name}
        </h1>

        {/* Subtitle in Inter with negative tracking */}
        <p className="font-sans text-xl font-normal leading-relaxed text-foreground/80 tracking-tight">
          {siteConfig.slogan}
        </p>

        {/* Verification of the 3 fonts */}
        <div className="w-full text-left bg-secondary/50 p-6 rounded-md border border-border/50 flex flex-col gap-4 text-sm mt-4">
          <h2 className="font-sans font-semibold text-base border-b border-border pb-2 text-foreground">
            Verification Checks (Fonts & Theme)
          </h2>
          <div>
            <span className="font-mono text-xs text-muted-foreground block mb-1">Font 1: Inter (Sans / UI)</span>
            <p className="font-sans text-foreground">
              This line uses the Inter UI font for high-readability interfaces.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-muted-foreground block mb-1">Font 2: JetBrains Mono (Code / Numeric)</span>
            <p className="font-mono text-foreground font-medium">
              ₹47,820.50 | AWB: IN-982-1082-990 | 0.85 kg
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-muted-foreground block mb-1">Font 3: Fraunces (Serif / Display)</span>
            <p className="font-display text-lg text-foreground italic">
              "The shipping platform that never silently deducts from your wallet."
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/95 transition-all px-6 py-2 rounded-md">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="border-border hover:bg-secondary/20 transition-all px-6 py-2 rounded-md">
            Read Docs
          </Button>
        </div>
      </main>
    </div>
  );
}
