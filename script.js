d3.csv('zomato.csv', function (restaurants) {
  const top10 = restaurants.splice(0,10)
  const yScale = d3.scaleLinear()
  .domain([0, 5])
  .range([0, 500])

  const svg = d3.selectAll('#area')
  .append('svg')
  .attr('width', 1400)
  .attr('height', 600)
  // .style('background', '#cacaca')
  
  const colorScale = d3.scaleLinear()
  .domain([4, 5])
  .range(['yellow', 'orangered'])

  const div = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 1);

  svg.selectAll('rect')
  .data(top10)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  // .style('fill', 'yellow')
  .attr('x', (r, i) => {
    return i * 150
  })
  .attr('y', (r,i) => {
    let rating = Number(r["Aggregate rating"])
    return 600 - yScale(rating)
  })
  .attr('width', 50)
  .attr('height', (r) => {
    let rating = Number(r["Aggregate rating"])
    return yScale(rating)
  })
  .attr('fill', (r) => {
    let rating = Number(r["Aggregate rating"])
    return colorScale(rating)
  })
  .attr('stroke', 'white')
  .on('mouseover', function(r) {
    dynamicColor = this.style.fill
    d3.select(this)
    // .style('fill', 'orangered')
    .style('opacity', 0.6)

    d3.transition()
    .duration(200)
    .style("opacity", 1);
    div.html(r["Restaurant Name"] + '</br>' + r["Aggregate rating"] + '⭐️')
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 28) + "px")
  })
  .on('mouseout', function(r) {
    d3.select(this)
    .style('fill', dynamicColor)
    .style('opacity', 1)
    div.transition()
    .duration(500)
  })

  svg.selectAll('rating')
  .data(top10)
  .enter()
  .append('text')
  .attr('class', 'rating')
  .attr('x', (r, i) => {
    return i * 150 + 7
  })
  .attr('y', (r,i) => {
    let rating = Number(r["Aggregate rating"])
    return 600 - yScale(rating) - 10
  })
  .text((r) => {
    return r["Aggregate rating"] + '⭐️'
  })

  svg.selectAll('name')
  .data(top10)
  .enter()
  .append('text')
  .attr('class', 'name')
  .attr('x', (r, i) => {
    return i * 150
  })
  .attr('y', (r,i) => {
    let rating = Number(r["Aggregate rating"])
    return 600
  })
  .attr('transform', (r,i) => {
    return `rotate (270 ${i * 150} 570)`
  })
  .text((r) => {
    return r["Restaurant Name"]
  })

})