import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
    .required('Password is required field')
    .matches(/^(?=.*\d).{6,}$/, 'Invalid Password'),
});

const LoginScreen = props => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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

  //Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const handleLoginPress = formData => {
    setEmail(formData.email);
    setPassword(formData.password);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  //  if (initializing) return null;

  return (
    <View style={style.containerStyle}>
      <ImageBackground
        style={style.imageBackgroundStyle}
        source={require('/Users/thahirakadevalappil/Documents/React/FinalProjectThahira/src/images/loginImage2.jpeg')}>
        <View style={{marginTop: 100}}>
          <InputControl
            control={control}
            name={'email'}
            placeholder={LocaleHelper.t('email')}
            error={errors?.email}
          />
          <InputControl
            control={control}
            name={'password'}
            placeholder={LocaleHelper.t('password')}
            error={errors?.password}
          />

          <TouchableOpacity
            onPress={handleSubmit(formData => {
              console.log(formData);
              handleLoginPress(formData);
            })}
            style={style.buttonStyle}>
            <Text>{LocaleHelper.t('login')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('signUpScreen');
            }}
            style={style.buttonStyle}>
            <Text>{LocaleHelper.t('signUp')}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

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
export default LoginScreen;
