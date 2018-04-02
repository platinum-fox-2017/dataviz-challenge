d3.csv('human_development.csv', country => {
  let twenty = country.slice(0,20)
  console.log(twenty)
  var n = 2, // The number of series.
    m = twenty.length; // The number of values per series.

var xz = d3.range(m),
    yz = d3.range(n).map(function(d,i) {return data(m,i); }),
    y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz)),
    yMax = d3.max(yz, function(y) { return d3.max(y); }),
    y1Max = d3.max(y01z, function(y) { return d3.max(y, function(d) { return d[1]; }); });
    console.log('masssukk')
    console.log(y01z)
    console.log(yMax)
    console.log(y1Max)

var svg = d3.select("svg"),
    margin = {top: 40, right: 10, bottom: 20, left: 10},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .domain(xz)
    .rangeRound([0, width])
    .padding(0.5);

var y = d3.scaleLinear()
    .domain([0, y1Max])
    .range([height, 0]);

var color = d3.scaleOrdinal()
    .domain(d3.range(n))
    .range(d3.schemeCategory20c);

var series = g.selectAll(".series")
  .data(y01z)
  .enter().append("g")
    .attr("fill", function(d, i) { return color(i); });

var rect = series.selectAll("rect")
  .data(function(d) { return d; })
  .enter().append("rect")
    .attr("x", function(d, i) { return x(i); })
    .attr("y", height)
    .attr("width", x.bandwidth())
    .attr("height", 0);

rect.transition()
    .delay(function(d, i) { return i * 10; })
    .attr("y", function(d) {return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); });

// svg.selectAll('name')
//     .data(twenty)
//     .enter()
//     .append('text')
//     .attr('class', 'name')
//     .attr('x', (r, i) => {
//     return i * 10
// })

// .text((r) => {
//   console.log(r)
//   return r.Country
// })  

g.append("g")
  .attr("class", "axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x)
      .tickSize(0)
      .tickPadding(5));

d3.selectAll("input")
    .on("change", changed);

var timeout = d3.timeout(function() {
  d3.select("input[value=\"grouped\"]")
      .property("checked", true)
      .dispatch("change");
}, 2000);

function changed() {
  timeout.stop();
  if (this.value === "grouped") transitionGrouped();
  else transitionStacked();
}

function transitionGrouped() {
  y.domain([0, yMax]);
  rect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 10; })
      .attr("x", function(d, i) {
        return x(i) + x.bandwidth() / n * this.parentNode.__data__.key; })
      .attr("width", x.bandwidth() / n)
      .transition()
      .attr("y", function(d) { return y(d[1] - d[0]); })
      .attr("height", function(d) { return y(0) - y(d[1] - d[0]); });
}

function transitionStacked() {
  y.domain([0, y1Max]);

  rect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 10; })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .transition()
      .attr("x", function(d, i) { return x(i); })
      .attr("width", x.bandwidth());
}

function data(m,i) {
  var values = []
  if (i === 0 ){
    for(let i = 0; i < m ; i++){
      values.push(`${twenty[i]['Expected Years of Education']}`)
    }
  }else if(i === 1){
    for(let i = 0; i < m ; i++){
      values.push(`${twenty[i]['Mean Years of Education']}`)
    }
  }
  return values;
}

})