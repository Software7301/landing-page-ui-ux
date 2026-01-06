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
      className="relative rounded-xl border p-6 transition-all duration-300 overflow-hidden group"
      style={{
        borderColor: "var(--color-border)",
        background: `linear-gradient(to bottom, var(--color-input-bg), var(--color-card))`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-primary)50";
        e.currentTarget.style.boxShadow = `0 0 20px var(--color-primary)20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div 
        className="absolute inset-0 transition-all duration-300 rounded-xl pointer-events-none"
        style={{
          background: `linear-gradient(to bottom right, transparent, transparent)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `linear-gradient(to bottom right, var(--color-primary)10, transparent)`;
        }}
      />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium mb-2 transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
            {title}
          </p>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-3xl font-semibold transition-colors duration-300" style={{ color: "var(--color-text)" }}>
              {value}
            </h3>
            <span
              className="text-sm font-medium transition-colors duration-300"
              style={{
                color: changeType === "positive" ? "var(--color-success)" : 
                       changeType === "negative" ? "var(--color-error)" : 
                       "var(--color-text-secondary)"
              }}
            >
              {change}
            </span>
          </div>
          <p className="text-sm transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
            {description}
          </p>
        </div>
        {Icon && (
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, var(--color-primary)20, var(--color-accent)10)`,
              borderColor: "var(--color-primary)30",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary)60";
              e.currentTarget.style.boxShadow = `0 0 15px var(--color-primary)40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary)30";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Icon className="w-6 h-6 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
