import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from '../style';
import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const handleLogin = async (email, password) => {
    try {
      if (email && password) {
        const isLogin = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        setEmail('');
        setPassword('');
        setErrorMessage('');
        if(isLogin.user.emailVerified){
          navigation.dispatch(StackActions.replace('Home'));
        }else{
          Alert.alert('Verification Required','Kindly verify your email. If link not received click RESEND to get the link')
          await auth().currentUser.sendEmailVerification()
          await auth().signOut();
        }
      } else {
        Alert.alert('Invalid Input', 'Enter required Details.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
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
        User Login
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
      <Text style={{color: 'yellow', fontSize: 15}}>{errorMessage}</Text>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => handleLogin(email, password)}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#050b36'}}>
          Login
        </Text>
      </TouchableOpacity>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        <Text style={{color: '#dad7cd', fontSize: 18}}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
