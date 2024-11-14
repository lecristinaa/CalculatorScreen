import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignUpScreen from './src/screens/SignUpScreen.jsx'
import LoginScreen from './src/screens/LoginScreen.jsx'
import HomeScreen from './src/screens/HomeScreen.jsx'
import GraphScreen from './src/screens/GraphScreen.jsx'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login"  component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Graph" component={GraphScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
