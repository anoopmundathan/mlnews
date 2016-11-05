'use strict';

var request = require('request');
var cheerio = require('cheerio');


function fetchNews(req, res) {

  // User requested landing page
  if (req.url === '/') {

        // Create Promise for Manoramaonline news
        var manNews = new Promise(function(resolve, reject) {

          var url = 'http://www.manoramaonline.com/';

          // Make get request to website to get latest news
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
              }); // End each
              newsResponse += '</ul>';

              resolve(newsResponse);

            } else {
              reject(error);
            }

          }); // End of request
        }); // End Promise

        // Create Promise for Mathrubhumi news
        var matNews = new Promise(function(resolve, reject) {
          var url = 'http://www.mathrubhumi.com/latest-news';

          request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {

              var $ = cheerio.load(body);

              // Select all H2 elements with class .Geoge01
              var news = $('.common_text b');
              var newsResponse = '<ul>';
              var href = '';
              var title = '';

              news.each(function(i, elem) {
                href = url.substring(0,26) + news[i].parent.parent.attribs.href;
                title = news[i].children[0].data;
                newsResponse += '<li><a href="' + href + '">' +
                                 title + '</a></li>';
              }); // End each

              newsResponse += '</ul>';
              resolve(newsResponse);
            } else {
              reject(error);
            }
          }); // End of request
        }); // End Promise

        // Once all promises are resolved, display the latest news
        Promise.all([manNews, matNews]).then(function(data) {
          res.writeHead(200, {'Content-Type' : 'text/html'});
          res.write(data[0]);
          res.write(data[1]);
          res.end();
        })
        .catch(function(error) {
          console.log('something wrong with request');
        }); // End of Promise.all

  } // End of req.url

} // End of fetchNews

module.exports.fetchNews = fetchNews;
