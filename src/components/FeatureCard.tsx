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
    scale: 1.2, 
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut" as const,
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
        y: -8,
        scale: 1.02,
        transition: { 
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      className="bg-[#0A0A0A] border-[rgba(91,33,182,0.2)] hover:border-[#5B21B6] hover:bg-[#0F0F0F] rounded-lg p-6 cursor-pointer group relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#5B21B6]/0 to-[#5B21B6]/0 group-hover:from-[#5B21B6]/5 group-hover:to-[#5B21B6]/10 rounded-lg"
        initial={false}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">
        <motion.div 
          className="w-12 h-12 rounded-lg bg-black group-hover:bg-[#5B21B6]/20 flex items-center justify-center mb-4 border border-[rgba(91,33,182,0.2)] group-hover:border-[#5B21B6] transition-all duration-300"
          variants={iconContainerVariants}
          initial="rest"
          whileHover="hover"
        >
          <Icon className="w-6 h-6 text-[#6D28D9] group-hover:text-[#7C3AED] transition-colors duration-300" />
        </motion.div>
        <motion.h3 
          className="text-xl font-semibold mb-2 text-[#F5F3FF] transition-colors duration-300"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        <p className="text-[#C4B5FD] text-sm leading-relaxed group-hover:text-[#E9D5FF] transition-colors duration-300">
          {description}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

