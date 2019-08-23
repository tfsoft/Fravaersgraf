  var plotData;

  var plotMax = 35;
  var greenBox = 10;
  var yellowBox = 15;
  var greenColor = '#008000';
  var yellowColor = '#FFA500';
  var redColor = '#8B0000';

  function calcStyle (dataTable, rowNum) {
    var style = "";
    var f = dataTable.getValue(rowNum, 0);
    var s = dataTable.getValue(rowNum, 1);
    var x = Math.max(f, s);

    style = "color: " + (x < greenBox ? greenColor : (x < yellowBox ? yellowColor : (redColor)));

    if (s > plotMax) {style = "point {fill-color: " + redColor + "; shape-type: triangle; size: 8}";}
    if (f > plotMax) {style = "point {fill-color: " + redColor + "; shape-type: triangle; size: 8; shape-rotation: 90;}";}
    if (f > plotMax && s > plotMax) {
      angle = Math.atan((f - plotMax) / (s - plotMax)) * 180/Math.PI
      style = "point {fill-color: " + redColor + "; shape-type: triangle; size: 8; shape-rotation: "+Math.round(angle)+";}";
    }

    return style;
  }

  function maxX (dataTable, rowNum) {
    x = dataTable.getValue(rowNum, 0);
    y = dataTable.getValue(rowNum, 1);
    shift = 0;

    if (x > plotMax && y > plotMax) {
      if (x > y) {shift = 0;}
      else{shift = 1 - (x - plotMax) / (y - plotMax);}
    }

    return x < plotMax ? x : (plotMax - shift);
  }
  function maxY (dataTable, rowNum) {
    x = dataTable.getValue(rowNum, 0);
    y = dataTable.getValue(rowNum, 1);
    shift = 0;

    if (x > plotMax && y > plotMax) {
      if (y > x) {shift = 0;}
      else {shift = 1 - (y - plotMax) / (x - plotMax);}
    }

    return y < plotMax ? y : (plotMax - shift);
  }


  function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn({"type":'number', "role":'domain'});
    data.addColumn({"type":'number', "role":'data'});
    data.addColumn({"type":'string', "role":'tooltip'});
    data.addRows(plotData);

    var view = new google.visualization.DataView(data);
    view.setColumns([{calc: maxX, type:'number', role:'domain'}, {calc: maxY, type:'number', role:'data'}, 2, {calc: calcStyle, type: 'string', role: 'style'}]);

    var options = {
      "title": 'Klassefravær',
      "hAxis": {
        "title": 'Fysisk fravær i %',
        "viewWindowMode": 'explicit',
        "viewWindow": {
          "max": 0,
          "min": plotMax
        },
        "ticks": [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
      },
      "vAxis": {
        "title": 'Skriftlig fravær i %',
        "viewWindowMode": 'explicit',
        "viewWindow": {
          "max": 0,
          "min": plotMax
        },
        "ticks": [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
      },
      "legend": 'none'
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

    chart.draw(view, options);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('chart_div').style.height = "500px";
    document.getElementById('chart_div').style.width = "500px";

    chrome.tabs.executeScript(null, {file: 'content_script.js'},
      function(result) {
        plotData = result[0];
      }
    );

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
  });
