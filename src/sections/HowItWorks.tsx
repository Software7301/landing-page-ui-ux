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
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const numberVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.2, 
    rotate: 360,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    }
  },
};

export default function HowItWorks() {
  const { language } = useLanguage();

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-[#1a0d2e]/20 to-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-[#F5F3FF]">
            {t('howItWorks.title', language)}
          </h2>
          <p className="text-lg text-[#C4B5FD] max-w-2xl mx-auto">
            {t('howItWorks.subtitle', language)}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#0A0A0A] hidden md:block" />

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
                  whileHover={{ x: 12, scale: 1.02 }}
                  className="relative flex gap-8 group cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-[#0A0A0A] group-hover:bg-[#5B21B6]/20 flex items-center justify-center border border-[rgba(91,33,182,0.2)] group-hover:border-[#5B21B6] transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#5B21B6]/40 relative overflow-hidden"
                      whileHover={{
                        scale: 1.15,
                        boxShadow: "0 10px 40px rgba(91, 33, 182, 0.5)",
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                    >
                      <motion.span 
                        className="text-2xl font-semibold text-[#C4B5FD] group-hover:text-[#7C3AED] transition-colors duration-300 relative z-10"
                        variants={numberVariants}
                        initial="rest"
                        whileHover="hover"
                      >
                        {index + 1}
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#5B21B6]/0 to-[#5B21B6]/0 group-hover:from-[#5B21B6]/20 group-hover:to-[#5B21B6]/40 rounded-full"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>
                  <motion.div 
                    className="flex-1 pt-2"
                    initial={false}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold mb-2 text-[#F5F3FF] group-hover:text-[#F5F3FF] transition-colors duration-300">
                      {t(`howItWorks.${step.key}.title`, language)}
                    </h3>
                    <p className="text-[#C4B5FD] leading-relaxed group-hover:text-[#E9D5FF] transition-colors duration-300">
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
