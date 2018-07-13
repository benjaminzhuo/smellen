var express = require("express");
var app = express();
var request = require("request");

var searchRequest = {
  term:'chinese',
  location:'11204'
};
app.use(express.static(__dirname + '/public'));
const yelp = require('yelp-fusion');
const apiKey = 'IduwTCt23YrUfM6ItMYTUpMQ2m4EnFnKoe864OhlysThSnYan0uIY1O_YsudcXPi0fnhZQMYS52Md6sfjBaXCdtQr_nic9LJtuo7BUMjIB1SaBP9X0uvXm9ACuZHW3Yx';
const client = yelp.client(apiKey);
app.set("view engine", "ejs")

app.get("/", function(req, res){
   res.render("search"); 
});

app.get("/results", function(req, res){
    var firstResult;
    client.search(searchRequest).then(response => {
        firstResult = response.jsonBody.businesses[1];
        const prettyJson = JSON.stringify(firstResult, null, 4);
        console.log(prettyJson);
    }).catch(e => {
        console.log(e);
    });
    res.render("results");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yerrr");
});