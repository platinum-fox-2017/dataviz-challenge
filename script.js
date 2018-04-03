d3.csv("Pokemon.csv", function (pokemon) {
  console.log(pokemon);
  const poke = pokemon.slice(0, 10)
  console.log(poke)
  d3.select('body').selectAll('div')
    .data(poke)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style('height', function (d) {
      return d * 5 + 'px'
    })

  const div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  const color = d3.scaleOrdinal(d3.schemeCategory20b);

  const svg = d3.select('#chartArea').append('svg')
    .attr('width', 650)
    .attr('height', 500)
    .style('background', '#cacaca')

  const bar = svg.selectAll('rect')
    .data(poke)
    .enter()

  bar.append('rect')
    .attr('fill', function (d, i) {
      return color(d.Name)
    })
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * 65
    })
    .attr('y' , (d) => {
      console.log(d);
      return 500 - d.Total * 0.7
    })
    .attr('width', 50)
    .attr('height', (d) => {
      console.log(d);
      return d.Total * 0.7
    })
    .on('mouseover', function (d, i) {
      d3.select(this).transition()
        .duration(500)
        .style('fill', 'white')
      div.transition()
         .duration(500)
         .style("opacity", .9);
       div.html((`Name: ${d.Name} <br> Type: ${d['Type 1']}`))
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
    })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
        .duration(200)
        .style('fill', color(d.Name))
      div.transition()
         .duration(200)
         .style("opacity", 0);
    })

  bar.append('text')
    .transition()
    .duration(2000)
    .delay((d, i) => {
      return i * 100
    })
    .attr('x', (d, i) => {
      return i * 65 + 12
    })
    .attr('y' , (d) => {
      console.log(d);
      return (500-3) - d.Total * 0.7
    })
    .text(function (d) {
      return d.Total
    })
    .style('fill', 'teal')

})
