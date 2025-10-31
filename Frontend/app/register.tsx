import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CustomButton } from './index';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { API_URL } from '@/utils/app';

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
  />  {
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
const Register = () => {
const [email, setEmail]=useState('');
const [name, setName]=useState('');
const [password, setPassword]=useState('');
const route=useRouter();
const handleRegister = async() => {
  if(!email || !password || !name) {
    Alert.alert("All fields are required");
    return;
  }
  try {
    
    const response=await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({fullName: name,email,password}),
    });
  const data=await response.json();
  if(response.ok) {
    Alert.alert(data.message);
    route.push('/login')
  }
  else {
   Alert.alert(data.message,"Failed to open");
  }
  }
  catch(error) {
    console.error(error);
    Alert.alert("Network error", "Could not connect to the server")
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
        <View className="flex justify-center items-center gap-6">
          <Text className='font-primary text-white text-4xl'>Create Your Account</Text>
            <CustomInput placeholder="Enter your names" value={name} onChangeText={setName}/>
          <CustomInput placeholder="Enter your email" value={email} onChangeText={setEmail}/>
             <CustomInput placeholder="Enter your password" value={password} onChangeText={setPassword} secure={true}/>
             <CustomButton title="Register" onPress={handleRegister}/>
        </View>
       
       
     
         <View className="flex justify-center items-center my-4">
          <Text className='font-second text-white text-md'> Already have an account ? 
          <Text className='text-first font-primary text-xl' onPress={() => route.push("/login")}> Login</Text>
          </Text>
        </View>
    </View>
  )
}

export default Register