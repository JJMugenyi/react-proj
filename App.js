import React, { useState, useEffect, useRef, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, Easing } from "react-native";
import MainOptions from "./screens/MainOptions";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import SplashScreen from "./screens/SplashScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import ForgotPasswordScreen from "./screens/ForgotPassword";
import OnboardingScreen from "./screens/OnboardingScreen";
import TaskAlgorithm from "./screens/TaskAlgorithm";
import QuestionScreen from "./screens/QuestionScreen";
import ExplanationScreen from "./screens/ExplanationScreen";
import { MyndMapScoreProvider } from "./screens/MyndMapScoreContext";
import NotificationHandler from "./screens/NotificationHandler";
import * as Notifications from "expo-notifications";

export const UserDataContext = createContext();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);

  const navigationRef = useRef(null);

  useEffect(() => {
    // Fetching XP and Level from AsyncStorage
    const initializeUserData = async () => {
      const xp = await AsyncStorage.getItem("userXP");
      const level = await AsyncStorage.getItem("userLevel");
      setUserXP(xp ? JSON.parse(xp) : 0);
      setUserLevel(level ? JSON.parse(level) : 1);
    };

    initializeUserData();

    setTimeout(() => {
      if (navigationRef.current) {
        navigationRef.current.navigate(isAuthenticated ? "Dashboard" : "Main");
      }
      setLoading(false);
    }, 3000);
  }, []);

  const screens = [
    { name: "Splash", component: SplashScreen },
    { name: "Main", component: MainOptions },
    { name: "Login", component: LoginScreen },
    { name: "Signup", component: SignupScreen },
    { name: "Dashboard", component: DashboardScreen },
    { name: "Profile", component: ProfileScreen },
    { name: "Settings", component: SettingsScreen },
    { name: "Feedback", component: FeedbackScreen },
    { name: "ForgotPassword", component: ForgotPasswordScreen },
    { name: "Onboard", component: OnboardingScreen },
    // Adding the new screens to the array
    { name: "Question", component: QuestionScreen },
    { name: "Explanation", component: ExplanationScreen },
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <UserDataContext.Provider
        value={{ userXP, setUserXP, userLevel, setUserLevel }}
      >
        <MyndMapScoreProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName={"Splash"}
              screenOptions={{
                transitionSpec: {
                  open: {
                    animation: "timing",
                    config: {
                      duration: 150,
                      easing: Easing.inOut(Easing.ease),
                    },
                  },
                  close: {
                    animation: "timing",
                    config: {
                      duration: 150,
                      easing: Easing.inOut(Easing.ease),
                    },
                  },
                },
                cardStyleInterpolator: ({ current }) => ({
                  cardStyle: {
                    opacity: current.progress, // Fade transition
                  },
                }),
                headerShown: false,
              }}
            >
              {screens.map((screen) => (
                <Stack.Screen
                  key={screen.name}
                  name={screen.name}
                  component={screen.component}
                />
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </MyndMapScoreProvider>
        <NotificationHandler />
      </UserDataContext.Provider>
    </>
  );
}
