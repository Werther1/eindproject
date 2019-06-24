window.onload=function(){

  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 40};
  var width = 460 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var svg = d3.select("#graph_energie")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  d3.json("electro.json").then(function(data) {

    var dataset = {"2013" : [], "2014" : [] , "2015" : [], "2016" : [], "2017": []}


    for (var i = 0, dat; i < data.length; i++) {
         dat= data[i];
         if (dataset[dat.jaar]){
            dataset[dat.jaar].push(dat);
        }
      };

    var data_ready = d3.entries(dataset)
    console.log(data_ready)
    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var jaar = d3.map(dataset).keys()
    console.log(dataset)
    var soort = d3.map(dataset[dat.jaar], function(d) {return d.soort});
    console.log(soort)
    var energie = d3.map(dataset[dat.jaar], function(d) {return d.Totaal_elekt_warmte_tj });
    console.log(energie)
    // Add X axis
    var x0 = d3.scaleBand()
              .domain(jaar)

    var x1 = d3.scaleBand()
                .domain(soort)
                .range([0, width])
                .padding([0.2])


    var x = d3.scaleBand()
        .domain(soort)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
            .domain([0, d3.max(dataset[dat.jaar], function(d) { return d.Totaal_elekt_warmte_tj; })])
            .range([ height, 0 ])
    svg.append("g")
        .call(d3.axisLeft(y));


      var color = d3.scaleOrdinal()
      .domain(soort)
      .range(["#69b3a2","#404080","SteelBlue", "DarkOrange"])

    // Show the bars
    svg.append("g")
      .selectAll("g")
      // Enter in data = loop group per group
      .data(data_ready[dat.jaar])
      .enter()
      .append("g")
        .attr("transform", function(d) { return "translate(" + x0(data_ready.data.jaar) + ",0)"; })
      .selectAll("rect")
      .enter().append("rect")
        .attr("x", function(d) { return x1(d.data.soort); })
        .attr("y", function(d) { return y(d.data.Totaal_elekt_warmte_tj); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height - y(d.data.Totaal_elekt_warmte_tj); })
        .attr("fill", function(d) { return color(d.keys); });

    // Handmade legend
    svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
    svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 6).style("fill", "#404080")
    svg.append("circle").attr("cx",300).attr("cy",90).attr("r", 6).style("fill", "SteelBlue")
    svg.append("circle").attr("cx",300).attr("cy",120).attr("r", 6).style("fill", "DarkOrange")
    svg.append("text").attr("x", 320).attr("y", 30).text("fossiele brandstoffen").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 320).attr("y", 60).text("hernieuwbare energie").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 320).attr("y", 90).text("kern energie").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 320).attr("y", 120).text("overige energiebronnen").style("font-size", "15px").attr("alignment-baseline","middle")

  });
}
