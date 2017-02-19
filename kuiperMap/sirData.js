var population = 790000;
var transmissionRate = 0.000001;
var recoveryRate = 0.3333;
var days = 100;

var susceptiblePopulation = [];
var infectedPopulation = [];
var recoveredPopulation = [];

var infected = 5;
var susceptible = population - infected;
var recovered = population - infected - susceptible;

susceptiblePopulation[0] = susceptible;
infectedPopulation[0] = infected;
recoveredPopulation[0] = 0;

var i;

for(i = 1; i < days; i++) {
  susceptiblePopulation[i] = susceptible -
                              susceptible * infected * transmissionRate;
  susceptible = susceptiblePopulation[i];

  infectedPopulation[i] = infected + susceptible * infected * transmissionRate
                          - infected * recoveryRate;
  infected = infectedPopulation[i];

  recoveredPopulation[i] = recovered + infected * recoveryRate;
  recovered = recoveredPopulation[i];
}

console.log(susceptiblePopulation);
console.log(infectedPopulation);
console.log(recoveredPopulation);
