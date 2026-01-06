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
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const mockupVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.03, 
      y: -2,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.15,
      }
    },
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-8 relative overflow-hidden bg-gradient-to-b from-[#0A0A0F] via-[#0F0F15] to-[#0A0A0F]"
    >
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none"
      />
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#F8F9FA] tracking-tight min-h-[1.2em]">
                <TypedText 
                  text={headline}
                  speed={45}
                  startDelay={600}
                />
              </h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-[#E4E7EB] max-w-xl leading-relaxed"
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
                  className="bg-[#7C3AED] hover:bg-[#8B5CF6] hover:shadow-xl hover:shadow-[#7C3AED]/20 text-[#F8F9FA] text-base px-10 h-14 font-semibold transition-all duration-300 ease-out group/btn relative overflow-hidden"
                >
                  <Link to="/register" className="relative z-10 flex items-center gap-2">
                    <span className="relative z-10">{t('hero.getStarted', language)}</span>
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
