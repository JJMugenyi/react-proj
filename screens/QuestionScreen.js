import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import * as Progress from "react-native-progress";
import { useMyndMapScore } from "./MyndMapScoreContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuestionScreen = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0.1);
  const [showModal, setShowModal] = useState(false);

  // Retrieve the MyndMap Score from the context
  const { myndMapScore } = useMyndMapScore();
  const navigation = useNavigation();
  const { setMyndMapScore } = useMyndMapScore();

  const interpretScore = (score) => {
    if (score < 40) {
      return "Your score suggests minimal difficulties in task management and emotional regulation. You seem to be coping well with stressors and maintaining a good balance.";
    } else if (score < 75) {
      return "Your score indicates moderate challenges in managing tasks and emotions. You might occasionally feel overwhelmed and could benefit from strategies to improve focus and emotional control.";
    } else {
      return "Your score points to significant struggles with task management and emotional regulation. It's advisable to seek further assistance in developing coping strategies and possibly professional support.";
    }
  };

  const updateQuestionAndProgress = () => {
    const nextQuestion = currentQuestion + 1;
    const totalQuestions =
      currentSection === 1
        ? impulsivityQuestions.length
        : emotionalDysregulationQuestions.length;

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
      setProgress(
        progress +
          1 /
            (impulsivityQuestions.length +
              emotionalDysregulationQuestions.length)
      );
    } else if (currentSection === 1) {
      setCurrentSection(2);
      setCurrentQuestion(0);
      setProgress(0.5); // Halfway through after completing the first section
    } else {
      setShowModal(true);
    }
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem("myndMapScore", JSON.stringify(score));
    setMyndMapScore(score);
    navigation.navigate("Dashboard");
  };

  // Updated the questions to first person
  const impulsivityQuestions = [
    {
      text: "I immediately switch tasks when I get a new notification.",
      points: 16.6,
    },
    {
      text: "I drop my current activity to check new notifications or tasks.",
      points: 16.6,
    },
    {
      text: "I start new tasks before finishing current ones when notifications come in.",
      points: 16.6,
    },
  ];

  const emotionalDysregulationQuestions = [
    {
      text: "I often feel a sense of panic or stress when I look at my to-do list.",
      points: 16.6,
    },
    {
      text: "Even after finishing a task, I frequently find myself feeling restless or dissatisfied.",
      points: 16.6,
    },
    {
      text: "Receiving a new task or notification typically makes me feel anxious or uneasy.",
      points: 16.6,
    },
  ];

  const handleResponse = (response) => {
    let questionPoints = 0;
    if (currentSection === 1) {
      questionPoints = impulsivityQuestions[currentQuestion].points;
    } else {
      questionPoints = emotionalDysregulationQuestions[currentQuestion].points;
    }

    const updatedScore = score + (response === "yes" ? questionPoints : 0);
    setScore(updatedScore);
    updateQuestionAndProgress();
  };

  const handleNextSection = () => {
    if (currentSection < 2) {
      setCurrentSection(2);
      setCurrentQuestion(0);
      setProgress(0.5);
    } else {
      setShowModal(false); // Hide the modal before navigating
      navigation.navigate("Dashboard");
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Great Job!</Text>
          <Text style={styles.modalText}>Your MyndMap Score is: {score}</Text>
          <Text style={styles.modalText}>{interpretScore(score)}</Text>
          <Button title="Continue" onPress={handleNextSection} />
        </View>
      </Modal>

      {currentSection === 1 && (
        <View>
          <Text style={styles.questionText}>
            {impulsivityQuestions[currentQuestion].text}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleResponse("yes")}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleResponse("no")}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {currentSection === 2 && (
        <View>
          <Text style={styles.questionText}>
            {emotionalDysregulationQuestions[currentQuestion].text}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleResponse("yes")}>
              <Text style={styles.buttonText}>True</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleResponse("no")}>
              <Text style={styles.buttonText}>False</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.progressContainer}>
        <Progress.Bar progress={progress} width={300} color="#1a1a1a" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7e8d3",
    padding: 20,
  },
  instruction: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
  },
  progressContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    height: 50,
    width: "100%",
  },
  modalView: {
    flex: 1, // Use flex to fill the entire screen
    backgroundColor: "#f7e8d3",
    alignItems: "center",
    justifyContent: "center", // Align content in the center
    paddingTop: Platform.OS === "ios" ? 50 : 20, // Adjust for status bar height
    paddingLeft: 20, // Padding from the left edge of the screen
    paddingRight: 20, // Padding from the right edge of the screen
    paddingBottom: 20, // Padding from the bottom edge of the screen
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "black",
    marginBottom: 20,
  },
  buttonText: { color: "#ffffff" },
  button: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 20, // Increased padding for a bigger button
    paddingHorizontal: 40, // Increased padding for a bigger button
    borderRadius: 8, // Slightly more rounded corners
    marginHorizontal: 10, // Space out buttons horizontally
    // width: 'auto',           // If you want the buttons to auto adjust their width
    // Ensure you don't have a fixed width on your buttons to allow them to sit side by side
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    // Add any additional text styling here
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20, // Add some space above the button container
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default QuestionScreen;
