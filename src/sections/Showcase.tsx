import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function FeatureShowcase() {
    const { language } = useLanguage();
    const { isVisible, ref } = useScrollAnimation();

    const itemsRaw = t("featureShowcase.items", language);
    const items = Array.isArray(itemsRaw) ? itemsRaw : [];

    return (
        <section ref={ref} id="demo" className="py-20 px-4 relative">

            {/* Background */}
            <div
                className="
        absolute inset-0
        bg-gradient-to-b
        from-black
        via-[color:var(--primary-900)_/_0.10]
        to-black
      "
            />

            <div className="container mx-auto relative z-10">

                {/* Header */}
                <div
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <Badge
                        className="
            mb-4
            bg-[#6D28D9]/10
            text-[#C4B5FD]
            border-[rgba(109,40,217,0.15)]
          "
                    >
                        {t("featureShowcase.badge", language)}
                    </Badge>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-[#F5F3FF]">
                        {t("featureShowcase.title", language)}
                    </h2>

                    <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
                        {t("featureShowcase.subtitle", language)}
                    </p>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${idx * 120}ms` }}
                        >

                            {/* Card Image */}
                            <div
                                className="
                rounded-xl overflow-hidden
                border-2
                border-[rgba(109,40,217,0.15)]
                group-hover:border-[rgba(109,40,217,0.25)]
                transition-all duration-300
              "
                            >
                                <img
                                    src={`/placeholder.svg?height=300&width=400&query=${item.query}`}
                                    alt={item.title}
                                    className="w-full"
                                />
                            </div>

                            {/* Hover Overlay */}
                            <div
                                className="
                absolute inset-0
                bg-gradient-to-t
                from-black/80 to-transparent
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
                rounded-xl flex items-end p-4
              "
                            >
                                <span className="text-[#F5F3FF] font-semibold">{item.title}</span>
                            </div>

                            {/* Glow */}
                            <div
                                className="
                absolute -inset-1
                bg-[#6D28D9]/0
                group-hover:bg-[#6D28D9]/20
                rounded-xl blur-xl
                transition-all duration-300
                -z-10
              "
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

}
