import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { TypedText } from "@/components/TypedText";
import { CesiumMap } from "@/components/3d/CesiumMap";

export default function Hero() {
  const { language } = useLanguage();
  const headline = t('hero.headline', language);
  const subheadline = t('hero.subheadline', language);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const mockupVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9, rotateY: -15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        delay: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Animação de flutuação contínua para o globo
  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1,
      }
    },
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center pt-32 pb-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#0B0B0F] via-[#1a0d2e]/20 to-[#0B0B0F]"
    >
      {/* Glow muito sutil para profundidade */}
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#7C3AED]/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#F5F3FF] tracking-tight min-h-[1.2em]">
                <TypedText 
                  text={headline}
                  speed={45}
                  startDelay={600}
                />
              </h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-[#C4B5FD] max-w-xl leading-relaxed"
              >
                {subheadline}
              </motion.p>
            </div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-[#5B21B6] hover:bg-[#6D28D9] hover:shadow-xl hover:shadow-[#5B21B6]/40 text-[#F5F3FF] text-base px-8 h-12 font-medium transition-all duration-300 ease-out group/btn relative overflow-hidden"
                >
                  <Link to="/register" className="relative z-10 flex items-center">
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    <span className="relative z-10">{t('hero.getStarted', language)}</span>
                    <motion.span
                      className="relative z-10 ml-2"
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
          </motion.div>

          <motion.div 
            variants={mockupVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div 
              className="h-[600px] w-full"
              variants={floatVariants}
              animate="animate"
            >
              <CesiumMap height="600px" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
