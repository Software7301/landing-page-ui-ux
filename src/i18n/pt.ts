export default {
  config: {
    code: "pt",
    label: "Português",
    emoji: ""
  },

  header: {
    features: "Funcionalidades",
    benefits: "Benefícios",
    pricing: "Preços",
    demo: "Demonstração",
    signIn: "Entrar",
    startFree: "Começar Grátis",
  },

  hero: {
    badge: "Plataforma SaaS Multi-Tenant",
    title: "O Hub Definitivo para Gerenciar Tenants, Agentes e Infraestrutura",
    subtitle:
      "Plataforma multi-tenant completa para controlar agentes remotos, monitorar sistemas e gerenciar licenças com integração avançada de billing.",
    ctaPrimary: "Começar Grátis",
    ctaSecondary: "Ver Dashboard Demo"
  },

  valueProps: {
    items: [
      {
        title: "Plataforma SaaS Multi-Tenant",
        description:
          "Isolamento completo por tenant com branding customizado e domínio próprio",
      },
      {
        title: "Gerenciamento de Agentes Remotos",
        description:
          "Gerencie binários remotos com heartbeat, métricas e status em tempo real",
      },
      {
        title: "Monitoramento e Logs em Tempo Real",
        description:
          "Logs centralizados e monitoramento contínuo de toda a infraestrutura",
      },
      {
        title: "Controle de Licenças e Billing",
        description:
          "Integração nativa com API PlanBTech para gestão de licenças e faturamento",
      },
    ],
  },

  featuresDashboard: {
    badge: "Intelligent Dashboard",
    title: "Dashboard Inteligente com Visão 360°",
    subtitle:
      "Monitore todos os seus tenants, agentes e infraestrutura em uma interface moderna e intuitiva. Visualize métricas em tempo real, gráficos de desempenho e status de saúde do sistema.",
    items: [
      "Métricas em tempo real de CPU, memória e disco",
      "Gráficos interativos com histórico completo",
      "Alertas configuráveis por threshold",
      "Painel customizável por tenant"
    ]
  },

  featuresAgents: {
    badge: "Controle de Agentes",
    title: "Gestão Completa de Agentes Remotos",
    subtitle:
      "Instale, configure e monitore agentes em qualquer servidor. Receba métricas automáticas, logs em tempo real e notificações de status.",

    steps: [
      {
        step: "01",
        title: "Instalação Simples",
        desc: "Script de instalação automático via CLI"
      },
      {
        step: "02",
        title: "Heartbeat Contínuo",
        desc: "Monitoramento de saúde a cada 30 segundos"
      },
      {
        step: "03",
        title: "Coleta de Métricas",
        desc: "CPU, RAM, disco, rede e processos"
      },
      {
        step: "04",
        title: "Logs Centralizados",
        desc: "Agregação e busca em tempo real"
      }
    ]
  },

  featuresMultiTenancy: {
    badge: "Multi-Tenancy",
    title: "Multi-Tenancy Avançado com Isolamento Total",
    subtitle:
      "Arquitetura multi-tenant robusta com isolamento completo de dados, branding personalizado e controle granular de permissões.",

    items: [
      { icon: "lock", text: "Isolamento total de dados por tenant" },
      { icon: "sparkles", text: "Branding e tema customizável" },
      { icon: "network", text: "Domínio próprio por tenant" },
      { icon: "users", text: "Gerenciamento hierárquico de usuários" },
      { icon: "shield", text: "Controle de acesso baseado em roles" },
      { icon: "chart", text: "Relatórios e analytics por organização" }
    ]
  },

  featureShowcase: {
    badge: "Interface",
    title: "Interface Moderna e Intuitiva",
    subtitle: "Design futurista com foco em usabilidade e performance",

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
    title: "Por Que Escolher o CorsiHub?",
    subtitle: "Plataforma completa e escalável para gerenciar sua infraestrutura",

    items: [
      {
        title: "Segurança Enterprise",
        description: "Criptografia end-to-end, autenticação multi-fator e controle de acesso granular"
      },
      {
        title: "Escalabilidade Ilimitada",
        description: "Arquitetura cloud-native pronta para escalar de 10 a 10.000 agentes"
      },
      {
        title: "SaaS ou Self-Hosted",
        description: "Deploy em nossa cloud ou na sua própria infraestrutura"
      },
      {
        title: "Branding Customizado",
        description: "White-label completo com logo, cores e domínio próprio"
      },
      {
        title: "API-First Architecture",
        description: "API REST completa para integração com qualquer sistema"
      },
      {
        title: "CLI Poderoso",
        description: "Ferramenta de linha de comando para automação completa"
      }
    ]
  },

  target: {
    title: "Para Quem é o CorsiHub?",
    subtitle: "Ideal para empresas e profissionais que gerenciam múltiplos clientes e infraestruturas",

    items: [
      {
        title: "Software Houses",
        description: "Gerencie aplicações e infraestrutura de todos os seus clientes em um só lugar",
        features: ["Painel multi-cliente", "Integração de billing", "Branding customizado"]
      },
      {
        title: "MSPs",
        description: "Monitoramento centralizado de servidores e serviços gerenciados",
        features: ["Monitoramento em tempo real", "Gestão de alertas", "Acompanhamento de SLA"]
      },
      {
        title: "Empresas SaaS",
        description: "Plataforma pronta para adicionar multi-tenancy ao seu produto",
        features: ["Isolamento por tenant", "Analytics de uso", "Controle de licenças"]
      },
      {
        title: "Desenvolvedores",
        description: "Gerencie seus VPS, domínios e projetos pessoais de forma profissional",
        features: ["Dashboard unificado", "Controle de custos", "Métricas de desempenho"]
      }
    ]
  },

  pricing: {
    badge: "Preços",
    title: "Planos para Todos os Tamanhos",
    subtitle: "Comece grátis e escale conforme sua necessidade",

    compare: "Comparar Planos",
    ctaPrimary: "Começar",
    ctaEnterprise: "Falar com Vendas",
    popular: "Mais Popular",

    plans: [
      {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfeito para começar",
        features: [
          "Até 5 agentes",
          "1 tenant",
          "7 dias de retenção de logs",
          "Suporte por email",
          "API básica"
        ]
      },
      {
        name: "Pro",
        price: "$99",
        period: "/mês",
        description: "Para times em crescimento",
        popular: true,
        features: [
          "Até 50 agentes",
          "10 tenants",
          "30 dias de retenção de logs",
          "Suporte prioritário",
          "API completa",
          "Branding customizado",
          "Webhooks"
        ]
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Escalabilidade ilimitada",
        features: [
          "Agentes ilimitados",
          "Tenants ilimitados",
          "Retenção customizável",
          "Suporte dedicado",
          "Self-hosted disponível",
          "SLA garantido",
          "Treinamento incluso"
        ]
      }
    ]
  },

  cta: {
    title: "Pronto para Transformar seu Gerenciamento de Infraestrutura?",
    subtitle: "Junte-se a centenas de empresas que já confiam no CorsiHub para gerenciar seus tenants e agentes.",
    primary: "Começar Grátis",
    secondary: "Agendar Demonstração",
    footnote: "Sem cartão de crédito • Setup em 5 minutos • Suporte em português"
  },

  footer: {
    columns: [
      {
        title: "Produto",
        links: ["Funcionalidades", "Preços", "Changelog", "Roadmap"],
      },
      {
        title: "Empresa",
        links: ["Sobre", "Blog", "Carreiras", "Contato"],
      },
      {
        title: "Recursos",
        links: ["Documentação", "API Reference", "Guias", "Status"],
      },
      {
        title: "Legal",
        links: ["Privacidade", "Termos", "Segurança", "Compliance"],
      },
    ],
    bottom: {
      rights: "Todos os direitos reservados."
    }
  }

};
