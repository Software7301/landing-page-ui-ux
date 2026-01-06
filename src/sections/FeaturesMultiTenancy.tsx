import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Network,
  Shield,
  Sparkles,
  Users,
  Lock
} from "lucide-react";

export default function FeaturesMultiTenancy() {
  const { language } = useLanguage();
  const { isVisible, ref } = useScrollAnimation();

  const itemsRaw = t("featuresMultiTenancy.items", language);
  const items = Array.isArray(itemsRaw) ? itemsRaw : [];

  const ICONS: Record<string, LucideIcon> = {
    lock: Lock,
    sparkles: Sparkles,
    network: Network,
    users: Users,
    shield: Shield,
    chart: BarChart3,
  };

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

          {/* TEXTO */}
          <div
            ref={ref}
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Badge
              className="
              mb-4
              bg-[#6D28D9]/10
              text-[#C4B5FD]
              border-[rgba(109,40,217,0.15)]
            "
            >
              {t("featuresMultiTenancy.badge", language)}
            </Badge>

            <h2 className="text-4xl font-bold mb-6 text-balance text-[#F5F3FF]">
              {t("featuresMultiTenancy.title", language)}
            </h2>

            <p className="text-[#9CA3AF] mb-6 text-pretty">
              {t("featuresMultiTenancy.subtitle", language)}
            </p>

            <ul className="space-y-4">
              {items.map((item, idx) => {
                const Icon = ICONS[item.icon];
                return (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: `${idx * 120}ms` }}
                  >
                    <div
                      className="
                      w-5 h-5 rounded-full
                      bg-[#6D28D9]/20
                      border-[rgba(109,40,217,0.15)]
                      flex items-center justify-center mt-0.5
                    "
                    >
                      <Icon className="w-3 h-3 text-[#6D28D9]" />
                    </div>

                    <span className="text-[#C4B5FD]">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* IMG */}
          <div
            className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div
              className="
              rounded-2xl overflow-hidden
              border-2 border-[rgba(109,40,217,0.15)]
              shadow-xl
            "
            >
              <img
                src="/placeholder.svg?height=500&width=700"
                alt="Multi-Tenancy"
                className="w-full"
              />
            </div>

            <div
              className="
              absolute -inset-4
              bg-[#6D28D9]/10
              rounded-3xl blur-2xl -z-10
            "
            />
          </div>

        </div>
      </div>
    </section>
  );

}
