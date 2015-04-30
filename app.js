var sample = "https://drive.google.com/file/d/0B9sqBvh-3LhvY3R1Nk8yQzFGVlU/edit?usp=sharing";

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 900 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var parseDate = d3.time.format("%x").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(dates); })
    .y(function(d) { return y(d.Activity); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("sample.csv", function(error, data) {
  function unique(arr) {
    var hash = {}, result = [];
    for ( var i = 0, l = arr.length; i < l; ++i ) {
        if ( !hash.hasOwnProperty(arr[i]) ) { //it works with objects! in FF, at least
            hash[ arr[i] ] = true;
            result.push(arr[i]);
        }
    }
    return result;
  }
  dates = [];
  activityPercent = [];

  console.log(data);
  console.log(error);
  data.forEach(function(d) {
    d.Date = +parseDate(d.Date);
    d.Activity = +d.Activity;
    dates.push(d.Date);
    dates = unique(dates);
    activityPercent.push(d.Activity);
  });

  console.log(dates, activityPercent);

  x.domain(d3.extent(data, function(d) { return d.Date; }));
  y.domain(d3.extent(data, function(d) { return d.Activity;}));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Activity");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d.Activity", line);
});


//Old Way
// d3.csv(sample, function (data) {

//   // var dates = [1,2,3,4,5,6,7,8,9,10];
//   var rows = []
//   var dates = rows.map(function(t) { return t.dt; });
//   var formatDate = d3.time.format("%b %d %Y");
//   var canvas = d3.select("body").append("svg");
  
//   // dummy data
//   data.forEach(function(d) {
//         d.activity = +d.activity;
//         d.date = +d.date;
//   });
  

//   data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 7],
//   w = 800,
//   h = 200,
//   margin = 20,
//   y = d3.scale.linear().domain([0, d3.max(data)]).range([0 + margin, h - margin]),
//   x = d3.scale.linear().domain([0, d3.max(data)]).range([0 + margin, w - margin]);
  
//   var vis = d3.select("body")
//     .append("svg:svg")
//     .attr("width", w)
//     .attr("height", h);


//   var g = vis.append("svg:g")
//     .attr("transform", "translate(0, 200)");

//   var line = d3.svg.line()
//     .x(function(d,i) { return x(i); })
//     .y(function(d) { return -1 * y(d); });

//   g.append("svg:path").attr("d", line(data));

//   g.append("svg:line")
//     .attr("x1", x(0))
//     .attr("y1", -1 * y(0))
//     .attr("x2", x(w))
//     .attr("y2", -1 * y(0));
 
//   g.append("svg:line")
//     .attr("x1", x(0))
//     .attr("y1", -1 * y(0))
//     .attr("x2", x(0))
//     .attr("y2", -1 * y(d3.max(data)));

//   g.selectAll(".xLabel")
//     .data(x.ticks(5))
//     .enter().append("svg:text")
//     .attr("class", "xLabel")
//     .text(String)
//     .attr("x", function(d) { return x(d);})
//     .attr("y", 0)
//     .attr("text-anchor", "middle");
 
//   g.selectAll(".yLabel")
//     .data(y.ticks(4))
//     .enter().append("svg:text")
//     .attr("class", "yLabel")
//     .text(String)
//     .attr("x", 0)
//     .attr("y", function(d) { return -1 * y(d);})
//     .attr("text-anchor", "right")
//     .attr("dy", 4);

//   g.selectAll(".xTicks")
//     .data(x.ticks(5))
//     .enter().append("svg:line")
//     .attr("class", "xTicks")
//     .attr("x1", function(d) { return x(d); })
//     .attr("y1", -1 * y(0))
//     .attr("x2", function(d) { return x(d); })
//     .attr("y2", -1 * y(-0.3));
 
//   g.selectAll(".yTicks")
//     .data(y.ticks(4))
//     .enter().append("svg:line")
//     .attr("class", "yTicks")
//     .attr("y1", function(d) { return -1 * y(d); })
//     .attr("x1", x(-0.05))
//     .attr("y2", function(d) { return -1 * y(d); })
//     .attr("x2", x(0));
// });


