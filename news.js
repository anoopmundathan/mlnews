'use strict';

var request = require('request');
var cheerio = require('cheerio');

function fetchNews(req, res) {

        // Create Promise for Manoramaonline news
        var manNews = new Promise(function(resolve, reject) {

          var url = 'http://www.manoramaonline.com';
          // var url = 'http://www.manoramaonline.com/news/just-in.html';

          // Make get request to website to get latest news
          request(url, function (error, response, body) {

            if (!error && response.statusCode == 200) {

              var $ = cheerio.load(body);

              // Select all H2 elements with class .Geoge01
              var news = $('.Georgia01');

              var newsArray = [];
              var href = '';
              var title = '';

              news.each(function(i, elem) {
                href = url + news[i].children[0].attribs.href;
                title = news[i].children[0].attribs.title;
                var obj = {};
                obj.href = href;
                obj.title = title;
                newsArray.push(obj);
              }); // End each

              resolve(newsArray);

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
              var newsArray = [];
              var href = '';
              var title = '';

              news.each(function(i, elem) {
                var obj = {};

                href = url.substring(0,26) + news[i].parent.parent.attribs.href;
                title = news[i].children[0].data;
                obj.href = href;
                obj.title = title;
                newsArray.push(obj);
              }); // End each

              resolve(newsArray);
            } else {
              reject(error);
            }
          }); // End of request
        }); // End Promise

        // Once all promises are resolved, display the latest news
        Promise.all([manNews, matNews]).then(function(data) {
          // console.log(data);

          res.render('layout', {newsArray: data[0].concat(data[1])});
        })
        .catch(function(error) {
          console.log('something wrong with request');
        }); // End of Promise.all

} // End of fetchNews

module.exports.fetchNews = fetchNews;
