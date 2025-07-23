import { MainLayout } from 'app/layouts/main';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextTamaguiProvider } from '~/providers/next-provider';
import './globals.css';
import 'public/tamagui.css';

export const metadata: Metadata = {
  title: {
    default: 'XSollaZK - App Starter Kit',
    template: '%s - XSollaZK - App Starter Kit',
  },
  description: 'XSollaZK - App Starter Kit description',
  applicationName: 'XSollaZK - App Starter Kit',
  generator: 'Next.js',
  appleWebApp: {
    title: 'XSollaZK - App Starter Kit',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: {
      default: 'XSollaZK - App Starter Kit',
      template: '%s - XSollaZK - App Starter Kit',
    },
    description: 'XSollaZK - App Starter Kit description',
    url: 'https://backpack.xsollazk.com',
    siteName: 'XSollaZK - App Starter Kit',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'XSollaZK - App Starter Kit',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@500..600&display=swap"
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
