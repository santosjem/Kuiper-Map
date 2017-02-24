var unitedStatesPopulation = 500;
var canadaPopulation = 400;
var mexicoPopulation = 300;

var percentHealthyWithSymptoms = 0.02;
var initialDiseased = 5;

var spreadRate = 0.2;
var percentTreated = 0.8;

/* var place = [population,
                healthy,
                symptoms,
                diseased,
                catchDisease,
                treat,
                cured];
                */

var unitedStates = [unitedStatesPopulation,
  unitedStatesPopulation - initialDiseased, //healthy
  percentHealthyWithSymptoms * unitedStatesPopulation, //symtoms
  initialDiseased, //diseased
  Math.round(spreadRate * (percentHealthyWithSymptoms *
    unitedStatesPopulation) * initialDiseased), //catchDisease
  Math.round(percentTreated * initialDiseased), //treat
  0]; //cured
var canada = [canadaPopulation,0,0,0,0,0,0];
var mexico = [mexicoPopulation,0,0,0,0,0,0];

function updateHealthy(d) { return d[1] - d[4]; }
function updateSymptoms(d) {
  return Math.round(percentHealthyWithSymptoms * d[1]);
}
function updateDiseased(d) { return d[3] + d[4] - d[5]; }
function updateCatchDisease(d) {
  return Math.round(spreadRate * d[2] * d[3]);
}
function updateTreat(d) { return Math.round(percentTreated * d[3]);}
function updateCured(d) { return d[5] + d[6];}

/* Order to which these should be called:
1. updateHealthy
2. updateSymptoms
3. updateDiseased
4. updateCatchDisease
5. updateCured
6. updateTreat
*/

var getHealthy = function(d) { return d[1];}
var getSymptoms = function(d) { return d[2];}
var getDiseased = function(d) { return d[3];}
var getCatchDisease = function(d) { return d[4];}
var getCured = function(d) { return d[5];}
var getTreat = function(d) { return d[6];}
var update = function(d) {
  d[1] = updateHealthy(d);
  d[2] = updateSymptoms(d);
  d[3] = updateDiseased(d);
  d[4] = updateCatchDisease(d);
  d[5] = updateCured(d);
  d[6] = updateTreat(d);
}

var width = 1250;
var height = 650;

var circles = ['Healthy', 'Symptoms', 'Diseased', 'Catch Disease',
                'Treat', 'Cured']

//var button = d3.button()
//  .on('press', update(unitedStates), update(canada), update(mexico));
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

console.log(unitedStates);

var UShealthyCircle = svg.append('circle')
  .attr('cx', width / 7)
  .attr('cy', height / 2)
  .attr('r', unitedStates[1] / 3)
  .attr('fill', 'red')
  .attr('opacity', 0.9);


var USsymptomsCircle = svg.append('circle')
  .attr('cx', 2 * (width / 7))
  .attr('cy', height / 2)
  .attr('r', unitedStates[2] / 3)
  .attr('fill', 'green')
  .attr('opacity', 1);

var USdiseasedCircle = svg.append('circle')
  .attr('cx', 3 * (width / 7))
  .attr('cy', height / 2)
  .attr('r', unitedStates[3] / 3)
  .attr('fill', 'yellow')
  .attr('opacity', 1);

var UScatchDiseaseCircle = svg.append('circle')
  .attr('cx', 4 * (width / 7))
  .attr('cy', height / 2)
  .attr('r', unitedStates[4] / 3)
  .attr('fill', 'blue')
  .attr('opacity', 1);

var UStreatCircle = svg.append('circle')
  .attr('cx', 5 * (width / 7))
  .attr('cy', (height / 2))
  .attr('r', unitedStates[5] / 3)
  .attr('fill', 'orange')
  .attr('opacity', 1);

var UScuredCircle = svg.append('circle')
  .attr('cx', 6 * (width / 7))
  .attr('cy', (height / 2))
  .attr('r', unitedStates[6] / 3)
  .attr('fill', 'black')
  .attr('opacity', 1);


svg.on('click', function() {
  update(unitedStates);
  UShealthyCircle.attr('r', unitedStates[1] / 3).attr('fill-opacity', unitedStates[1] / unitedStatesPopulation);
  USsymptomsCircle.attr('r', unitedStates[2] / 3).attr('fill-opacity', unitedStates[2] / unitedStatesPopulation);
  USdiseasedCircle.attr('r', unitedStates[3] / 3).attr('fill-opacity', unitedStates[3] / unitedStatesPopulation);
  UScatchDiseaseCircle.attr('r', unitedStates[4] / 3).attr('fill-opacity', unitedStates[4] / unitedStatesPopulation);
  UStreatCircle.attr('r', unitedStates[5] / 3).attr('fill-opacity', unitedStates[5] / unitedStatesPopulation);
  UScuredCircle.attr('r', unitedStates[6] / 3).attr('fill-opacity', unitedStates[6] / unitedStatesPopulation);
  console.log(unitedStates);

});
