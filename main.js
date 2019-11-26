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
    d.x = width /2;
    d.y = height /2;
  });
  console.log(data[0]);

  // myNodes.sort(function (a, b) { return b.imdb_score - a.imdb_score; });

  var forceStrength = 0.01;



 let simulation = d3.forceSimulation()
 .force("collide",d3.forceCollide( function(d){
              	return d.radius}).iterations(16)
            )
            .force("charge", d3.forceManyBody())
            .force("y", d3.forceY().y(height / 2))
            .force("x", d3.forceX().x(width / 2))
  // .force("charge", d3.forceManyBody().strength(-1))
  // .alphaDecay(0)
  //  // .force("x", d3.forceX(width).strength(forceStrength))
  //  // .force("y", d3.forceY(height).strength(forceStrength))
  //  .force("collide", d3.forceCollide(
  //    function(d) {
  //    // console.log("radius" + radiusScale(d.imdb_score));
  //     return radiusScale(d.imdb_score);
  //  })
 ;






// adds a tooltip
var toolTip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
      budget = d.budget;
      budget = budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // cleans up data values with zeros
      if (budget == 0) {
        budget = '';
      }

      duration = d.duration;

      if (duration == 0) {
        duration = '';
      }

      var htmlString = `<h5>${d['movie_title']} (${d['title_year']})</h5>`;
      htmlString = htmlString + `<table>
        <tr><th>Rating: </th><td>${d['content_rating']}</td></tr>
        <tr><th>Genres: </th><td>${d['genres']}</td></tr>`;

      if (duration == 0) {
        htmlString += `<tr><th>Duration: </th><td>${duration}</td></tr>`;
      } else {
        htmlString += `<tr><th>Duration: </th><td>${duration + ' min'}</td></tr>`;
      }

      htmlString += `<tr><th>IMDb Score: </th><td>${d['imdb_score']}</td></tr>
        <tr><th>Director: </th><td>${d['director_name']}</td></tr>
        <tr><th>Actors: </th><td>${d['actor_1_name'] + ', ' + d['actor_2_name'] +
          ', ' + d['actor_3_name']}</td></tr>`;

      if (budget == 0) {
        htmlString += `<tr><th>Budget: </th><td>${budget}</td></tr>`;
      } else {
        htmlString += `<tr><th>Budget: </th><td>${'$' + budget}</td></tr>`;
      }

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
 svg
 .call(_zoom)
 .call(_zoom.transform, d3.zoomIdentity.translate(350, 250).scale(0.08));

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

// this is the default for how we'll color the circles
var movieColors =
    ["Color", " Black and White", ""];

var colors = d3.scaleOrdinal().domain(movieColors).range(d3.schemeCategory10);

var modes = [];

function updateCircles() {
  // delete old nodes
  movies.selectAll('circle').remove();
  var currentAttribute = "color";
  if (currentMode == 0) {
    currentAttribute = "color"
  } else if (currentMode == 1) {
    currentAttribute = "language"
  } else if (currentMode == 2) {
    currentAttribute = "country"
  } else if (currentMode == 3) {
    currentAttribute = "content_rating"
  }

  // add new nodes
  var appendedMovies = movies.append('circle')
  .filter(function(d) {
    return d.title_year == year;
  })
  .attr("fill",function(d,i){
    return colors(d[currentAttribute]);

  })
  .attr('stroke', function (d, i) { return d3.rgb(colors(d[currentAttribute])).darker(); })
  .attr('r', function(d) {
    return d.radius;
  })
  .on('mouseover', toolTip.show)
  .on('mouseout', toolTip.hide);

  simulation.nodes(data)
    .on('tick', ticker);
  function ticker() {
    appendedMovies
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });
  }
}

    var center = { x: width / 2, y: height / 2 };

    var genres = ["Action", "Adventure", "Animation", "Biography", "Comedy",
    "Crime", "Documentary", "Drama", "Family", "Fantasy", "Game-Show", "History",
    "Horror", "Music", "Musical", "Mystery", "Reality-TV", "Romance", "Sci-Fi",
    "Sport", "Thriller", "War", "Western"];

    var colorBy = ["Color", "Language", "Country", "Content rating"],
    j = 0;
    var currentMode = 0;

    // Radio buttons for colors
    var form = d3.select(videoPlayer).append("form")
      .style('position', 'relative')
      .style('top', '10px');

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
        .style('margin-right', '1em')
        .property("checked", function(d, i) {return i===j;})
        .on("change", function(){
          console.log(this.value)
          currentMode = this.value;
          calculateInfo();
          updateColorScale();
          updateCircles();
          updateLegend();
        });

      // append text describing the drop down menu
      d3.select(videoPlayer)
        .append('g')
        .append('text')
        .text('Filter by Genre: ')
        .style('position', 'relative')
        .style('top', '378px');

      // creates a drop-down menu to filter the movies by genre
      d3.select(videoPlayer)
          .append('g')
          .append('select')
          .attr('id', 'drop-down')
          .attr('multiple', 'true')
          .attr('size', 5)
          .style("border", "1px solid black")
          .style('position', 'relative')
          .style('left', '10px')
          .style('top', '377px')
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
        .style('left', '25px')
        .style('top', '375px')
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
    calculateInfo();
    updateColorScale();
    updateCircles();
    updateLegend();

    d3.select(videoPlayer)
        .append('g')
        .append('text')
        .attr('id', 'text')
        .style('float', 'left');

    addText();

    var percentChangeNum;
    var percentChangeDuration;
    var maxScore;
    var scoreMaxKeys;
    var minScore;
    var scoreMinKeys;
    var maxLikes;
    var likesKeys;
    var maxGross;
    var grossKeys;

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

      moviesByContentRating = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.content_rating; })
        .rollup(function(v) { return v.length; })
        .map(data);

      moviesByTitleGross = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.gross; })
        .key(function(d) { return d.movie_title; })
        .map(data);

      moviesByTitles = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.movie_title; })
        .map(data);

      moviesByGross = d3.nest()
        .key(function(d) { return d.title_year; })
        .rollup(function(v) {
          return d3.mean(v, function(d) { return d.gross; })
        })
        .map(data);

      moviesByBudget = d3.nest()
        .key(function(d) { return d.title_year; })
        .rollup(function(v) {
          return d3.mean(v, function(d) { return d.budget; })
        })
        .map(data);

      moviesByFacebookLikes = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.movie_facebook_likes; })
        .key(function(d) { return d.movie_title; })
        .map(data);

      moviesByIMDbScore = d3.nest()
        .key(function(d) { return d.title_year; })
        .key(function(d) { return d.imdb_score; })
        .key(function(d) { return d.movie_title; })
        .map(data);

       movieColors = moviesByColor["$" + year.toString()].keys();
      var languages = moviesByLanguage["$" + year.toString()].keys();
      var countries = moviesByCountry["$" + year.toString()].keys();
      var contentRatings = moviesByContentRating["$" + year.toString()].keys();

      modes = [movieColors, languages, countries, contentRatings];


      var IMDbScores = moviesByIMDbScore["$" + year.toString()].keys();
      var facebookLikes = moviesByFacebookLikes["$" + year.toString()].keys();
      var gross = moviesByTitleGross["$" + year.toString()].keys();

      // calculates percent of the movie market that the USA makes up
      percentMarket = Math.round(((moviesByCountry["$" + year.toString()]['$USA'])/
      (numMovies["$"+ year.toString()])) * 100);

      // finds the movie(s) with the highest and lowest IMDb scores
      outputScoresArr = findExtremum(IMDbScores, moviesByIMDbScore);
      maxScore = outputScoresArr[0];
      scoresMaxKeys = outputScoresArr[1];
      minScore = outputScoresArr[2];
      scoresMinKeys = outputScoresArr[3];

      // calculates percent change of the average duration of movies in each year
      if (year > 2010) {
        percentChangeDuration = Math.round(((moviesByDuration["$" + year.toString()]
          - moviesByDuration["$" + (year - 1).toString()])/moviesByDuration["$"
          + (year - 1).toString()]) * 100);
      }

      // finds the movie with the most Facebook likes
      outputLikesArr = findExtremum(facebookLikes, moviesByFacebookLikes);
      maxLikes = outputLikesArr[0];
      maxLikes = maxLikes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // adds comma to number
      likesKeys = outputLikesArr[1];

      // finds the movie with the highest gross
      outputGrossArr = findExtremum(gross, moviesByTitleGross);
      maxGross = outputGrossArr[0];
      maxGross = maxGross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      grossKeys = outputGrossArr[1];

      // calculates average gross and average budget
      avgGross = Math.round(moviesByGross["$" + year.toString()]);
      avgGross = avgGross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      avgBudget = Math.round(moviesByBudget["$" + year.toString()]);
      avgBudget = avgBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      differenceGross = outputGrossArr[0] - Math.round(moviesByGross["$" + year.toString()]);
      differenceGross = differenceGross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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

      // average duration of movies
      text.innerHTML += 'The average duration of all the movies in ' + year +
      ' was ' + moviesByDuration["$" + year.toString()].toFixed(2);

      percentChangeText(percentChangeDuration);

      // movies with highest and lowest IMDb scores
      if (scoresMaxKeys.length == 1) {
        gross = moviesByTitles["$" + year.toString()]["$" + scoresMaxKeys[0]][0].gross;
        grossFormatted = gross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        index = findIndex(moviesByTitleGross["$" + year.toString()], gross);

        if (gross > 0) {
          text.innerHTML += '.<p><i>' + scoresMaxKeys[0].trim()
            + '</i> had the highest IMDb score with a ' + maxScore + '/10. It grossed $'
            + grossFormatted + ' at the box office, making it the ' + (index + 1)
            + 'th highest grossing movie.</p>';
        } else {
          text.innerHTML += '.<p><i>' + scoresMaxKeys[0].trim()
            + '</i> had the highest IMDb score with a ' + maxScore + '/10.</p>'
        }

      } else {
        movie1Gross = moviesByTitles["$" + year.toString()]["$" + scoresMaxKeys[0]][0].gross;
        movie1GrossFormatted = movie1Gross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        movie2Gross = moviesByTitles["$" + year.toString()]["$" + scoresMaxKeys[1]][0].gross;
        movie2GrossFormatted = movie2Gross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        movie1Index = findIndex(moviesByTitleGross["$" + year.toString()], movie1Gross);
        movie2Index = findIndex(moviesByTitleGross["$" + year.toString()], movie2Gross);

        if (movie1Gross && movie2Gross > 0) {
          text.innerHTML += '.<p>' +  scoresMaxKeys.length + ' movies tied for the highest IMDb score '
            + 'of ' + maxScore + '/10: <i>' + scoresMaxKeys[0].trim() + '</i> and <i>'
            + scoresMaxKeys[1].trim() + '.</i><i></p><p>' + scoresMaxKeys[0].trim()
            + '</i> grossed $' + movie1GrossFormatted + ', making it the ' + (movie1Index + 1)
            + 'th highest grossing movie.</p><p><i>' + scoresMaxKeys[1].trim()
            + '</i> grossed $' + movie2GrossFormatted + ', making it the ' + (movie2Index + 1)
            + 'nd highest grossing movie.</p>';
        } else {
          text.innerHTML += '.<p>' +  scoresMaxKeys.length + ' movies tied for the highest IMDb score '
            + 'of ' + maxScore + '/10: <i>' + scoresMaxKeys[0].trim() + '</i> and <i>'
            + scoresMaxKeys[1].trim() + '.</i><i></p>';
        }

      }

      minGross = moviesByTitles["$" + year.toString()]["$" + scoresMinKeys[0]][0].gross;
      minGrossFormatted = minGross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      minIndex = findIndex(moviesByTitleGross["$" + year.toString()], minGross);

      if (scoresMinKeys.length == 1) {
        if (minGross > 0) {
          text.innerHTML += '<p><i>' + scoresMinKeys[0].trim()
            + '</i> had the lowest IMDb score with a ' + minScore + '/10. It grossed $'
            + minGrossFormatted + ' at the box office, making it the ' + (minIndex + 1)
            + 'th highest grossing movie.</p>';
        } else {
          text.innerHTML += '<p><i>' + scoresMinKeys[0].trim()
            + '</i> had the lowest IMDb score with a ' + minScore + '/10. </p>';
        }
      } else {
        text.innerHTML += '<p>' +  scoresMinKeys.length + ' movies tied for the lowest IMDb score '
          + 'of ' + minScore + '/10: <i>' + scoresMinKeys[0].trim() + '</i> and <i>'
          + scoresMinKeys[1].trim() + '</i>.</p>';
      }

      // movie with most likes on Facebook
      likedGross = moviesByTitles["$" + year.toString()]["$" + likesKeys[0]][0].gross;
      likedGrossFormatted = likedGross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      likedIndex = findIndex(moviesByTitleGross["$" + year.toString()], likedGross);

      if ((likesKeys[0].trim()) === (scoresMaxKeys[0].trim())) {
        text.innerHTML += '<p> In addition to having the highest IMDb score, <i>'
        + likesKeys[0].trim() + '</i> also garnered the most popularity on Facebook with '
        + maxLikes + ' likes.</p>';
      } else {
        text.innerHTML += '<p><i>' + likesKeys[0].trim() + '</i> garnered the most popularity on Facebook with '
          + maxLikes + ' likes. It had a gross of $' + likedGrossFormatted + ', making it the '
          + (likedIndex + 1) + 'th highest grossing movie.</p>';
      }

      // average gross and budget of the movies
      text.innerHTML += '<p> For ' + year + ', the average gross was $' + avgGross
      + '. The average budget was $' + avgBudget + '.<p>';

      // movie with the highest gross
      movieGenres = moviesByTitles["$" + year.toString()]["$" + grossKeys[0]][0].genres;

      text.innerHTML += '<p> The highest grossing movie was <i>' + grossKeys[0].trim()
      + '</i> with a gross of $'+ maxGross + ', which was $' + differenceGross
      + ' above the average.</p><i>' +  grossKeys[0].trim() + '</i> falls under the genres of '
      + movieGenres + '.<p>';

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

    function findExtremum(array, movieCategory) {
      output = [];
      max = 0;
      min = 10;

      for (i = 0, length = array.length; i < length; i++) {
        score = array[i];
        score = score * 1; // changes string to number

        if (score > max) {
          max = score;
          movieMaxArr = movieCategory["$" + year.toString()]["$" + max.toString()];
        }

        if (score < min) {
          min = score;
          movieMinArr = movieCategory["$" + year.toString()]["$" + min.toString()];
        }
      }

      keysMax = movieMaxArr.keys();
      keysMin = movieMinArr.keys();

      output[0] = max;
      output[1] = keysMax;
      output[2] = min;
      output[3] = keysMin;

      return output;
    }

    function findIndex(arr, keyToFind) {
      var i = 0, size = 0, key;

      keyToFind = '$' + keyToFind;

      numericKeyToFind = keyToFind.toString().replace('$', '') * 1;

      for (key in arr) {
        numericKey = key.toString().replace('$', '') * 1;

        if (numericKey > numericKeyToFind) {
          size++;
        }
      }

      return size;

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
          calculateInfo();
          updateColorScale();
          updateCircles();
          updateLegend();
          updateTitle();
          clearText();
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
          calculateInfo();
          updateColorScale();
          updateCircles();
          updateLegend();
          updateTitle();
          clearText();
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


  function updateColorScale() {
     colors = d3.scaleOrdinal().domain(modes[currentMode]).range(d3.schemeCategory10);
  }

  function updateLegend() {
    var legends = d3.select("#legends").select("svg");

    legends.attr("width",'400')
    .attr("height", 500)
    .attr("transform", "translate(800, -795)")
    legends.append("g")
      .attr("id", "legendRatings");

    var legendElements = d3.legendColor()

      .shapeWidth(100)
      // .cells([1, 2, 3, 4, 5])
      .orient('vertical')
      .scale(colors);

    legends.select("#legendRatings")
      .call(legendElements);
  }

  });
