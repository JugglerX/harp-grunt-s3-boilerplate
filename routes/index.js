var express = require('express');
var exphbs  = require('express-handlebars');
var router = express.Router();
var request = require('request');
var fs = require('fs');

router.get('/', function(req, res) {
	res.render('index', {title: 'Express'});
});

module.exports = router;
