import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Server, Database } from "lucide-react";

/**
 * Hero Section - Fullscreen with split layout
 * Left: Headline and CTAs | Right: Dashboard mockup
 */
export default function HeroNew() {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: 'linear-gradient(135deg, #0B0614 0%, #120A24 50%, #0B0614 100%)' }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#7C3AED]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#A855F7]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#EDE9FE] leading-tight">
              Deploy, manage and scale your servers in{" "}
              <span className="bg-gradient-to-r from-[#A855F7] to-[#C084FC] bg-clip-text text-transparent">
                one place
              </span>
            </h1>
            
            <p className="text-xl text-[#A78BFA] max-w-2xl leading-relaxed">
              Agent-based infrastructure management platform. Control your entire server infrastructure 
              with workspace-based organization, Docker containers, and unified dashboard.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="bg-[#7C3AED] hover:bg-[#A855F7] text-white text-base px-8 py-6 shadow-lg shadow-[#7C3AED]/40 hover:shadow-[#A855F7]/50 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 border-[rgba(124,58,237,0.3)] text-[#A78BFA] hover:text-[#EDE9FE] hover:bg-[#120A24] hover:border-[rgba(124,58,237,0.5)] transition-all duration-300"
            >
              View Dashboard
            </Button>
          </div>
        </div>

        {/* Right side - Dashboard Mockup */}
        <div className="relative">
          {/* Glow effect behind mockup */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/30 to-[#A855F7]/30 rounded-2xl blur-2xl transform scale-110" />
          
          {/* Mockup Container */}
          <div className="relative bg-[#120A24] border border-[rgba(124,58,237,0.3)] rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            {/* Mockup Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(124,58,237,0.2)]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-[#A78BFA]">dashboard.corsihub.com</span>
            </div>

            {/* Mockup Content */}
            <div className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#0B0614] border border-[rgba(124,58,237,0.2)] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-4 h-4 text-[#7C3AED]" />
                    <span className="text-xs text-[#A78BFA]">Servers</span>
                  </div>
                  <p className="text-2xl font-bold text-[#EDE9FE]">12</p>
                </div>
                <div className="bg-[#0B0614] border border-[rgba(124,58,237,0.2)] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-[#A855F7]" />
                    <span className="text-xs text-[#A78BFA]">Workspaces</span>
                  </div>
                  <p className="text-2xl font-bold text-[#EDE9FE]">5</p>
                </div>
                <div className="bg-[#0B0614] border border-[rgba(124,58,237,0.2)] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-[#C084FC]" />
                    <span className="text-xs text-[#A78BFA]">Agents</span>
                  </div>
                  <p className="text-2xl font-bold text-[#EDE9FE]">8</p>
                </div>
              </div>

              {/* Chart area placeholder */}
              <div className="bg-[#0B0614] border border-[rgba(124,58,237,0.2)] rounded-lg p-4 h-32 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-[#7C3AED] to-[#A855F7] rounded-lg opacity-20" />
                  <p className="text-sm text-[#A78BFA]">Performance Metrics</p>
                </div>
              </div>

              {/* Service list */}
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between bg-[#0B0614] border border-[rgba(124,58,237,0.2)] rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-[#EDE9FE]">Service {i}</span>
                    </div>
                    <span className="text-xs text-[#A78BFA]">Running</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

