const margin = {top:20, right:20, bottom:20, left:20}
const width = 900- margin.right - margin.left
const height = 500 - margin.top - margin.bottom
const radius = width/2

const arc = d3.arc()
      .outerRadius(200)
      .innerRadius(0)
const label = d3.arc()
      .outerRadius(300)
      .innerRadius(0)
const pie = d3.pie()
      .sort(null)
      .value(function(d) { return d['VILLAGES']})
const color = d3.scaleOrdinal(d3.schemeCategory10)
      // .range(['#03C9A9', '#68C3A3', '#65C6BB', '#1BBC9B', '1BA39C', '#66CC99', '#36D7B7', '#C8F7C5', '#86E2D5', '#2ECC71'])
const svg = d3.select('body').append('svg')
      // .style('background','#cacaca')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width/3+','+height/2+')')
d3.csv('Districtwise.csv', function (district){
  let districtData = district.splice(22,10)
  districtData.forEach(function (d){
    d['VILLAGES'] = + d['VILLAGES']
    d['DISTNAME'] =  d['DISTNAME']
  })
  svg.append('g')
  .attr('class', 'legend')
    .selectAll('text')
    .data(pie(districtData))
      .enter()
        .append('text')
          .text(function(d) { return '• ' + d.data.DISTNAME; })
          .attr('fill', function(d) { return color(d.data.DISTNAME); })
          .attr('y', function(d, i) { return 20 * (i + 1); })
          .attr('x', 230)
  const g = svg.selectAll('.arc')
        .data(pie(districtData))
        .enter().append('g')
        .attr('class',arc)
  g.append('path')
      .attr('d', arc)
      .style('fill', function(d){
        return color(d.data['DISTNAME'])
      })
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween('d',pieTween)
  g.append('text')
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d){
        return d.data['VILLAGES']
      })
})
function pieTween(b){
  b.innerRadius = 0;
  const i = d3.interpolate({startAngle: 0, endAngle:0}, b)
  return function(t){
    return arc(i(t))
  }
}