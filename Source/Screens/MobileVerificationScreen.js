import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import styles from '../style';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const MobileVerificationScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [inputOTP, setInputOTP] = useState('');
  const [confirmData, setConfirmData] = useState('');
  const [visible, setVisible] = useState(false);

  const sendOTP = async () => {
    try {
      if (mobileNumber) {
        const number = '+91' + mobileNumber;
        const response = await auth().signInWithPhoneNumber(number);
        setConfirmData(response);
        console.log(response);
        setVisible(true);
        Alert.alert(
          'Verify OTP',
          'An OTP has been send to your mobile number.Please verify OTP to proceed',
        );
      } else {
        Alert.alert('Invalid Input', 'Please provide a valid phone number.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitOTP = async () => {
    try {
    } catch (error) {
      console.error(error);
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
        Mobile Verification
      </Text>
      <TextInput
        style={styles.textField}
        placeholder="Mobile"
        value={mobileNumber}
        onChangeText={text => {
          setMobileNumber(text);
        }}></TextInput>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          backgroundColor: '#CAD5E2',
          marginHorizontal: 150,
          borderRadius: 50,
          paddingVertical: 8,
          marginTop: 10,
        }}
        onPress={() => sendOTP()}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#050b36'}}>
          Send OTP
        </Text>
      </TouchableOpacity>
      {visible ? (
        <View>
          <TextInput
            style={{
              fontSize: 20,
              marginTop: 30,
              margin: 10,
              borderWidth: 3,
              borderColor: '#ff006e',
              borderRadius: 6,
              paddingStart: 8,
            }}
            placeholder="Enter OTP"
            value={inputOTP}
            onChangeText={text => {
              setInputOTP(text);
            }}></TextInput>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#CAD5E2',
              marginHorizontal: 150,
              borderRadius: 50,
              paddingVertical: 8,
              marginTop: 10,
            }}
            onPress={() => submitOTP()}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#050b36'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default MobileVerificationScreen;
