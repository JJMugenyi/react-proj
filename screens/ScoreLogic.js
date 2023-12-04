// ScoreLogic.js

// Function to calculate score based on response
export const calculateScore = (
  currentSection,
  currentQuestion,
  response,
  impulsivityQuestions,
  emotionalDysregulationQuestions
) => {
  let questionPoints = 0;

  if (currentSection === 1) {
    questionPoints =
      response === "yes"
        ? impulsivityQuestions[currentQuestion].points
        : -impulsivityQuestions[currentQuestion].points;
  } else if (currentSection === 2) {
    questionPoints =
      response === "yes"
        ? emotionalDysregulationQuestions[currentQuestion].score
        : 0;
  }

  // Modify here to fit your scoring algorithm
  return questionPoints;
};

// Function to calculate the overall progress
export const calculateProgress = (
  currentSection,
  currentQuestion,
  totalQuestions
) => {
  let progress = (currentQuestion + 1) / totalQuestions;

  if (currentSection === 1) {
    progress *= 0.5; // First half of the assessment
  } else {
    progress = 0.5 + progress * 0.5; // Second half of the assessment
  }

  return progress;
};
