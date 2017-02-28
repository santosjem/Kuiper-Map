var population = 500;
var percentHealthyWithSymptoms = 0.02;
var initialDiseased = 5;
var NUMBER_OF_DAYS = 500;

var spreadRate = 0.02;
var percentTreated = 0.6;

var healthy = [];
var symptoms = [];
var infected = [];
var catchDisease = [];
var treat = [];
var recovered = [];

healthy[0] = population - initialDiseased;
symptoms[0] = Math.round(percentHealthyWithSymptoms * healthy[0]);
infected[0] = initialDiseased;
catchDisease[0] = Math.round(spreadRate * symptoms[0] * infected[0]);
treat[0] = Math.round(percentTreated * infected[0]);
recovered[0] = 0;

var i = 1;
for(i = 1; i < NUMBER_OF_DAYS; i++) {
  healthy[i] = healthy[i - 1] - catchDisease[i - 1];
  symptoms[i] = Math.round(percentHealthyWithSymptoms * healthy[i]);
  infected[i] = infected[i - 1] + catchDisease[i - 1] - treat[i - 1];
  catchDisease[i] = Math.round(spreadRate * symptoms[i] * infected[i]);
  treat[i] = Math.round(percentTreated * infected[i]);
  recovered[i] = treat[i - 1] + recovered[i - 1];
}

console.log(healthy);
console.log(symptoms);
console.log(infected);
console.log(catchDisease);
console.log(treat);
console.log(recovered);
