import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
    <View style={style.containerStyle}>
      <ImageBackground
        style={style.imageBackgroundStyle}
        source={require('/Users/thahirakadevalappil/Documents/React/FinalProjectThahira/src/images/loginImage2.jpeg')}>
        <View style={{marginTop: 100}}>
          <TextInput
            autoCapitalize="none"
            value={email}
            onChangeText={changedText => {
              setEmail(changedText);
            }}
            placeholder={LocaleHelper.t('email')}
            style={style.inputStyle}
          />
          <TextInput
            value={password}
            onChangeText={changedText => {
              setPassword(changedText);
            }}
            secureTextEntry
            placeholder={LocaleHelper.t('password')}
            style={style.inputStyle}
          />
          <TouchableOpacity
            onPress={() => {
              handleLoginPress();
            }}
            style={style.buttonStyle}>
            <Text>{LocaleHelper.t('login')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleSignnUpPress();
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
