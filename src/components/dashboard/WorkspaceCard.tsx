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
        className="relative block rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6 hover:border-[#2EE6D6]/30 hover:shadow-[0_0_20px_rgba(46,230,214,0.1)] transition-all duration-300 group overflow-hidden"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2EE6D6]/0 to-[#2EE6D6]/0 group-hover:from-[#2EE6D6]/5 group-hover:to-transparent transition-all duration-300 rounded-xl pointer-events-none" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20 group-hover:border-[#2EE6D6]/40 group-hover:shadow-[0_0_15px_rgba(46,230,214,0.3)] transition-all duration-300">
              <FolderKanban className="w-6 h-6 text-[#2EE6D6]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-[#E6EDF3] group-hover:text-[#2EE6D6] transition-colors">
                  {name}
                </h3>
                <span
                  className={cn(
                    "px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm",
                    status === "active"
                      ? "bg-[#3EF3A4]/20 text-[#3EF3A4] border border-[#3EF3A4]/30"
                      : "bg-[#9FB0C7]/20 text-[#9FB0C7] border border-[#1C2A3F]"
                  )}
                >
                  {status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#9FB0C7]">
                <Server className="w-4 h-4" />
                <span>{serversCount} servidor{serversCount !== 1 ? "es" : ""}</span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9FB0C7] group-hover:text-[#2EE6D6] group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </motion.div>
  );
}
