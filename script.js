d3.csv("starbucks-menu-nutrition-food.csv", function(food) {
  d3.select('#data')
  .selectAll('div')
  .data(food)
  .enter()
  .append('div')
  .attr('class', 'food')
  .transition()
    .duration(750)
    .delay(function(food, i) { return i * 300 })
      .style("padding", function(food) { return food[" Calories"]/50 +"px"})
      .style("border-radius", function(food) { return food[" Calories"]/6 +"px"})
      .style("width", function(food) { return food[" Calories"]/3 +"px" })
      .style("height", function(food) { return food[" Calories"]/3 +"px" })
      .style("background-color", function(food) { 
        let green = Math.floor(255-(255/(650/food[" Calories"])))
        return `rgb(255, ${green}, 0)`
      })
      .text(function(food) {
        return food[""] +" - " + food[" Calories"]
      })
      .style("font-size", function(food) { return food[" Calories"]/22 +"px" })
      .style("border-style", "none")
})