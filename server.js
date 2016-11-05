var express = require('express');
var jade = require('jade');
var http = require('http');
var news = require('./news');

var app = express();

// Serve static file
app.use(express.static(__dirname + '/public'));

// View Engine setup
app.set('view engine', 'jade');
app.set('views', './views');

app.get('/', function(req, res) {
  news.fetchNews(req, res);
});


app.listen(3000, function() {
    console.log('Server running at port 3000');
});
