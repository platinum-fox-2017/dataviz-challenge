var margin = {top: 50, right: 50, bottom: 50, left: 50}
var width = 900 - margin.left - margin.right
var height = 600 - margin.top - margin.bottom

var svg = d3.select('#visualization').append('svg')
.attr('width', width + margin.left + margin.right)
.attr('height', height + margin.top + margin.bottom)
.append('g')
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var x = d3.scaleBand()
.range([0, width])

var y = d3.scaleLinear()
          .range([height, 0])

d3.csv('20 Forbes Top2000 2017.csv', function(error, data) {
  console.log(data)

  data.forEach(function(d){
    d.Assets = +d.Assets
  })

  x.domain(data.map(function(d){
    return d.Company
  }))
  y.domain([0, d3.max(data, function(d){
    return d.Assets
  })])

  svg.selectAll('.bar')
     .data(data)
     .enter().append('rect')
     .attr('class', 'bar')
     .attr('x', function(d) {return x(d.Company)})
     .attr('width', x.bandwidth())
     .attr('y', function(d) {return y(d.Assets)})
     .attr('height', function(d) { return height - y(d.Assets)})

  svg.append('g')
      .attr('transform', 'translate(0,'+height+')', `rotate (270 -50 -45)`)
      .call(d3.axisBottom(x))
      // .attr('transform', function(val, i) {
      //   return `rotate (270 -50 -45)`
      // })

  svg.append('g')
     .call(d3.axisLeft(y))
})