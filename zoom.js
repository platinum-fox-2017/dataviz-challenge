var svg = d3.select("svg"),
    margin = 20,
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

// var color = d3.scaleLinear()
//     .domain([-1, 5])
//     .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
//     .interpolate(d3.interpolateHcl);

var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

d3.csv('Characters.csv', function(chars) {
  const firstHundred = chars.splice(0, 100)
  const entries = d3.nest()
        .key(function(d) { return 'characters' })
        .key(function(d) { return d.Race })
        .entries(firstHundred)
  console.log('entries ==> ', entries)

  function convertToTree (obj) {
    let tree = {}
    tree["name"] = obj.key
    tree["children"] = []
    obj.values.forEach(element => {
      let child = { "name": element.key, "children": [] }
      for(let i = 0; i < element.values.length; i++) {
        child["children"].push({ ["name"]: element.values[i].Name })
      }
      tree["children"].push(child)
    });
    
    return tree
  }

  const tree = convertToTree(entries[0])
  console.log(tree)

  const root = d3.hierarchy(tree).sum(function(d) { return 1 })
  console.log('hierarchy result => ', root)

  var focus = root,
      nodes = pack(root).descendants(),
      view;
  console.log(nodes)

  var circle = g.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
    // .style("fill", function(d) { return d.children ? color(2) : null; })
    .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); })

  var text = g.selectAll("text")
    .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      // .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { return d.data.name; });
      
  var node = g.selectAll("circle,text")

  svg.on("click", function() { zoom(root); });
      // .style("background", color(-1))
      
  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        // .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.transition().duration(500).attr("r", function(d) { return d.r * k; });
  }
})