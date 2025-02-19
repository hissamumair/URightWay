// DiaryStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IslamicDuty from "../../Screens/Home/IslamicDuty";
import BottomNavigator from "../BottomNavigator";
// import TaskManagementApp from "../../Screens/Home/MyDiary";
import MyDiary from "../../Screens/Home/MyDiary";

const Stack = createNativeStackNavigator();

const DiaryStack = () => {
  return (
    <Stack.Navigator>
     
      <Stack.Screen
        name="MyDiary"
        component={MyDiary}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="IslamicDuty"
        component={IslamicDuty}
        options={{ headerShown: false }}
      />
       
     
    </Stack.Navigator>
  );
};

export default DiaryStack;