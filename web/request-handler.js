var path = require('path');
var express = require('express');
var fs = require('fs');

module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

// module.exports.handleRequest = function (req, res) {
//   console.log(exports.datadir);
// };

var exp = module.exports.handleRequest = express();

exp.use(express.bodyParser());

exp.all("*", function(request, response, next) {
  console.log(__dirname);
  console.log(request.url);
  console.log(request.method);
  next();
});

exp.get('/', function(request, response, next){
  fs.readFile(__dirname + '/public/index.html', function(error, content){
    if(!error) {
      response.set('Content-Type', 'text/html');
      response.send(200, content);
    } else {
      response.send(500, error);
    }
  });
});

exp.get('/styles.css', function(request, response, next){
  fs.readFile(__dirname + '/public/styles.css', function(error, content){
  response.set("Content-Type", "text/css");
  response.send(200, content);
  });
});


exp.post('/', function(request, response){
  console.log('request', request.body.url);
  fs.appendFile(module.exports.datadir, '\n' + request.body.url, function(err){
    console.log('The "data to append" was appended to file!');
  });
  response.redirect('/');
  response.send(200);
});