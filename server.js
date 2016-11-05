var http = require('http');
var news = require('./news');

http.createServer((req,res) => {
    news.fetchNews(req, res);
}).listen(3000);
