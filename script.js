d3.csv("starbucks-menu-nutrition-food.csv", function(food) {

  d3.select('#data')
  .selectAll('.food')
  .data(food)
  .enter()
  .append('div')
  .attr('class', 'food')
  .on("click",function(d,i){
    d3.select(this)
    .transition()
      .duration(750)
      .delay(function(food, i) { return i * 300 })
        .style("padding", "100px")
        .style("width", "500px")
        .style("height", "500px")
        .style("background", function(food) { 
          let green = Math.floor(255-(255/(650/food.Calories)))
          return `rgb(255, ${green}, 0)`
        })
        .style("font-size", "30px")
        .text(function(food) {
          console.log(food)
          return `${food.Name} - 
          Calories: ${food.Calories} || 
          Fat (g): ${food[" Fat (g)"]} g || 
          Carb. (g): ${food[" Carb. (g)"]} g ||
          Fiber (g): ${food[" Fiber (g)"]} g ||
          Protein (g): ${food[" Protein (g)"]} g ||
          `
        })
  })
  .on("mouseout",function(d,i){
    d3.select(this)
    .transition()
      .duration(750)
      .delay(function(food, i) { return i * 300 })
      .style("padding", function(food) { return food.Calories/50 +"px"})
      .style("width", function(food) { return food.Calories/3 +"px" })
      .style("height", function(food) { return food.Calories/3 +"px" })
      .style("background", function(food) { 
        let green = Math.floor(255-(255/(650/food.Calories)))
        return `rgb(255, ${green}, 0)`
      })
      .text(function(food) {
        return food.Name
      })
      .style("font-size", function(food) { return food["Calories"]/22 +"px" })
      .style("border-style", "none")
  })
  .transition()
    .duration(750)
    .delay(function(food, i) { return i * 300 })
      .style("padding", function(food) { return food.Calories/50 +"px"})
      .style("width", function(food) { return food.Calories/3 +"px" })
      .style("height", function(food) { return food.Calories/3 +"px" })
      .style("background", function(food) { 
        let green = Math.floor(255-(255/(650/food.Calories)))
        return `rgb(255, ${green}, 0)`
      })
      .text(function(food) {
        return food.Name
      })
      .style("font-size", function(food) { return food["Calories"]/22 +"px" })
      .style("border-style", "none")

})

