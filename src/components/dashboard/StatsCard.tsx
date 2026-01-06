import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";

type LucideIconType = React.ComponentType<LucideProps>;

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType?: "positive" | "negative" | "neutral";
  description: string;
  icon?: LucideIconType;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  description,
  icon: Icon,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        transition: { duration: 0.2 } 
      }}
      className="relative rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6 hover:border-[#2EE6D6]/30 hover:shadow-[0_0_20px_rgba(46,230,214,0.1)] transition-all duration-300 overflow-hidden group"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2EE6D6]/0 to-[#2EE6D6]/0 group-hover:from-[#2EE6D6]/5 group-hover:to-transparent transition-all duration-300 rounded-xl pointer-events-none" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[#9FB0C7] mb-2">{title}</p>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-3xl font-semibold text-[#E6EDF3]">{value}</h3>
            <span
              className={cn(
                "text-sm font-medium",
                changeType === "positive" && "text-[#3EF3A4]",
                changeType === "negative" && "text-[#F26D6D]",
                changeType === "neutral" && "text-[#9FB0C7]"
              )}
            >
              {change}
            </span>
          </div>
          <p className="text-sm text-[#9FB0C7]">{description}</p>
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20 group-hover:border-[#2EE6D6]/40 group-hover:shadow-[0_0_15px_rgba(46,230,214,0.3)] transition-all duration-300">
            <Icon className="w-6 h-6 text-[#2EE6D6]" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
