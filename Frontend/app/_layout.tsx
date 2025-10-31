
import { Stack } from "expo-router";
import { useFonts, Jost_500Medium } from '@expo-google-fonts/jost';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Jost_500Medium,
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000000" }, 
      }}
    />
  );
}
