
  // SETUP

  var svg = d3.select("svg"),
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear(),
    theData = undefined;

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  g.append("g")
    .attr("class", "axis axis--x");

  g.append("g")
    .attr("class", "axis axis--y");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Value");

  // DRAWING

  function draw() {

    var bounds = svg.node().getBoundingClientRect(),
      width = bounds.width - margin.left - margin.right,
      height = bounds.height - margin.top - margin.bottom;

    x.rangeRound([0, width]);
    y.rangeRound([height, 0]);

    g.select(".axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.select(".axis--y")
      .call(d3.axisLeft(y).ticks(10, ",f"));

    var bars = g.selectAll(".bar")
      .data(theData);

    // ENTER
    bars
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return x(d.source); })
      .attr("y", function (d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(Math.floor(d.value)); });

    // UPDATE
    bars.attr("x", function (d) { return x(d.source); })
      .attr("y", function (d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(Math.floor(d.value)); });

    // EXIT
    bars.exit()
      .remove();

  }

  // LOADING DATA

  function loadData(csv) {

    d3.csv('stack_network_links.csv', function (d) {
      d.frequency
      return d;

    }, function (error, data) {
      if (error) throw error;

      theData = data;

      x.domain(theData.map(function (d) { return d.source; }));
      y.domain([0, d3.max(theData, function (d) { return d.value; })]);

      draw();

    });
  }

  // START!

  window.addEventListener("resize", draw);
  loadData("stack_network_links.csv");
