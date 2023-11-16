import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LocaleHelper} from '../../helper';

const LoginScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const handleSignnUpPress = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
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
  const handleLoginPress = () => {
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
    <View>
      <TextInput
        autoCapitalize="none"
        value={email}
        onChangeText={changedText => {
          setEmail(changedText);
        }}
        placeholder={LocaleHelper.t('email')}
        style={{
          backgroundColor: 'lightgrey',
          padding: 10,
          margin: 10,
          height: 40,
        }}
      />
      <TextInput
        value={password}
        onChangeText={changedText => {
          setPassword(changedText);
        }}
        secureTextEntry
        placeholder={LocaleHelper.t('password')}
        style={{
          backgroundColor: 'lightgrey',
          padding: 10,
          margin: 10,
          height: 40,
        }}
      />

      <TouchableOpacity
        onPress={() => {
          handleLoginPress();
        }}
        style={{
          margin: 10,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightblue',
        }}>
        <Text>{LocaleHelper.t('login')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          handleSignnUpPress();
        }}
        style={{
          margin: 10,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightblue',
        }}>
        <Text>{LocaleHelper.t('signUp')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
