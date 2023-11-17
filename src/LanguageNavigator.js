import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {LocaleHelper} from './helper';
import {NavigationContainer} from '@react-navigation/native';
import {DashboardScreen} from './screens';
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const LanguageNavigator = props => {
  function CustomDrawerContent() {
    return (
      <DrawerContentScrollView>
        <View>
          <TouchableOpacity
            style={{backgroundColor: 'lightgrey', height: 30, margin: 5}}
            onPress={() => {
              LocaleHelper.locale = 'english';
            }}>
            <Text style={{padding: 5}}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'lightgrey', height: 30, margin: 5}}
            onPress={() => {
              LocaleHelper.locale = 'italian';
            }}>
            <Text style={{padding: 5}}>Italian</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'lightgrey', height: 30, margin: 5}}
            onPress={() => {
              LocaleHelper.locale = 'spanish';
            }}>
            <Text style={{padding: 5}}>Spanish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'lightgrey', height: 30, margin: 5}}
            onPress={() => {
              LocaleHelper.locale = 'french';
            }}>
            <Text style={{padding: 5}}>French</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    );
  }
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 240,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={LocaleHelper.t('languageSelector')}
        component={DashboardScreen}
      />
    </Drawer.Navigator>
  );
};

export default LanguageNavigator;
