var width = 800;
var height= 500;

//Create SVGs for background
var videoPlayer = d3.select("#videoPlayer")
  .append("svg:svg")
  .attr("width",width)
  .attr("height",height)

videoPlayer.append("rect")
  .attr("width",width)
  .attr("height",height);

var title = videoPlayer.append("h1")
    .attr("x", 200)
    .attr("y", 400)
    .attr("font-size", "20px")
    .style("fill", "white")
    .attr("text", "Analyzing Data or whatever");


var playButton = videoPlayer.append("polygon")
  .attr("id", "playButton")
  .attr("points", "380,450 380,470 400,460 ")
  .style("fill", "white")
  .on("click", function(d,i){
    console.log("test");
  });

var forwardButton = videoPlayer.append("g")
  .attr("id", "forwardButton");
forwardButton.append("polygon")
  .attr("points", "490,455 490,465 500,460")
  .style("fill", "white");
forwardButton.append("polygon")
  .attr("points", "500,455 500,465 510,460")
  .style("fill", "white");
forwardButton.on("click", function(d,i){
  console.log("test");
  });


var rewindButton = videoPlayer.append("g")
  .attr("id", "rewindButton");
rewindButton.append("polygon")
  .attr("points", "280,455 280,465 270,460")
  .style("fill", "white");
rewindButton.append("polygon")
  .attr("points", "270,455 270,465 260,460")
  .style("fill", "white");
rewindButton.on("click", function(d,i){
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
    d.genres = d.genres, //not sure about this one
    d.movie_title = d.movie_title,
    d.num_voted_users = +d.num_voted_users,
    d.cast_total_facebook_likes = +d.cast_total_facebook_likes,
    d.facenumber_in_poster = +d.facenumber_in_poster,
    d.plot_keywords =+d.plot_keywords, // not sure about this one
    d.movie_imdb_link = d.movie_imdb_link,
    d.num_user_for_reviews = +d.num_user_for_reviews,
    d.language = d.language,
    d.country = d.country,
    d.content_rating = d.content_rating,
    d.budget = +d.budget,
    d.title_year = +d.title_year,
    d.imdb_score = +d.imdb_score,
    d.aspect_ratio = +d.aspect_ratio,
    d.movie_facebook_likes = +d.movie_facebook_likes
  });
  console.log(data[0]);

// attempting to reorganize data
var titlesByYear = d3.nest()
.key(function(d) { return d.title_year; })
.key(function(d) { return d.movie_title; })
.entries(data);
// console.log(JSON.stringify(titlesByYear));
console.log(titlesByYear);

var colors = d3.scaleOrdinal(d3.schemeCategory10);

// adds a tooltip
var toolTip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
      var htmlString = `<h5>${d['movie_title']} (${d['title_year']})</h5>`;
      htmlString = htmlString + `<table>
        <tr><th>Rating: </th><td>${d['content_rating']}</td></tr>
        <tr><th>Genres: </th><td>${d['genres']}</td></tr>
        <tr><th>Duration: </th><td>${d['duration'] + ' min'}</td></tr>
        <tr><th>IMDB Score: </th><td>${d['imdb_score']}</td></tr>
        <tr><th>Director: </th><td>${d['director_name']}</td></tr>
        <tr><th>Actors: </th><td>${d['actor_1_name'] + ', ' + d['actor_2_name'] +
          ', ' + d['actor_3_name']}</td></tr>`;
      return htmlString;
    })

var svg = d3.select('svg');
svg.call(toolTip);

// simply adding every movie (not grouped by year)
var years = videoPlayer.selectAll('circle')
    .data(data)
    .enter()
    .append('g')
    .attr('id', function(d) {
      return d.key;
    });

    // the placements are arbitrary
    years.append('circle')
    .attr('cx', function(d) {
      return d.imdb_score*50;
    })
    .attr('cy', function(d) {
      return d.imdb_score*50;
    })
    .attr("fill",function(d,i){return colors(i);})
    .attr('r', function(d) {
      return d.imdb_score*10;
    })
    .attr('id', function(d) {
      return d.movie_title;
    })
    .on('mouseover', toolTip.show)
    .on('mouseout', toolTip.hide);

});
