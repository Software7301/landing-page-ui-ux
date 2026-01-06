import { Code, Server, Zap } from "lucide-react";

/**
 * Trust / Social Proof Section
 * Small section highlighting key value propositions
 */
export default function TrustNew() {
  const items = [
    {
      icon: Code,
      text: "Built for developers",
      description: "Developer-first approach"
    },
    {
      icon: Server,
      text: "Agent-based infrastructure",
      description: "Distributed control"
    },
    {
      icon: Zap,
      text: "Railway-like experience",
      description: "Familiar and powerful"
    }
  ];

  return (
    <section className="py-12 border-b border-[rgba(124,58,237,0.2)] bg-[#120A24]/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 group cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-[#0B0614] border border-[rgba(124,58,237,0.3)] flex items-center justify-center group-hover:border-[#7C3AED] group-hover:bg-[#120A24] transition-all duration-300">
                  <Icon className="w-5 h-5 text-[#A855F7] group-hover:text-[#C084FC] transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#EDE9FE]">{item.text}</p>
                  <p className="text-xs text-[#A78BFA]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

