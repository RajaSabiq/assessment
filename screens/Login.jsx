import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Snackbar, TextInput } from 'react-native-paper';
import { GlobalStyle } from '../global/stylesheet';
import api from '../utils/api';
import { normalize } from '../utils/responsive';

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [{ visible, message }, setSnapshot] = useState({
    visible: false,
    message: '',
  });
  const [working, setWorking] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('@token');
        if (value !== null) {
          navigation.replace('VehicleList');
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const onPressHandler = () => {
    if (data.username && data.password) {
      setWorking(true);
      api
        .post('auth/login', data)
        .then((res) => {
          setWorking(false);
          setSnapshot({
            visible: true,
            message: 'Login Successfully',
          });
          console.log(res.data);
          AsyncStorage.setItem('@token', res.data?.token)
            .then(() => {
              navigation.navigate('VehicleList');
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          setWorking(false);
          setSnapshot({
            visible: true,
            message: err?.response?.data?.message,
          });
        });
    } else {
      setWorking(false);
      setSnapshot({
        visible: true,
        message: 'Please Provide Email and Password',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={[GlobalStyle.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={[
          GlobalStyle.container,
          { width: '100%', justifyContent: 'center' },
        ]}
      >
        <TextInput
          mode='outlined'
          theme={{
            colors: { primary: '#000', underlineColor: 'transparent' },
          }}
          left={
            <TextInput.Icon name={'email'} size={normalize(24)} color='grey' />
          }
          selectionColor={'#333'}
          style={style.inputStyle}
          placeholder='Email'
          keyboardType='email-address'
          autoCompleteType='email'
          onChangeText={(e) => setData({ ...data, username: e.toLowerCase() })}
        />
        <TextInput
          mode='outlined'
          left={
            <TextInput.Icon name={'lock'} size={normalize(24)} color='grey' />
          }
          theme={{
            colors: { primary: '#000', underlineColor: 'transparent' },
          }}
          selectionColor={'#333'}
          style={style.inputStyle}
          secureTextEntry={visiblePassword}
          right={
            <TextInput.Icon
              name={visiblePassword ? 'eye-off' : 'eye'}
              color='#333'
              size={normalize(20)}
              onPress={() => setVisiblePassword(!visiblePassword)}
            />
          }
          placeholder='Password'
          onChangeText={(e) => setData({ ...data, password: e })}
        />
        <TouchableOpacity
          disabled={working}
          style={[style.buttonStyle, GlobalStyle.shadow]}
          onPress={onPressHandler}
        >
          {working ? (
            <ActivityIndicator animating={true} color='#000' />
          ) : (
            <Text style={style.textColor}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() =>
          setSnapshot({
            visible: false,
            message: '',
          })
        }
      >
        <Text>{message}</Text>
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

export default Login;

const style = StyleSheet.create({
  inputStyle: {
    width: '90%',
    backgroundColor: '#fff',
  },
  buttonStyle: {
    paddingVertical: normalize(12),
    marginTop: normalize(20),
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(120),
    borderRadius: normalize(10),
  },
  textColor: {
    color: '#000',
    fontSize: normalize(14),
    fontWeight: '900',
  },
});
