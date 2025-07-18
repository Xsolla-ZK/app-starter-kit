# Xsolla ZK - App Starter Kit

This is a **Turborepo monorepo** with the following structure:

### Apps
- **`apps/native/`** - React Native application with Expo Router (iOS/Android)
- **`apps/web/`** - Next.js web application (main frontend)

### Packages
- **`packages/app/`** - Core application components and business logic
- **`packages/config/`** - Tamagui configuration and design tokens
- **`packages/icons/`** - SVG icon components
- **`packages/ui/`** - Reusable UI components based on @xsolla-zk/react (modals, toasts, etc.)
- **`packages/utils/`** - Utility functions
- **`packages/typescript-config/`** - Shared TypeScript configurations

## 🛠️ Tech Stack

### Cross-Platform Development
- **Solito** - Navigation between React Native and Next.js
- **Expo Router** - File-based routing with type safety
- **Tamagui** - Universal UI system

### Frontend (UI)
- **@xsolla-zk/react** - Xsolla ZK React UI components
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **React Native Web** - React Native support in web

### Mobile Development
- **Expo SDK 53** - React Native development platform
- **React Native** - Mobile development framework
- **Expo Dev Client** - Custom development environment

### Development Tools
- **Turborepo** - Monorepo build system
- **Biome** - Code linting and formatting
- **Yarn 4.9.2** - Package manager
- **Docker** - Containerization

## 📦 Installation

### Prerequisites
- Node.js >= 20.11.0
- Yarn 4.9.2
- Docker (optional, for containerized deployment)
- Expo CLI (for mobile development)
- iOS Simulator / Android Studio (for mobile development)

### Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:Xsolla-ZK/app-starter-kit.git
   cd app-starter-kit
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**

   **Web application:**
   ```bash
   yarn web
   ```
   The application will be available at `http://localhost:3000`

   **Native application:**
   ```bash
   yarn native
   ```

## 🚀 Available Scripts

### Web Development
- `yarn web` - Start web app in development mode
- `yarn web:extract` - Start with design token extraction enabled
- `yarn web:prod` - Build web app for production
- `yarn web:prod:start` - Start production build

### Mobile Development
- `yarn native` - Start Expo Dev Server
- `yarn ios` - Start iOS simulator (macOS)
- `yarn android` - Start Android emulator
- `yarn native:prebuild` - Prebuild native files

### General Commands
- `yarn build` - Build all packages (excluding web)
- `yarn lint` - Run Biome linter
- `yarn lint:fix` - Fix linting issues automatically

## 📱 Mobile Development

### Expo Configuration
The native application uses Expo with the following features:
- **Expo Router** - File-based routing with type safety
- **Expo Dev Client** - Custom development environment
- **Universal platforms** - iOS, Android, Web

### Running on Devices

**iOS (requires macOS):**
```bash
yarn ios
```

**Android:**
```bash
yarn android
```

**QR code for physical devices:**
```bash
yarn native
# Scan QR code in Expo Go app
```

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t app-starter-kit .
```

### Run Container
```bash
docker run -p 3000:3000 app-starter-kit
```

**Note:** Docker configuration is optimized for web application only.

## 🏗️ Project Structure Details

```
app-starter-kit/
├── apps/
│   ├── native/                 # Expo React Native application
│   │   ├── app/               # Expo Router pages
│   │   ├── assets/            # Static resources (icons, splash)
│   │   ├── app.json           # Expo configuration
│   │   └── scripts/           # Build scripts
│   └── web/                   # Next.js web application
│       ├── app/               # App Router pages
│       ├── src/               # Source code
│       └── public/            # Static assets
├── packages/
│   ├── app/                   # Core application logic
│   │   ├── components/        # React components
│   │   ├── features/          # Feature-specific code
│   │   ├── layouts/           # Page layouts
│   │   └── provider/          # Context providers
│   ├── config/               # Tamagui configuration
│   │   ├── src/              # Configuration source
│   │   └── raw-tokens/       # Design tokens
│   ├── icons/                # SVG icon components
│   ├── ui/                   # Reusable UI components
│   ├── utils/                # Utility functions
│   └── typescript-config/    # Shared TypeScript configurations
├── biome.json                # Biome configuration
├── turbo.json                # Turborepo configuration
├── package.json              # Root package.json
└── Dockerfile               # Docker configuration
```

## 🔄 Development Workflow

1. **Making Changes**: Edit files in relevant packages
2. **Building**: Run `yarn build` to build all packages
3. **Testing**:
   - Web: `yarn web`
   - Mobile: `yarn native`
4. **Linting**: Run `yarn lint:fix` before committing

### Cross-Platform Development
Thanks to **Solito**, navigation and component code can be shared between web and mobile platforms:
- Shared components in `packages/app/`
- Platform-specific logic in respective applications
- Unified design system through Tamagui

## 🌐 Deployment

### Production Build (Web)
```bash
yarn web:prod
yarn web:prod:start
```

### Docker Production
```bash
docker build -t app-starter-kit .
docker run -p 3000:3000 app-starter-kit
```

### Mobile Deployment
```bash
# Prebuild native files
yarn native:prebuild

# Build for iOS (requires macOS and Xcode)
yarn ios

# Build for Android
yarn android
```

## ⚙️ Configuration

### Biome
The project uses Biome for linting and formatting with strict rules:
- TypeScript strict typing
- React hooks validation
- Automatic import fixing
- Consistent code formatting

### Tamagui
Universal design system with:
- Cross-platform components
- Design tokens
- Theming (light/dark themes)
- Performance optimization

## 🔗 Related Links

- [XSolla-ZK UI KIT](https://ui-kit.xsollazk.com)
- [Tamagui Documentation](https://tamagui.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev)
- [Solito Documentation](https://solito.dev)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Biome Documentation](https://biomejs.dev)
- [Xsolla ZK Explorer](https://x.la/explorer)

## 🐛 Troubleshooting

### Common Issues

**Metro bundler errors:**
```bash
yarn native --clear-cache
```

**TypeScript errors:**
```bash
yarn build
```

**Xcode environment (iOS):**
```bash
cd apps/native && yarn fix-xcode-env
```

**Docker issues:**
Make sure you have sufficient Docker resources (RAM >= 4GB)

### Debugging
- Web application: Use React DevTools
- Native: Use Expo DevTools and React Native Debugger
