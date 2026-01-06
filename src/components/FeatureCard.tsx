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
    scale: 1.1, 
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
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
        y: -4,
        scale: 1.02,
        transition: { 
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      }}
      className="bg-[#0F0F15] border border-[rgba(124,58,237,0.12)] hover:border-[rgba(124,58,237,0.25)] hover:bg-[#14141F] rounded-lg p-8 cursor-pointer group relative overflow-hidden transition-all duration-300"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/0 to-[#7C3AED]/0 group-hover:from-[#7C3AED]/5 group-hover:to-[#7C3AED]/10 rounded-lg transition-all duration-300"
        initial={false}
      />
      <div className="relative z-10">
        <motion.div 
          className="w-12 h-12 rounded-lg bg-[#0A0A0F] group-hover:bg-[#7C3AED]/10 flex items-center justify-center mb-4 border border-[rgba(124,58,237,0.12)] group-hover:border-[rgba(124,58,237,0.25)] transition-all duration-300"
          variants={iconContainerVariants}
          initial="rest"
          whileHover="hover"
        >
          <Icon className="w-6 h-6 text-[#7C3AED] group-hover:text-[#8B5CF6] transition-colors duration-300" />
        </motion.div>
        <motion.h3 
          className="text-xl font-semibold mb-2 text-[#F8F9FA] transition-colors duration-300"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        <p className="text-[#E4E7EB] text-sm leading-relaxed group-hover:text-[#F8F9FA] transition-colors duration-300">
          {description}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

