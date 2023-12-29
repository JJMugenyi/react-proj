import { StyleSheet, Platform } from "react-native";

const shadowStyles = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
};

export default StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  centeredTaskPrompt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    fontSize: 16,
    color: "#666",
  },
  // Container styles
  container: {
    flex: 1,
    backgroundColor: "#f7e8d3",
    padding: 20,
    paddingTop: 50, // Adjust top padding to make room for back button
  },
  dropdownMenu: {
    position: "absolute",
    right: 10,
    top: 30,
    backgroundColor: "white",
    borderRadius: 5,
    overflow: "hidden",
    // Rest of your styles...
  },
  dropdownMenuItem: {
    padding: 5,
    // Add more styling as needed
  },
  // Adjust the XP text to be at the bottom
  dropdownXPText: {
    position: "absolute",
    bottom: 20, // Position from the bottom of the screen
    fontSize: 16,
    color: "#000",
  },
  importantTaskSuggestion: {
    color: "#666", // Grey color
    fontSize: 14, // Adjust the font size as needed
    padding: 20, // Add padding for spacing
    fontStyle: "italic",
    textAlign: "center",
    // Other styling properties as needed
  },

  ellipsisIcon: {
    position: "absolute",
    left: 10, // Adjust as needed
    zIndex: 1,
    marginRight: 15, // Add right margin for spacing
  },
  deleteSwipeButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70, // You can adjust this width
    height: "100%", // Make the button as tall as the task item
  },
  taskItemContainer: {
    // Original styles for the task item container
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  taskItemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#1a1a1a",
  },
  plusIconContainer: {
    flex: 1, // Add this to allow the container to take up the available space
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 100,
  },
  subtaskInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    color: "#1a1a1a",
  },
  subtaskContainer: {
    backgroundColor: "#1a1a1a", // Set the background color for subtask items
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15, // Add horizontal padding for spacing
    marginVertical: 3, // Add vertical margin for spacing between subtasks
    borderRadius: 5, // Optional: if you want rounded corners
    ...shadowStyles, // Applying shadow for depth (if needed)
  },
  subtaskText: {
    fontSize: 14,
    color: "#f7e8d3",
    flex: 1,
  },
  subtaskCheckbox: {
    marginLeft: 8,
  },
  subtaskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1a1a1a",
    borderRadius: 5,
    padding: 8,
    marginRight: 5,
  },
  taskItemCompleted: {
    // Original styles for completed task item text
  },
  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    width: 80, // Width of the delete button area
    height: "100%", // Make the button as tall as the task item
    // Additional styling if needed
  },
  swipeActionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 120, // Width of the swipe action area
    height: "100%",
  },

  deleteIcon: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    opacity: 0, // Initially hidden
  },

  boldText: {
    fontWeight: "bold", // Make the text bold
    // You can add other styling properties if needed
  },
  // Assuming you want to place the XP and Level display on the right
  rightAlignedContent: {
    position: "absolute",
    right: 20,
    top: Platform.OS === "ios" ? 65 : 20, // Adjust for status bar height
    flexDirection: "row",
    alignItems: "center",
  },
  backAction: {
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    paddingLeft: 10, // Space for the back arrow icon
  },
  deleteAction: {
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    width: 80, // Width of the delete button area
    height: "80%", // Match the height with your task item container height
    borderTopRightRadius: 10, // Assuming a 10px border radius
    borderBottomRightRadius: 10,
  },

  // Section styles
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    ...shadowStyles,
  },

  // Header styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f7e8d3", // Change this to match your app's theme
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 30 : 20, // Adjust this value as needed
    backgroundColor: "#f7e8d3",
  },
  spacer: {
    width: 50, // Adjust this width to match your widest element
  },
  dateHeaderStyle: {
    flex: 1,
    textAlign: "center", // Centers the text horizontally
  },

  // Text styles
  iconLabel: {
    color: "#555",
    fontSize: 14,
    marginLeft: 8,
  },

  subHeader: {
    color: "#1a1a1a",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  userNameText: {
    color: "#1a1a1a",
    fontSize: 18,
    fontWeight: "600",
  },

  versionText: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    right: 10,
    bottom: 40,
    padding: 10, // Add padding for touchable area
  },
  // Add a new style for the back button
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 30, // Adjust based on platform
    left: 20,
    zIndex: 10, // Make sure it's above the other elements
    fontWeight: "bold",
  },

  // Menu styles
  menuItemsContainer: {
    paddingBottom: 10,
  },
  // Styles for the 'Cancel' button if needed
  cancelButton: {
    backgroundColor: "#262626", // Match other button backgrounds
    marginTop: 10, // Provide space above the button
  },
  cancelButtonText: {
    color: "white",
  },

  menuOption: {
    marginVertical: 20, // Increase vertical spacing
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontWeight: "bold",
    width: "100%", // Make the option full width
    alignItems: "flex-start", // Align text to the start
  },

  logoutOption: {
    color: "red",
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuButton: {
    // Styles for the menu button
    width: 50, // Adjust this width to match your widest element
  },
  placeholder: {
    flex: 1,
    // Styles for the center placeholder
  },
  addTaskButton: {
    backgroundColor: "#000", // Black background as seen in the image
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Rounded corners as seen in the image
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Center the text inside the button
    marginTop: 10, // Add some margin at the top
  },
  cancelButton: {
    backgroundColor: "#FF0000", // Red background as seen in the image
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Rounded corners as seen in the image
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Center the text inside the button
    marginTop: 10, // Add some margin at the top
  },
  modalActionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align items to the start (left)
    marginTop: 20,
  },

  // Modal styles
  taskModal: {
    margin: 20,
    backgroundColor: "#ffffff", // Color of the task modal background
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "flex-end",
  },
  sliderContainer: {
    marginVertical: 10,
  },
  slider: {
    width: "100%",
  },
  sliderValue: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },

  fullScreenMenuModal: {
    backgroundColor: "#f7e8d3",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 60 : 30,
    paddingBottom: 30,
    paddingLeft: 20, // Add horizontal padding on the left
    paddingRight: 20, // Add horizontal padding on the right
  },

  menuModal: {
    backgroundColor: "#f7e8d3",
    borderRadius: 10,
    padding: 15,
    width: "80%",
    ...shadowStyles,
  },

  dopamineSliderContainer: {
    marginTop: 20,
  },
  dopamineLabel: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  dopamineSlider: {
    width: "100%",
    height: 40,
  },
  dopamineValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },

  detailsPopup: {
    backgroundColor: "#f7e8d3",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    ...shadowStyles,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10, // Rounded corners
    padding: 30, // Padding inside the modal
    width: "90%", // Modal width
    alignSelf: "center",
    maxHeight: "80%", // Max height of modal
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // White text color
    marginBottom: 15,
    alignSelf: "center",
  },
  modalInput: {
    marginBottom: 15,
    textAlign: "center",
    width: "100%", // Assuming full width is required
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    color: "#f7e8d3", // Text color for input
    backgroundColor: "#262626", // Background color for input
  },

  // Button styles
  addButtonContainer: {
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 30,
    bottom: 60,
    height: 60,
    justifyContent: "center",
    position: "absolute",
    right: 30,
    width: 60,
    zIndex: 0,
    ...shadowStyles,
  },
  priorityButton: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 2,
    marginVertical: 5,
    flexDirection: "row", // Align the icon and text in a row
    alignItems: "center", // Center align items
    justifyContent: "center", // Center justify content
    borderColor: "transparent", // Default border color
  },
  priorityLabel: {
    fontWeight: "bold",
    color: "white", // Header text color
    marginTop: 20, // Add some space above the label
  },
  priorityOptions: {
    flexDirection: "row",
    marginTop: 10,
  },
  priorityButtonActive: {
    borderColor: "blue",
  },
  priorityButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 5, // Space between icon and text
  },
  prioritySelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
    // Add any other necessary styling
  },
  estimatedTimeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",

    // Add any other necessary styling
  },

  priorityText: {
    textAlign: "center",
  },
  deadlineButton: {
    backgroundColor: "#262626", // Match the background to the input field
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    width: "100%", // Match width with input field
  },
  deadlineText: {
    textAlign: "center",
    color: "white",
  },
  deadlineLabel: {
    color: "white",
    fontWeight: "bold",
    marginTop: 20, // Provide space above the label
  },

  actionButton: {
    backgroundColor: "red", // Action button color
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20, // Provide space above the button
  },
  actionButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  // Task item styles
  noTasksPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Adjusted to move it higher up
    marginTop: 0, // You can adjust this margin to control the vertical position
  },
  taskItem: {
    backgroundColor: "#fff", // Set the background color for task items
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10, // Add horizontal padding for spacing
    marginVertical: 5, // Add vertical margin for spacing between items
    borderRadius: 5, // Optional: if you want rounded corners
    ...shadowStyles, // Applying shadow for depth (if needed)
    // Add other styling as required
  },
  taskItemText: {
    flex: 1, // Ensures the text takes up all the space in the row
    color: "#1a1a1a",
    marginLeft: 6,
    fontSize: 14,
  },

  priorityButtonLow: {
    borderColor: "#ADD8E6", // Same as backgroundColor
  },
  priorityButtonMedium: {
    borderColor: "#FFD580", // Same as backgroundColor
  },
  priorityButtonHigh: {
    borderColor: "#FF0000", // Same as backgroundColor
  },

  priorityButtonSelected: {
    borderColor: "transparent", // Change to black for selected
  },
  estimatedTimeButtonLow: {
    // Style for estimated time button with 30 min
    borderColor: "#FFD580", // Same as backgroundColor
  },
  estimatedTimeButtonMedium: {
    // Style for estimated time button with 30 min
    borderColor: "#FFD580", // Same as backgroundColor
  },
  estimatedTimeButtonHigh: {
    // Style for estimated time button with 45 min
    borderColor: "#FF0000", // Same as backgroundColor
  },
  estimatedTimeButtonMajor: {
    // Style for estimated time button with 60 min
    borderColor: "#000", // Same as backgroundColor
  },

  estimatedTimeButtonSelected: {
    // Style for selected estimated time button
    borderColor: "transparent", // Change to black for selected
  },

  taskItemCompleted: {
    // ... other properties
    // Ensure color is set to '#1a1a1a' if you want completed tasks to have the same color
    color: "grey",
    textDecorationLine: "line-through", // if you want strikethrough for completed tasks
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "red",
    width: 80, // Width of the delete button area
    height: "100%", // Match the height of the task item
  },

  incompleteCircle: {
    borderColor: "#000",
    borderRadius: 12,
    borderWidth: 1.5,
    height: 24,
    marginRight: 10,
    width: 24,
  },

  completedCircle: {
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 12,
    height: 24,
    justifyContent: "center",
    marginRight: 10,
    width: 24,
  },
  levelXPContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Aligns the XP and level info to the right
    paddingRight: 10, // Add padding to align with the design
  },
  xpContainerStyle: {
    // Define the size if it's not already defined
    width: 50, // Make sure this matches the width of the menu button
  },

  // Style for the progress bar itself
  circularProgress: {
    // Adjust the size and width to fit your header
    height: 30,
    width: 0,
  },
  xpText: {
    // Any additional styles for the XP text
    marginLeft: 10, // Adds spacing between the level and XP text if they are side by side
  },
  dateContainer: {
    position: "absolute", // Override flex positioning
    left: "50%", // Centered horizontally
    top: "50%", // Centered vertically
    top: Platform.OS === "ios" ? 60 : 20, // Adjusted for iOS status bar
    alignItems: "center", // Center children horizontally
    justifyContent: "center", // Center children vertically
  },
  buttonText: {
    color: "#f7e8d3", // Main background color for the text
    fontWeight: "bold", // Assuming bold text from the image
    fontSize: 16, // Choose an appropriate font size
  },
  cancelButtonText: {
    color: "#FF0000", // Red color for the cancel button text
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20, // Space from the above elements
  },
  addTaskButton: {
    backgroundColor: "transparent", // No background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "transparent", // No background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 90,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 18,
    color: "#666", // Grey color for the placeholder text
    fontStyle: "italic",
  },
});
