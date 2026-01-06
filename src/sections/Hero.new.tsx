import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useI18n } from "@/i18n/index";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Subtle gradient background - Railway style */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-black to-black" />
      
      {/* Single subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* Badge - Clean and minimal */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          <span className="text-sm text-zinc-400">{t("hero.badge")}</span>
        </div>

        {/* Title - Large, clean, high contrast */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            {t("hero.title")}
          </span>
        </h1>

        {/* Subtitle - Larger, more breathing room */}
        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>

        {/* Buttons - Clean Railway style */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Button
            size="lg"
            className="group h-12 px-8 text-base font-medium bg-violet-600 hover:bg-violet-500 text-white border-0 shadow-lg shadow-violet-600/20"
          >
            {t("hero.ctaPrimary")}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group h-12 px-8 text-base font-medium bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-white"
          >
            <Play className="mr-2 w-4 h-4" />
            {t("hero.ctaSecondary")}
          </Button>
        </div>

        {/* Dashboard Preview - Clean with subtle shadow */}
        <div className="relative max-w-5xl mx-auto">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 rounded-2xl blur-2xl opacity-50" />
          
          {/* Image container */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm">
            <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center p-8">
              <div className="w-full h-full bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-center">
                <span className="text-zinc-600 text-lg">Dashboard Preview</span>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
