
var radius = 74,
padding = 10;

var color = d3.scale.ordinal()
.range(["#F57F17", "#8a89a6", "#84FFFF", "#009688", "#a05d56"]);

var arc = d3.svg.arc()
.outerRadius(radius)
.innerRadius(radius - 30);

var pie = d3.layout.pie()
.sort(null)
.value(function(d) { return d.population; });

d3.csv("starbucks-menu-nutrition-food.csv", function(error, data) {
if (error) throw error;

color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Name" && key !== "Calories"; }));

data.forEach(function(d) {
d.nutrition = color.domain().map(function(name) {
  return {name: name, population: +d[name]};
});
});
var legend = d3.select("body").append("svg")
  .attr("class", "legend")
  .attr("width", radius * 2)
  .attr("height", radius * 2)
  .selectAll("g")
  .data(color.domain().slice().reverse())
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

legend.append("text")
  .attr("x", 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .text(function(d) { return d; });

var svg = d3.select("body").selectAll(".pie")
  .data(data)
  .enter().append("svg")
  .attr("class", "pie")
  .attr("width", radius * 2)
  .attr("height", radius * 2)
  .append("g")
  .attr("transform", "translate(" + radius + "," + radius + ")");

svg.selectAll(".arc")
  .data(function(d) { return pie(d.nutrition); })
  .enter().append("path")
  .attr("class", "arc")
  .attr("d", arc)
  .transition()
  .duration(750)
  .delay(function(d, i) { return i * 300 })
    .style("fill", function(d) { return color(d.data.name); });

svg.append("text")
  .attr("dy", ".35em")
  .style("text-anchor", "middle")
  .text(function(d) { return d.Name; });
});