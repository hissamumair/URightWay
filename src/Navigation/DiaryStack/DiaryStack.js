// DiaryStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IslamicDuty from "../../Screens/Home/IslamicDuty";

const Stack = createNativeStackNavigator();

const DiaryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IslamicDuty"
        component={IslamicDuty}
        options={{ headerShown: false }}
      />
     
    </Stack.Navigator>
  );
};

export default DiaryStack;