// Minimal main.js - all visualization logic is now in HTML
var workoutStartTime = 0;
var workoutDuration = 0;
var isExerciseActive = false;

// System starts calling this about once per second after the sports app is selected
function evaluate(input, output) {
  if (!isExerciseActive) {
    return;
  }

  // Update current progress
  workoutDuration = input.Duration;
}

// main.js loaded and system starts calling evaluate()
function onLoad(input, output) {
  // Initialize variables
  isExerciseActive = false;
}

// Is evaluated on exercise start
function onExerciseStart(input, output) {
  isExerciseActive = true;
  workoutStartTime = input.Duration;
}

// Is evaluated on exercise pause
function onExercisePause(input, output) {
  isExerciseActive = false;
}

// Is evaluated when continuing exercise after pause
function onExerciseContinue(input, output) {
  isExerciseActive = true;
}

// Is evaluated right before the sports app is removed from memory
function onExerciseEnd(input, output) {
  isExerciseActive = false;
}

// Is evaluated when a user enters the SuuntoPlus sports app screen
function getUserInterface(input, output) {
  return {
    template: 'interval-chart'
  };
}

// Defines the info shown at the bottom of the exercise summary
function getSummaryOutputs(input, output) {
  return [];
}