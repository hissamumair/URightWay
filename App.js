// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigator from "./src/Navigation/BottomNavigator";
import DiaryStack from "./src/Navigation/DiaryStack/DiaryStack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabs"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiaryStack"
          component={DiaryStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}