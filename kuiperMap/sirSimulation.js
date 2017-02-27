var population = 500;
var percentHealthyWithSymptoms = 0.02;
var initialDiseased = 5;
var days = 500;

var spreadRate = 0.002;
var percentTreated = 0.6;

var healthy = [];
var symptoms = [];
var diseased = [];
var catchDisease = [];
var treat = [];
var cured = [];

healthy[0] = population - initialDiseased;
symptoms[0] = Math.round(percentHealthyWithSymptoms * healthy[0]);
diseased[0] = initialDiseased;
catchDisease[0] = Math.round(spreadRate * symptoms[0] * diseased[0]);
treat[0] = Math.round(percentTreated * diseased[0]);
cured[0] = 0;

console.log(healthy);
console.log(diseased);
console.log(cured);
console.log(symptoms);
console.log(catchDisease);
console.log(treat);

for(var i = 1; i < days; i++) {
  healthy[i] = healthy[i - 1] - catchDisease[i - 1];
  symptoms[i] = Math.round(percentHealthyWithSymptoms * healthy[i]);
  diseased[i] = diseased[i - 1] + catchDisease[i - 1] - treat[i - 1];
  catchDisease[i] = Math.round(spreadRate * symptoms[i] * diseased[i]);
  treat[i] = Math.round(percentTreated * diseased[i]);
  cured[i] = treat[i - 1] + cured[i - 1];
}

console.log(healthy);
console.log(diseased);
console.log(cured);
console.log(symptoms);
console.log(catchDisease);
console.log(treat);

var width = 1250;
var height = 650;

var circles = ['Healthy', 'Symptoms', 'Diseased', 'Catch Disease',
                'Treat', 'Cured']

var r = 0;

var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

var healthyCircle = svg.append('circle')
  .attr('cx', width / 7)
  .attr('cy', height / 2)
  .attr('r', healthy[r] / 3)
  .attr('fill', 'red')
  .attr('fill-opacity', 0.9);

var symptomsCircle = svg.append('circle')
  .attr('cx', 2 * (width / 7))
  .attr('cy', height / 2)
  .attr('r', symptoms[r] / 3)
  .attr('fill', 'green')
  .attr('fill-opacity', 5);

var diseasedCircle = svg.append('circle')
  .attr('cx', 3 * (width / 7))
  .attr('cy', height / 2)
  .attr('r', diseased[r] / 3)
  .attr('fill', 'yellow')
  .attr('fill-opacity', 5);

var catchDiseaseCircle = svg.append('circle')
  .attr('cx', 4 * (width / 7))
  .attr('cy', height / 2)
  .attr('r', catchDisease[r] / 3)
  .attr('fill', 'blue')
  .attr('fill-opacity', 5);

var treatCircle = svg.append('circle')
  .attr('cx', 5 * (width / 7))
  .attr('cy', (height / 2))
  .attr('r', treat[r] / 3)
  .attr('fill', 'orange')
  .attr('fill-opacity', 5);

var curedCircle = svg.append('circle')
  .attr('cx', 6 * (width / 7))
  .attr('cy', (height / 2))
  .attr('r', cured[r] / 3)
  .attr('fill', 'black')
  .attr('fill-opacity', 5);


svg.on('click', function() {
  r++;
  healthyCircle.attr('r', healthy[r] / 3).attr('fill-opacity', healthy[r] / population);
  symptomsCircle.attr('r', symptoms[r] / 3).attr('fill-opacity', symptoms[r] / population);
  catchDiseaseCircle.attr('r', catchDisease[r] / 3).attr('fill-opacity', catchDisease[r] / population);
  treatCircle.attr('r', treat[r] / 3).attr('fill-opacity', treat[r] / population);
  curedCircle.attr('r', cured[r] / 3).attr('fill-opacity', cured[r] / population);

});
