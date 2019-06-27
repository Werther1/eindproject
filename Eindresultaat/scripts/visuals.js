window.onload=function(){
    //maak visualisaties
    filter_map("normaal");
    filter_pie("normaal");
    filter_bar("normaal");

    //maak kaart door een specifieke randvoorwaarde mee tegeven
    // open data voor de kaart en geef data en voorwaarde mee
    function filter_map(input){
      d3.json("/datasets/gemeenten.geojson").then(function(data){
        var titel = "Veiligheidszones omtrent kernenergie Nederland"
        create_map(data,input,titel);
      })
    };

    // maak een barchart door een specifieke randvoorwaarde mee te geven.
    //open data en filter volgens randvoorwaarde en geef data en randvoorwaarde mee
    function filter_bar(input){
      d3.json("/datasets/electro.json").then(function(data){
      var filter_normaal = data.filter(function (d){ return (d.jaar != "Scenario1" && d.jaar != "Scenario2" );});
      var filter_scenario1 = data.filter(function (d){ return (d.jaar != "Scenario2" );});
      var filter_scenario2 = data.filter(function (d){ return (d.jaar != "Scenario1" );});

      if (input == "normaal"){
          titel = "Percentage elektriciteit per energiebron";
          create_barchart(filter_normaal,input,titel);}
      else if (input == "scenario1"){
          titel = "Percentage elektriciteit, met één extra kerncentrale";
          create_barchart(filter_scenario1,input,titel);}
      else if (input == "scenario2"){
          titel = "Percentage elektriciteit, met twee extra kerncentrales";
          create_barchart(filter_scenario2,input,titel);}
      else if (input == "COVRA"){
          titel = "Percentage elektriciteit per energiebron";
          create_barchart(filter_normaal,input,titel);}
      });
    }

    // maak een piechart door een specifieke randvoorwaarde mee te geven.
    //open data en filter volgens randvoorwaarde en geef data en randvoorwaarde mee
    function filter_pie(input){
      d3.json("/datasets/kernafval_scenario.json").then(function(data){
      var filter_normaal = data.filter(function (d){ return (d.scenario == "scenario0" );});
      var filter_scenario1 = data.filter(function (d){ return (d.scenario == "scenario2");});
      var filter_scenario2 = data.filter(function (d){ return (d.scenario == "scenario1");});
      var filter_COVRA = data.filter(function (d) {return (d.scenario == "COVRA" );});
      if (input == "normaal"){
          titel ="Kernafval geproduceerd in Borssele";
          create_piechart(filter_normaal,input, titel);}
      else if (input == "scenario1"){
          titel = "Kernafval, scenario met één nieuwe centrales";
          create_piechart(filter_scenario1,input,titel);}
      else if (input == "scenario2"){
          titel = "Kernafval, scenario met twee centrales";
          create_piechart(filter_scenario2,input,titel);}
      else if (input == "COVRA"){
          titel = "Kernafval opgeslagen bij het COVRA";
          create_piechart(filter_COVRA,input,titel);}


      });
    }
      // deze functie creërt de veiligheidszones voor de scenario's
      // ,waarin een nieuwe centrale wordt gebouwd.
      function nieuwe_centrale_map(input){
        d3.select("#safety_zone_map").selectAll("#zone1").remove();
        d3.select("#safety_zone_map").selectAll("#zone2").remove();
        d3.select("#safety_zone_map").selectAll("#zone3").remove();
        var width = 700;
        var height = 900;

      // Map and projection
        var projection = d3.geoMercator()
                          .center([5, 52])
                          .scale(8500)
                          .translate([ width/2, height/2 ]);

        var path = d3.geoPath()
                      .projection(projection);

        //locatie nieuwe centrales
        var Maasvlakte=[4.031126,51.9632789];
        var Eemshaven=[6.8354937,53.4385887];

        // maak cirkels met een omtrek die overeenkomt met de omtrek van de veiligheidszones.
        // hou rekening met de omtrek van de aarde om exacte coördinaten te bereken
        var circumference = 6371000 * Math.PI * 2;
        var angle5km = 5000 / circumference * 360;
        var angle10km= 10000 / circumference * 360;
        var angle20km= 20000 / circumference * 360;

        // maak svg voor de cirkels
        zones = d3.select("#safety_zone_map")
                  .select("svg")
                  .attr("width",width)
                  .attr("height",height);

        // check met behulp van input wel scenario gemaakt moet worden.
        if (input == "scenario1" ){
          input = Maasvlakte
          //bereken coordinaten veiligheidszones
          var circle_5km=d3.geoCircle().center(input).radius(angle5km)
          var circle_10km=d3.geoCircle().center(input).radius(angle10km)
          var circle_20km=d3.geoCircle().center(input).radius(angle20km)

          // maak veiligheidszones
          zones.append("path")
                .attr("id","zone1")
                .attr("d", path(circle_5km()))
                .attr("class","circle")
                .attr("fill","transparent")
                .style("stroke", "red")
                .style("stroke-width", "3px")
                .style("stroke-dasharray", "5");
          zones.append("path")
                .attr("id","zone2")
                .attr("d", path(circle_10km()))
                .attr("class","circle")
                .attr("fill","transparent" )
                .style("stroke", "orange")
                .style("stroke-width", "3px")
                .style("stroke-dasharray", "5");
          zones.append("path")
                .attr("id","zone3")
                .attr("d", path(circle_20km()))
                .attr("class","circle")
                .attr("fill","transparent" )
                .style("stroke", "yellow")
                .style("stroke-width", "3px")
                .style("stroke-dasharray", "5");
        }
        if (input == "scenario2"){
          input = [Maasvlakte, Eemshaven];
          for (i = 0; i < 2; i++){
            // bereken coordinaten veiligheidszones
          var circle_5km=d3.geoCircle().center(input[i]).radius(angle5km)
          var circle_10km=d3.geoCircle().center(input[i]).radius(angle10km)
          var circle_20km=d3.geoCircle().center(input[i]).radius(angle20km)

          //maak veiligheidszones
          zones.append("path")
                .attr("id","zone1")
                .attr("d", path(circle_5km()))
                .attr("class","circle")
                .attr("fill","transparent")
                .style("stroke", "red")
                .style("stroke-width", "3px")
                .style("stroke-dasharray", "5");
          zones.append("path")
                .attr("id","zone2")
                .attr("d", path(circle_10km()))
                .attr("class","circle")
                .attr("fill","transparent" )
                .style("stroke", "orange")
                .style("stroke-width", "3px")
                .style("stroke-dasharray", "5");
          zones.append("path")
                .attr("id","zone3")
                .attr("d", path(circle_20km()))
                .attr("class","circle")
                .attr("fill","transparent" )
                .style("stroke", "yellow")
                .style("stroke-width", "3px")
                .style("stroke-dasharray", "5");
        }


        }

          }
      // controleer input op welke kleuren er gebruikt zullen worden bij kaart gemeenten.
      //scenario's zorgen voor andere kleuren voor enkele gemeenten
      function kleur_locaties(naam,input){
        console.log(input)
        var color = "#69b3a2";
        var color_select = "#006b85";
          if (input == "COVRA_pie"){
            if (naam == "Vlissingen") {
                return color_select;}
            else {
                return color;}
          }
          else if (input == "normaal_bar"){
            if (naam == "Borsele"){
                return color_select;}
            else {
                return color;}
          }
          else if (input == "scenario1_bar"){
              if (naam == "Borsele"){
                return color_select;}
              else if ( naam == "Rotterdam"){
                  return color_select;}
              else {
                return color;}
          }
          else if (input == "scenario2_bar"){
              if (naam == "Borsele"){
                return color_select;}
              else if ( naam == "Rotterdam"){
                  return color_select;}
              else if ( naam == "Eemsmond"){
                  return color_select;}
              else {
                return  color;}
          }
          else {
              return  color;}

        }



    function create_map(data_gemeenten,input){

    d3.select("#safety_zone_map").select("svg").remove();
    d3.select("#safety_zone_map").select("select").remove();

      // maak opties voor het kiezen van scenario's
      var data_choices_map = {"Geen nieuwe centrale": "normaal", "Nieuwe centrale Maasvlakte": "scenario1", "Nieuwe centrale Maasvakte & Eemshaven" : "scenario2", "Opgeslagen radioactief afval": "COVRA"};
      var ready_options_map = d3.entries(data_choices_map);
      // maak knop
      var options_map = d3.select("#safety_zone_map")
                      .append('select');

      // voeg knop toe en opties toe.
      options_map.selectAll('myOptions')
                .data(ready_options_map)
                .enter()
                .append('option')
                .text(function (d) { return d.key; }) // tekst van opties in menu
                .attr("value", function (d) { return d.value; }); // bijbehorende waarde


      // wanneer nieuwe scneario wordt aangeklikt
      options_map.on("change", function(d) {

          // geef randvoorwaarde mee
          var selected_option_map = d3.select(this).property("value");
          // maak visualisaties volgens randvoorwaarde

          nieuwe_centrale_map(selected_option_map);
          filter_bar(selected_option_map);
          filter_pie(selected_option_map);

      });

         var width = 700;
         var height = 900;

        // maak projectie voor in delen kaart
         var projection = d3.geoMercator()
                            .center([5, 52])
                            .scale(8500)
                            .translate([ width/2, height/2 ]);

          // Maak svg voor kaart
         var svg = d3.select("#safety_zone_map")
                      .append("svg")
                        .attr("width", width)
                        .attr("height", height);

      // geef chart een titel
      var titel_map = svg.append("g")
                          .attr("id","titel_map")
                          .append("text")
                          .attr("id","titel_map")
                          .attr("x", (width - 350))
                          .attr("y", (height - 850))
                          .attr("text-anchor", "middle")
                          .style("font-size", "24px")
                          .style("text-decoration", "underline")
                          .text("Veiligheidszones omtrent kernenergie Nederland");




         var path = d3.geoPath()
                        .projection(projection);

         // maak de kaart aan en kleur de gemeenten volgens scenario
         svg.append("g")
             .selectAll("path")
             .data(data_gemeenten.features)
             .enter()
             .append("path")
                .attr("id","gemeenten")
               .attr("fill", function(d){ return kleur_locaties(d.properties.areaName,input) ;})
               .attr("d", path)
             .style("stroke","black");

          // maak kleuren aan voor de veiligheidszones
          var colors = d3.scaleOrdinal(["orange","red","yellow"]);

          // open data veiligheidszones
          d3.json("/datasets/maatregel_zone.geojson").then(function(data_veilig) {
          //filter de bruikbare coordinaten
          var filter = data_veilig.features.filter(function (d){ return (d.geometry != null);});

          //zet coordinaten om van rijksdriehoekstelsel naar gps
          for (i = 0; i < filter.length; i++) {
            for (j = 0; j < 1; j++){
              for (k= 0; k < 49; k++){
                  gps= ConvertRdToLatLong(filter[i].geometry.coordinates[j][k][0], filter[i].geometry.coordinates[j][k][1]);
                  filter[i].geometry.coordinates[j][k][0] = gps[0];
                  filter[i].geometry.coordinates[j][k][1] = gps[1];
              }
          }
        }
        // maak kaart veiligheidszones
        svg.append("g")
            .selectAll("path")
            .data(filter)
            .enter()
            .append("path")
              .attr("id","veiligheidszone")
              .attr("fill","transparent" )
              .attr("d", path)
            .style("stroke",function(d, i) {return colors(i);})
            .style("stroke-width", "3px")
            .style("stroke-dasharray", "5");

        svg.selectAll("path");


        //maak legenda die
        var size = d3.scaleSqrt()
                      .domain([0, 20])  // What's in the data, let's say it is percentage
                      .range([0, 70]);  // Size in pixel

        // voeg legenda toe voor veiligheidszones
        var km_omtrek = [5, 10, 20];
        var xCircle = 70;
        var xLabel = 150;
        var yCircle = 250;
        var colors_legend = d3.scaleOrdinal(["red","orange","yellow"]);

        // maak cirkels
        var legend_map = svg.selectAll("legend")
                            .data(km_omtrek)
                            .enter()
                            .append("circle")
                              .attr("cx", xCircle)
                              .attr("cy", function(d){ return yCircle - size(d) ;} )
                              .attr("r", function(d){ return size(d) ;})
                              .style("fill", "none")
                              .attr("stroke", function(d,i) {return colors_legend(i);})
                              .attr("stroke-dasharray","5")
                              .attr("stroke-width", "3");

                          // maak de lijnen voor onderschijdt van zones
                          svg.selectAll("legend")
                            .data(km_omtrek)
                            .enter()
                            .append("line")
                              .attr('x1', function(d){ return xCircle + size(d) ;} )
                              .attr('x2', xLabel)
                              .attr('y1', function(d){ return yCircle - size(d) ;} )
                              .attr('y2', function(d){ return yCircle - size(d) ;} )
                              .attr('stroke', 'black')
                              .style('stroke-dasharray', "2");

                        // geef de naam van de veiligheidszone weer
                        svg.selectAll("legend")
                            .data(km_omtrek)
                            .enter()
                            .append("text")
                              .attr('x', xLabel)
                              .attr('y', function(d){ return yCircle - size(d) ;} )
                              .text( function(d){ if( d == 5){
                                                    return d +"km: Evacutie";}
                                                  else if (d == 10){
                                                    return d +"km: Jodium";}
                                                  else if (d == 20){
                                                    return d +"km: Schuil";} })
                              .style("font-size", 12)
                              .attr('alignment-baseline', 'middle');

            });
          }

    function create_barchart(data_energie,input,titel){

      d3.select("#graph_energie").select("svg").remove();
      d3.select("#graph_energie").select("button").remove();

      // maak dimensies aan
      var margin = {top: 50, right: 50, bottom: 50, left: 50};
      var width = 450 - margin.left - margin.right;
      var height = 500 - margin.top - margin.bottom;

      // maak de basis van de barchart volgends dimensies
      var svg = d3.select("#graph_energie")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
          .on("mouseover", function(d){ if (input == "normaal") {filter_map("normaal_bar");}
                                        else if (input == "scenario1") {filter_map("scenario1_bar");}
                                        else if (input == "scenario2") {filter_map("scenario2_bar");}
                                      })
          .on("mouseout", function(d){ if (input == "normaal") {filter_map("normaal");}
                                        else if (input == "scenario1") {filter_map("scenario1");}
                                        else if (input == "scenario2") {filter_map("scenario2");}
                                      });



        var title_bar = svg.append("g")
                            .attr("id","titel_bar")
                            .append("text")
                            .attr("id","titel_bar")
                            .attr("x", (width - 200))
                            .attr("y", (height - 410))
                            .attr("text-anchor", "middle")
                            .style("font-size", "16px")
                            .style("text-decoration", "underline")
                            .text(titel);


        // maak data leesbaar voor d3
        var dat_jaar = d3.nest().key(function(d) { return d.jaar; }).entries(data_energie);
        var jaar = dat_jaar.map(function(d) {return d.key ;});
        var soort = dat_jaar[0].values.map(function(d) {return d.soort;});


        // voeg x as toe
        var x0 = d3.scaleBand()
                  .domain(jaar)
                  .rangeRound([0, width])
                  .padding([0.3]);

              svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x0).tickSize(0));

        // voeg tweede xas toe voor subgroepen barchart
        var x1 = d3.scaleBand()
                    .domain(soort)
                    .rangeRound([0, x0.bandwidth()]);

        // voeg y as toe
        var y = d3.scaleLinear()
                .domain([0, 100])
                .range([height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // maak kleuren aan
        var color = d3.scaleOrdinal()
        .domain(soort)
        .range(["#69b3a2","#7b95ab","#467582","#312d3a"]);

        // maak toolbar aan die percentage weergeeft
      var tooltip_bar = d3.tip()
                      .attr("class", "d3-tip")
                      .html(function(d) {return d.elekt_percentage + "%";} );

        // roep toolbar aan
        svg.call(tooltip_bar);

        // maak barchat, keys zijn de afgelopen jaren / scenario's
        // maak bars met die per jaar het percentage elektriciteit weergeven
        svg.append("g")
          .selectAll("g")
          .data(dat_jaar)
          .enter()
          .append("g")
            .attr("transform", function(d) { return "translate(" + x0(d.key) + ",0)"; })
          .selectAll("rect")
          .data(function(d){return d.values; })
          .enter()
          .append("rect")
            .attr("class", "rect")
            .attr("x", function(d) { return x1(d.soort); })
            .attr("y", function(d) { return y(d.elekt_percentage); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.elekt_percentage); })
            .attr("fill", function(d) { return color(d.soort); })
            .on("mouseover", tooltip_bar.show)
            .on("mouseout", tooltip_bar.hide);

        // maak legenda aan
        svg.append("circle").attr("id","legend_pie").attr("cx",20).attr("cy",20).attr("r", 6).style("fill", "#69b3a2");
        svg.append("circle").attr("id","legend_pie").attr("cx",20).attr("cy",40).attr("r", 6).style("fill", "#7b95ab");
        svg.append("circle").attr("id","legend_pie").attr("cx",200).attr("cy",20).attr("r", 6).style("fill", "#467582");
        svg.append("circle").attr("id","legend_pie").attr("cx",200).attr("cy",40).attr("r", 6).style("fill", "#312d3a");
        svg.append("text").attr("id","legend_pie").attr("x", 30).attr("y", 20).text("Fossiele brandstoffen").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("id","legend_pie").attr("x", 30).attr("y", 40).text("Hernieuwbare energie").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("id","legend_pie").attr("x", 210).attr("y", 20).text("Kern energie").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("id","legend_pie").attr("x", 210).attr("y", 40).text("Overige bronnen").style("font-size", "15px").attr("alignment-baseline","middle");

    }

    function create_piechart(data_afval,input,titel){
      d3.select("#piechart_waste").select("svg").remove();
      d3.select("#piechart_waste").select("button").remove();


      // dimensies
      var width = 450;
      var height = 450;
      var margin = 100;

      // maak de radius van de piechart aan
      var radius = Math.min(width, height) / 2 - margin;

      // maak svg aan voor de piechart met basis dimensies
      var svg = d3.select("#piechart_waste")
                    .append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .on("mouseover", function(d){ if (input == "COVRA") {filter_map("COVRA_pie");}})
                      .on("mouseout", function(d){ if (input == "COVRA") { filter_map( "normaal");}});


                var graph = svg.append("g")
                      .attr("transform", "translate(" + width / 2.8 + "," + height / 2 + ")");


      var titel_pie = svg.append("text")
                        .attr("id","titel_pie")
                        .attr("x", (width - 280))
                        .attr("y", (height - 430))
                        .attr("text-anchor", "middle")
                        .style("font-size", "16px")
                        .style("text-decoration", "underline")
                        .text(titel);


    // geef de kleuren weer voor data_afval
    var color = d3.scaleOrdinal()
                    .domain(data_afval)
                    .range(["#69b3a2","#7b95ab","#d6f4eb","#4f5863s","#66c1d8","#005b72","#282833"]) ;



    // bepaal de positie van elke value op de piechart en geef beste plek terug
    var pie = d3.pie()
      .value(function(d) {return d.value; });
    var data_ready = pie(d3.entries(data_afval[0]));
    var data_filter = data_ready.filter(function (d){ return (d.data.key != "scenario");});
    // bereken radius van de data
    var arcGenerator = d3.arc()
                        .innerRadius(50)
                        .outerRadius(radius);

    // maak toeltip die percentage elektriciteit aangeeft
    var tooltip_pie = d3.tip()
                    .attr("class", "d3-tip")
                    .html(function(d) {return d.value; } );

    // maar de piechar. elke onderdeel van de kaar (path) wordt gemaakt met behulp van arc.
    var chart = graph.selectAll("slices")
                    .data(data_ready)
                    .enter()
                    .append('path')
                      .attr("id", "piechart")
                      .attr("class", "slices")
                      .attr('d', arcGenerator)
                      .attr('fill', function(d){ return(color(d.data.key)) ;})
                      .attr("stroke", "black")
                      .style("stroke-width", "2px")
                      .style("opacity", 0.7)
                      .on("mouseover", tooltip_pie.show)
                      .on("mouseout", tooltip_pie.hide);


      // roep tooltip aan
      chart.call(tooltip_pie);

      // maak legenda voor piechart aan
      // geef locatie legenda vorm
      var legend_pie = svg.selectAll(".legend")
                          .data(data_filter)
                          .enter().append("g")
                          .attr("transform", function(d,i){
                            return "translate(" + (width - 150) + "," + (i * 15 + 50) + ")";})
                          .attr("class", "legend");

      //maak de cirkels en geef ze een kleur
      legend_pie.append("circle") // make a matching color rect
                  .attr("r", 4)
                  .attr("fill", function(d) { return (color(d.data.key)) ;});

      //maak de tekst
      legend_pie.append("text")
                .text(function(d){
                  return d.data.key;
                })
                .style("font-size", 12)
                .attr("y", 5)
                .attr("x", 11);


    }
    };
