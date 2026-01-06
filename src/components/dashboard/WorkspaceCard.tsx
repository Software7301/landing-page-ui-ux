import { motion } from "framer-motion";
import { FolderKanban, Server, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface WorkspaceCardProps {
  id: string;
  name: string;
  status: "active" | "inactive";
  serversCount: number;
  delay?: number;
}

export function WorkspaceCard({
  id,
  name,
  status,
  serversCount,
  delay = 0,
}: WorkspaceCardProps) {
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
    >
      <Link
        to={`/dashboard/workspaces/${id}`}
        className="relative block rounded-xl border p-6 transition-all duration-300 group overflow-hidden"
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
        />
        
        <div className="relative flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
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
            >
              <FolderKanban className="w-6 h-6 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 
                  className="text-lg font-semibold transition-colors duration-300"
                  style={{ color: "var(--color-text)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text)";
                  }}
                >
                  {name}
                </h3>
                <span
                  className="px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm border transition-colors duration-300"
                  style={status === "active" ? {
                    backgroundColor: "var(--color-success)20",
                    color: "var(--color-success)",
                    borderColor: "var(--color-success)30",
                  } : {
                    backgroundColor: "var(--color-text-secondary)20",
                    color: "var(--color-text-secondary)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  {status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                <Server className="w-4 h-4" />
                <span>{serversCount} servidor{serversCount !== 1 ? "es" : ""}</span>
              </div>
            </div>
          </div>
          <ChevronRight 
            className="w-5 h-5 transition-all duration-300" 
            style={{ color: "var(--color-text-secondary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-primary)";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-secondary)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
