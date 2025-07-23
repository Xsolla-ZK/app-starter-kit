import HomeScreen from 'app/features/home/screen';
import { Stack } from 'expo-router';
import { useRouter } from 'solito/navigation';

export default function Screen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <HomeScreen />
    </>
  );
}
