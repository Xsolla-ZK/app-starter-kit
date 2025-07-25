// import { NativeToast } from '@app/ui/src/NativeToast';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { NotificationProvider, NotificationViewport } from 'app/components/notification';
import { CustomSnackBars } from 'app/components/snack-bars';
import { CustomToasts } from 'app/components/toasts';
import { MainLayout } from 'app/layouts/main';
import { Provider } from 'app/provider';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export const unstable_settings = {
  // Ensure that reloading on `/user` keeps a back button present.
  initialRouteName: 'Home',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // const [interLoaded, interError] = useFonts({
  //   'Sharp Grotesk': require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  //   InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  // });

  // useEffect(() => {
  //   setTimeout(() => SplashScreen.hideAsync(), 5000)
  //   if (interLoaded || interError) {
  //     // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
  //     SplashScreen.hideAsync();
  //   }
  // }, [interLoaded, interError]);

  // if (!interLoaded && !interError) {
  //   return null;
  // }

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <NotificationProvider duration={10000} multiple={5}>
            <MainLayout>
              <Stack />
            </MainLayout>
            <CustomToasts />
            {/* <CustomSnackBars />r */}
            <NotificationViewport
              name="toast"
              top="50%"
              left="50%"
              transform={[{ translateX: '-50%' }, { translateY: '-50%' }]}
            />
            {/* <NotificationViewport
              name="snack-bar"
              top="50%"
              left="50%"
              transform={[{ translateX: '-50%' }, { translateY: '-50%' }]}
            /> */}
          </NotificationProvider>
          {/* <NativeToast /> */}
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
