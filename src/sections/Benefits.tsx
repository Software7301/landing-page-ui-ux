import { Card } from "@/components/ui/card";
import { Cloud, Code2, Shield, Sparkles, Terminal, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Benefits() {
    const { language } = useLanguage();
    const { isVisible, ref } = useScrollAnimation();

    const itemsRaw = t("benefits.items", language);
    const items = Array.isArray(itemsRaw) ? itemsRaw : [];

    const icons = [Shield, Zap, Cloud, Sparkles, Code2, Terminal];

    return (
        <section ref={ref} id="benefits" className="py-20 px-4">
            <div className="container mx-auto">

                {/* Title */}
                <div
                    ref={ref}
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-[#F5F3FF]">
                        {t("benefits.title", language)}
                    </h2>

                    <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
                        {t("benefits.subtitle", language)}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {items.map((benefit, idx) => {
                        const Icon = icons[idx];

                        return (
                            <div
                                key={idx}
                                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${idx * 120}ms` }}
                            >
                                <Card
                                    className="
                  bg-gradient-to-br
                  from-[#18132E]
                  to-[#141026]
                  border-[rgba(109,40,217,0.15)]
                  p-8
                  hover:border-[rgba(109,40,217,0.25)]
                  transition-all duration-300
                "
                                >
                                    {/* Icon */}
                                    <div
                                        className="
                    w-12 h-12 rounded-lg
                    bg-[#6D28D9]/10
                    border border-[rgba(109,40,217,0.15)]
                    flex items-center justify-center mb-4
                  "
                                    >
                                        <Icon className="w-6 h-6 text-[#6D28D9]" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold mb-3 text-[#F5F3FF]">
                                        {benefit.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[#9CA3AF]">
                                        {benefit.description}
                                    </p>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );

}
