var svg_width = 1000;
var svg_height = 600;
var margin = 30;
var plot_width = svg_width - 2 * margin;
var plot_height = svg_height - 2 * margin;

var population = 500;
var percentHealthyWithSymptoms = 0.2;
var initialDiseased = 5;
var numberOfDays = 500;

var spreadRate = 0.02;
var percentTreated = 0.7;

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

for(var i = 1; i < numberOfDays; i++) {
  healthy[i] = healthy[i - 1] - catchDisease[i - 1];
  symptoms[i] = Math.round(percentHealthyWithSymptoms * healthy[i]);
  infected[i] = infected[i - 1] + catchDisease[i - 1] - treat[i - 1];
  catchDisease[i] = Math.round(spreadRate * symptoms[i] * infected[i]);
  treat[i] = Math.round(percentTreated * infected[i]);
  recovered[i] = treat[i - 1] + recovered[i - 1];
}

var svg = d3.select('body').append('svg')
            .attr('width', svg_width)
            .attr('height', svg_height);

var xscale = d3.scaleLinear().domain([0, numberOfDays]).range([0, plot_width]);
var yscale = d3.scaleLinear().domain([0, population]).range([plot_height, 0]);
var xaxis = d3.axisBottom(xscale);
var yaxis = d3.axisLeft(yscale);

svg.append('g')
    .attr('transform', 'translate(' + (2 * margin) +  ', ' + (plot_height + margin) + ')')
    .call(xaxis);

svg.append('g')
    .attr('transform', 'translate(' + (2*margin) + ', ' + margin + ')')
    .call(yaxis);
