// const svg = d3.select('body')
//   .append('svg')
//   .attr('width', 960)
//   .attr('height', 960)
//
// const format = d3.format(",d");
//
// const color = d3.scaleOrdinal(d3.schemeCategory20c);
//
// var pack = d3.pack()
//     .size([960, 960])
//     .padding(1.5);
//

const bubble = function () {
  console.log('bubble');
  let width = 960
  let height = 960

  function chart (selection) {
    console.log('charting...');
    let div = selection
    let data = selection.datum()
    let svg = div.selectAll('svg')
      .attr('width', width)
      .attr('height', height)

    let colorCircles = d3.scaleOrdinal(d3.schemeCategory20)
      .domain(['PC', 'SNES', 'NES', 'PS4', 'X360', '3DS', 'PS2', 'N64', 'DS', 'Wii', 'PS3', 'GB', 'GBA', '2600', 'PSP', 'PS']);

    let scaleRadius = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return +d.Global_Sales; }),
        d3.max(data, function(d) { return +d.Global_Sales; })])
      .range([10,35]);

    var simulation = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody().strength([-40]))
      .force("x", d3.forceX(0))
      .force("y", d3.forceY(0))
      .force('collide', d3.forceCollide().radius(function(d) {return scaleRadius(d.Global_Sales) + 2}).iterations(2) )
      .on("tick", ticked);

    function ticked() {
      text.attr('x', function(d) {
        return d.x - (d.Platform.length * 4)
      })
      .attr('y', function(d) {
        return d.y + 5
      })
      node.attr("cx", function(d, i) {
        return d.x;
      })
      .attr("cy", function(d, i) {
        return d.y;
      });
    }

    let tooltip = div.append('div')
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("color", "white")
      .style("padding", "8px")
      .style("background-color", "#424242")
      .style("border-radius", "6px")
      .style("text-align", "center")
      .style("font-family", "monospace")
      .style("width", "400px")
      .text("");

    let node = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr('r', function(d) { return scaleRadius(d.Global_Sales)})
      .style('fill', function(d) { return colorCircles(d.Platform)})
      .attr('transform', 'translate(' + [width/2, height/2] + ')')
      .on('mouseover', function(d) {
        d3.select(this)
          .transition()
          .duration(300)
          .ease(d3.easeBounceOut)
          .attr('r', function(d) { return scaleRadius(d.Global_Sales) + 10})
        tooltip.html(`${d.Name},  platform: ${d.Platform},  Global Sales: ${d.Global_Sales} millions`)
        return tooltip.style('visibility', 'visible')
      })
      .on('mousemove', function() {
        tooltip
         .style('top', (d3.event.pageY)+ 'px')
         .style('left', (d3.event.pageX + 15)+ 'px')
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(300)
          .ease(d3.easeBounce)
          .attr('r', function(d) { return scaleRadius(d.Global_Sales)})
        return tooltip.style('visibility', 'hidden')
      })

    let text = svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('transform', 'translate(' + [width/2, height/2] + ')')
      .style("font-family", "monospace")
      .style('pointer-events', 'none')
      .text(function(d) {
        return d.Platform
      })

  }

  chart.width = function (value) {
    console.log(value);
    if (!arguments.length) {
      return width
    }
    width = value
    return chart
  }

  chart.height = function (value) {
    console.log('height');
    if (!arguments.length) {
      return height
    }
    height = value
    return chart
  }

  return chart
}


d3.csv('./vgsales.csv', function(games) {
  const shortList = games.slice(0, 600)
  console.log(shortList);
  let chart = bubble().width(800).height(800);
  d3.select('#Data').datum(shortList).call(chart)
})
