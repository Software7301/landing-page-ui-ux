# 🎨 Design System - CorsiHub Landing Page

## 📐 PALETA DE CORES ENTERPRISE

### Cores Principais

#### Backgrounds (Hierarquia de Profundidade)
```
--bg-primary: #0A0A0F        // Background principal (quase preto)
--bg-secondary: #0F0F15      // Cards, containers
--bg-tertiary: #14141F       // Hover states, elevações
--bg-elevated: #1A1A25       // Modais, dropdowns
```

#### Texto (Hierarquia Visual)
```
--text-primary: #F8F9FA      // Títulos principais, texto crítico
--text-secondary: #E4E7EB    // Subtítulos, texto importante
--text-tertiary: #9CA3AF     // Texto secundário, labels
--text-muted: #6B7280        // Texto desabilitado, hints
```

#### Acentos (Roxo Controlado)
```
--accent-primary: #7C3AED    // CTAs principais, links ativos
--accent-hover: #8B5CF6      // Hover em acentos
--accent-light: #A78BFA      // Ícones, badges sutis
--accent-glow: rgba(124, 58, 237, 0.15)  // Glows sutis
```

#### Bordas e Divisores
```
--border-primary: rgba(124, 58, 237, 0.12)    // Bordas padrão
--border-hover: rgba(124, 58, 237, 0.25)      // Bordas hover
--border-active: rgba(124, 58, 237, 0.4)       // Bordas ativas
```

#### Estados
```
--success: #10B981           // Sucesso, confirmações
--warning: #F59E0B           // Avisos
--error: #EF4444             // Erros
--info: #3B82F6              // Informações (usar com moderação)
```

---

## 🎯 TOKENS TAILWIND

```javascript
// tailwind.config.js (ou usar classes diretas)
colors: {
  // Backgrounds
  'bg-primary': '#0A0A0F',
  'bg-secondary': '#0F0F15',
  'bg-tertiary': '#14141F',
  'bg-elevated': '#1A1A25',
  
  // Text
  'text-primary': '#F8F9FA',
  'text-secondary': '#E4E7EB',
  'text-tertiary': '#9CA3AF',
  'text-muted': '#6B7280',
  
  // Accents
  'accent-primary': '#7C3AED',
  'accent-hover': '#8B5CF6',
  'accent-light': '#A78BFA',
  
  // Borders
  'border-primary': 'rgba(124, 58, 237, 0.12)',
  'border-hover': 'rgba(124, 58, 237, 0.25)',
  'border-active': 'rgba(124, 58, 237, 0.4)',
}
```

---

## 📋 ESPECIFICAÇÕES POR SEÇÃO

### 1. Hero Section
**Objetivo:** Impacto imediato, clareza na mensagem

**Tipografia:**
- Título: `text-5xl md:text-6xl lg:text-7xl font-bold` (não semibold)
- Subtítulo: `text-xl md:text-2xl text-text-secondary`
- CTA: `text-base font-semibold`

**Espaçamento:**
- Container: `py-32 md:py-40`
- Gap entre elementos: `space-y-8`
- Padding lateral: `px-6 md:px-8`

**Background:**
- Gradiente sutil: `bg-gradient-to-b from-[#0A0A0F] via-[#0F0F15] to-[#0A0A0F]`
- Glow mínimo: `bg-accent-primary/5 blur-3xl` (posicionado estrategicamente)

**CTA Button:**
- Base: `bg-accent-primary hover:bg-accent-hover`
- Shadow: `hover:shadow-xl hover:shadow-accent-primary/20`
- Transição: `transition-all duration-300 ease-out`

---

### 2. Features Section
**Objetivo:** Clareza, escaneabilidade

**Cards:**
- Background: `bg-bg-secondary`
- Border: `border border-border-primary hover:border-border-hover`
- Padding: `p-8`
- Hover: `hover:bg-bg-tertiary hover:shadow-lg hover:shadow-accent-primary/10`
- Transição: `transition-all duration-300`

**Ícones:**
- Container: `bg-bg-primary border border-border-primary`
- Ícone: `text-accent-primary`
- Hover: `group-hover:bg-accent-primary/10 group-hover:border-border-hover`

---

### 3. CTA Section
**Objetivo:** Conversão, destaque do CTA

**Container:**
- Background: `bg-bg-secondary`
- Border: `border border-border-primary`
- Glow sutil: `bg-accent-primary/5 blur-3xl` (centro)

**CTA Button:**
- Tamanho: `px-10 h-14`
- Background: `bg-accent-primary hover:bg-accent-hover`
- Shadow: `hover:shadow-2xl hover:shadow-accent-primary/30`
- Text: `text-text-primary font-semibold text-lg`

---

### 4. Header/Navigation
**Objetivo:** Profissional, discreto

**Background:**
- Base: `bg-bg-primary/95 backdrop-blur-xl`
- Scrolled: `bg-bg-primary/98 border-b border-border-primary`

**Links:**
- Inativo: `text-text-tertiary hover:text-text-secondary`
- Ativo: `text-text-primary bg-bg-secondary border border-border-active`

---

## 🎬 ANIMAÇÕES REFINADAS

### Princípios
1. **Suavidade:** Easing `[0.16, 1, 0.3, 1]` (ease-out-cubic)
2. **Duração:** 300-400ms para interações, 600-800ms para entradas
3. **Stagger:** 80-100ms entre elementos
4. **Microinterações:** Hover com scale 1.02-1.05, nunca exagerado

### Variantes Framer Motion

```typescript
// Container padrão
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Item padrão
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Hover sutil
const hoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    }
  },
};
```

---

## 📐 HIERARQUIA TIPOGRÁFICA

```
H1 (Hero):      text-5xl md:text-6xl lg:text-7xl font-bold
H2 (Sections):  text-4xl md:text-5xl font-bold
H3 (Cards):     text-xl md:text-2xl font-semibold
Body Large:     text-lg text-text-secondary
Body:           text-base text-text-secondary
Body Small:     text-sm text-text-tertiary
Caption:        text-xs text-text-muted
```

---

## ✅ CHECKLIST DE APLICAÇÃO

- [ ] Atualizar paleta de cores no `index.css`
- [ ] Refinar Hero section (tipografia, espaçamento)
- [ ] Atualizar FeatureCards (cores, bordas)
- [ ] Melhorar CTA section (destaque)
- [ ] Refinar Header (profissional)
- [ ] Ajustar animações (suavizar)
- [ ] Revisar todas as seções (coerência)
- [ ] Testar responsividade
- [ ] Validar contraste (WCAG AA)

