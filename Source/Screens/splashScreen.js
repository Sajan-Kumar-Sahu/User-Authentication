import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      const unSubscribe = await Auth().onAuthStateChanged(user => {
        const routeName = user !== null ? 'Home' : 'Login';
        unSubscribe();
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>splashScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
