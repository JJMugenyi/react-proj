// React and React Native imports
import React, { useState } from "react";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import {
  View,
  Text,
  Image,
  Alert,
  Linking,
  TouchableOpacity,
  StyleSheet,
  ActionSheetIOS,
} from "react-native";

// Third-party library imports
import { useNavigation } from "@react-navigation/native";

const handleAppleSignIn = async () => {
  if (!appleAuth.isSupported) {
    Alert.alert(
      "Not Supported",
      "Apple Sign-In is not supported on this device."
    );
    return;
  }

  try {
    // Perform the sign-in request
    const appleAuthResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Use the appleAuthResponse for authentication (e.g., send to backend)
    // For demonstration, navigating to OnboardingScreen directly
    navigation.navigate("Onboard");
  } catch (error) {
    console.error("Error signing in with Apple", error);
    Alert.alert("Error", "There was an error signing in with Apple.");
  }
};

// Icons and Images
const AppleIcon = () => (
  <Image source={require("../assets/apple.png")} style={styles.appleIcon} />
);

const MainOptions = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("");

  // Handlers
  const showActionSheet = () => {
    const options = ["Cancel", "Log in with email", "Sign up with email"];
    const cancelButtonIndex = 0;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        userInterfaceStyle: "light",
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 1:
            setSelectedOption("Log in with email");
            navigation.navigate("Login");
            break;
          case 2:
            setSelectedOption("Sign up with email");
            navigation.navigate("Signup");
            break;
          default:
            break;
        }
      }
    );
  };

  // Component render
  return (
    <View style={styles.container}>
      <Image source={require("../assets/mynd.png")} style={styles.logo} />
      <Image
        source={require("../assets/options.png")}
        style={styles.optionsLogo}
      />
      <Text style={styles.captionText}>Unleash Your Focus.</Text>

      <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignIn}>
        <AppleIcon />
        <Text style={styles.appleButtonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={showActionSheet}>
        <Text style={styles.moreOptionsText}>More sign-in options</Text>
      </TouchableOpacity>

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>
          By continuing you agree to MyndMap's{" "}
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.myndmap.uk")}
        >
          <Text style={[styles.footerText, styles.linkText]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
        <Text style={styles.footerText}> and </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.myndmap.uk")}
        >
          <Text style={[styles.footerText, styles.linkText]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>.</Text>
      </View>
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: "#f7e8d3",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  footerTextContainer: {
    position: "absolute",
    bottom: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },

  // Icons and Images
  appleIcon: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    resizeMode: "contain",
  },

  // Buttons and text styles
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: 20,
    width: "100%",
    justifyContent: "center",
    borderColor: "#1a1a1a",
    borderWidth: 1,
  },
  appleButtonText: {
    color: "#1a1a1a",
    marginLeft: 10,
  },
  moreOptionsText: {
    color: "#1a1a1a",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  footerText: {
    color: "grey",
  },
  linkText: {
    textDecorationLine: "underline",
  },
  optionsLogo: {
    width: "90%", // Adjusted width
    height: undefined,
    aspectRatio: 1, // Keep it square-shaped. Adjust as needed based on the original aspect ratio of the image.
    marginBottom: 30,
    resizeMode: "contain",
  },
  captionText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30,
    paddingBottom: 10,
  },
});

export default MainOptions;
