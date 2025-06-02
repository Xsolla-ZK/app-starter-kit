import '@tamagui/polyfill-dev';
import '@xsolla-zk/react/reset.css';
import '~/tamagui.css';
// import './_layout.css';

import { SchemeProvider } from '@vxrn/color-scheme';
import { LoadProgressBar, Slot, useServerHeadInsertion } from 'one';
import { RootProvider } from '../src/providers/root-provider';
import { MainLayout } from '~/layouts/main';
import '~/config/components.config';

/**
 * The root _layout.tsx filters <html /> and <body /> out on native
 */

export default function Layout() {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.svg" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Onest:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />

        <title>XSolla-ZK - App Starter Kit</title>
      </head>

      <body>
        <LoadProgressBar />

        <SchemeProvider>
          <RootProvider>
            <MainLayout>
              <Slot />
            </MainLayout>
          </RootProvider>
        </SchemeProvider>
      </body>
    </html>
  );
}
