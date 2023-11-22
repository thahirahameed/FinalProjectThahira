import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputControl} from '../../components';
import * as yup from 'yup';
import {LocaleHelper} from '../../helper';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Invalid Email')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid Email'),
  password: yup
    .string()
    .required('Firstname is required field')
    .matches(/^(?=.*\d).{6,}$/, 'Invalid Password'),
  firstname: yup
    .string()
    .required('Lastname is required field')
    .matches(/^[A-Za-z]+$/, 'Invalid Name'),
  lastname: yup
    .string()
    .required('Lastname is required field')
    .matches(/^[A-Za-z]+$/, 'Invalid Name'),
});

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignnUpPress = formData => {
    auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View>
      <Text></Text>
      <InputControl
        control={control}
        name={'firstname'}
        placeholder={'First Name'}
        error={errors?.firstname}
      />
      <InputControl
        control={control}
        name={'lastname'}
        placeholder={LocaleHelper.t('Last Name')}
        error={errors?.lastname}
      />
      <InputControl
        control={control}
        name={'email'}
        placeholder={LocaleHelper.t('email')}
        error={errors?.email}
      />
      <InputControl
        control={control}
        name={'password'}
        placeholder={LocaleHelper.t('Password')}
        error={errors?.email}
      />
      <TouchableOpacity
        onPress={handleSubmit(formData => {
          console.log(formData);
          handleSignnUpPress(formData);
        })}
        style={style.buttonStyle}>
        <Text>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  containerStyle: {
    margin: 10,
  },
  inputStyle: {
    backgroundColor: 'lightgrey',
    padding: 10,
    margin: 10,
    height: 40,
  },
  buttonStyle: {
    margin: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  imageBackgroundStyle: {height: 600, width: 'auto'},
});
