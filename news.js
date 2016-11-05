var request = require('request');
var cheerio = require('cheerio');

function fetchNews(req, res) {

  var htmlHead = {'Content-Type' : 'text/html'};

    if(req.url === '/') {
      var url = 'http://www.manoramaonline.com/';

      request(url, function (error, response, body) {

        if (!error && response.statusCode == 200) {

          var $ = cheerio.load(body);

          // Select all H2 elements with class .Geoge01
          var news = $('.Georgia01');
          var newsResponse = '<ul>';
          var href = '';
          var title = '';

          news.each(function(i, elem) {
            href = news[i].children[0].attribs.href;
            title = news[i].children[0].attribs.title;
            newsResponse += '<li><a href="' + url + href + '">' +
                             title + '</a></li>';
          });
          newsResponse += '</ul>';

          res.writeHead(200, htmlHead);
          res.write(newsResponse);
          res.end();

        } // End if
      }); // request
    } // End if for req.url
}

module.exports.fetchNews = fetchNews;
