d3.csv('human_development.csv', country => {
  let ten = country.slice(0,13)
  const svg = d3.select('#area')
              .append('svg')
              .attr('width',1350)
              .attr('height',500)
  const yScale = d3.scaleLinear()
                .domain([0,30])
                .range([100,400])  
  const colorScale = d3.scaleLinear()
                    .domain([15,21])
                    .range(['teal','green'])
  
  // svg.selectAll('rate')
  //     .data(ten)
  //     .enter()
  //     .append('rate')
  //     .attr('class','foo')
  //     .attr('x',(d,i) => {
  //       return i*109
  //     })
  //     .attr('y', c => {
  //       let rate = c['Expected Years of Education']
  //       return 450 - yScale(rate)
  //     })
  //     .attr('width',25)
  //     .attr('height', c => {
  //       let rate = Number(c['Expected Years of Education'])
  //       return yScale(rate)
  //     })         
  //     .attr('fill', c => {
  //       let rate = Number(c['Expected Years of Education'])
  //       return colorScale(rate)
  //     }) 

  svg.selectAll('rect')
      .data(ten)
      .enter()
      .append('rect')
      .attr('class','bar')
      .attr('x',(d,i) => {
        return i*106
      })
      .attr('y', c => {
        let rate = c['Expected Years of Education']
        return 450 - yScale(rate)
      })
      .attr('width',25)
      .attr('height', c => {
        let rate = Number(c['Expected Years of Education'])
        return yScale(rate)
      })         
      .attr('fill', c => {
        let rate = Number(c['Expected Years of Education'])
        return colorScale(rate)
      })
      .on('mouseover', c => {
        d3.select(this)
        .style('fill','#bada55')
      })
      .on('mouseout', c => {
        let rate = Number(c['Expected Years of Education'])
        d3.select(this)
        .style('fill',colorScale(rate))
      })

  svg.selectAll('country')
      .data(ten)
      .enter()
      .append('text')
      .attr('class', 'country')
      .transition()
      .duration(500)
      .delay(function(d, i) { return i * 100; })
      .attr('x', (r, i) => {
        return i * 106
      })
      .attr('y', (r,i) => {
        return 480
      })
      .text( c => {
        return c.Country
      })   

  svg.selectAll('poin')
      .data(ten)
      .enter()
      .append('text')
      .attr('class', 'poin')
      .attr('x', (c, i) => {
        return i * 106
      })
      .attr('y', (c,i) => {
        let rate = c['Expected Years of Education']
        return 450 - yScale(rate) - 10
      })
      .text( c => {
        return c['Expected Years of Education'] 
      })
      
  svg.selectAll('subject')
      .data(ten)
      .enter()
      .append('text')
      .attr('class', 'subject')
      .attr('x', (c, i) => {
      return i * 104
      })
      .attr('y', (c,i) => {
      return 500
      })
      .attr('transform', (c,i) => {
      return `rotate (270 ${i*104} 450)`
      })
      .text( c => {
      return 'Years of Education (yr)'
      })

})