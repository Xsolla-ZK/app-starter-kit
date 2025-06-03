# Xsolla ZK App Starter Kit

Welcome to the **Xsolla ZK App Starter Kit** - a comprehensive development template built on top of the [Xsolla ZK UI Design System](https://github.com/Xsolla-ZK/Xsolla-ZK-UI). This starter kit provides a foundation for building modern web applications using React and Next.js with a unified design system.

## 🚀 Key Technologies

- **[Xsolla ZK UI](https://ui-kit.xsollazk.com/)** - Comprehensive design system and component library
- **[Tamagui](https://tamagui.dev/)** - Universal UI system and optimizing compiler
- **[Next.js](https://nextjs.org/)** - React framework for production with hybrid static & server rendering
- **TypeScript** - Type-safe JavaScript development

## 📁 Project Structure

```
xsolla-zk-app-starter/
├── app/                          # Application pages (Next.js App Router)
├── src/                         # Source code
│   ├── tamagui/                 # Tamagui configuration
│   │   └── tokens/             # Generated design tokens
├── raw-tokens/                 # Source design tokens from Figma
├── raw-icons/                  # Source icon assets
├── package.json               # Project dependencies and scripts
└── next.config.mjs           # Next.js build configuration
```

## 🎨 Design System Features

### Design Token Pipeline
- **Source**: Design tokens exported from Figma
- **Generated**: TypeScript configurations with semantic naming
- **Themes**: Light and dark theme support
- **Components**: Token-based component system

### Semantic Color System
- **Content**: Text and foreground colors
- **Background**: Surface and container colors
- **Brand**: Primary (green) and secondary (purple) brand colors
- **Semantic**: Success, warning, error, info variations

### Responsive Design
Built-in responsive breakpoints:
- `$sm`: 640px, `$md`: 768px, `$lg`: 1024px, `$xl`: 1280px

## 🛠 Development

### Prerequisites

- Node.js 20+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Generate design tokens
pnpm generate:tokens

# Generate icons (optional)
pnpm generate:icons
```

### Development Commands

Run your Next.js app in development:

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Build and export static files
pnpm export
```

### Asset Generation

```bash
# Generate design tokens from raw-tokens/ to src/tamagui/tokens/
pnpm generate:tokens

# Generate icon components from raw-icons/ to src/icons/
pnpm generate:icons
```

The `generate:tokens` command uses `@xsolla-zk/tokens` to:
- Parse raw token files from `raw-tokens/`
- Generate TypeScript token definitions
- Create theme variations (light/dark)
- Generate component-specific tokens

The `generate:icons` command uses `@xsolla-zk/icons-generator` to:
- Parse SVG files from `raw-icons/`
- Generate optimized React components
- Create barrel exports for tree-shaking

## 🏗 Production

### Web

To build and serve your app for production:

```bash
# Build optimized web bundle
pnpm build

# Start production server
pnpm start

# Build and export static files
pnpm export
```

## 🎯 Quick Start

### Basic Usage

```typescript
import { Button, Text, View } from '@xsolla-zk/react';

export default function HomePage() {
  return (
    <View padding="$400">
      <Text fontSize="$600">Welcome to Xsolla ZK</Text>
      <Button size="$500" onPress={() => console.log('Pressed!')}>
        Get Started
      </Button>
    </View>
  );
}
```

### Component Examples

```typescript
// Design token integration
<Button size="$400" variant="contained">Primary Action</Button>

// Responsive design
<View
  padding="$200"
  $md={{ padding: '$400' }}
  $lg={{ padding: '$600' }}
>
  Responsive Content
</View>

// Theme-aware colors
<Text color="$content.neutral-primary">Themed Text</Text>
```

## 🏗 Architecture Highlights

### Web-First Approach
- **SSG**: Static site generation with Next.js
- **SSR**: Server-side rendering support
- **SPA**: Single-page application routing

### Performance Optimizations
- **Tamagui Compiler**: Static style extraction
- **Tree Shaking**: Unused code elimination
- **Icon Optimization**: Barrel exports for optimal bundling

### Type Safety
- **Design Tokens**: Full TypeScript integration
- **Components**: Type-safe props and variants
- **Themes**: Semantic color typing

## 📚 Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build optimized production bundle |
| `pnpm start` | Start production server |
| `pnpm export` | Build and export static files |
| `pnpm generate:tokens` | Generate design tokens from Figma exports |
| `pnpm generate:icons` | Generate icon components from SVG assets |

## 🎨 Design System Packages

| Package | Description |
|---------|-------------|
| `@xsolla-zk/react` | React component library |
| `@xsolla-zk/icons` | SVG icon components |
| `@xsolla-zk/config` | Tamagui configuration |
| `@xsolla-zk/tokens` | Design token generator |
| `@xsolla-zk/icons-generator` | Icon generation utilities |

## 📖 Resources

- **[Full Documentation](./DOCUMENTATION.md)** - Complete project documentation
- **[Xsolla ZK UI Documentation](https://ui-kit.xsollazk.com/)**
- **[Next.js Documentation](https://nextjs.org/docs)**
- **[Tamagui Documentation](https://tamagui.dev/docs/intro/introduction)**
- **[GitHub Repository](https://github.com/Xsolla-ZK/Xsolla-ZK-UI)**

## 🚦 Best Practices

✅ **Use semantic design tokens**
```typescript
<Text color="$content.neutral-primary">
```

✅ **Leverage responsive props**
```typescript
<View padding="$200" $md={{ padding: '$400' }}>
```

✅ **Follow component variants**
```typescript
<Button size="$400" variant="contained">
```

---

Built with ❤️ using the Xsolla ZK Design System
