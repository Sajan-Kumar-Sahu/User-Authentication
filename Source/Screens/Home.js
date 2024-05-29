import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Auth from '@react-native-firebase/auth'
import { StackActions, useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#050b36',
      }}>
      <Text style={{fontSize: 30, color: '#ff006e', fontWeight: 'bold'}}>
        Welcome !!
      </Text>
      <View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#ff006e',
            marginHorizontal: 100,
            borderRadius: 50,
            paddingVertical: 10,
            paddingHorizontal:20,
            marginTop: 20,
          }}
          onPress={async()=>{
            await Auth().signOut();
            navigation.dispatch(StackActions.replace("Login"));
          }}
          >
          <Text style={{fontSize: 22, fontWeight: 'bold', color: '#050b36'}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
