import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LocaleHelper} from '../../helper';

const DashboardScreen = props => {
  const [user, setUser] = useState('');
  const [initializing, setInitializing] = useState(true);

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
    <View>
      <TouchableOpacity
        onPress={() => {
          handleLogoutPress();
          //props.navigation.navigate('loginScreen');
        }}
        style={{
          marginHorizontal: 10,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightblue',
        }}>
        <Text>{LocaleHelper.t('logout')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
