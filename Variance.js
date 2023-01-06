// Load the Visualization API and the piechart package.
google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.


//Have button for starting calculation
let inputWR = document.getElementById("win-rate-input");
let inputSTD = document.getElementById("std-input");
let inputH = document.getElementById("hands-input");

//Event Listener

const inputBtn = document.getElementById("bb-button");

//Random Number Generator
function boxMullerTransform() {
    const u1 = Math.random();
    const u2 = Math.random();

    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

    return { z0, z1 };
}

function getNormallyDistributedRandomNumber(mean, stddev) {
    const { z0, _ } = boxMullerTransform();

    return z0 * stddev + mean;
}

//const sample = [];
//sample[0] = 0;

//const mean = 30.0;
//const stddev = 2.0;
//
//for (let i = 0; i < 100000; i += 1) {
//    generatedNumbers.push(getNormallyDistributedRandomNumber(mean, stddev))
//}


//Need to make function to turn sample in to cumulative

//for (let i = 1; i < 100000; i +=1) {
//    sample[i] = sample[i-1] + sample[i]
//}


//console.log(Names)
//function ArrayNames(){
//    for (i = 1; i < 21; i++){
//        Names[i] += "Sim " + i
//        return Names;
//    }
//};


//Function to create arrays for sims
function CreateArrays(numhands, sims){
    SimCollection = [];
    for (let i=0; i < sims; i+=1){
        SimCollection[i]=Array(numhands);
    }
    return SimCollection;
}

inputBtn.addEventListener("click", function(){

    google.charts.setOnLoadCallback(drawChart);
    WR = inputWR.value;
    STD = inputSTD.value;
    HANDS = Number(inputH.value);
    
    WRperhand = WR/100;
    STDperhand = STD/10;

    //This can probably be tidied up in to a function - makes Labels for sims
    Names = [];
    for (i = 0; i < 20; i++) {
        Names[i] = "Sim " + (i + 1)
    };

    //Creates open arrays for sims
    CreateArrays(HANDS, 20);
    
    //Fills arrays with data for sims
    for (i in SimCollection){
        SimCollection[i][0] = 0
        for (j = 1; j < HANDS + 1; j += 1) {
            SimCollection[i][j] = SimCollection[i][j-1] + getNormallyDistributedRandomNumber(WRperhand, STDperhand)
            // for (i in sample) {
            //     sample[i] = sample[i - 1] + sample[i]
        };

    //Now we need to pass data to Google for plotting
    function drawChart(){
        var data = new google.visualization.arrayToDataTable(SimCollection);
        var chart = new google.visualization.LineChart(document.getElementById('variance-chart'));
        chart.draw(data, options);
    };
    console.log(chart)

    }
    ;
    //console.log(sample)
    //for (let i = 1; i < HANDS; i += 1) {
    //    sample[i] = sample[i - 1] + sample[i]
    //}
   
})

//problem is sample array currently staying the same - need to refresh

//variables for wr, std, hands
//function get_inputs(){
//    winrate = document.getElementById('win-rate-input').value;
//    std = document.getElementById('std-input').value;
//    hands = document.getElementById('hands-input').value;
//    //return winrate, std, hands;
//    console.log(winrate);
//}

//how to save as global variables?
//get_inputs()
//console.log(winrate)

//function that runs sim based on inputs above

//function that graphs?
//Google Chart Loading
//google.charts.load('current', { packages: ['corechart'] });

//google.charts.setOnLoadCallback(drawChart);
//how to include header and footer extension in HTML?