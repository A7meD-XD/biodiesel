import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform, StatusBar } from 'react-native';
import BottomNavBar from './src/components/BottomNavBar';
import HomeScreen from './src/screens/HomeScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import DriversScreen from './src/screens/DriversScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Drivers" component={DriversScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>

      
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
      
      {/* مساحة حماية لأزرار النظام */}
      <View style={styles.systemButtonsPadding} />
    </View>
  );
}

const styles = {
  systemButtonsPadding: {
    height: Platform.OS === 'android' ? 40 : 0,
    backgroundColor: '#FFFFFF'
  }
};