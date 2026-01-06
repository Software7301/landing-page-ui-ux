import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";

export default function Cta() {
  const { language } = useLanguage();

  const features = [
    t("cta.features.workspaces", language),
    t("cta.features.agents", language),
    t("cta.features.docker", language),
    t("cta.features.monitoring", language),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-black via-[#1a0d2e]/30 to-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5B21B6]/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-balance text-[#F5F3FF]">
              {t("cta.title", language)}
            </h2>
            <p className="text-lg text-[#C4B5FD] max-w-2xl mx-auto">
              {t("cta.subtitle", language)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-[#0A0A0A] border border-[rgba(91,33,182,0.2)] hover:border-[#5B21B6] rounded-lg p-8 mb-8 hover:shadow-lg hover:shadow-[#5B21B6]/20 transition-all duration-300"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6 relative z-10"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="flex items-center gap-3 group/item cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 rounded-full bg-[#5B21B6]/30 group-hover/item:bg-[#5B21B6]/50 flex items-center justify-center shrink-0 transition-all duration-300"
                  >
                    <Check className="w-3.5 h-3.5 text-[#6D28D9] group-hover/item:text-[#7C3AED] transition-all duration-300" />
                  </motion.div>
                  <span className="text-[#C4B5FD] text-sm group-hover/item:text-[#E9D5FF] transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex justify-center"
          >
            <motion.div 
              whileHover={{ scale: 1.08, y: -4 }} 
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <Button
                size="lg"
                className="bg-[#5B21B6] hover:bg-[#6D28D9] hover:shadow-xl hover:shadow-[#5B21B6]/40 text-[#F5F3FF] text-base px-8 h-12 font-medium transition-all duration-300 ease-out relative overflow-hidden group/btn"
                asChild
              >
                <Link to="/register" className="relative z-10 flex items-center">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#6D28D9] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <span className="relative z-10">{t("cta.button", language)}</span>
                  <motion.span
                    className="relative z-10 ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
