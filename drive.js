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

    var simulation = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody().strength([-200]))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

    function ticked(e) {
      text.attr('x', function(d) {
        return d.x - 15
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

    let colorCircles = d3.scaleOrdinal(d3.schemeCategory10);

    let scaleRadius = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return +d.Global_Sales; }),
        d3.max(data, function(d) { return +d.Global_Sales; })])
      .range([30,50]);

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
      .style("text-align", "center")
      .style("font-family", "monospace")
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
  const shortList = games.slice(0, 100)
  console.log(shortList);
  let chart = bubble().width(1000).height(1000);
  d3.select('#Data').datum(shortList).call(chart)
})
