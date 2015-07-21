var express = require('express');
var router = express.Router();


var nunjucks = require('nunjucks')


/* GET home page. */
router.get('/', function(req, res, next) {
	  res.render('admin.html', {title: 'Admin Interface'});
	});

module.exports = router;
