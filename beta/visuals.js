

window.onload=function(){

  var request = [d3.json("gemeenten.geojson")];

  Promise.all(request).then(function(response) {
    create_map(response[0])
    filter_pie("normaal")
    filter_bar("normaal")
}).catch(function(e){
    throw(e);
});
    function filter_bar(input){
      d3.json("electro.json").then(function(data){
      var filter_normaal = data.filter(function (d){ return (d.jaar != "Scenario1" && d.jaar != "Scenario2" )});
      var filter_scenario1 = data.filter(function (d){ return (d.jaar != "Scenario2" )});
      var filter_scenario2 = data.filter(function (d){ return (d.jaar != "Scenario1" )});

      if (input == "normaal"){
          create_barchart(filter_normaal)}
      else if (input == "scenario1"){
          create_barchart(filter_scenario1)}
      else if (input == "scenario2"){
          create_barchart(filter_scenario2)}
      else if (input == "CORVA"){
          create_barchart(filter_normaal)}
      })
    }
    function filter_pie(input){
      d3.json("kernafval_scenario.json").then(function(data){
      var filter_normaal = data.filter(function (d){ return (d.scenario == "scenario0" )});
      var filter_scenario1 = data.filter(function (d){ return (d.scenario == "scenario2" )});
      var filter_scenario2 = data.filter(function (d){ return (d.scenario == "scenario1" )});
      var filter_CORVA = data.filter(function (d) {return (d.scenario == "CORVA" )});
      if (input == "normaal"){
          create_piechart(filter_normaal)}
      else if (input == "scenario1"){
          create_piechart(filter_scenario1) }
      else if (input == "scenario2"){
          create_piechart(filter_scenario2)}
      else if (input == "CORVA"){
          create_piechart(filter_CORVA)}
      })
    }

      function nieuwe_centrale_map(input){
        var width = 900;
        var height = 900;

      // Map and projection
        var projection = d3.geoMercator()
                          .center([5, 52])
                          .translate([ width/2, height/2 ]);

        var path = d3.geoPath()
                      .projection(projection);


        var Maasvlakte=[4.031126,51.9632789];
        var Eemshaven=[6.8354937,53.4385887];
        var circumference = 6371000 * Math.PI * 2;
        var angle5km = 5000 / circumference * 360;
        var angle10km= 10000 / circumference * 360;
        var angle20km= 20000 / circumference * 360;

        zones = d3.select("#safety_zone_map")
                  .select("svg")
                  .attr("width",width)
                  .attr("height",height);

        if (input == "scenario1" ){
          input = Maasvlakte
          console.log(input)
          var circle_5km=d3.geoCircle().center(input).radius(angle5km)
          var circle_10km=d3.geoCircle().center(input).radius(angle10km)
          var circle_20km=d3.geoCircle().center(input).radius(angle20km)
          zones.append("path")
                .attr("d", path(circle_5km()))
                .attr("class","circle")
                .style("stroke", "red")
              .append("path")
                .attr("d", path(circle_10km()))
                .attr("class","circle")
                .style("stroke", "red")
              .append("path")
                .attr("d", path(circle_20km()))
                .attr("class","circle")
                .style("stroke", "red");
        }
        if (input == "scenario2"){
          input = [Maasvlakte, Eemshaven];
          for (i = 0; i < 2; i++){
          var circle_5km=d3.geoCircle().center(input[i]).radius(angle5km)
          var circle_10km=d3.geoCircle().center(input[i]).radius(angle10km)
          var circle_20km=d3.geoCircle().center(input[i]).radius(angle20km)
          zones.append("path")
                .attr("d", path(circle_5km()))
                .attr("class","circle")
              .append("path")
                .attr("d", path(circle_10km()))
                .attr("class","circle")
              .append("path")
                .attr("d", path(circle_20km()))
                .attr("class","circle")
          }


        }

          }

    function create_map(data_gemeenten){
      var width = 900;
      var height = 900;

    // Map and projection
      var projection = d3.geoMercator()
                        .center([5, 52])                // GPS of location to zoom on
                        .scale(8500)                       // This is like the zoom
                        .translate([ width/2, height/2 ]);

      var svg = d3.select("#safety_zone_map")
                  .append("svg")
                    .attr("width", width)
                    .attr("height", height);

      var path = d3.geoPath()
                    .projection(projection);

         var tooltip_map = d3.tip()
                         .attr("class", "d3-tip")
                         .html(function(d) {return d.properties.areaName;} );

         svg.call(tooltip_map);

         svg.append("g")
             .selectAll("path")
             .data(data_gemeenten.features)
             .enter()
             .append("path")
               .attr("fill","green" )
               .attr("d", path)
             .style("stroke","black")
             .on("mouseover", tooltip_map.show)
             .on("mouseout", tooltip_map.hide);


          var colors = d3.scaleOrdinal(d3.schemeOrRd[3]);

          d3.json("maatregel_zone.geojson").then(function(data_veilig) {

          var filter = data_veilig.features.filter(function (d){ return (d.geometry != null)});


          for (i = 0; i < filter.length; i++) {
            for (j = 0; j < 1; j++){
              for (k= 0; k < 49; k++){
                  gps= ConvertRdToLatLong(filter[i].geometry.coordinates[j][k][0], filter[i].geometry.coordinates[j][k][1])
                  filter[i].geometry.coordinates[j][k][0] = gps[0]
                  filter[i].geometry.coordinates[j][k][1] = gps[1]

              }
          };
        }
        svg.append("g")
            .selectAll("path")
            .data(filter)
            .enter()
            .append("path")
              .attr("fill","none" )
              .attr("d", path)
            .style("stroke",function(d, i) {return colors(i)} )
            .style("stroke-width", "20px")
            .style("opacity" , "0.3");

        svg.selectAll("path");

        var data_choices_map = {"Geen nieuwe centrale": "scenario0", "Nieuwe centrale Maasvlakte": "scenario1", "Nieuwe centrale Maasvakte & Eemshaven" : "scenario2", "Opgeslagen radioactief afval": "CORVA"}
        var ready_options_map = d3.entries(data_choices_map);
        // Initialize the button
        var options_map = d3.select("#safety_zone_map")
                        .append('select')

        // add the options to the button
       // Add a button
        options_map.selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
                  .data(ready_options_map)
                  .enter()
                  .append('option')
                  .text(function (d) { return d.key; }) // text showed in the menu
                  .attr("value", function (d) { return d.value; }) // corresponding value returned by the button


        // When the button is changed, run the updateChart function
        options_map.on("change", function(d) {

            // recover the option that has been chosen
            var selected_option_map = d3.select(this).property("value")
            // run the updateChart function with this selected option
            if (selected_option_map == "CORVA"){
              filter_pie(selected_option_map)
            }
            else {
            nieuwe_centrale_map(selected_option_map)
            filter_bar(selected_option_map)
            filter_pie(selected_option_map);
            }
        });

      })
    };

    function create_barchart(data_energie){

      // set the dimensions and margins of the graph
      var margin = {top: 50, right: 50, bottom: 50, left: 50};
      var width = 450 - margin.left - margin.right;
      var height = 450 - margin.top - margin.bottom;
      d3.select("#graph_energie").select("svg").remove();
      var svg = d3.select("#graph_energie")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var dat_jaar = d3.nest().key(function(d) { return d.jaar; }).entries(data_energie);
        var jaar = dat_jaar.map(function(d) {return d.key })
        var soort = dat_jaar[0].values.map(function(d) {return d.soort;});


        // Add X axis
        var x0 = d3.scaleBand()
                  .domain(jaar)
                  .rangeRound([0, width])
                  .padding([0.3]);

              svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x0).tickSize(0));


        var x1 = d3.scaleBand()
                    .domain(soort)
                    .rangeRound([0, x0.bandwidth()]);


        // Add Y axis
        var y = d3.scaleLinear()
                .domain([0, 100])
                .range([height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));


        var color = d3.scaleOrdinal()
        .domain(soort)
        .range(["#69b3a2","#404080","SteelBlue", "DarkOrange"]);
      // Show the bars

      var tooltip_bar = d3.tip()
                      .attr("class", "d3-tip")
                      .html(function(d) {return d.elekt_percentage + "%"} )

        svg.call(tooltip_bar);

        svg.append("g")
          .selectAll("g")
          // Enter in data = loop group per group
          .data(dat_jaar)
          .enter()
          .append("g")
            .attr("transform", function(d) { return "translate(" + x0(d.key) + ",0)"; })
          .selectAll("rect")
          .data(function(d){return d.values; })
          .enter()
          .append("rect")
            .attr("x", function(d) { return x1(d.soort); })
            .attr("y", function(d) { return y(d.elekt_percentage); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.elekt_percentage); })
            .attr("fill", function(d) { return color(d.soort); })
            .on("mouseover", tooltip_bar.show)
            .on("mouseout", tooltip_bar.hide);

        // Handmade legend
        svg.append("circle").attr("cx",20).attr("cy",0).attr("r", 6).style("fill", "#69b3a2");
        svg.append("circle").attr("cx",20).attr("cy",20).attr("r", 6).style("fill", "#404080");
        svg.append("circle").attr("cx",200).attr("cy",0).attr("r", 6).style("fill", "SteelBlue");
        svg.append("circle").attr("cx",200).attr("cy",20).attr("r", 6).style("fill", "DarkOrange");
        svg.append("text").attr("x", 30).attr("y", 0).text("Fossiele brandstoffen").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 20).text("Hernieuwbare energie").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 210).attr("y", 0).text("Kern energie").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 210).attr("y", 20).text("Overige bronnen").style("font-size", "15px").attr("alignment-baseline","middle");

    }
  }
    function create_piechart(data_afval){

          var width = 400;
          var height = 400;
          var margin = 50;

          // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
          var radius = Math.min(width, height) / 2 - margin;

          // append the svg object to the div called 'my_dataviz'
            d3.select("#piechart_waste").select("svg").remove();
            var svg = d3.select("#piechart_waste")
                        .append("svg")
                          .attr("width", width)
                          .attr("height", height)
                        .append("g")
                          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



        var color = d3.scaleOrdinal()
                        .domain(data_afval)
                        .range(d3.schemeSet2);

        // Compute the position of each group on the pie:
        var pie = d3.pie()
          .value(function(d) {return d.value; });
        var data_ready = pie(d3.entries(data_afval[0]));

        var arcGenerator = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);

        var tooltip_pie = d3.tip()
                        .attr("class", "d3-tip")
                        .html(function(d) {return d.value; } );

          svg.call(tooltip_pie);

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        var chart = svg.selectAll("mySlices")
                        .data(data_ready)
                        .enter()
                        .append('path')
                          .attr('d', arcGenerator)
                          .attr('fill', function(d){ return(color(d.data.key)) })
                          .attr("stroke", "black")
                          .style("stroke-width", "2px")
                          .style("opacity", 0.7)
                          .on("mouseover", tooltip_pie.show)
                          .on("mouseout", tooltip_pie.hide);
        // Now add the annotation. Use the centroid method to get the best coordinates


        }

          var data_choices = {"Opgeslagen radioactief afval": "CORVA", "Geen nieuwe centrale": "scenario0", "Nieuwe centrale Maasvlakte": "scenario1", "Nieuwe centrale Maasvakte & Eemshaven" : "scenario2"};
          var ready_options = d3.entries(data_choices);
          // Initialize the button
          var options = d3.select("#piechart_waste")
                          .append('select')

          // add the options to the button
         // Add a button
          options.selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
               	.data(ready_options)
                .enter()
              	.append('option')
                .text(function (d) { return d.key; }) // text showed in the menu
                .attr("value", function (d) { return d.value; }) // corresponding value returned by the button

          // When the button is changed, run the updateChart function
          options.on("change", function(d) {

              // recover the option that has been chosen
              var selected_option = d3.select(this).property("value")
              // run the updateChart function with this selected option
              update(selected_option);
          });
