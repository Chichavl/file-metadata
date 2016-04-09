'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var multer = require('multer');

var app = express();
require('dotenv').load();

var storage =   multer.diskStorage({
	destination: function (req, file, callback) {
    callback(null, './uploads');
  },
	filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userFile');

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

routes(app, upload);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});