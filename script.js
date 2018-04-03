
// map
var width = 900;
var height = 600;

var projection = d3.geo.mercator();

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("class", 'map')
    .attr("height", height);
var path = d3.geo.path()
    .projection(projection);
var g = svg.append("g");

d3.json("world.json", function(error, topology) {
    g.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
});

d3.csv("population.csv", function(error, data) {
  const populationUnder1k = data.filter(function(d) {
    return d.population < 1000 && d.population > 0
  })
  populationUnder1k.sort(function(a, b) {
    return a.population - b.population 
  })
  const circle = g.selectAll("circle")
     .data(populationUnder1k)
     .enter()
     .append("circle")
     .style('opacity', 0.1)
     .transition()
      .delay(function(d, i) {
        return i * 80 
      })
     .attr("data-country-code", function(d) {
             return d['country code']
     })
     .attr('class', function(d) {
      return 'show-circle-' + d['country code']
     })
     .attr("cx", function(d) {
             return projection([Number(d.longitude), Number(d.latitude)])[0];
     })
     .attr("cy", function(d) {
             return projection([Number(d.longitude), Number(d.latitude)])[1];
     })
     .style('opacity', 1)
     .attr("r", 10)
     .attr("stroke", "black")
     .attr("stroke-width", "3")
     .style("fill", "black");

  circle.on("click", function(d) {
    var t = d3.select(this).attr("data-country-code");
    d3.selectAll(`circle`).style('fill','black');
    d3.select(this).style('fill','red');
    d3.selectAll(`rect`).style('fill','black');
    d3.select(`.show-chart-${t}`).style('fill','red');
  })

  circle.on("mouseover", function(d) {
    var t = d3.select(this).attr("data-country-code");
    d3.selectAll(`circle`).style('fill','black');
    d3.select(this).style('fill','red');
    d3.selectAll(`rect`).style('fill','black');
    d3.select(`.show-chart-${t}`).style('fill','red');
  })
})

const chartSvg = d3.select('#chartArea').append('svg').attr('width', '100%').attr('height', 300).style('background', '#cacaca')
  
d3.csv('population.csv', function(data) {
  const populationUnder1k = data.filter(function(d) {
    return d.population < 1000 && d.population > 0
  })
  populationUnder1k.sort(function(a, b) {
    return a.population - b.population 
  })
  const rectChart = chartSvg.selectAll('rect')
    .data(populationUnder1k)
    .enter()
    .append('rect')
    .attr('class', function(d) {
      return 'show-chart-' + d['country code']
    })
    .attr('data-country-code', function(d) {
      return d['country code']
    })
    .attr('x', function(d, i) {
       return i * 100
    })
    .attr('y', function(d) {
      let height = d.population / 1000 * 300
      let y = 300 - height
      return  0
    })
    .attr('width', 35)

  rectChart.transition()
    .delay(function(d, i) {
      return i * 80
    })
    .attr('y', function(d) {
      let height = d.population / 1000 * 300
      let y = 300 - height
      return  y    
    })
    .attr('height', function(d) {
      let height = (d.population / 1000) * 300
      return height
    })
    .attr("stroke", "black")
    .attr("stroke-width", "3")
    .attr('fill', 'black')

  rectChart.on("mouseover", function(d) {
    var t = d3.select(this).attr("data-country-code");
    d3.selectAll(`rect`).style('fill','black');
    d3.select(this).style('fill','red');
    d3.selectAll(`circle`).style('fill','black');
    d3.select(`.show-circle-${t}`).style('fill','red');
  })

    chartSvg.selectAll('text')
      .data(populationUnder1k)
      .enter()
      .append('text')
      .text(function(d) {
        return `${d.name.substr(0, 5)}.. | ${d.population}`; // d = links, you can access it just like any json object
      })
      .transition()
      .delay(function(d, i) {
        return i * 80 
      })
      .attr("x", function(d, i) {
       return i * 103
      })
      .attr("y", function(d) {
        let height = d.population / 1000 * 300
        let y = 300 - height
        return  y - 10
      })
      .attr("font-size", "13px")
      .attr("fill", "white")
      .attr("text-anchor", "middle");
})

