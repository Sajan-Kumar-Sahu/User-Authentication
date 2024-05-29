import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from '../style';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const handleSignup = async (email, password) => {
    try {
      if(email && password){
        const isUserCreated = await auth().createUserWithEmailAndPassword(email,password)
        setEmail('');
        setPassword('');
        await auth().currentUser.sendEmailVerification();
        await  auth().signOut();
        alert('A link has been sent to your email address. Kindly verify your email by clicking the link.')
        navigation.navigate('Login')
      }else {
        Alert.alert('Invalid Input','Enter required Details.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message)
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 40,
          paddingStart: 10,
          color: '#ff006e',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 50,
        }}>
        User SignUp
      </Text>
      <TextInput
        style={styles.textField}
        placeholder="Email ID"
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>
      <TextInput
        style={styles.textField}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)} 
        secureTextEntry={true}></TextInput>
        <Text style={{color:'yellow',fontSize:15}}>{errorMessage}</Text>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => handleSignup(email, password)}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#050b36'}}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
      <Text style={{color:'#dad7cd',fontSize:18}}>Already have an account?  </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login')
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
        Login
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
