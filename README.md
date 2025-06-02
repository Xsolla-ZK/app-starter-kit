# Xsolla ZK App Starter Kit

Welcome to the **Xsolla ZK App Starter Kit** - a comprehensive development template built on top of the [Xsolla ZK UI Design System](https://github.com/Xsolla-ZK/Xsolla-ZK-UI). This starter kit provides a foundation for building cross-platform applications using modern React Native and web technologies with a unified design system.

## 🚀 Key Technologies

- **[Xsolla ZK UI](https://ui-kit.xsollazk.com/)** - Comprehensive design system and component library
- **[Tamagui](https://tamagui.dev/)** - Universal UI system and optimizing compiler
- **[One Stack](https://onestack.dev/)** - Universal React framework for web and native
- **Expo** - Platform for universal React applications
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development

## 📁 Project Structure

```
xsolla-zk-app-starter/
├── app/                          # Application pages (One Stack routing)
├── src/                         # Source code
│   ├── config/                  # Configuration files
│   │   ├── tamagui.config.ts   # Main Tamagui configuration
│   │   ├── components.config.ts # Component configuration
│   │   └── tokens/             # Generated design tokens
├── raw-tokens/                 # Source design tokens from Figma
├── package.json               # Project dependencies and scripts
├── app.json                   # Expo configuration
└── vite.config.ts            # Vite build configuration
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

- Node.js 18+
- pnpm 8+
- Expo CLI (for native development)

### Installation

```bash
# Install dependencies
pnpm install

# Generate design tokens
pnpm generate:tokens
```

### Development Commands

Run your One app in development:

```bash
# Start development server
pnpm dev

# Start with clean cache
pnpm dev:clean

# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

### Design Token Generation

```bash
# Generate tokens from raw-tokens/ to src/config/tokens/
pnpm generate:tokens
```

This command uses `@xsolla-zk/tokens` to:
- Parse raw token files from `raw-tokens/`
- Generate TypeScript token definitions
- Create theme variations (light/dark)
- Generate component-specific tokens

## 🏗 Production

### Web

To build your app for production:

```bash
# Build optimized web bundle
pnpm build:web

# Serve built files
pnpm serve
```

### Native Apps

First, you'll need to generate the native code for your app:

```bash
pnpm prebuild:native
```

Afterward, follow the instructions printed in the terminal to build and upload your app for distribution.

```bash
# Run on iOS
pnpm ios

# Run on Android
pnpm android
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

### Universal Rendering
- **Web**: Static site generation with Vite
- **Native**: React Native with Expo
- **Shared**: Universal components and styling

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
| `pnpm dev:clean` | Start development with clean cache |
| `pnpm build:web` | Build optimized web bundle |
| `pnpm serve` | Serve built files |
| `pnpm prebuild:native` | Generate native project files |
| `pnpm ios` | Run on iOS |
| `pnpm android` | Run on Android |
| `pnpm generate:tokens` | Generate design tokens from Figma exports |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm clean` | Clean build artifacts |

## 🎨 Design System Packages

| Package | Description |
|---------|-------------|
| `@xsolla-zk/react` | React component library |
| `@xsolla-zk/icons` | SVG icon components |
| `@xsolla-zk/config` | Tamagui configuration |
| `@xsolla-zk/tokens` | Design token generator |

## 📖 Resources

- **[Full Documentation](./DOCUMENTATION.md)** - Complete project documentation
- **[Xsolla ZK UI Documentation](https://ui-kit.xsollazk.com/)**
- **[One Stack Documentation](https://onestack.dev/docs/introduction)**
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
