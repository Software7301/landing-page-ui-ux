import { motion, AnimatePresence } from 'framer-motion';

interface NodeTooltipProps {
  isVisible: boolean;
  x: number;
  y: number;
  ip: string;
  location: string;
  status: 'online' | 'offline';
}

export function NodeTooltip({ isVisible, x, y, ip, location, status }: NodeTooltipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, calc(-100% - 12px))',
          }}
        >
          <div className="bg-[#0B0B0F] border border-[rgba(124,58,237,0.2)] rounded-lg px-4 py-3 shadow-xl backdrop-blur-sm min-w-[200px]">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#9CA3AF] text-xs font-medium uppercase tracking-wider">
                  Server
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      status === 'online'
                        ? 'bg-[#7C3AED] shadow-[0_0_8px_rgba(124,58,237,0.6)]'
                        : 'bg-[#6B7280]'
                    }`}
                  />
                  <span className="text-[#C4B5FD] text-xs font-medium capitalize">
                    {status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1.5 pt-1 border-t border-[rgba(124,58,237,0.1)]">
                <div>
                  <span className="text-[#9CA3AF] text-xs">IP Address</span>
                  <p className="text-[#F5F3FF] text-sm font-mono mt-0.5">{ip}</p>
                </div>
                <div>
                  <span className="text-[#9CA3AF] text-xs">Location</span>
                  <p className="text-[#E9D5FF] text-sm mt-0.5">{location}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow */}
          <div
            className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-[#0B0B0F] border-r border-b border-[rgba(124,58,237,0.2)] rotate-45"
            style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

