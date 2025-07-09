import { MainLayout } from 'app/layouts/main';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextTamaguiProvider } from '~/providers/next-provider';
import './globals.css';
import 'public/tamagui.css';

export const metadata: Metadata = {
  title: {
    default: 'AI 3D items generator',
    template: '%s - AI 3D items generator',
  },
  description:
    'Metaverse Junk is AI-generated Digital Items collection where your imagination comes to life. Trade your rare junk on the secondary market, collaborate on items creation drops or just hold your precious junk',
  applicationName: 'AI 3D items generator',
  generator: 'Next.js',
  appleWebApp: {
    title: 'AI 3D items generator',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: {
      default: 'AI 3D items generator',
      template: '%s - AI 3D items generator',
    },
    description:
      'Metaverse Junk is AI-generated Digital Items collection where your imagination comes to life. Trade your rare junk on the secondary market, collaborate on items creation drops or just hold your precious junk',
    url: 'https://item-junk-api.xsollazk.com',
    siteName: 'AI 3D items generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI 3D items generator',
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
      <body>
        <NextTamaguiProvider>
          <MainLayout>{children}</MainLayout>
        </NextTamaguiProvider>
      </body>
    </html>
  );
}
