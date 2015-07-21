module.exports = {
	prepareLink: function(link) {
		leLien = link;
		if(leLien.indexOf("http://") == -1 && leLien.indexOf("https://") == -1){
			leLien = "http://" + leLien;
		}
	
		return leLien;
	},
	
	verifyLink: function(link) {
		var regex = new RegExp("^((http|https):\/\/)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?&]+)+$");  
		var match = regex.test(link);
		return match;
	}
}