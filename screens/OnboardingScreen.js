import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  // States & Refs
  const [activePage, setActivePage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Constants
  const colors = ["#FFFFFF", "#FFFFFF", "#f7e8d3"];

  // Interpolations
  const backgroundColor = scrollX.interpolate({
    inputRange: colors.map((_, i) => i * Dimensions.get("window").width),
    outputRange: colors,
  });

  // Handlers
  const handleChange = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / Dimensions.get("window").width);
    setActivePage(page);
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={handleChange}
        scrollEventThrottle={16}
      >
        {renderPages()}
      </ScrollView>
      <View style={styles.dots}>
        {colors.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: activePage === i ? "#1a1a1a" : "transparent",
              },
            ]}
          />
        ))}
      </View>
    </Animated.View>
  );

  function renderPages() {
    const pageData = [
      {
        title: "Welcome to MyndMap!",
        text: "Create, manage your tasks with ease - all in one place!",
      },
      {
        title: "Prioritize in Style.",
        text: "Keep track of your progress with our XP system - the more you complete, the more XP you earn!",
      },
      {
        title: "Get Started!",
        text: "First off, we need to figure out your MyndMap Score.",
      },
    ];

    return pageData.map((data, index) => (
      <View key={index} style={styles.page}>
        {index === 0 && (
          <Image
            source={require("../assets/onboard.png")}
            style={styles.onboardImage}
            resizeMode="contain"
          />
        )}
        {index === 1 && (
          <Image
            source={require("../assets/onboard2.png")}
            style={styles.onboardImage}
          />
        )}
        {index === 2 && (
          <Image
            source={require("../assets/onboard3.png")}
            style={styles.onboardImage}
          />
        )}
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.text}>{data.text}</Text>
        {index === 2 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert(
                "Proceed to Assessment?",
                "Would you like to continue to the assessment?",
                [
                  {
                    text: "No",
                    onPress: () => {
                      Alert.alert(
                        "",
                        "You can complete your assessment at any time.",
                        [
                          {
                            text: "OK",
                            onPress: () => navigation.navigate("Dashboard"),
                          },
                        ]
                      );
                    },
                  },
                  {
                    text: "Yes",
                    onPress: () => navigation.navigate("Explanation"),
                  },
                ]
              );
            }}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    ));
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: Dimensions.get("window").width,
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "#1a1a1a",
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  buttonText: {
    color: "#ffffff",
  },
  dots: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#1a1a1a",
  },
  onboardImage: {
    width: "100%",
    height: "60%",
    marginBottom: 20,
    resizeMode: "contain",
  },
  skipButton: {
    position: "absolute",
    top: 30,
    right: 20,
    paddingTop: 30,
    zIndex: 1,
  },
  skipButtonText: {
    color: "grey",
    fontSize: 16,
  },
});

export default OnboardingScreen;
