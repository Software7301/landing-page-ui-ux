import { Lock, Settings, Network, Container } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Lock,
    key: "infrastructure"
  },
  {
    icon: Settings,
    key: "automation"
  },
  {
    icon: Network,
    key: "agents"
  },
  {
    icon: Container,
    key: "docker"
  }
];

export function LoginFeatures() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hidden lg:block h-full" ref={containerRef}>
      <div className="h-full bg-[#18132E] border border-[rgba(109,40,217,0.15)] hover:border-[rgba(109,40,217,0.3)] hover:shadow-lg hover:shadow-[#6D28D9]/10 rounded-lg p-8 flex flex-col transition-all duration-300 ease-out">
        <div className="space-y-8 flex-1">
          <div className={`space-y-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-semibold text-[#F5F3FF]">
              {t("login.features.title", language)}
            </h2>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              {t("login.features.description", language)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`bg-[#141026] border border-[rgba(109,40,217,0.15)] rounded-lg p-4 hover:border-[rgba(109,40,217,0.3)] hover:bg-[#18132E] hover:shadow-md hover:shadow-[#6D28D9]/5 hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer group ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0E0A1A] group-hover:bg-[#18132E] flex items-center justify-center mb-3 border border-[rgba(109,40,217,0.15)] group-hover:border-[rgba(109,40,217,0.3)] transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#8B5CF6] group-hover:text-[#A78BFA] transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1 text-[#F5F3FF] group-hover:text-[#F5F3FF] transition-colors">
                    {t(`login.features.${feature.key}.title`, language)}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] group-hover:text-[#C4B5FD] leading-relaxed transition-colors">
                    {t(`login.features.${feature.key}.description`, language)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
