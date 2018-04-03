d3.csv("tobacco.csv", function (tobacco) {
    // console.log(tobacco);
    
    let sliceData = tobacco.slice(0, 10);

    const svg = d3.select('#data').append('svg')
        .attr('width', 1000)
        .attr('height', 600)
        .attr("fill", "pink")

    const yCor = d3.scaleLinear()
        .domain([0, 10])
        .range([0, 600])

    const data = svg.selectAll('rect')
        .data(sliceData)
        .enter()

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    data.selectAll('rect')
        .data(sliceData)
        .enter()
        .append('rect')
        .attr('class', 'item-data')
        .attr('x', (d, i) => {
            return i * 100
        })
        .attr('y', (d) => {
            let data = d['Smoke everyday'].split('%')[0].split('.')[0]
            let convertData = parseInt(data)
            return 600 - yCor(convertData)
        })
        .attr('width', 70)
        // .transition()
        // .duration(200)
        // .delay((d, i) => {
        //     return i * 1000
        // })
        .attr('height', (d) => {
            let data = d['Smoke everyday'].split('%')[0].split('.')[0]
            // console.log(data)
            let convertData = parseInt(data)
            return yCor(convertData)
        })
        .on('mouseover', function (d,i) {
            // console.log(d)
            // d3.select(this)

            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.Year)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .text(function (d) {
            return d.Year
        })

    data.append('text')
        // .transition()
        // .duration(1000)
        // .delay((d, i) => {
        //     return i * 1000
        // })
        .attr('x', (d, i) => {
            return i * 100 + 15
        })
        .attr('y', (d) => {
            let data = d['Smoke everyday'].split('%')[0].split('.')[0]
            let convertData = parseInt(data)
            return 600
        })
        .text(function (d) {
            return d.Year
        })
        .attr("fill", "black")
        // .attr("text-anchor", "middle")
});

