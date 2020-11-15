const socket = io();
let counter = 2;

socket.on('serial:data', function(dataSerial){
    console.log(dataSerial);
    myChart.data.labels.push(counter);
    myChart.data.datasets.forEach(dataset => {
        dataset.data.push(dataSerial.value);
    });
    counter = counter +2;
    myChart.update();
});

var ctx = document.getElementById('meugrafico').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Serial'],
        datasets: [{
            label: 'Serial',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});