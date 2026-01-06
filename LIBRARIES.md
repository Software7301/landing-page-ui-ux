# 📚 Bibliotecas Instaladas e Configuradas

Este documento lista todas as bibliotecas instaladas e como utilizá-las no projeto.

## ✅ Bibliotecas Instaladas

### Animações
- **framer-motion** - Animações suaves e performáticas
- **lenis** - Scroll suave (apenas landing page)

### UI (Radix UI)
- **@radix-ui/react-dialog** - Modais e diálogos
- **@radix-ui/react-dropdown-menu** - Menus dropdown
- **@radix-ui/react-tooltip** - Tooltips
- **@radix-ui/react-popover** - Popovers
- **@radix-ui/react-tabs** - Tabs
- **@radix-ui/react-alert-dialog** - Alertas de confirmação

### Formulários
- **react-hook-form** - Gerenciamento de formulários
- **zod** - Validação de schemas
- **@hookform/resolvers** - Integração Zod + React Hook Form

### Internacionalização
- **i18next** - Sistema de i18n
- **react-i18next** - Integração React + i18next

### Feedback Visual
- **sonner** - Toasts/notificações

### Gráficos
- **recharts** - Gráficos e visualizações

### UX Avançado
- **cmdk** - Command Palette (Ctrl/Cmd + K)

### Ícones
- **lucide-react** - Ícones modernos

### Utilitários
- **clsx** - Utilitário para classes CSS
- **tailwind-merge** - Merge de classes Tailwind

---

## 📖 Como Usar

### 1. Framer Motion - Presets de Animação

```tsx
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={fadeInUp}>Content</motion.div>
</motion.div>
```

**Presets disponíveis:**
- `fadeInUp` - Fade in com movimento para cima
- `fadeIn` - Fade in simples
- `scaleIn` - Scale in
- `slideInFromLeft` - Slide da esquerda
- `slideInFromRight` - Slide da direita
- `staggerContainer` - Container com stagger
- `modalVariants` - Variantes para modais
- `backdropVariants` - Variantes para backdrop

### 2. Lenis - Scroll Suave

```tsx
import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";

useEffect(() => {
  const lenis = initLenis();
  return () => {
    destroyLenis();
  };
}, []);
```

**Nota:** Use apenas na landing page, não no dashboard.

### 3. React Hook Form + Zod

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workspaceSchema } from "@/lib/form-schema";

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(workspaceSchema),
});

<form onSubmit={handleSubmit(onSubmit)}>
  <Input {...register("name")} />
  {errors.name && <p>{errors.name.message}</p>}
</form>
```

**Schemas disponíveis:**
- `workspaceSchema` - Validação de workspace
- `serverSchema` - Validação de servidor
- `domainSchema` - Validação de domínio
- `userProfileSchema` - Validação de perfil
- `apiTokenSchema` - Validação de token

### 4. Sonner - Toasts

```tsx
import { toast } from "sonner";

toast.success("Success message");
toast.error("Error message");
toast.info("Info message");
toast.warning("Warning message");
```

**Configurado globalmente** em `main.tsx` com tema dark.

### 5. Recharts - Gráficos

```tsx
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { rechartsDarkTheme, rechartsColors } from "@/lib/recharts-theme";

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Line dataKey="value" stroke={rechartsColors[0]} />
  </LineChart>
</ResponsiveContainer>
```

**Tema:** `rechartsDarkTheme` já configurado com cores do projeto.

### 6. Command Palette (Ctrl/Cmd + K)

```tsx
import { CommandPalette } from "@/components/CommandPalette";

const [commandOpen, setCommandOpen] = useState(false);

<CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
```

**Atalho:** `Ctrl/Cmd + K` para abrir, `Escape` para fechar.

### 7. i18next - Internacionalização

```tsx
import { useTranslation } from "react-i18next";

const { t, i18n } = useTranslation();

<h1>{t("hero.title")}</h1>
<button onClick={() => i18n.changeLanguage("pt")}>PT</button>
```

**Idiomas:** pt, en, es

### 8. Componentes UI (Radix)

Todos os componentes estão em `src/components/ui/`:

- `Dialog` - Modais
- `Tooltip` - Tooltips
- `Popover` - Popovers
- `Tabs` - Tabs
- `Command` - Command Palette
- `Button`, `Input`, `Label`, `Card` - Componentes base

---

## 🎨 Tema e Cores

O projeto usa uma paleta corporativa dark:

- **Background:** `#0B0F17`, `#101827`, `#141C2C`
- **Primary:** `#6D28D9` (roxo)
- **Secondary:** `#8B5CF6` (roxo claro)
- **Accent:** `#22D3EE` (ciano)
- **Text:** `#E5E7EB` (principal), `#9CA3AF` (secundário)
- **Success:** `#4ADE80`
- **Warning:** `#FBBF24`
- **Error:** `#F87171`

---

## 📁 Estrutura de Arquivos

```
src/
├── lib/
│   ├── motion.ts          # Presets Framer Motion
│   ├── lenis.ts           # Configuração Lenis
│   ├── i18n.ts            # Configuração i18next
│   ├── recharts-theme.ts  # Tema Recharts
│   ├── form-schema.ts     # Schemas Zod
│   └── utils.ts           # Utilitários (cn)
├── components/
│   ├── ui/                # Componentes Radix UI
│   └── CommandPalette.tsx # Command Palette
└── pages/
    └── Landing.tsx         # Exemplo Lenis
```

---

## 🚀 Próximos Passos

1. Usar `react-hook-form + zod` em todos os formulários
2. Implementar gráficos com Recharts nas páginas de métricas
3. Adicionar mais comandos ao Command Palette
4. Expandir traduções no i18next
5. Usar Tooltips e Popovers para melhorar UX

---

**Todas as bibliotecas estão instaladas, configuradas e prontas para uso!** 🎉

