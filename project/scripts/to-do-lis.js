// Function to capitalize the first letter of each activity and fix abbreviations like "TV"
function capitalizeActivity(activity) {
  return activity
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) // Capitalize each word's first letter
    .replace(/\bTv\b/g, "TV"); // Ensure "TV" is correctly capitalized
}

// Function to clean the activity text, removing unwanted phrases and extra punctuation
function cleanActivityText(activity) {
  return activity
    .replace(
      /\b(I'll|I want to|then|after that|and|head to|in the afternoon|later|sometime|plan|by|take|go for a|at|in the evening|a|an)\b/gi,
      ""
    ) // Remove filler words and articles
    .replace(/\b(?:to|from|until|for)\b/gi, "") // Remove connecting words related to time ranges
    .replace(/[.,]/g, "") // Remove extra periods and commas
    .trim() // Remove any remaining leading/trailing whitespace
    .replace(/^[-,\s]+/, "") // Clean up any leading punctuation or spaces
    .replace(/spend some time working on/i, "Work on") // Shorten specific task descriptions
    .replace(/relax watch TV/i, "Relax and Watch TV"); // Simplify "Relax and Watch TV"
}

// Function to handle time ranges (e.g., from 10 AM to 11:30 AM)
function handleTimeRange(match) {
  const timeRange = match.match(
    /(\d{1,2}(:\d{2})?\s*(am|pm))\s*to\s*(\d{1,2}(:\d{2})?\s*(am|pm))/i
  );
  if (timeRange) {
    const startTime = timeRange[1];
    const endTime = timeRange[4];
    return `${startTime} - ${endTime}`;
  }
  return match;
}

// Function to create a task item with checkbox
function createTaskItem(time, activity) {
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";

  const taskText = document.createElement("span");
  taskText.textContent = `${time} - ${activity}`;

  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.className = "delete-button";

  // Add event listener for delete button
  deleteButton.onclick = () => {
      taskItem.remove(); // Remove the task item from the DOM
  };

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(deleteButton); // Append delete button to task item

  return taskItem;
}

// Improved function to generate the schedule from the paragraph (implements prompt instructions)
function generateSchedule(paragraph) {
  const timeActivityRegex = /(\d{1,2}(:\d{2})?\s*(am|pm))(.+?)(?=(\d{1,2}(:\d{2})?\s*(am|pm)|\.|$))/gi;
  const matches = paragraph.match(timeActivityRegex) || [];

  return matches
    .map((match) => {
      // Extract the time (e.g., "7 AM" or "9:30 PM")
      const timeRange = handleTimeRange(match); // Handle time ranges first
      const timeMatch = match.match(/(\d{1,2}(:\d{2})?\s*(am|pm))/i);
      const time =
        timeRange !== match ? timeRange : timeMatch ? timeMatch[0] : "";

      // Extract and clean the associated activity using cleanActivityText, then capitalize it
      let activity = cleanActivityText(match.replace(time, "").trim());

      // Only create a task if the activity is non-empty
      if (activity.length > 0) {
        activity = capitalizeActivity(activity);
        return createTaskItem(time, activity);
      }
    })
    .filter(Boolean); // Filter out any undefined entries
}

// Function to display tasks one by one with a delay
function displayTasksSequentially(taskItems) {
  let i = 0;

  function displayNextTask() {
      if (i < taskItems.length) {
          scheduleOutput.appendChild(taskItems[i]);
          i++;
          setTimeout(displayNextTask, 500); // 500ms delay between each task
      }
  }

  displayNextTask();
}

// DOM Elements and Event Listeners
const messageInput = document.getElementById("messageInput");
const generateButton = document.getElementById("generateButton");
const scheduleOutput = document.getElementById("scheduleOutput");
const titleBar = document.getElementById("titleBar");

// Generate the schedule when the button is clicked
generateButton.addEventListener("click", () => {
  const paragraph = messageInput.value.trim();
  scheduleOutput.innerHTML = ""; // Clear any previous output
  if (paragraph !== "") {
      titleBar.style.display = "flex"; // Show the title bar after generating schedule
      const taskItems = generateSchedule(paragraph); // Generate task items from the input paragraph
      displayTasksSequentially(taskItems); // Display tasks one by one with a delay
  } else {
      scheduleOutput.innerHTML = "<p>Please enter your plan for the day!</p>"; // Error message for empty input
      titleBar.style.display = "none"; // Hide the title bar if no schedule is generated
  }
});

  