var express = require('express');
var router = express.Router();

var nunjucks = require('nunjucks');


/* GET home page. */
router.get('/', function(req, res, next) {
	  res.render('users.html', {title: 'Public Shortner'});
	});

module.exports = router;
