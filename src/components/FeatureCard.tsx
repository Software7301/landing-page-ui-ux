import { motion } from 'framer-motion';
import type { LucideProps } from 'lucide-react';
import type { ReactNode } from 'react';

type LucideIcon = React.ComponentType<LucideProps>;

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  children?: ReactNode;
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const iconContainerVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.08, 
    rotate: 3,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    }
  },
};

export function FeatureCard({ icon: Icon, title, description, index = 0, children }: FeatureCardProps) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={cardVariants}
      whileHover={{
        y: -2,
        scale: 1.01,
        transition: { 
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
        },
      }}
      className="bg-[#141C2C] border border-[rgba(109,40,217,0.15)] hover:border-[rgba(109,40,217,0.25)] hover:bg-[#1A2435] rounded-lg p-8 cursor-pointer group relative overflow-hidden transition-all duration-300 shadow-sm shadow-black/20 hover:shadow-md hover:shadow-black/30"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#6D28D9]/0 to-[#6D28D9]/0 group-hover:from-[#6D28D9]/5 group-hover:to-[#6D28D9]/10 rounded-lg transition-all duration-300"
        initial={false}
      />
      <div className="relative z-10">
        <motion.div 
          className="w-12 h-12 rounded-lg bg-[#0B0F17] group-hover:bg-[#6D28D9]/10 flex items-center justify-center mb-4 border border-[rgba(109,40,217,0.15)] group-hover:border-[rgba(109,40,217,0.25)] transition-all duration-300"
          variants={iconContainerVariants}
          initial="rest"
          whileHover="hover"
        >
          <Icon className="w-6 h-6 text-[#6D28D9] group-hover:text-[#8B5CF6] transition-colors duration-300" />
        </motion.div>
        <motion.h3 
          className="text-xl font-semibold mb-2 text-[#E5E7EB] transition-colors duration-300"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        <p className="text-[#9CA3AF] text-sm leading-relaxed group-hover:text-[#E5E7EB] transition-colors duration-300">
          {description}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

