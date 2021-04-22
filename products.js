// STOCK DE PELICULAS

// tt0133093 - matrix
// tt0083658 - blade runner
// tt0119094 - faceoff
// tt0232500 - fast and furious
// tt1731141 - juego de ender
// tt0088763 - back to the future

var stock = ["tt0133093", "tt0083658", "tt0119094", "tt0232500", "tt1731141", "tt0088763"]
var products = new Array();

for (let i = 0; i < stock.length; i++) {
  url = (`http://www.omdbapi.com/?i=${stock[i]}&apikey=29cf23a5`)

  var jsonUrl = url;
  function Get(jsonUrl) {
    var Httpreq = new XMLHttpRequest(); // nuevo request
    Httpreq.open("GET", jsonUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
  }

  var json_obj = JSON.parse(Get(jsonUrl));

  // console.log("Pelicula " + json_obj.Title);

  let agregarPelicula = products.push({
    "name":json_obj.Title, 
    "desc": json_obj.Plot,
    "price": Math.floor(Math.random() * 20000) + 5000,
    "img": json_obj.Poster
  });

}