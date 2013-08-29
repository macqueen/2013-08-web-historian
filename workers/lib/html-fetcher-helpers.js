var getter = require('http-get');
var dir = require('../../web/request-handler');
var fs = require('fs');

exports.readUrls = function(cb){
  fs.readFile(dir.datadir, 'utf8', function(error, content){
    var urls = content.split('\n');
    cb(urls);
  });
};

exports.downloadUrls = function(urls){
  for(var i = 0; i < urls.length; i++){
    //getter.get(urls[i], './data/sites/' + urls[i], function(error, result){
    getter.get(urls[i], '/Users/hackreactor/code/macqueen/2013-08-web-historian/data/sites/' + urls[i], function(error, result){
      if(error){
        console.log(error);
      } else {
        console.log('File downloaded: ' + result.file);
      }
    });
  }
};



// var http = require('http-get');
// http.get('http://localhost/foo.pdf', '/path/to/foo.pdf', function (error, result) {
//  if (error) {
//    console.error(error);
//  } else {
//    console.log('File downloaded at: ' + result.file);
//  }
// });