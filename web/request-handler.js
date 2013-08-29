var path = require('path');
var express = require('express');
var fs = require('fs');

module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

var exp = module.exports.handleRequest = express();

exp.use(express.bodyParser());

exp.all("*", function(request, response, next) {
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

exp.get('/websites/all', function(request, response){
  fs.readFile(module.exports.datadir, 'utf8', function(error, content){
    if(!error){
      var urls = content.split('\n');
      response.set('Content-Type', 'application/json');
      var results = JSON.stringify({urls: urls});
      response.send(200, results);
    } else {
      response.send(500, error);
    }
  });

  exp.get('/websites/url/:id', function(request, response){
    fs.readFile('/Users/hackreactor/code/macqueen/2013-08-web-historian/data/sites/' + request.params.id, function(error, content){
      console.log('/Users/hackreactor/code/macqueen/2013-08-web-historian/data/sites/' + request.params.id);
      if(!error){
        response.set('Content-Type', 'text/html');
        response.send(200, content);
      } else {
        response.send(404, error);
      }
    });
  });
});