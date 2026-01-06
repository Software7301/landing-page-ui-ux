import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { Globe, Server, Zap, Shield } from "lucide-react";

const GlobalMap = lazy(() => import("@/components/GlobalMap").then(module => ({ default: module.GlobalMap })));

const stats = [
  { icon: Globe, value: "15+", label: "Regions" },
  { icon: Server, value: "99.9%", label: "Uptime" },
  { icon: Zap, value: "<50ms", label: "Latency" },
  { icon: Shield, value: "24/7", label: "Support" },
];

export default function Infrastructure() {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section 
      id="infrastructure" 
      className="py-24 px-6 md:px-8 relative overflow-hidden bg-[#0B0F17]"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6D28D9]/10 border border-[rgba(109,40,217,0.15)]"
              >
                <Globe className="w-4 h-4 text-[#6D28D9]" />
                <span className="text-sm font-medium text-[#6D28D9]">
                  {t("infrastructure.badge", language)}
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-[#E5E7EB] leading-tight"
              >
                {t("infrastructure.title", language)}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-[#9CA3AF] leading-relaxed max-w-xl"
              >
                {t("infrastructure.subtitle", language)}
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-6 rounded-lg bg-[#141C2C] border border-[rgba(109,40,217,0.15)] hover:border-[rgba(109,40,217,0.25)] transition-all duration-300 group"
                    whileHover={{ y: -2, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-[#0B0F17] flex items-center justify-center border border-[rgba(109,40,217,0.15)] group-hover:border-[rgba(109,40,217,0.25)] transition-all duration-300">
                        <Icon className="w-5 h-5 text-[#6D28D9] group-hover:text-[#8B5CF6] transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#E5E7EB] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#9CA3AF]">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              {["Global CDN", "DDoS Protection", "Auto Scaling", "Load Balancing"].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="px-4 py-2 rounded-lg bg-[#141C2C] border border-[rgba(109,40,217,0.15)] text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:border-[rgba(109,40,217,0.25)] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={mapVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            <div className="relative w-full h-full min-h-[500px] rounded-lg bg-[#141C2C] border border-[rgba(109,40,217,0.15)] p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9]/5 via-transparent to-[#22D3EE]/5 pointer-events-none" />
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#6D28D9] border-t-transparent rounded-full animate-spin" />
                  </div>
                }
              >
                <GlobalMap />
              </Suspense>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

