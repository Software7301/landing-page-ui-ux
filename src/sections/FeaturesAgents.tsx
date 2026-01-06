import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function FeaturesAgents() {
    const { language } = useLanguage();
    const { isVisible, ref } = useScrollAnimation();

    const stepsRaw = t("featuresAgents.steps", language);
    const steps = Array.isArray(stepsRaw) ? stepsRaw : [];

    return (
        <section ref={ref} className="py-20 px-4">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

                    {/* IMG */}
                    <div
                        className={`order-2 md:order-1 relative transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
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
                                alt="Agent Management"
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

                    {/* TEXT */}
                    <div
                        className={`order-1 md:order-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <Badge
                            className="
              mb-4
              bg-[#6D28D9]/10
              text-[#C4B5FD]
              border-[rgba(109,40,217,0.15)]
            "
                        >
                            {t("featuresAgents.badge", language)}
                        </Badge>

                        <h2 className="text-4xl font-bold mb-6 text-balance text-[#F5F3FF]">
                            {t("featuresAgents.title", language)}
                        </h2>

                        <p className="text-[#9CA3AF] mb-6 text-pretty">
                            {t("featuresAgents.subtitle", language)}
                        </p>

                        <div className="space-y-6">
                            {steps.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`flex gap-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                                    style={{ transitionDelay: `${idx * 120}ms` }}
                                >
                                    <div className="text-2xl font-bold text-[rgba(109,40,217,0.15)]">
                                        {item.step}
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-[#F5F3FF] mb-1">
                                            {item.title}
                                        </h4>

                                        <p className="text-sm text-[#9CA3AF]">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );

}
