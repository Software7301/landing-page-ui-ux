import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";

const steps = [
  { key: 'step1' },
  { key: 'step2' },
  { key: 'step3' },
  { key: 'step4' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -60, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
  },
};

const numberVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 180,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    }
  },
};

export default function HowItWorks() {
  const { language } = useLanguage();

  return (
    <section className="py-24 px-6 md:px-8 bg-gradient-to-b from-[#0A0A0F] via-[#0F0F15] to-[#0A0A0F]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#F8F9FA]">
            {t('howItWorks.title', language)}
          </h2>
          <p className="text-lg text-[#E4E7EB] max-w-2xl mx-auto">
            {t('howItWorks.subtitle', language)}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[rgba(124,58,237,0.12)] hidden md:block" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-12"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 8, scale: 1.01 }}
                  className="relative flex gap-8 group cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-[#0A0A0F] group-hover:bg-[#7C3AED]/10 flex items-center justify-center border border-[rgba(124,58,237,0.12)] group-hover:border-[rgba(124,58,237,0.25)] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#7C3AED]/20 relative overflow-hidden"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 8px 25px rgba(124, 58, 237, 0.25)",
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                      }}
                    >
                      <motion.span 
                        className="text-2xl font-semibold text-[#7C3AED] group-hover:text-[#8B5CF6] transition-colors duration-300 relative z-10"
                        variants={numberVariants}
                        initial="rest"
                        whileHover="hover"
                      >
                        {index + 1}
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/0 to-[#7C3AED]/0 group-hover:from-[#7C3AED]/10 group-hover:to-[#7C3AED]/20 rounded-full transition-all duration-300"
                        initial={false}
                      />
                    </motion.div>
                  </div>
                  <motion.div 
                    className="flex-1 pt-2"
                    initial={false}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold mb-2 text-[#F8F9FA] group-hover:text-[#F8F9FA] transition-colors duration-300">
                      {t(`howItWorks.${step.key}.title`, language)}
                    </h3>
                    <p className="text-[#E4E7EB] leading-relaxed group-hover:text-[#F8F9FA] transition-colors duration-300">
                      {t(`howItWorks.${step.key}.description`, language)}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
