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
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
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
    <section className="py-24 px-6 md:px-8 relative overflow-hidden bg-gradient-to-b from-[#0A0A0F] via-[#0F0F15] to-[#0A0A0F]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-[#F8F9FA]">
            {t("cta.title", language)}
          </h2>
          <p className="text-lg text-[#E4E7EB] max-w-2xl mx-auto">
            {t("cta.subtitle", language)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          whileHover={{ y: -2 }}
          className="bg-[#0F0F15] border border-[rgba(124,58,237,0.12)] hover:border-[rgba(124,58,237,0.25)] rounded-lg p-8 mb-8 transition-all duration-300"
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
                whileHover={{ x: 3 }}
                className="flex items-center gap-3 group/item cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 rounded-full bg-[#7C3AED]/20 group-hover/item:bg-[#7C3AED]/30 flex items-center justify-center shrink-0 transition-all duration-300"
                >
                  <Check className="w-3.5 h-3.5 text-[#7C3AED] group-hover/item:text-[#8B5CF6] transition-all duration-300" />
                </motion.div>
                <span className="text-[#E4E7EB] text-sm group-hover/item:text-[#F8F9FA] transition-colors duration-300">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex justify-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <Button
              size="lg"
              className="bg-[#7C3AED] hover:bg-[#8B5CF6] hover:shadow-2xl hover:shadow-[#7C3AED]/30 text-[#F8F9FA] text-lg px-10 h-14 font-semibold transition-all duration-300 ease-out relative overflow-hidden group/btn"
              asChild
            >
              <Link to="/register" className="relative z-10 flex items-center gap-2">
                <span className="relative z-10">{t("cta.button", language)}</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
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
    </section>
  );
}

