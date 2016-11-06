var express = require('express');
var jade = require('jade');
var news = require('./news');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

// Serve static file
app.use(express.static(__dirname + '/public'));

// View Engine setup
app.set('view engine', 'jade');
app.set('views', './views');

// Get latest news from site when a GET request made to the homepage
app.get('/', function(req, res) {
  news.fetchNews(req, res);
});

app.get('/news', function(req, res) {
  var url = req.query.link;
  request(url, function(error, response, body) {

    if (!error && response.statusCode === 200) {

      var $ = cheerio.load(body);

      var news = $('div.article p');
      var newsResponse = '';
      news.each(function(i, elem) {
        newsResponse += news[i].children[0].data;
      }); // End eac

      res.send({news : newsResponse});

    } // End if
  }); // End request

}); // End app.get

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Server running at port ' + port);
});
