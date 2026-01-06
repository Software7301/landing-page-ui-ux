import { Card } from "@/components/ui/card";
import { Boxes, Database, Server, Activity } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ValueProps() {
    const { language } = useLanguage();
    const { isVisible, ref } = useScrollAnimation();

    const icons = [Boxes, Server, Activity, Database];

    const itemsRaw = t("valueProps.items", language);
    const items = Array.isArray(itemsRaw) ? itemsRaw : [];

 return (
    <section ref={ref} className="py-20 px-4 relative">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {items.map((item, idx) => {
                    const Icon = icons[idx];

                    return (
                        <div
                            key={idx}
                            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${idx * 120}ms` }}
                        >
                            <Card
                                className="
                                    bg-gradient-to-br from-[#18132E] to-[#141026]
                                    border-[rgba(109,40,217,0.15)]
                                    p-6
                                    hover:border-[rgba(109,40,217,0.25)]
                                    transition-all duration-300
                                    group
                                "
                            >
                                {/* Icon wrapper */}
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
                                <h3 className="text-lg font-semibold mb-2 text-[#F5F3FF]">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[#9CA3AF] text-sm">
                                    {item.description}
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
