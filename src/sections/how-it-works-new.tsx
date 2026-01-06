import { CheckCircle2 } from "lucide-react";

/**
 * How It Works Section
 * Visual stepper showing the process
 */
export default function HowItWorksNew() {
  const steps = [
    {
      number: 1,
      title: "Create a workspace",
      description: "Start by creating your workspace. Organize your projects and teams in one place."
    },
    {
      number: 2,
      title: "Install agents",
      description: "Deploy agents on your servers. They'll handle all the heavy lifting for you."
    },
    {
      number: 3,
      title: "Deploy services",
      description: "Deploy your Docker containers and services. Manage everything from the dashboard."
    },
    {
      number: 4,
      title: "Manage everything in one place",
      description: "Monitor, scale, and manage your entire infrastructure from a unified dashboard."
    }
  ];

  return (
    <section className="py-24 bg-[#120A24]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#EDE9FE] mb-4">
            How it{" "}
            <span className="bg-gradient-to-r from-[#A855F7] to-[#C084FC] bg-clip-text text-transparent">
              works
            </span>
          </h2>
          <p className="text-lg text-[#A78BFA] max-w-2xl mx-auto">
            Get started in minutes with our simple, intuitive process
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-[rgba(124,58,237,0.3)]" />
                )}

                <div className="flex gap-6 items-start">
                  {/* Step Number */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#A855F7] flex items-center justify-center border-4 border-[#120A24] shadow-lg shadow-[#7C3AED]/30">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <div className="bg-[#0B0614] border border-[rgba(124,58,237,0.2)] rounded-xl p-6 hover:border-[rgba(124,58,237,0.4)] transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-[#7C3AED]">Step {step.number}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#EDE9FE] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#A78BFA] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

