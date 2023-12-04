import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { openInbox, sendEmail } from "react-native-email-link";

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = () => {
    if (feedback) {
      sendEmail({
        to: "userhelp@myndmap.uk",
        subject: "Feedback for MyndMap!",
        body: feedback,
      }).catch(() => {
        alert("Unable to open email client.");
      });
    } else {
      alert("Please enter your feedback before submitting.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={10}
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
      />
      <Button title="Submit Feedback" onPress={handleFeedbackSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7e8d3",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#1a1a1a",
    padding: 10,
    marginBottom: 20,
    height: 150,
    color: "#1a1a1a",
    backgroundColor: "#FFFFFF", // Setting the input background to white for better visibility
  },
});

export default FeedbackScreen;
