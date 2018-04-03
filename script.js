d3.csv('world-population-data.csv', function (error, csv) {

    for (let i = 0; i < csv.length; i++) {
        const element = csv[i];
        element.fillKey = element.population;
    }
    console.log(csv)

    if (error) return console.log('error loading the csv: ' + error);
    // console.log('there are ' + csv.length + ' elements in my csv set');
    // console.log(csv)
    var color = d3.scale.linear().domain([1, 1415])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb("#673AB7"), d3.rgb('#D50000')]);

    var basic_choropleth = new Datamap({
        element: document.getElementById('map_election'),
        projection: 'mercator',
        geographyConfig: {
            popupTemplate: function (geography, datas) {
                console.log(geography)
                let population = 0;
                for (let i = 0; i < csv.length; i++) {
                    const element = csv[i];
                    if (element.country_code === geography.id) {
                        population = element.population
                    }
                }
                return '<div class="hoverinfo"><h4>' + geography.properties.name + '</h4><p>Population: ' + population + '</p>'
            }
        },
        fills: {
            defaultFill: "#ABDDA4",
            authorHasTraveledTo: color(5)
        },
        data: {
            USA: { fillKey: "authorHasTraveledTo" },
            RUS: { fillKey: "authorHasTraveledTo" },
            AUS: { fillKey: "authorHasTraveledTo" },
            BRA: { fillKey: "authorHasTraveledTo" },
            CAN: { fillKey: "authorHasTraveledTo" },
            ZAF: { fillKey: "authorHasTraveledTo" },
            IDN: { fillKey: "authorHasTraveledTo" }
        }
    });
    var colors = d3.scale.category10();
    basic_choropleth.updateChoropleth({
        USA: colors(Math.random() * 10),
        RUS: colors(Math.random() * 100),
        AUS: { fillKey: 'authorHasTraveledTo' },
        BRA: colors(Math.random() * 50),
        CAN: colors(Math.random() * 50),
        ZAF: colors(Math.random() * 50),
        IDN: colors(Math.random() * 50),
    });
    console.log(basic_choropleth.data)
});  