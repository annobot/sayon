var path =require('path');
var express= require('express');
var bodyParser = require('body-parser');
var dir = require('node-dir');
var walk    = require('walk');
var files   = [];
var server=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });



server.set('view engine','ejs');
server.use('/',express.static(__dirname + '/assets'));
server.use('/about',express.static(__dirname + '/assets'));
server.get('/',function(req,res){
  var walker  = walk.walk('./assets/slide/img', { followLinks: false });

  walker.on('file', function(root, stat, next) {
      // Add this file to the list of files

      files.push(stat.name);
      next();
  });

  walker.on('end', function() {

      console.log(files);
      res.render('in',qs={files});

  });


//console.log(qs);
});
server.get('/about',function(req,res){

  res.render('about');
});

server.listen(process.env.PORT || 3000);
console.log('made it');
