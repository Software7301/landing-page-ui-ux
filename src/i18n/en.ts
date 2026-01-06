export default {
  config: {
    code: "en",
    label: "English",
    emoji: ""
  },

  header: {
    features: "Features",
    benefits: "Benefits",
    pricing: "Pricing",
    demo: "Demo",
    signIn: "Sign In",
    startFree: "Start Free",
  },

  hero: {
    badge: "Multi-Tenant SaaS Platform",
    title: "The Ultimate Hub to Manage Tenants, Agents and Infrastructure",
    subtitle:
      "A complete multi-tenant platform to control remote agents, monitor systems, and manage licenses with advanced billing integration.",
    ctaPrimary: "Start Free",
    ctaSecondary: "View Demo Dashboard"
  },

  valueProps: {
    items: [
      {
        title: "Multi-Tenant SaaS Platform",
        description:
          "Full tenant isolation with custom branding and custom domain support",
      },
      {
        title: "Remote Agent Management",
        description:
          "Manage remote binaries with heartbeat, metrics and real-time status",
      },
      {
        title: "Real-time Monitoring & Logs",
        description:
          "Centralized logging and continuous infrastructure monitoring",
      },
      {
        title: "License Control & Billing",
        description:
          "Native integration with PlanBTech API for license and billing management",
      },
    ],
  },

  featuresDashboard: {
    badge: "Intelligent Dashboard",
    title: "Smart Dashboard with 360° Visibility",
    subtitle:
      "Monitor all your tenants, agents and infrastructure in a modern and intuitive interface. View real-time metrics, performance charts and system health status.",
    items: [
      "Real-time CPU, memory and disk metrics",
      "Interactive charts with full history",
      "Configurable threshold alerts",
      "Customizable panel per tenant"
    ]
  },

  featuresAgents: {
    badge: "Agent Control",
    title: "Complete Remote Agent Management",
    subtitle:
      "Install, configure and monitor agents on any server. Receive automatic metrics, real-time logs and status notifications.",

    steps: [
      {
        step: "01",
        title: "Simple Installation",
        desc: "Automatic installation script via CLI"
      },
      {
        step: "02",
        title: "Continuous Heartbeat",
        desc: "Health monitoring every 30 seconds"
      },
      {
        step: "03",
        title: "Metrics Collection",
        desc: "CPU, RAM, disk, network and processes"
      },
      {
        step: "04",
        title: "Centralized Logs",
        desc: "Aggregation and real-time search"
      }
    ]
  },

  featuresMultiTenancy: {
    badge: "Multi-Tenancy",
    title: "Advanced Multi-Tenancy with Full Isolation",
    subtitle:
      "Robust multi-tenant architecture with full data isolation, customizable branding and granular permission control.",

    items: [
      { icon: "lock", text: "Full data isolation per tenant" },
      { icon: "sparkles", text: "Customizable branding and theme" },
      { icon: "network", text: "Custom domain per tenant" },
      { icon: "users", text: "Hierarchical user management" },
      { icon: "shield", text: "Role-based access control" },
      { icon: "chart", text: "Organization-level analytics & reports" }
    ]
  },

  featureShowcase: {
    badge: "Interface",
    title: "Modern & Intuitive Interface",
    subtitle: "Futuristic design focused on usability and performance",

    items: [
      { title: "Agents Dashboard", query: "agent+monitoring+dashboard+dark+purple" },
      { title: "Logs Viewer", query: "terminal+logs+viewer+dark+interface" },
      { title: "Tenant Settings", query: "settings+panel+dark+modern+ui" },
      { title: "Analytics", query: "analytics+charts+dark+purple+theme" },
      { title: "API Management", query: "api+keys+management+dark+ui" },
      { title: "Billing Dashboard", query: "billing+dashboard+dark+modern" },
    ]
  },

  benefits: {
    title: "Why Choose CorsiHub?",
    subtitle: "A complete and scalable platform to manage your infrastructure",

    items: [
      {
        title: "Enterprise Security",
        description: "End-to-end encryption, multi-factor authentication and granular access control"
      },
      {
        title: "Unlimited Scalability",
        description: "Cloud-native architecture ready to scale from 10 to 10,000 agents"
      },
      {
        title: "SaaS or Self-Hosted",
        description: "Deploy in our cloud or on your own infrastructure"
      },
      {
        title: "Custom Branding",
        description: "Full white-label including logo, colors and custom domain"
      },
      {
        title: "API-First Architecture",
        description: "Complete REST API for integration with any system"
      },
      {
        title: "Powerful CLI",
        description: "Command-line interface for full automation"
      }
    ]
  },

  target: {
    title: "Who Is CorsiHub For?",
    subtitle: "Ideal for companies and professionals managing multiple clients and infrastructures",

    items: [
      {
        title: "Software Houses",
        description: "Manage applications and infrastructure for all your clients in one place",
        features: ["Multi-client dashboard", "Billing integration", "Custom branding"]
      },
      {
        title: "MSPs",
        description: "Centralized monitoring of managed servers and services",
        features: ["Real-time monitoring", "Alert management", "SLA tracking"]
      },
      {
        title: "SaaS Companies",
        description: "Platform ready to add multi-tenancy to your product",
        features: ["Tenant isolation", "Usage analytics", "License control"]
      },
      {
        title: "Developers",
        description: "Manage VPS, domains and personal projects professionally",
        features: ["Unified dashboard", "Cost tracking", "Performance metrics"]
      }
    ]
  },

  pricing: {
    badge: "Pricing",
    title: "Plans for All Team Sizes",
    subtitle: "Start for free and scale as needed",

    compare: "Compare Plans",
    ctaPrimary: "Get Started",
    ctaEnterprise: "Contact Sales",
    popular: "Most Popular",

    plans: [
      {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect to begin",
        features: [
          "Up to 5 agents",
          "1 tenant",
          "7-day log retention",
          "Email support",
          "Basic API"
        ]
      },
      {
        name: "Pro",
        price: "$99",
        period: "/month",
        description: "For growing teams",
        popular: true,
        features: [
          "Up to 50 agents",
          "10 tenants",
          "30-day log retention",
          "Priority support",
          "Full API",
          "Custom branding",
          "Webhooks"
        ]
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Unlimited scalability",
        features: [
          "Unlimited agents",
          "Unlimited tenants",
          "Custom retention",
          "Dedicated support",
          "Self-hosted available",
          "Guaranteed SLA",
          "Training included"
        ]
      }
    ]
  },

  cta: {
    title: "Ready to Transform Your Infrastructure Management?",
    subtitle: "Join hundreds of companies already trusting CorsiHub to manage their tenants and agents.",
    primary: "Start Free",
    secondary: "Book a Demo",
    footnote: "No credit card • 5-minute setup • Support available"
  },

  footer: {
    columns: [
      {
        title: "Product",
        links: ["Features", "Pricing", "Changelog", "Roadmap"],
      },
      {
        title: "Company",
        links: ["About", "Blog", "Careers", "Contact"],
      },
      {
        title: "Resources",
        links: ["Documentation", "API Reference", "Guides", "Status"],
      },
      {
        title: "Legal",
        links: ["Privacy", "Terms", "Security", "Compliance"],
      },
    ],
    bottom: {
      rights: "All rights reserved."
    }
  }

};
