import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FolderKanban, 
  Server, 
  Container, 
  Globe, 
  LayoutDashboard, 
  Shield 
} from "lucide-react";

/**
 * Features Section
 * Grid of feature cards with hover effects and glow
 */
export default function FeaturesNew() {
  const features = [
    {
      icon: FolderKanban,
      title: "Workspace-based management",
      description: "Organize your infrastructure with workspaces. Manage multiple projects and teams efficiently."
    },
    {
      icon: Server,
      title: "Agent-controlled servers",
      description: "Distributed agents handle your servers. Full control and monitoring from a central dashboard."
    },
    {
      icon: Container,
      title: "Docker container management",
      description: "Deploy and manage Docker containers with ease. Full Docker integration and orchestration."
    },
    {
      icon: Globe,
      title: "Domain & DNS control",
      description: "Manage domains and DNS records directly from the platform. Simple and intuitive interface."
    },
    {
      icon: LayoutDashboard,
      title: "Unified dashboard",
      description: "Everything in one place. Monitor, manage and scale your entire infrastructure from a single view."
    },
    {
      icon: Shield,
      title: "Secure & scalable",
      description: "Enterprise-grade security with scalable architecture. Built for production workloads."
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#0B0614]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#EDE9FE] mb-4">
            Powerful features for{" "}
            <span className="bg-gradient-to-r from-[#A855F7] to-[#C084FC] bg-clip-text text-transparent">
              modern infrastructure
            </span>
          </h2>
          <p className="text-lg text-[#A78BFA] max-w-2xl mx-auto">
            Everything you need to deploy, manage, and scale your servers efficiently
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-[#120A24] border-[rgba(124,58,237,0.2)] hover:border-[rgba(124,58,237,0.4)] transition-all duration-300 hover:shadow-lg hover:shadow-[#7C3AED]/20 group cursor-pointer"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#0B0614] border border-[rgba(124,58,237,0.3)] flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-[#7C3AED]/20 group-hover:to-[#A855F7]/20 group-hover:border-[#7C3AED] transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#A855F7] group-hover:text-[#C084FC] transition-colors" />
                  </div>
                  <CardTitle className="text-xl text-[#EDE9FE] group-hover:text-white transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#A78BFA] text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

