import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SearchBar from "./src/components/SearchBar/SearchBar";
import Home from "./src/Screens/HomeScreen/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RedactorScreen from "./src/Screens/Redactor/RedactorScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Redactor" component={RedactorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
