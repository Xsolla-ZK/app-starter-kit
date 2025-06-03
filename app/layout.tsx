import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { MainLayout } from '~/layouts/main';
import { NextTamaguiProvider } from '~/providers/root-provider';

export const metadata: Metadata = {
  title: {
    default: 'XSolla-ZK - App Starter Kit',
    template: '%s - XSolla-ZK - App Starter Kit',
  },
  description: 'A starter kit for building Next.js applications and Xsolla-ZK UI components.',
  applicationName: 'Xsolla ZK UI',
  generator: 'Next.js',
  appleWebApp: {
    title: 'XSolla-ZK - App Starter Kit',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: {
      default: 'XSolla-ZK - App Starter Kit',
      template: '%s - XSolla-ZK - App Starter Kit',
    },
    description: 'Your toolkit for building seamless, game-centric cross-platform interfaces 🚀',
    url: 'https://ui-kit.xsollazk.com',
    siteName: 'XSolla-ZK - App Starter Kit',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'XSolla-ZK - App Starter Kit',
        type: 'image/png',
      },
    ],
  },
  icons: {
    apple: [
      {
        rel: 'apple-touch-icon',
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/favicon/favicon.ico',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Onest:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextTamaguiProvider>
          <MainLayout>{children}</MainLayout>
        </NextTamaguiProvider>
      </body>
    </html>
  );
}
