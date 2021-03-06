var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var checkLink = require('./../metier/checkLink');

/* GET home page. */
router.get('/', function(req, res, next) {
	// Recuperation de l'ID
	var url = req.baseUrl;
	var urlSplit = url.split("/");
	var idLink = urlSplit[2];
	console.log("**" + idLink);
	
	
	// Recherche du lien
	var uridb = "mongodb://User:usr@ds039211.mongolab.com:39211/shortner";
	
	mongoose.connect(uridb, function(err) {
		console.log('Admin connecté');
		
		
		console.log('Recuperation du schéma de données');
		var shortnerModel;
		try {
			shortnerModel = mongoose.model('short');
		} catch (OverwriteModelError) {
			var schema = new mongoose.Schema({
				id: { type: String, unique: true,},
				link : String,
				countClick : Number
			});
			shortnerModel = mongoose.model('short', schema);
		}
		
		
		console.log("Recherche du lien");
		shortnerModel.find({id: idLink}, function (err, comms) {
			if (err) { throw err; }
			
			// Incremantation du compteur de clic et MAJ
			var countLink = comms[0].countClick + 1;
			shortnerModel.update({ id : comms[0].id}, { countClick : countLink }, function (err) {
  				if (err) { throw err; }
  				console.log('CountLink update');
			});
			
			
			//Contrôle du lien et renvoie
			leLien = checkLink.prepareLink(comms[0].link);
			
			console.log("envoie de la redirection vers " + leLien);
			
			res.render('redirection', { title: 'Redirection', lien: leLien })
		});
	});
});

module.exports = router;