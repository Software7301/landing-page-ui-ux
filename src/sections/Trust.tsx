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
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
  },
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    }
  },
};

export default function Trust() {
  const { language } = useLanguage();

  return (
    <section className="py-20 px-6 md:px-8 bg-gradient-to-b from-[#0B0F17] via-[#101827] to-[#0B0F17]">
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
                whileHover={{ y: -2, scale: 1.01 }}
                className="flex flex-col items-center gap-4 group cursor-pointer"
              >
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-[#0B0F17] group-hover:bg-[#6D28D9]/10 flex items-center justify-center border border-[rgba(109,40,217,0.15)] group-hover:border-[rgba(109,40,217,0.25)] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#6D28D9]/20"
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 8px 20px rgba(109, 40, 217, 0.2)",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
                  }}
                >
                  <motion.div
                    variants={iconVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Icon className="w-6 h-6 text-[#6D28D9] group-hover:text-[#8B5CF6]" />
                  </motion.div>
                </motion.div>
                <motion.p 
                  className="text-base text-[#E5E7EB] font-medium transition-colors duration-300"
                  whileHover={{ color: "#E5E7EB" }}
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
