d3.csv("starbucks-menu-nutrition-food.csv", function(foods) {var svgContainer = d3
  const foods10 = foods.splice(0, 10)
  
  let cx = 0;
  let cx2 = 0;
  let cy = 150;


  const svg = d3.select('#data')
    .append('svg')
    .attr('height', 1335)
    .attr('width', 1335)

  svg.append('rect')
    .attr('height', 1335)
    .attr('width', 1335)
    .style('fill','#BDBDBD')

  svg.selectAll('circle')
    .data(foods)
    .enter()
    .append('circle')
    .attr("cx", function(d, i) {
      if(cx > 1100) {
        cx = 0;
      }
      cx += d.Calories/5 + 65
      return cx
    })
    .attr("cy",  function(d, i) {
      if(cx2 > 1100) {
        cx2 = 0;
        cy += 150;
      }
      cx2 += d.Calories/5 + 65
      return cy
    })
    .transition()
    .duration(750)
    .delay(function(d, i) { return i * 300 })
      .attr("r", function(d) { return d.Calories/8 })
      .attr("fill", function(d) {
        let green = Math.floor(255-(255/(650/d.Calories)))
        return `rgb(255, ${green}, 0)`
      })

  // d3.select('#data')
  //   .selectAll('.text')
  //   .data(foods)
  //   .enter()
  //   .append('div')
  //   .attr('class', 'text')
  //   .style('position', 'fixed')
  //   .style("font-size", function(d) { return d.Calories/22 +"px" })
  //   .text(function(d) {
  //     return d.Name
  //   })
})
