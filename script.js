function selectCategory() {
    d3.selectAll('svg').remove()


    const margin = { top: 20, right: 20, bottom: 20, left: 20 },
        width = 500 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom,
        radius = width / 2

    const color = d3.scaleOrdinal()
        .range(['#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2'])

    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0)

    const labelArc = d3.arc().outerRadius(radius - 100).innerRadius(radius - 100)

    const pie = d3.pie().sort(null).value(function (d) {
        return d.Calories
    })

    const svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)

    let category = document.getElementById('category')
    let selectedCategory = category.options[category.selectedIndex].value

    console.log(selectedCategory)

    d3.csv('menu.csv', function (error, data) {
        if (error) throw new error

        let filteredData = data.filter(function (el) {
            return el.Category === selectedCategory
        })

        let topfive = filteredData.splice(4, 5)

        topfive.forEach(function (d) {
            d.Calories = +d.Calories
            d.Item = d.Item
        })

        console.log(topfive)
        const g = svg.selectAll('.arc')
            .data(pie(topfive))
            .enter()
            .append('g')
            .attr('class', 'arc')

        g.append('path')
            .attr('d', arc)
            .style('fill', function (d) { return color(d.data.Item) })
            .transition()
            .ease(d3.easeLinear)
            .duration(2000)
            .attrTween('d', pieTween)

        g.append('text')
            .transition()
            .ease(d3.easeLinear)
            .duration(2000)
            .attr('transform', function (d) {
                return `translate(${labelArc.centroid(d)})`
            })
            .attr('dy', '.35em')
            .text(function (d) {
                let arrData = d.data.Item.split(' ').join('\n')
                console.log('===>' + arrData)
                return arrData
            })
            
    })

    function pieTween(b) {
        b.innerRadius = 0
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b)
        return function (t) {
            return arc(i(t))
        }
    }

}


