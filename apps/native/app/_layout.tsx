// import { NativeToast } from '@app/ui/src/NativeToast';

import { config } from '@app/config';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'app/provider';
// import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export const unstable_settings = {
  // Ensure that reloading on `/user` keeps a back button present.
  initialRouteName: 'Home',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function App() {
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider config={config}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <PortalProvider> */}
        <Stack />
        {/* </PortalProvider> */}
        {/* <NativeToast /> */}
      </ThemeProvider>
    </Provider>
  );
}
