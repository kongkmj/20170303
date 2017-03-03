
  var lumi_01 =  {
    type: 'line',
    data: {
    labels: [],
    datasets: [{
      label: "조도",
      backgroundColor: "rgba(38, 185, 154, 0.31)",
      borderColor: "rgba(38, 185, 154, 0.7)",
      pointBorderColor: "rgba(38, 185, 154, 0.7)",
      pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointBorderWidth: 1,
      data: []
    }]
  },
  options:{
    responsive:true,
    scales:{
      yAxes:[{
        ticks:{
          suggestedMax: 1024,
          beginAtZero : true
        },
        display:true
      }]
    }
  }
 };

 var lumi_02 =  {
   type: 'line',
   data: {
   labels: [],
   datasets: [{
     label: "조도",
     backgroundColor: "rgba(38, 185, 154, 0.31)",
     borderColor: "rgba(38, 185, 154, 0.7)",
     pointBorderColor: "rgba(38, 185, 154, 0.7)",
     pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
     pointHoverBackgroundColor: "#fff",
     pointHoverBorderColor: "rgba(220,220,220,1)",
     pointBorderWidth: 1,
     data: []
   }]
 },
 options:{
   responsive:true,
   scales:{
     yAxes:[{
       ticks:{
         suggestedMax: 1024,
         beginAtZero : true
       },
       display:true
     }]
   }
 }
};

function init_charts_lumi() {

    console.log('run_charts  typeof [' + typeof (Chart) + ']');

    if( typeof (Chart) === 'undefined'){ return; }

    console.log('init_charts');


    Chart.defaults.global.legend = {
      enabled: false

    };

  var lumi1 = document.getElementById("lumi01");
  var lumi2 = document.getElementById("lumi02");
  window.lumiLine1 = new Chart(lumi1,lumi_01);
  window.lumiLine2 = new Chart(lumi2,lumi_02);

}
$(document).ready(function() {

 init_charts_lumi();

});


const socket03 = io.connect("http://192.168.0.9:3000");
/**
 * v1 = lumi_01 , b1 = lumi_01-battery ,
 * v2 = lumi_02 , b2 = lumi_02-battery ,
**/
socket03.on('lumi',function (v1,b1,v2,b2) {
  var wtMax= 12; // 그래프 점 갯수
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var second = now.getSeconds();


  // lumi_01
  if(lumi_01.data.datasets.length>0){
    lumi_01.data.labels.push(hour+":"+min+":"+second);

    if(lumi_01.data.labels.length==wtMax){
      $.each(lumi_01.data.datasets,function (i,datasets) {
        lumi_01.data.labels.shift(0,wtMax);
        lumi_01.data.datasets[0].data.shift(0,wtMax-1);
        lumi_01.data.datasets[0].data.push(v1);
      })
    }
    else{
      $.each(lumi_01.data.datasets,function (i,datasets) {
        lumi_01.data.datasets[0].data.push(v1);
      })
    }

    window.lumiLine1.update();
  }

  // lumi_02
  if(lumi_02.data.datasets.length>0){
    lumi_02.data.labels.push(hour+":"+min+":"+second);

    if(lumi_02.data.labels.length==wtMax){
      $.each(lumi_02.data.datasets,function (i,datasets) {
        lumi_02.data.labels.shift(0,wtMax);
        lumi_02.data.datasets[0].data.shift(0,wtMax-1);
        lumi_02.data.datasets[0].data.push(v2);
      })
    }
    else{
      $.each(lumi_02.data.datasets,function (i,datasets) {
        lumi_02.data.datasets[0].data.push(v2);
      })
    }

    window.lumiLine2.update();
  }

});
