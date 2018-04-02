d3.csv('20 Forbes Top2000 2017.csv', function(error, data) {
  let assets = [], companies = []
  assets = data.map(d => {
    return Number(d.Assets)
  })
  // console.log('assets : ', assets)

  companies = data.map(d => {
    return d.Company
  })
  console.log('companies : ', companies)

  var margin = {top: 30, right: 30, bottom: 40, left: 100}

  var height = 500 - margin.top - margin.bottom
  var width = 1000 - margin.right - margin.left
  var animateDuration = 700
  var animateDelay = 30

  var tooltip = d3.select('body').append('div')
                  .style('position', 'absolute')
                  .style('background', '#f4f4f4')
                  .style('padding', '5 15px')
                  .style('border', '1px #333 solid')
                  .style('border-radius', '5px')
                  .style('opacity', '0')

  var yScale = d3.scale.linear()
                 .domain([0, d3.max(assets)])
                 .range([0, height])

  var xScale = d3.scale.ordinal()
                       .domain(d3.range(0, assets.length))
                       .rangeBands([0, width])
          
  var colors = d3.scale.linear()
                 .domain([0, assets.length])
                 .range(['#90ee90', '#30c230'])

  var myChart = d3.select('#chart').append('svg')
                  .attr('width', width + margin.right + margin.left)
                  .attr('height', height + margin.top + margin.bottom)
                  .append('g')
                  .attr('transform', 'translate('+margin.left+', '+margin.top+')')
                  .style('background', '#f4f4f4')
                  .selectAll('rect')
                    .data(assets)
                    .enter().append('rect')
                      .style('fill', function(d, i) {
                        return colors(i)
                      })
                      .attr('width', xScale.rangeBand())
                      .attr('height', 0)
                      .attr('x', function(d, i){
                        return xScale(i)
                      })
                      .attr('y', height)
                  .on('mouseover', function(d) {
                    tooltip.transition()
                          .style('opacity', 1)
                    
                    tooltip.html(d)
                          .style('left', (d3.event.pageX)+'px')
                          .style('top', (d3.event.pageY)+'px')

                    d3.select(this).style('opacity', 0.5)
                  })
                  .on('mouseout', function(d){
                    tooltip.transition()
                          .style('opacity', 0)
                    d3.select(this).style('opacity', 1)
                  })

    myChart.transition()
           .attr('height', function(d){
              return yScale(d)
           })
           .attr('y', function(d){
             return height - yScale(d)
           })
           .duration(animateDuration)
           .delay(function(d, i){
              return i * animateDelay
           })
           .ease('elastic')

  var vScale = d3.scale.linear()
                 .domain([0, d3.max(assets)])
                 .range([height, 0])

  var hScale = d3.scale.ordinal()
                  .domain(d3.range(companies[0], companies.length))
                  .rangeBands([0, width])

  var vAxis = d3.svg.axis()
                .scale(vScale)
                .orient('left')
                .ticks(5)
                .tickPadding(5)

  var vGuide = d3.select('svg')
                 .append('g')
                 vAxis(vGuide)
                 vGuide.attr('transform', 'translate('+margin.left+', '+margin.top+')')
                 vGuide.selectAll('path')
                       .style('fill', 'none')
                       .style('stroke', '#000')
                 vGuide.selectAll('line')
                       .style('stroke', '#000')

  var hAxis = d3.svg.axis()
            .scale(hScale)
            .orient('bottom')
            .tickValues(hScale.domain().filter(function(d, i){
              return !(i % (companies.length/5))
            }))

  var hGuide = d3.select('svg')
                 .append('g')
                 hAxis(hGuide)
                 hGuide.attr('transform', 'translate('+margin.left+','+(height + margin.top)+')')
                 hGuide.selectAll('path')
                       .style('fill', 'none')
                       .style('stroke', '#000')
                 hGuide.selectAll('line')
                       .style('stroke', '#000')


})          