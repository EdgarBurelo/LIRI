require("dotenv").config();
let request = require("request");
let moment = require('moment');
let Spotify = require('node-spotify-api');
const keys = require("./keys.js");
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

if (process.argv[2]){
    switch(process.argv[2]){
        case "concert-this":
            //Codeblock
            //console.log("concert-this");
            let band = total != false ? total : "opeth";
            request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function(error, response, body) {
                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {
                    // Parse the body of the site and recover just the imdbRating
                    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
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
            break;
        case "spotify-this-song":
            //console.log("spotify-this-song");
            let song = total != false ? total : "The Sign"; 
            //console.log(song);
            spotify
                .search({ type: 'track', query: song ,limit:1 })
                .then(function(response) {
                    //console.log(response.tracks.items[0]);
                    console.log("Artist: " + response.tracks.items[0].artists[0].name);
                    console.log("Song's name: " + response.tracks.items[0].name);
                    console.log("Link: " + response.tracks.items[0].preview_url);
                    console.log("Album: " + response.tracks.items[0].album.name);
                    //console.log(response.tracks.items[0]);
                })
                .catch(function(err) {
                    console.log(err);
            });
            break;
        case "movie-this":
            console.log("movie-this");
            //Codeblock
            break;
        case "do-what-it-says":
            console.log("do-what-it-says");
            //Codeblock
            break;
        default:
            console.log("First Command is not a valid action");
            break;
    }
};