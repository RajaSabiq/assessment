import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import MapScreen from './screens/MapScreen';
import VehicleLists from './screens/VehicleLists';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name='Login'
          component={Login}
        />
        <Stack.Screen
          options={{
            title: 'Vehicle Location',
          }}
          name='LiveVehicles'
          component={MapScreen}
        />
        <Stack.Screen
          options={{
            title: 'Vehicle List',
          }}
          name='VehicleList'
          component={VehicleLists}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
