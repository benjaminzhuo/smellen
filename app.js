var express = require("express");
var app = express();
var request = require("request");



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
    console.log(req.query.food);
    console.log(req.query.loc);
    var searchRequest = {
        term:req.query.food,
        location:req.query.loc
    };
    var data;
    client.search(searchRequest).then(response => {
        firstResult = response.jsonBody.businesses[1];
        var string = JSON.stringify(firstResult, null, 4);
        data = JSON.parse(string);
        res.render("results", {data: data});
        console.log(data);
    }).catch(e => {
        console.log(e);
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yerrr");
});