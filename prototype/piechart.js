$( document ).ready(function() {
    var data = [{"label" :"2018", "value": 109.1},
                {"label" :"2017", "value": 104.7},
                {"label" :"2016", "value": 98.8},
                {"label" :"2015", "value": 98.2},
                {"label" :"2014", "value": 90.8}];

              var svg = d3.select("svg"),
                  width = svg.attr("width"),
                  height = svg.attr("height"),
                  radius = Math.min(width, height) / 2,
                  g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

              var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);


              var pie = d3.pie();

              var arc = d3.arc()
                          .innerRadius(0)
                          .outerRadius(radius);

              var arcs = g.selectAll("arc")
                          .data(pie(data))
                          .enter()
                          .append("g")
                          .attr("class", "arc")


              arcs.append("path")
                  .attr("fill", function(d, i) {
                      return color(i);
                  })
                  .attr("d", arc);
});
