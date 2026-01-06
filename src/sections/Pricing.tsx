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
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-black via-[#1a0d2e]/25 to-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-balance text-[#F5F3FF]">
            {t("pricing.title", language)}
          </h2>
          <p className="text-[#C4B5FD] text-lg max-w-2xl mx-auto">
            {t("pricing.subtitle", language)}
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ 
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <Card className="p-8 flex flex-col relative bg-[#0A0A0A] border-[rgba(91,33,182,0.2)] hover:border-[#5B21B6] transition-all duration-300 ease-out group overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#5B21B6]/0 via-[#5B21B6]/0 to-[#5B21B6]/0 group-hover:from-[#5B21B6]/5 group-hover:via-[#5B21B6]/10 group-hover:to-[#5B21B6]/5 rounded-lg"
                  initial={false}
                  transition={{ duration: 0.4 }}
                />
                <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold mb-2 text-[#F5F3FF] group-hover:text-[#F5F3FF] transition-colors duration-300">
                    {plan?.name}
                  </h3>

                  <motion.div 
                    className="flex items-baseline justify-center gap-1 mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="text-4xl font-semibold text-[#F5F3FF] group-hover:text-[#F5F3FF] transition-all duration-300 inline-block"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(91, 33, 182, 0)",
                          "0 0 20px rgba(91, 33, 182, 0.5)",
                          "0 0 0px rgba(91, 33, 182, 0)",
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
                      <span className="text-[#9CA3AF] group-hover:text-[#C4B5FD] transition-colors duration-300">
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
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-5 h-5 text-[#6D28D9] shrink-0 mt-0.5 group-hover:text-[#7C3AED] transition-all duration-300" />
                      </motion.div>
                      <span className="text-[#C4B5FD] text-sm group-hover:text-[#E9D5FF] transition-colors duration-300">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-[#5B21B6] hover:bg-[#6D28D9] hover:shadow-lg hover:shadow-[#5B21B6]/30 text-[#F5F3FF] font-medium transition-all duration-300 ease-out group-hover:shadow-xl group-hover:shadow-[#5B21B6]/40">
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
