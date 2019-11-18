var width = 800;
var height= 500;
//Create SVGs for background
var videoPlayer = d3.select("#videoPlayer")
  .append("svg:svg")
  .append("rect")
  .attr("width",width)
  .attr("height",height)
  .attr("fill", "black");
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
  //   var videoPlayer = videoPlayer.selectAll('circle')
  // .data(sumSalesPerCategory)
  // .enter()
  // .append('g');

  });


  // Axis setup
  // var xScale = d3.scaleLinear().domain(satmExtent).range([50, 470]);
  // var yScale = d3.scaleLinear().domain(satvExtent).range([470, 30]);
  //
  // var xScale2 = d3.scaleLinear().domain(actExtent).range([50, 470]);
  // var yScale2 = d3.scaleLinear().domain(gpaExtent).range([470, 30]);
  //
  // var xAxis = d3.axisBottom().scale(xScale);
  // var yAxis = d3.axisLeft().scale(yScale);
  //
  // var xAxis2 = d3.axisBottom().scale(xScale2);
  // var yAxis2 = d3.axisLeft().scale(yScale2);
