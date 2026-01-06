import { motion } from "framer-motion";
import { Code, Server } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";

const items = [
  { icon: Code, key: 'builtForDevs' },
  { icon: Server, key: 'agentBased' },
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
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.15, 
    rotate: [0, -10, 10, -10, 0] as number[],
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    }
  },
};

export default function Trust() {
  const { language } = useLanguage();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black via-[#1a0d2e]/20 to-black">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-12 text-center max-w-2xl mx-auto"
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.03 }}
                className="flex flex-col items-center gap-4 group cursor-pointer"
              >
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-[#0A0A0A] group-hover:bg-[#5B21B6]/20 flex items-center justify-center border border-[rgba(91,33,182,0.2)] group-hover:border-[#5B21B6] transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#5B21B6]/40"
                  whileHover={{
                    scale: 1.15,
                    boxShadow: "0 10px 30px rgba(91, 33, 182, 0.4)",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                >
                  <motion.div
                    variants={iconVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Icon className="w-6 h-6 text-[#6D28D9] group-hover:text-[#7C3AED]" />
                  </motion.div>
                </motion.div>
                <motion.p 
                  className="text-base text-[#F5F3FF] font-medium transition-colors duration-300"
                  whileHover={{ color: "#F5F3FF" }}
                >
                  {t(`trust.${item.key}`, language)}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
