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
  var titlesByYear = d3.nest()
.key(function(d) { return d.title_year; })
.key(function(d) { return d.movie_title; })
.entries(data);
// console.log(JSON.stringify(titlesByYear));
console.log(titlesByYear);

var years = videoPlayer.selectAll(".year")
    .data(titlesByYear)
    .enter()
    .append("g")
    .attr("id", function(d) {
      return d.key;
    });


//   videoPlayer.selectAll('circle')
// .data(data)
// .enter()
// .append('g');
//
// videoPlayer.append("circle")
//   // .attr('x', function(d) {
//   //   return regionScale(d.key);
//   // })
//   // .attr('y', function(d) {
//   //   return salesScale(d.value);
//   // })
//   .attr('cx', function(d) {
//     return d.imdb_score*10;
//   })
//   .attr('cy', function(d) {
//     return d.imdb_score*10;
//   });
//   // .style('fill',function(d, i ) {
//   //   return colors(i);
//   // });
//
});
