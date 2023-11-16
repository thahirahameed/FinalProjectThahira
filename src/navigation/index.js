import React, {useState, useEffect} from 'react';
import {Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {LocaleHelper} from '../helper';
import {LoginScreen, DashboardScreen} from '../screens';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  const getMainStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen
          name="dashboardScreen"
          component={DashboardScreen}
          options={{
            title: 'Dashboard Screen',
            headerRight: () => (
              <Button
                onPress={() => {}}
                title={LocaleHelper.t('home')}
                color="red"
              />
            ),
          }}
        />
      </Stack.Group>
    );
  };

  const getLoginStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen
          name="loginScreen"
          component={LoginScreen}
          options={{title: 'Login Screen'}}
        />
      </Stack.Group>
    );
  };

  return (
    <Stack.Navigator>
      {isUserLoggedIn() ? getMainStack() : getLoginStack()}
    </Stack.Navigator>
  );
};

export default Navigator;