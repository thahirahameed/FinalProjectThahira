import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation';
import {UserContextProvider} from './src/contexts/UserContext';

function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;
