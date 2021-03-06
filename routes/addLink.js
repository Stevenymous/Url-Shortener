var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks');

var insert = require('./../model/insertNewLink');
var checkLink = require('./../metier/checkLink');

router.post('/', function(req, res, next) {
	
	var link = req.body.link;
	console.log('Lien oridinal: ' + link);
	
	//Controle du lien:
	match = checkLink.verifyLink(decodeURIComponent(link));
	console.log(match);
	if (match == false) {
		res.status(400).send("Error in link");
	}
	
	else{
		// Ajout du lien dans la persistance
		var id = insert.insertLink(link);
		
		console.log('renvoye du résultat');
		res.status(201).send(id);
	}
});

module.exports = router;