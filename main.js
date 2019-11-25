var width = 800;
var height= 500;


var maxAmount = 10;
// defines the maximum values (domain) and maximum radius values (range) for our cirlces

var radiusScale = d3.scaleLinear().domain([0, 10]).range([5, 80]);

var year = 2010;

//Create SVGs for background
var svg = d3.select("#videoPlayer")
  .append("svg:svg")
  .attr("width",width)
  .attr("height",height)
  .style("float", "left")

svg.append("rect")
  .attr("width",width)
  .attr("height",height);

var playButton = svg.append("polygon")
  .attr("id", "playButton")
  .attr("points", "380,450 380,470 400,460 ")
  .style("fill", "white")
  .on("click", function(d,i){
    console.log("test");
  });

d3.csv("movies.csv",function(data) {
  data.forEach(function(d) {
    d.color = d.color,
    d.director_name = d.director_name,
    d.num_critic_for_reviews = +d.num_critic_for_reviews,
    d.duration = +d.duration,
    d.director_facebook_likes = +d.director_facebook_likes,

    d.actor_1_name = d.actor_1_name,
    d.actor_2_name = d.actor_2_name,
    d.actor_3_name = d.actor_3_name,

    d.actor_1_facebook_likes = +d.actor_1_facebook_likes,
    d.actor_2_facebook_likes = +d.actor_2_facebook_likes,
    d.actor_3_facebook_likes = +d.actor_3_facebook_likes,

    d.gross = +d.gross,
    d.genres = d.genres,
    d.movie_title = d.movie_title,
    d.num_voted_users = +d.num_voted_users,
    d.cast_total_facebook_likes = +d.cast_total_facebook_likes,
    d.facenumber_in_poster = +d.facenumber_in_poster,
    d.plot_keywords = d.plot_keywords,
    d.movie_imdb_link = d.movie_imdb_link,
    d.num_user_for_reviews = +d.num_user_for_reviews,
    d.language = d.language,
    d.country = d.country,
    d.content_rating = d.content_rating,
    d.budget = +d.budget,
    d.title_year = +d.title_year,
    d.imdb_score = +d.imdb_score,
    d.aspect_ratio = +d.aspect_ratio,
    d.movie_facebook_likes = +d.movie_facebook_likes,
    d.radius = radiusScale(+d.imdb_score)
  });
  console.log(data[0]);

  // myNodes.sort(function (a, b) { return b.imdb_score - a.imdb_score; });

  var forceStrength = 0.01;



 let simulation = d3.forceSimulation()
  .force("charge", d3.forceManyBody().strength(-1))
  .alphaDecay(0)
   // .force("x", d3.forceX(width).strength(forceStrength))
   // .force("y", d3.forceY(height).strength(forceStrength))
   .force("collide", d3.forceCollide(
     function(d) {
     // console.log("radius" + radiusScale(d.imdb_score));
      return radiusScale(d.imdb_score);
   })          // set your radius function
 );




// adds a tooltip
var toolTip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
      var htmlString = `<h5>${d['movie_title']} (${d['title_year']})</h5>`;
      htmlString = htmlString + `<table>
        <tr><th>Rating: </th><td>${d['content_rating']}</td></tr>
        <tr><th>Genres: </th><td>${d['genres']}</td></tr>
        <tr><th>Duration: </th><td>${d['duration'] + ' min'}</td></tr>
        <tr><th>IMDb Score: </th><td>${d['imdb_score']}</td></tr>
        <tr><th>Director: </th><td>${d['director_name']}</td></tr>
        <tr><th>Actors: </th><td>${d['actor_1_name'] + ', ' + d['actor_2_name'] +
          ', ' + d['actor_3_name']}</td></tr>`;
      return htmlString;
    })

svg.call(toolTip);

// adds every movie in 2010
var movies = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('g')
    .attr('id', function(d) {
      return d.key;
  });

  var _zoom = d3.zoom()
   .scaleExtent([.05, 8])
   .on("zoom", function() {
     movies.attr("transform", d3.event.transform);
   });
 svg.call(_zoom);

 function phyllotaxis(radius) {
   var theta = Math.PI * (3 - Math.sqrt(5));
   return function(i) {
     var r = radius * Math.sqrt(i),
       a = theta * i;
     return {
       x: width / 2 + r * Math.cos(a),
       y: height / 2 + r * Math.sin(a)
     };
   };
 }
 var gui = d3.select("#videoPlayer");
 gui.append("span")
   .classed("zoom in", true)
   .text("+")
   .on("click", function() {
     _zoom.scaleBy(svg, 2);
   });
 gui.append("span")
   .classed("zoom out", true)
   .text("-")
   .on("click", function() {
     _zoom.scaleBy(svg, 0.5);
   })

function updateTitle() {
  d3.select("#title").text("Analyzing Movies: " + year);
}

var ratings =
    ["G", "PG", "PG-13", "R", "Not Rated"];


var colors = d3.scaleOrdinal().domain(ratings).range(d3.schemeCategory10);

function updateCircles() {
  // the placements are arbitrary
  var bubbles = movies.append('circle')

  .filter(function(d) {
    return d.title_year == year;
  })
  .attr("fill",function(d,i){return colors(d.content_rating);})
  .attr('stroke', function (d, i) { return d3.rgb(colors(d.content_rating)).darker(); })
  .attr('r', function(d) {
    return d.radius;
  })
  .on('mouseover', toolTip.show)
  .on('mouseout', toolTip.hide);

  simulation.nodes(data)
    .on('tick', ticker);

  function ticker() {
    bubbles
      .attr("cx", function (d) {
        // console.log("d.x " + d.x);

        return d.x;
      })

      .attr("cy", function (d) {
        // console.log("d.y " + d.y);

        return d.y;
      });
  }

}

    var center = { x: width / 2, y: height / 2 };





    // append text describing the drop down menu
    d3.select(videoPlayer)
        .append('g')
        .append('text')
        .text('Filter by Genre: ')
        .style('position', 'relative')
        .style('left', '80px');

    var genres = ["Action", "Adventure", "Animation", "Biography", "Comedy",
    "Crime", "Documentary", "Drama", "Family", "Fantasy", "Game-Show", "History",
    "Horror", "Music", "Musical", "Mystery", "Reality-TV", "Romance", "Sci-Fi",
    "Sport", "Thriller", "War", "Western"];

    // TO DO - color by radio buttons?
    var colorBy = ["Color", "Language", "Country", "Content rating"],
    j = 0;


    // Create the shape selectors
    var form = d3.select(videoPlayer).append("form");

    labels = form.selectAll("label")
        .data(colorBy)
        .enter()
        .append("label")
        .text(function(d) {return d;})
        .insert("input")
        .attr('type', 'radio')
        .attr("class", "shape")
        .attr('name','mode')
        .attr("value", function(d, i) {return i;})
        .property("checked", function(d, i) {return i===j;});

      // creates a drop-down menu to filter the movies by genre
      d3.select(videoPlayer)
          .append('g')
          .append('select')
          .attr('id', 'drop-down')
          .attr('multiple', 'true')
          .attr('size', 5)
          .style("border", "1px solid black")
          .style('position', 'relative')
          .style('left', '82px')
          .style('bottom', '2px')
          .selectAll('option')
          .data(genres)
          .enter()
          .append('option')
          .attr('value', function (d) {
            return d;
          })
          .text(function (d) {
            return d;
          });

    // creates a 'filter' button
    d3.select(videoPlayer)
        .append('g')
        .append('button')
        .style("border", "1px solid black")
        .style('position', 'relative')
        .style('left', '90px')
        .style('bottom', '4px')
        .text('Submit')
        .on('click', function() {

            var menu = document.getElementById('drop-down');
            var genre = [];
            for (var i = 0; i < menu.length; i++) {
              if (menu.options[i].selected) {
                genre.push(menu.options[i].value);
              }
            }

            // hides movies whose genre does not match the selected genre
            movies.selectAll('circle')
                .filter(function (d) {
                    var boolean = true;
                    for (var i = 0; i < genre.length; i++) {

                      if ((d.genres.includes(genre[i])) == false) {
                        boolean = false;
                        break;
                      }
                    }

                    if (boolean == false) {
                      return d.genres;
                    }
                })
                .transition()
                .duration(600)
                .delay(600)
                .attr('r', 0); // hidden through setting radius to 0

            // shows all movies whose genre match the selected genre
            movies.selectAll('circle')
                .filter(function (d) {
                  var boolean = true;
                  for (var i = 0; i < genre.length; i++) {

                      if ((d.genres.includes(genre[i])) == false) {
                        boolean = false;
                        break;
                      }
                  }

                  if (boolean == true) {
                      return d.genres;
                  }
                })
                .transition()
                .duration(600)
                .delay(600)
                .attr('r', function (d) {
                  return radiusScale(d.imdb_score);
                });
      });

    // initialize
    updateCircles();
    calculateInfo();

    d3.select(videoPlayer)
        .append('g')
        .append('text')
        .attr('id', 'text')
        .style('float', 'left');

    addText();

    var percentChangeNum;
    var percentChangeDuration;
    var maxScore;
    var scoreKeys;
    var maxLikes;
    var likesKeys;

    function calculateInfo() {
      numMovies = d3.nest()
        .key(function(d) { return d.title_year; })
        .rollup(function(v) { return v.length; })
        .map(data);

      // calculates percent change of the total number of movies in each year
      if (year > 2010) {
        percentChangeNum = Math.round(((numMovies["$" + year.toString()]
          - numMovies["$" + (year - 1).toString()])/numMovies["$" + (year - 1).toString()]) * 100);
      }

      moviesByCountry = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.country; })
        .rollup(function(v) { return v.length; })
        .map(data);

      moviesByLanguage = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.language; })
        .rollup(function(v) { return v.length; })
        .map(data);

      moviesByColor = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.color; })
        .rollup(function(v) { return v.length; })
        .map(data);

      moviesByDuration = d3.nest()
        .key(function(d) { return d.title_year; })
        .rollup(function(v) {
          return d3.mean(v, function(d) { return d.duration; })
        })
        .map(data);
      console.log(moviesByDuration);

      moviesByGross = d3.nest()
        .key(function(d) { return d.title_year; })
        .rollup(function(v) {
          return d3.mean(v, function(d) { return d.gross; })
        })
        .map(data);
      console.log(moviesByGross);

      moviesByContentRating = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.content_rating; })
        .rollup(function(v) { return v.length; })
        .map(data);
      console.log(moviesByContentRating);

      moviesByBudget = d3.nest()
        .key(function(d) { return d.title_year; })
        .rollup(function(v) {
          return d3.mean(v, function(d) { return d.budget; })
        })
        .map(data);
      console.log(moviesByBudget);

      moviesByFacebookLikes = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.movie_facebook_likes; })
        .key(function(d) { return d.movie_title; })
        .map(data);
      console.log(moviesByFacebookLikes);

      moviesByIMDbScore = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.imdb_score; })
        .key(function(d) { return d.movie_title; })
        .map(data);

      var movieColor = moviesByColor["$" + year.toString()].keys();
      var languages = moviesByLanguage["$" + year.toString()].keys();
      var countries = moviesByCountry["$" + year.toString()].keys();
      var contentRatings = moviesByContentRating["$" + year.toString()].keys();

      var IMDbScores = moviesByIMDbScore["$" + year.toString()].keys();
      var facebookLikes = moviesByFacebookLikes["$" + year.toString()].keys();

      // calculates percent of the movie market that the USA makes up
      percentMarket = Math.round(((moviesByCountry["$" + year.toString()]['$USA'])/
      (numMovies["$"+ year.toString()])) * 100);

      // finds the movie with the highest IMDb score
      outputScoresArr = findMax(IMDbScores, moviesByIMDbScore);
      maxScore = outputScoresArr[0];
      scoresKeys = outputScoresArr[1];

      // calculates percent change of the average duration of movies in each year
      if (year > 2010) {
        percentChangeDuration = Math.round(((moviesByDuration["$" + year.toString()]
          - moviesByDuration["$" + (year - 1).toString()])/moviesByDuration["$"
          + (year - 1).toString()]) * 100);
      }

      // finds the movie with the most Facebook likes
      outputLikesArr = findMax(facebookLikes, moviesByFacebookLikes);
      maxLikes = outputLikesArr[0];
      maxLikes = maxLikes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // adds comma to number
      likesKeys = outputLikesArr[1];

    }

    function addText() {
      var text = document.getElementById('text');

      // number of movies
      text.innerHTML = '<p><b>Year At a Glance</b><p>'
      text.innerHTML += 'There were ' + numMovies["$"+ year.toString()] +
      ' movies made in ' + year;

      percentChangeText(percentChangeNum);

      // movies by country
      text.innerHTML += '. <p>USA was the top creator of movies, comprising '
        + percentMarket + '% of the market.</p>';

      // avg. duration of movies
      text.innerHTML += 'The average duration of all the movies in ' + year +
      ' was ' + moviesByDuration["$" + year.toString()].toFixed(2);

      percentChangeText(percentChangeDuration);

      // movie with highest IMDb score
      if (scoresKeys.length == 1) {
        text.innerHTML += '.<p><i>' + scoresKeys[0].trim()
        + '</i> had the highest IMDb score with a ' + maxScore + '/10. </p>';
      } else {
        text.innerHTML += '.<p>' +  scoresKeys.length + ' movies tied for the highest IMDb score '
          + 'of ' + maxScore + '/10: <i>' + scoresKeys[0].trim() + '</i> and <i>'
          + scoresKeys[1].trim() + '</i>.</p>';
      }

      // movie with most likes on Facebook
      text.innerHTML += '<p> On Facebook, <i>' + likesKeys[0].trim()
      + '</i> garnered the most popularity with '+ maxLikes + ' likes. </p>';

    }

    function percentChangeText (percentChange) {
      if (year > 2010) {
        if (percentChange > 0) {
          text.innerHTML += ', up ' + percentChange + '% from ' + (year - 1);
        } else if (percentChange == 0) {
          text.innerHTML += ', with relatively no change from ' + (year - 1);
        } else {
          text.innerHTML += ', down ' + Math.abs(percentChange) + '% from ' + (year - 1);
        }
      }
    }

    function findMax(array, movieCategory) {
      output = [];
      max = 0;

      for (i = 0, length = array.length; i < length; i++) {
        score = array[i];
        score = score * 1; // changes number to string

        if (score > max) {
          max = score;
          movieArr = movieCategory["$" + year.toString()]["$" + max.toString()];
        }
      }

      keys = movieArr.keys();

      output[0] = max;
      output[1] = keys;

      return output;
    }

    function clearText() {
      document.getElementById('text').innerHTML = '';
    }

    function fastForwardMovies() {
      if (year == 2015) {
        forwardButton.style('display', 'none');
      }

      movies.selectAll('circle')
        .style('display', 'none');

      year++;

      if (year > 2010) {
        rewindButton.style('display', 'block');
      }

    }

    function rewindMovies() {
      if (year == 2011) {
        rewindButton.style('display', 'none');
      }

      movies.selectAll('circle')
        .style('display', 'none');

      year--;

      if (year < 2016) {
        forwardButton.style('display', 'block');
      }


    }

    var forwardButton = svg.append("g")
      .attr("id", "forwardButton");
      forwardButton.append("polygon")
        .attr("points", "490,455 490,465 500,460")
        .style("fill", "white");
      forwardButton.append("polygon")
        .attr("points", "500,455 500,465 510,460")
        .style("fill", "white");
      forwardButton.on("click", function(d,i){
        if (year < 2016) {
          fastForwardMovies();
          updateCircles();
          updateTitle();
          clearText();
          calculateInfo();
          addText();
        }
      });

    var rewindButton = svg.append("g")
      .attr("id", "rewindButton");
      rewindButton.append("polygon")
        .attr("points", "280,455 280,465 270,460")
        .style("fill", "white");
      rewindButton.append("polygon")
        .attr("points", "270,455 270,465 260,460")
        .style("fill", "white");
      rewindButton.on("click", function(d,i){
        if (year > 2010) {
          rewindMovies();
          updateCircles();
          updateTitle();
          clearText();
          calculateInfo();
          addText();

        }
      });

    if (year == 2010) {
      rewindButton.style('display', 'none');
    }


    var title = svg.append("text")
      .attr("id", "title")
      .attr("x", 50)
      .attr("y", 50)
      .attr("font-size", "32px")
      .style("fill", "white")
      .text("Analyzing Movies: " + year);




  var legends = d3.select("#legends").select("svg");
  legends.style("float", "left")

  legends.attr("width",'100%')
  .attr("height",height)
  legends.append("g")
    .attr("id", "legendRatings")
    .style('position', 'relative')
    .style('left', '82px')
    .style('bottom', '2px')

  var legendRatings = d3.legendColor()

    .shapeWidth(100)
    // .cells([1, 2, 3, 4, 5])
    .orient('vertical')
    .scale(colors);

  legends.select("#legendRatings")
    .call(legendRatings);





  });
