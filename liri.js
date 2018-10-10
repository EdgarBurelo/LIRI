require("dotenv").config();
let request = require("request");
let moment = require('moment');
let Spotify = require('node-spotify-api');
const keys = require("./keys.js");
var fs = require("fs");
const spotifyId = keys.spotify.id;
const spotifySecret = keys.spotify.secret;

let spotify = new Spotify({
    id: spotifyId,
    secret: spotifySecret
});

let array1= [];
for(var i = 3; i<process.argv.length;i++){
    array1.push(process.argv[i]);
}
//console.log(array1);   
let total = array1.length > 0 ? array1.reduce((a, b) => a + " " + b): false;
//console.log(total);
function concert() {
    let band = total != false ? total : "opeth";
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(response);
            let concert = JSON.parse(body);
            concert.forEach(element => {
                console.log("------------------------------------");
                console.log(element.venue.name);
                console.log(element.venue.country);
                let day = moment(element.datetime).format("MM/DD/YYYY");
                console.log(day);
                console.log("------------------------------------");
            });
        }
    });
};

function song() {
    let song = total != false ? total : "The Sign"; 
    //console.log(song);
    spotify
        .search({ type: 'track', query: song ,limit:1 })
        .then(function(response) {
            //console.log(response.tracks.items[0]);
            console.log("------------------------------------");
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Song's name: " + response.tracks.items[0].name);
            console.log("Link: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("------------------------------------");
            //console.log(response.tracks.items[0]);
        })
        .catch(function(err) {
            console.log(err);
    });
};

function movie() {
    let movie = total != false ? total : "Mr. Nobody"; 
    if (movie == "Mr. Nobody"){
        console.log("------------------------------------");
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix");
        
        console.log("------------------------------------");
    } else {
        request("http://www.omdbapi.com/?t="+ movie +"&y=&plot=short&apikey=trilogy", function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body));
                let movInfo = JSON.parse(body);
                console.log("------------------------------------");
                console.log("Title: "+ movInfo.Title);
                console.log("Year: "+ movInfo.Year);
                console.log("IMDB Rating: "+ movInfo.imdbRating);
                console.log("Rotten Tomatoes: "+ movInfo.Ratings[1].Value);
                console.log("Country: "+ movInfo.Country);
                console.log("Language: "+ movInfo.Language);
                console.log("Plot: "+ movInfo.Plot);
                console.log("Actors: "+ movInfo.Actors);
                console.log("------------------------------------");
            }
        });
    }
};

if (process.argv[2]){
    switch(process.argv[2]){
        case "concert-this":
            //console.log("concert-this");
            concert();            
            break;
        case "spotify-this-song":
            //console.log("spotify-this-song");
            song()
            break;
        case "movie-this":
            //console.log("movie-this");
            movie()
            break;
        case "do-what-it-says":
            //console.log("do-what-it-says");
            fs.readFile("random.txt", "utf8", function(error, data) {
                if (error) {
                  return console.log(error);
                }
                // We will then print the contents of data
                //console.log(data);
              
                // Then split it by commas (to make it more readable)
                var dataArr = data.split(",");
                //console.log(dataArr);
                total = dataArr[1];
                switch(dataArr[0]){
                    case "concert-this":
                        concert();            
                        break;
                    case "spotify-this-song":
                        song()
                        break;
                    case "movie-this":
                        movie()
                        break;
                
                }
            });
            break;
        default:
            console.log("First Command is not a valid action");
            break;
    }
};