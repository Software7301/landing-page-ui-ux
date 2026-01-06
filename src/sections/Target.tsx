import { Card } from "@/components/ui/card";
import { Boxes, Building2, Network, Users } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Target() {
    const { language } = useLanguage();
    const { isVisible, ref } = useScrollAnimation();

    const itemsRaw = t("target.items", language);
    const items = Array.isArray(itemsRaw) ? itemsRaw : [];

    const icons = [Building2, Network, Boxes, Users];

    return (
        <section ref={ref} className="py-20 px-4">
            <div className="container mx-auto">

                {/* Header */}
                <div
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-[#F5F3FF]">
                        {t("target.title", language)}
                    </h2>

                    <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
                        {t("target.subtitle", language)}
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {items.map((audience, idx) => {
                        const Icon = icons[idx];

                        return (
                            <div
                                key={idx}
                                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${idx * 120}ms` }}
                            >
                                <Card
                                    className="
                  bg-gradient-to-b from-[#18132E] to-[#141026]
                  border-[rgba(109,40,217,0.15)]
                  p-6
                  hover:border-[rgba(109,40,217,0.25)]
                  transition-all duration-300 group
                "
                                >
                                    {/* Icon */}
                                    <div
                                        className="
                    w-14 h-14 rounded-xl
                    bg-[#6D28D9]/10
                    border border-[rgba(109,40,217,0.15)]
                    flex items-center justify-center mb-4
                    group-hover:bg-[#6D28D9]/20
                    transition-colors
                  "
                                    >
                                        <Icon className="w-7 h-7 text-[#6D28D9]" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold mb-2 text-[#F5F3FF]">
                                        {audience.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[#9CA3AF] text-sm mb-4">
                                        {audience.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2">
                                        {audience.features.map((feature: string, fidx: number) => (
                                            <li
                                                key={fidx}
                                                className="flex items-center gap-2 text-sm text-[#9CA3AF]"
                                            >
                                                {/* Bullet */}
                                                <div className="w-1 h-1 rounded-full bg-[#6D28D9]" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );

}
