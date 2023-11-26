import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import firebase from '@react-native-firebase/app';
import firestore, {collection, addDoc} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputControl} from '../../components';
import * as yup from 'yup';
import {LocaleHelper} from '../../helper';
import {useUserContext} from '../../contexts/UserContext';

const db = firestore();

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Invalid Email')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid Email'),
  password: yup
    .string()
    .required('Password is a required field')
    .matches(/^(?=.*\d).{6,}$/, 'Invalid Password'),
  firstname: yup
    .string()
    .required('First Name is required field')
    .matches(/^[A-Za-z]+$/, 'Invalid Name'),
  lastname: yup
    .string()
    .required('Last Name is a required field')
    .matches(/^[A-Za-z]+$/, 'Invalid Name'),
});

export default function SignUpScreen(props) {
  const [user, setUser] = useState('');
  const [initializing, setInitializing] = useState(true);

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

  const {
    state: {userId},
    actions: {setUserId},
  } = useUserContext();

  //Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleSignUpPress = formData => {
    addData(formData);
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

  const addData = async formData => {
    try {
      const userProfile = firestore().collection('UserProfile');
      await userProfile.add({
        firstName: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        age: '23',
        gender: 'female',
        author: 'Thahira',
        userColor: 'red',
        userLocation: 'London, UK',
        userId: userId,
      });
      console.log('Added data to firestore successfully');
    } catch (e) {
      console.error('Error adding data to firestore: ', e);
    }
  };

  return (
    <View style={style.containerStyle}>
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
          handleSignUpPress(formData);
          props.navigation.navigate('dashboardScreen');
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
    borderColor: 'red',
    borderWidth: 5,
    padding: 10,
  },
  buttonStyle: {
    margin: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
});
