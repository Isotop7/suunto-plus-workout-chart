// Live chart data is subscribed in interval-chart.html ($.subscribe in onActivate),
// so the lifecycle callbacks below are empty stubs kept for the ESW contract.

// main.js loaded and system starts calling evaluate()
function onLoad(input, output) {
}

// System starts calling this about once per second after the sports app is selected
function evaluate(input, output) {
}

// Is evaluated on exercise start
function onExerciseStart(input, output) {
}

// Is evaluated on exercise pause
function onExercisePause(input, output) {
}

// Is evaluated when continuing exercise after pause
function onExerciseContinue(input, output) {
}

// Is evaluated right before the sports app is removed from memory
function onExerciseEnd(input, output) {
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
