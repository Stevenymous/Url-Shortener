var shortId = require('shortid');
var mongoose = require('mongoose');

module.exports = function (io) {
	io.sockets.on('connection', function (socket) {
		//setTimeout(function(){
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
	
				console.log("Recherche des liens");
				shortnerModel.find({}, function (err, comms) {
					if (err) { throw err; }
				
					console.log("envoie des sonnées");
					socket.emit('message', JSON.stringify(comms));
				});
			});
			//setTimeout(this, 3000);
		//}, 3000);
	});
}