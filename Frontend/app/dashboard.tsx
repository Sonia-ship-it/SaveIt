import { View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native';
import React from 'react'
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { API_URL } from '@/utils/app';
interface Transaction {
  type: String;
  amount: number;
  date: String;
  balanceAfter: number;
}
const Dashboard = () => {
  const route=useRouter();
  const [name, setName] = useState('User');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect( () => {
  const fetchUserData = async () => {
 const token = await AsyncStorage.getItem('authToken');
      if(!token) {
        route.push('/login');
        return;
      }
      try {
        const response = await fetch(`${API_URL}/auth/dashboard`, 
          {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data=await response.json();
        if(response.ok) {
          setName(data.fullName);
          setBalance(data.balance);
          setTransactions(data.transactions)
        }
        else {console.error(data.message)}
      }
      catch(error) {
        console.error(error)
      }
  };
  fetchUserData();
}, []);
  return (
    <View>
    <View className="flex justify-between flex-row items-center mt-10 ">
          <Text className='font-medium font-primary text-4xl text-white ms-10'>Hello, {name}!</Text>
        <Image source={require("../assets/icons/logo.png")}/>
      </View>
        <View className="bg-sec mx-6 rounded-xl py-16 px-2">
           <Text className='font-medium font-primary text-4xl text-first absolute top-4 left-5'>Balance</Text>
           <Text className='font-medium font-primary text-4xl text-first absolute bottom-4 right-6'>{balance.toLocaleString()} Frw</Text>
      </View>
      
      <View className='flex flex-row items-center justify-center gap-2 my-8'>
    
      <View className='border border-first round py-4 px-8' >
          <Text className='font-medium text-first font-primary text-3xl' onPress={() => route.push("/deposit")}>Deposit</Text>
      </View>
      
          <View className='border border-first round py-4 px-8' >
          <Text className='font-medium text-first font-primary text-3xl' onPress={() => route.push("/withdraw")}>Withdraw</Text>
          </View>
      </View>
          <View className="flex items-center justify-center mx-auto mb-8">
          <Text className='font-medium font-primary text-4xl text-white'>Transaction history</Text>
      </View>


             {/* <View className="bg-sec mx-6 rounded-xl py-14 px-2 my-6">
           <Text className='font-medium font-primary text-4xl text-first absolute top-4 left-5'>Deposit</Text>
           <Text className='font-light font-second text-xl text-white absolute top-6 right-4'>2025-10-27 12:20</Text>
                 <Text className='font-medium font-primary text-2xl text-first absolute bottom-4 left-5'>Balance:</Text><Text className='font-light font-second text-xl text-white absolute bottom-4 left-28'> 10,000</Text>
           <Text className='font-medium font-primary text-2xl text-first absolute bottom-4 right-20'>Amount: </Text><Text className='font-light font-second text-xl text-white absolute bottom-4 right-2'> 10,000</Text>
      </View> */}


            <ScrollView className="px-4">
        {transactions.length === 0 ? (
          <Text className="text-white text-xl text-center my-6">No transactions yet</Text>
        ) : transactions.map((tx, index) => (
          <View key={index} className="bg-sec rounded-xl py-6 px-4 my-4">
            <Text className='font-medium font-primary text-2xl text-first'>{tx.type}</Text>
            <Text className='font-light font-second text-sm text-white mt-1'>{tx.date}</Text>
            <Text className='font-medium font-primary text-xl text-first mt-2'>Amount: <Text className='font-light text-white'>{tx.amount.toLocaleString()}</Text></Text>
            <Text className='font-medium font-primary text-xl text-first mt-1'>Balance After: <Text className='font-light text-white'>{tx.balanceAfter.toLocaleString()}</Text></Text>
          </View>
        ))}
      </ScrollView>
    


  
      </View>
  )
}

export default Dashboard