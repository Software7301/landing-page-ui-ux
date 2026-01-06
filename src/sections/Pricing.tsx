import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";

export default function Pricing() {
  const { language } = useLanguage();

  const plansRaw = t("pricing.plans", language);
  const plans = Array.isArray(plansRaw) ? plansRaw : [];
  const plan = plans[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="pricing" className="py-20 px-6 md:px-8 bg-gradient-to-b from-[#0A0A0F] via-[#0F0F15] to-[#0A0A0F]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-[#F8F9FA]">
            {t("pricing.title", language)}
          </h2>
          <p className="text-[#E4E7EB] text-lg max-w-2xl mx-auto">
            {t("pricing.subtitle", language)}
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ 
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              <Card className="p-8 flex flex-col relative bg-[#0F0F15] border border-[rgba(124,58,237,0.12)] hover:border-[rgba(124,58,237,0.25)] transition-all duration-300 ease-out group overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/0 via-[#7C3AED]/0 to-[#7C3AED]/0 group-hover:from-[#7C3AED]/5 group-hover:via-[#7C3AED]/10 group-hover:to-[#7C3AED]/5 rounded-lg transition-all duration-300"
                  initial={false}
                />
                <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold mb-2 text-[#F8F9FA] group-hover:text-[#F8F9FA] transition-colors duration-300">
                    {plan?.name}
                  </h3>

                  <motion.div 
                    className="flex items-baseline justify-center gap-1 mb-6"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="text-4xl font-semibold text-[#F8F9FA] group-hover:text-[#F8F9FA] transition-all duration-300 inline-block"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(124, 58, 237, 0)",
                          "0 0 15px rgba(124, 58, 237, 0.3)",
                          "0 0 0px rgba(124, 58, 237, 0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {plan?.price}
                    </motion.span>
                    {plan?.period && (
                      <span className="text-[#9CA3AF] group-hover:text-[#E4E7EB] transition-colors duration-300">
                        {plan.period}
                      </span>
                    )}
                  </motion.div>
                </div>

                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3 mb-8 flex-1"
                >
                  {plan?.features.map((feature: string, fidx: number) => (
                    <motion.li
                      key={fidx}
                      variants={itemVariants}
                      className="flex items-start gap-2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5 group-hover:text-[#8B5CF6] transition-all duration-300" />
                      </motion.div>
                      <span className="text-[#E4E7EB] text-sm group-hover:text-[#F8F9FA] transition-colors duration-300">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-[#7C3AED] hover:bg-[#8B5CF6] hover:shadow-lg hover:shadow-[#7C3AED]/20 text-[#F8F9FA] font-semibold transition-all duration-300 ease-out group-hover:shadow-xl group-hover:shadow-[#7C3AED]/30">
                    {t("pricing.ctaPrimary", language)}
                  </Button>
                </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
