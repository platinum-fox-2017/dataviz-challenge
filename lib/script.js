const buildTree = (input) => {
  let output = null;
  input.forEach(element => {
    output = {
      name: element.key,
      children: []
    };

    for (let i = 0; i < element.values.length; i++) {
      output.children.push({
        name: element.values[i].key.replace(/[+]/gi, ' '),
        children: []
      });
      for (let j = 0; j < element.values[i].values.length; j++) {
        output.children[i].children.push({
          name: element.values[i].values[j].name.replace(/%27/gi, "'"),
          value: element.values[i].values[j].page_views
        });
      }
    }
  });
  return output;
};

let svg = d3.select('svg');
let margin = 20;
let diameter = svg.attr('width');
let g = svg.append('g').attr('transform', `translate(${ diameter/2 },${ diameter/2 })`);
let color = d3.scaleLinear()
              .domain([-1, 5])
              .range(['hsla(147, 0%, 19%, 1)', 'hsla(147, 0%, 19%, 1)'])
              .interpolate(d3.interpolateHcl);
let pack = d3.pack()
             .size([diameter - margin, diameter - margin])
             .padding(2);

d3.csv('./lib/epldata_final.csv', (error, data) => {
  if (error) throw error;
  
  let entries = d3.nest()
               .key(d => 'EPL')
               .key(d => d.club)
               .entries(data)
               
  let root = buildTree(entries);

  root = d3.hierarchy(root)
           .sum(d => d.value)
           .sort((a, b) => b.value - a.value);

  let focus = root;
  let nodes = pack(root).descendants();
  let view;

  const zoom = d => {
    let focus0 = focus;
    
    focus = d;

    let transition = d3.transition()
                       .duration(d3.event.altKey ? 7500 : 750)
                       .tween('zoom', d => {
                         let i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                         return function(t) { zoomTo(i(t)); };
                        });

    transition.selectAll('text')
              .filter(function(d) { return d.parent === focus || this.style.display === 'inline'; })
              .style('fill-opacity', d => d.parent === focus ? 1 : 0)
              .on('start', function(d) { if (d.parent === focus) this.style.display = 'inline'; })
              .on('end', function(d) { if (d.parent !== focus) this.style.display = 'none'; });
  }

  const zoomTo = v => {
    let k = diameter / v[2];
    view = v;
    node.attr('transform', d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    circle.attr('r', d => d.r * k);
  }

  console.log(nodes);

  let circle = g.selectAll('circle')
                .data(nodes)
                .enter().append('circle')
                .attr('class', d => d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root')
                .style('fill', d => d.children ? color(d.depth) : null)
                .on('click', d => {
                  if (focus !== d) zoom(d), d3.event.stopPropagation();
                });
  
  let text = g.selectAll('text')
              .data(nodes)
              .enter().append('text')
              .attr('class', 'label')
              .style('fill-opacity', d => d.parent === root ? 1 : 0)
              .style('display', d => d.parent === root ? 'inline' : 'none')
              .text(d => d.data.name);

  let node = g.selectAll('circle, text');

  svg.style('background', color(-1))
     .on('click', () => zoom(root));

  zoomTo([root.x, root.y, root.r * 2 + margin]);
  
});