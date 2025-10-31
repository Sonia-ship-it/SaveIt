import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { CustomButton } from './index'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '@/utils/app'
interface Props {
    placeholder: string,
    value: string,
    onChangeText: (text: string)=> void,
}
interface Icons {
    title: string,
    img: string,
}
const images: Record<string, any>= {
    dashboard: require('../assets/icons/dashboard.png'),
    deposit: require('../assets/icons/deposit.png'),
    withdraw: require('../assets/icons/withdraw.png'),
    transaction: require('../assets/icons/transaction.png'),
}
const links ={
    Home: '/dashboard',
    Deposit: '/deposit',
    Withdraw: '/withdraw',
    Transaction: '/transaction'
}
export function CustomIcons({title, img}: Icons) {
    return(
        <Link href={links[title as keyof typeof links] as any}>
        <View  className="flex justify-center items-center space-y-2">
        <Image source={images[img]} />
       <Text className='text-white text-xl font-medium font-second'>{title}</Text>
       </View>
       </Link>
    )
}
export function CustomInput({placeholder, value, onChangeText}: Props) {
    return(
      <View className='relative'>
  <TextInput
  className='border font-second text-white border-first rounded-xl p-4 w-96'
  placeholder={placeholder}
  value={value}
  onChangeText={onChangeText}
  placeholderTextColor="#fff"
  />
   </View>
    )
}
const Withdraw= () => {
    const [amount, setAmount]=useState('');
        const handleWithdraw=async() => {
        const token=await AsyncStorage.getItem('authToken');
        if(!token) {
            Alert.alert("Not logged in");
            return;
        }
        try{
            const response=await fetch(`${API_URL}/auth/deposit`, {
                method:"POST",
                headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${token}`},
                body:  JSON.stringify({amount: parseFloat(amount)})
            })
            const data=await response.json();
            if(response.ok) {
                Alert.alert(data.message);
                setAmount('');
            }
            else {
                Alert.alert(data.message)
            }
        }
        catch(error) {
            console.error(error);
            Alert.alert("Network error", "Could not connect to server");
        }
    }
  return (
    <View className='flex-1 '>
       <View className="flex justify-between flex-row items-start mt-10 ">
            <Image source={require("../assets/icons/cloud.png")}/>
              <Image source={require("../assets/icons/logo.png")}/>
        </View>
        <View className="flex justify-center items-center">
            <Image source={require("../assets/icons/wallet.png")}  style={{ width: 160, height: 160, resizeMode: 'contain' }}/>
        </View>
        <View className="flex justify-center items-center gap-10 mb-10">
          <Text className='font-primary text-first text-4xl'>Withdraw Amount</Text>
          <CustomInput placeholder="Enter Amount" value={amount} onChangeText={setAmount}/>
             <CustomButton title="Withdraw" onPress={handleWithdraw}/>
        </View>
       <View  className="flex flex-row  gap-4 absolute bottom-8 w-full bg-first round justify-center  items-center mx-auto">
            <CustomIcons title="Home" img="dashboard"/>
            <CustomIcons title="Deposit" img="deposit"/>
            <CustomIcons title="Withdraw" img="withdraw"/>
            <CustomIcons title="Transaction" img="transaction" />
       </View>
    </View>
  )
}

export default Withdraw