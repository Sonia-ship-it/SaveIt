import { View, Image, Platform, TouchableOpacity, Text } from "react-native";
import { Link, useRouter } from "expo-router";
import { links } from "@/app/deposit";
import { useEffect } from "react";
import { useFonts, Jost_400Regular, Jost_500Medium, Jost_700Bold } from '@expo-google-fonts/jost';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

interface Props {
  title: String,
  onPress?: () => void,
}
export function CustomButton({title, onPress}: Props) {
  const route=useRouter();
  return(
    
    <TouchableOpacity className="bg-first round py-4 px-16" onPress={onPress? onPress:() => route.push("/register")}>
      <Text className="font-medium text-white font-primary text-3xl">{title}</Text> 
    </TouchableOpacity>
  )
}
export default function HomeScreen() {
    const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = "Home | SaveIt"; 
    }
  }, []);
  return (
    <View className="flex justify-between gap-24">
    <View className="flex justify-start items-start mt-10">
        <Image source={require("../assets/icons/cloud.png")}/>
    </View>
      <View className="flex justify-center items-center mb-20">
        <Image source={require("../assets/icons/lgo.png")} className=""  />
    </View>
       <View className="flex  justify-center items-center">
        <Text className="text-first text-6xl font-semibold">Welcome</Text>
        <Text className="text-white text-lg mb-8">Save wisely with SaveIt</Text>
        <CustomButton title="Get Started"/>
    </View>
    </View>
  );
}
