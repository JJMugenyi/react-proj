import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated, Text } from "react-native";

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate("Main");
    }, 3000);

    return () => clearTimeout(timer); // this will clear the timeout on component unmount
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Image source={require("../assets/mynd.png")} style={styles.logo} />
        <Text style={styles.betaText}>BETA</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7e8d3",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  betaText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    fontSize: 18, // You can adjust the size as needed
    position: "absolute", // Position absolute to overlay on top of the image
    bottom: 90, // Distance from the bottom of the logo
    right: 0, // Distance from the right of the logo (negative value to move left)
  },
});

export default SplashScreen;
