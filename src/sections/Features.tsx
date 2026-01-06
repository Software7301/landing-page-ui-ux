import { motion } from "framer-motion";
import { FolderKanban, Server, Container, Globe, LayoutDashboard, Shield } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { FeatureCard } from "@/components/FeatureCard";

const features = [
  {
    icon: FolderKanban,
    key: 'workspace'
  },
  {
    icon: Server,
    key: 'agents'
  },
  {
    icon: Container,
    key: 'docker'
  },
  {
    icon: Globe,
    key: 'domain'
  },
  {
    icon: LayoutDashboard,
    key: 'dashboard'
  },
  {
    icon: Shield,
    key: 'security'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export default function Features() {
  const { language } = useLanguage();

  return (
    <section id="features" className="py-24 px-4 bg-gradient-to-b from-black via-[#1a0d2e]/25 to-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-[#F5F3FF]">
            {t('features.title', language)}
          </h2>
          <p className="text-lg text-[#C4B5FD] max-w-2xl mx-auto">
            {t('features.subtitle', language)}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FeatureCard
                key={index}
                icon={Icon}
                title={t(`features.${feature.key}.title`, language)}
                description={t(`features.${feature.key}.description`, language)}
                index={index}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
