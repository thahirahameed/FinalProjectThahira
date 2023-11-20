import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LocaleHelper} from '../../helper';

const DashboardScreen = props => {
  const [user, setUser] = useState('');
  const [initializing, setInitializing] = useState(true);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLogoutPress = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={style.containerStyle}>
      <ImageBackground
        style={style.imageBackgroundStyle}
        source={require('/Users/thahirakadevalappil/Documents/React/FinalProjectThahira/src/images/loginImage1.png')}>
        <TouchableOpacity
          onPress={() => {
            handleLogoutPress();
          }}
          style={style.buttonStyle}>
          <Text>{LocaleHelper.t('logout')}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    margin: 10,
  },
  buttonStyle: {
    margin: 10,
    height: 40,
    marginTop: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  imageBackgroundStyle: {flex: 1, height: 600, width: 'auto'},
});

export default DashboardScreen;
