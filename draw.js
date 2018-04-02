var width = 800,
    height = 400;

d3.csv('stack_network_links.csv', function (data) {
  const FirstTenData = data.splice(0,10)
  const svg = d3.select('#bar-chart').append('svg')
  .attr('width', width)
  .attr('height', height)

  const yScale = d3.scaleLinear()
  .domain([0, 50])
  .range([0, 300])

  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  svg.selectAll('rect')
    .data(FirstTenData)
    .enter()
    .append('rect')
    .style('fill', '#abebc6')
    .attr('x', (d, i) => {
      return i * 75
    })
    .attr('y', (d) => {
      // console.log(Math.floor(d.value))
      return height - yScale(Math.floor(d.value))
    })
    .attr('width', 50)
    .attr('height', (d) => {
      return yScale(Math.floor(d.value))
    })
    .on('mouseover', function(data) {
      console.log(data.source)
      dynamicColor = this.style.fill;
      d3.select(this)
      .style('fill', '#229954')
      div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html(data.source + '</br>' + Math.floor(data.value))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on('mouseout', function(data) {
      d3.select(this)
      .style('fill', dynamicColor)
      div.transition()
      .duration(500)
      .style("opacity", 0);
    });
})



