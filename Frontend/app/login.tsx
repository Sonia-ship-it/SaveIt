import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/utils/app';
import { CustomButton } from './index';
interface Props {
    placeholder: string,
    value: string,
    onChangeText: (text: string)=> void,
    secure?:boolean
}
export function CustomInput({placeholder, value, onChangeText, secure}: Props) {
    const [press, setPress]=useState(false)
    const [show, setShow]=useState(secure)
    return(
      <View className='relative'>
  <TextInput
  className='border font-second text-white border-first rounded-xl p-4 w-96'
  placeholder={placeholder}
  value={value}
  onChangeText={onChangeText}
  placeholderTextColor="#fff"
   secureTextEntry={show} 
  />
  {
  show && (
    <Ionicons
      name="eye-off" size={24} color="white"  style={{ position: 'absolute', right: 24, top: 14 }} onPress={() => { setPress(true); setShow(false); }}
    />
  )
}
{
  press && (
    <Ionicons name="eye" size={24} color="white" style={{ position: 'absolute', right: 24, top: 14 }} onPress={() => { setShow(true); setPress(false); }}
    />
  )
}
   </View>
    )
}
interface Btn {
    src: string
}
const icons: any={
    google: require("../assets/icons/google.png"),
    facebook: require("../assets/icons/facebook.png"),
    mac: require("../assets/icons/mac.png")
}
export function CustomBtn({src}: Btn) {
    return (
    <TouchableOpacity className='bg-sec rounded-2xl w-20 h-20 flex justify-center items-center'>
           <Image source={icons[src]} className=""/>
    </TouchableOpacity>
    )
}
const Login = () => {
    const [email, setEmail]=useState('');
      const [password, setPassword]=useState('');
      const route=useRouter()
        const { verified, error } = useLocalSearchParams();

  React.useEffect(() => {
    if (verified) Alert.alert("Success", "Your email has been verified. Please log in.");
    if (error) Alert.alert("Error", "Invalid or expired verification link.");
  }, [verified, error]);
      const handleLogin = async() => {
        if(!email || !password) {
          Alert.alert("All fields required");
          return;
        }
        try{
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email,password})
        })
        const data=await response.json();
        if(response.ok) {
         console.log("Login response:", data);
        await AsyncStorage.setItem('authToken', data.token);
        Alert.alert(data.message);
        route.push("/dashboard");
     }
        else{
          Alert.alert(data.message);
        }
      }
      catch(error) {
        console.error(error);
         Alert.alert("Network error", "Could not connect to the server");
      }
      }
  return (
    <View className=''>
       <View className="flex justify-start items-start mt-10">
            <Image source={require("../assets/icons/cloud.png")}/>
        </View>
           <View className="flex justify-center items-center">
          <Image source={require("../assets/icons/logo.png")}/>
        </View>
        <View className="flex justify-center items-center gap-8">
        <Text className='font-primary text-white text-4xl'>Login To Your Account</Text>
          <CustomInput placeholder="Enter your email" value={email} onChangeText={setEmail}/>
             <CustomInput placeholder="Enter your password" value={password} onChangeText={setPassword} secure={true}/>
               <CustomButton title="Login" onPress={handleLogin}/>
        </View>

       
        <View className="flex justify-center items-center my-6">
        <Text className='font-second text-white text-md'> Don't have an account ? 
          <Link href="/register"><Text className='text-first font-primary text-xl'> SignUp</Text></Link>
        </Text>
        </View>
    </View>
  )
}

export default Login