var http = require('http');
var news = require('./news');

http.createServer((req,res) => {
    news.fetchNews(req, res);
}).listen(3000);

console.log('Server running at port 3000');
