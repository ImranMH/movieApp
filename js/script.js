(function(){
  var token = '964c1664-abf7-4e67-91aa-4f0254da22aa';
  $(init);

  function init(){

    $('#search-movie').on('click',searchMovie);
    findMovie();
  }
  // loading function
  function findMovie (){
     var api2= "http://www.myapifilms.com/tmdb/searchMovie?movieName="+title+"&token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&language=en&includeAdult=1";
     var mUrl ='http://www.myapifilms.com/imdb/top?token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&data=1';
     //var api ='http://www.myapifilms.com/tmdb/searchMovie?movieName=city&token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&language=en&includeAdult=1'
     var bottom ="http://www.myapifilms.com/imdb/bottom?token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&data=1";
     var top ='http://www.myapifilms.com/imdb/top?end=20&token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&data=1';
     var search = "http://www.myapifilms.com/imdb/search?token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&searchFilter="+title+"&order=asc&titleType=feature&genres=";
     var movieTitle = $('#movie-title');
     var title = movieTitle.val() || "avatar";


     //var url="http://www.myapifilms.com/imdb/idIMDB?title=interstaller&callback=icb&token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=1&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&quotes=0"

     $.ajax({
        url:top,
        //jsonp: "callback",
        dataType: 'jsonp',
        success: listMovie,
     });
  }
  // event handler function
  function searchMovie(){

      var movieTitle = $('#movie-title');
      var title = movieTitle.val() || "avatar";
      // tmdb api
      var tmtitle ="http://www.myapifilms.com/tmdb/searchMovie?movieName="+title+"&token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&language=en&includeAdult=1"
      //imdb api
      var search = "http://www.myapifilms.com/imdb/search?token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&searchFilter=moviemeter&order=asc&titleType=feature&genres="+ title;
      var nameFul ="http://www.myapifilms.com/imdb/idIMDB?title="+title+"&token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=1&awards=0&moviePhotos=0&movieVideos=0&actors=2&biography=0&uniqueName=0&filmography=1&bornAndDead=0&starSign=0&actorActress=1&actorTrivia=0&similarMovies=1&adultSearch=0&goofs=0&quotes=0&fullSize=1"
     var url ="http://www.myapifilms.com/imdb/idIMDB?title="+title+"&token="+token+"&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=1&technical=0&filter=2&exactFilter=0&limit=3&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=1&adultSearch=0&goofs=0&quotes=0";
      $.ajax({
         url:nameFul,
         //jsonp: "callback",
         dataType: 'jsonp',
         success: listMovie
      });
  }
  // ajax success function
  function listMovie(doc){
    var parent = $('#movieLists');
    var movieTemplate = parent.find('.movielist').eq(0);

    parent.empty();
    //console.log(doc);
    var mvs = doc.data.movies;
    for(var m in mvs){
         var mv = mvs[m];
         //console.log(mv);
         var mvtitle = mv.title;
         var mvPlot = mv.plot;
         var mvPosterUrl = mv.urlPoster;
         var mvranking = mv.ranking;
         var mvrated = mv.rated;
         var mvruntime = mv.runtime;
         var mvyear = mv.year;
         var mvrating = mv.rating;
         var genres = mv.genres;
         var mvvote = mv.votes;
         var writers = mv.writers;
         var country = mv.countries;
         var filmingLocation = mv.filmingLocations;
         if (genres.length > -1){
           var genere =[]
           for(var i=0; i< genres.length; i++){
             genere.push(genres[i]);
           }
         }
         if (country.length > -1){
           var countries =[]
           for(var i=0; i< genres.length; i++){
             countries.push(country[i]);
           }
         }
         if (filmingLocation.length > -1){
           var location =[]
           for(var i=0; i< genres.length; i++){
             location.push(filmingLocation[i]);
           }
         }
         if (writers.length > -1){
           var wtr =[];
           for(var i=0; i< writers.length; i++){
             var writter = writers[i].name;
             wtr.push(writter);
           }
         }
         var mvDirtors = mv.directors;
         if (mvDirtors.length > -1){
          var dir = []
           for(var i=0; i< mvDirtors.length; i++){
             var director = mvDirtors[i].name;
             dir.push(director);
           }
         }
         var dyItem = movieTemplate.clone().addClass('clearfix');
         dyItem.find('.posterImg').attr('src',mvPosterUrl );
         var t1=dyItem.find('h2.mvTitle').html('Movie: '+mvtitle);
         dyItem.find('li.mvGenere').html('Genere: '+genres);
         dyItem.find('li.mvRated').html('Rated: '+mvrated);
         dyItem.find('li.mvDirtor').html('Director: '+dir);
         dyItem.find('li.mvWriter').html('writer: '+wtr);
         dyItem.find('li.mvPlot').html('Plot '+mvPlot);


         dyItem.find('li.mvRanking').html('Ranking :'+mvranking);
         dyItem.find('li.mvYear').html('Release Year '+mvyear);
         dyItem.find('li.mvRating').html('Rating '+mvrating);
         dyItem.find('li.mvRuntime').html("time Duration: "+mvruntime);
         dyItem.find('li.mvcountry').html('Country: '+countries);
         dyItem.find('li.mvVote').html('vote: '+mvvote);
         dyItem.find('li.mvLocation').html('Filming Locations:<br/>'+location);
         dyItem.appendTo(parent);
    }
  };

})();
