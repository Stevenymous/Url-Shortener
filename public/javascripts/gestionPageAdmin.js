var bouttonAdd = document.getElementById("addmoi");
bouttonAdd.addEventListener("click", addURL, false);
setTimeout("gestionSocket()", 500);


function addURL() {
	//Recuperation de la valeur du input
	var lienOriginal = document.getElementById("shorten-input").value;
	
	var callback = function(){
		 if (/^2/.test(xhr.status)) {
        reponse = xhr.responseText;
        //console.log(reponse);
        //alert(reponse);
        console.log(reponse);
        ajouterLien(reponse, document.getElementById("shorten-input").value);
    	}
	 	else {
    	    reponse = "fail";
    	}
	}
	
	
	//Envoie du nouveau lien
	var xhr = createXhrObject();
	var reponse = sendXhrObject(xhr, "POST", "/addlink", "link=" + encodeURIComponent(lienOriginal), callback);
	console.log(reponse);

}



function createXhrObject() {
    if (window.XMLHttpRequest){
        return new XMLHttpRequest();
	}

    if (window.ActiveXObject) {
        var names = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
        for(var i in names) {
            try{ 
		return new ActiveXObject(names[i]); 
	    }
            catch(e){}
        }
    }
    window.alert("XMLHTTPRequest isn't supported.");
    return null;
}

function sendXhrObject(xhr, method, url, variables, callback){
	var reponse = "OK";	
	
	xhr.addEventListener('load', callback);

	xhr.open(method, url);
	
	if(method == "GET"){
		xhr.send();
	}
	else{
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(variables);
	}
	//console.log(reponse);
	return reponse;
	
}



//********************** Add links *********************************
/*
* @lien: Lien du shortner
* @url: Lien original
*/
function ajouterLien(lien, url){
	console.log("ajout du lien");
	
	var newDiv = document.createElement("div");
	newDiv.setAttribute("class", "divLink");
	
	var newPLien = document.createElement("p");
	newPLien.appendChild(document.createTextNode(url));
	
	var newPUrl = document.createElement("p");
	
	var newAUrl = document.createElement("a");
	newAUrl.setAttribute("href", "/link/" + lien);
	newAUrl.appendChild(document.createTextNode("/link/" + lien));
	
	newPUrl.appendChild(newAUrl);
	newDiv.appendChild(newPLien);
	newDiv.appendChild(newPUrl);
	
	
	var list = document.getElementById("links");
	list.appendChild(newDiv);
	updateCountLink();
};





//********************** Count links *********************************
function updateCountLink(){
		titre = document.getElementById("linkCount");
		
		arrayLi = document.getElementsByClassName("divLink");
		countLi = arrayLi.length;
			
		titre.innerHTML = countLi;
	}
	
function updateCounterClick(number){
		titre = document.getElementById("clickCount");
		titre.innerHTML = number;
	}


//********************** Get Links *********************************
function gestionSocket(){
	var socket = io.connect('');
	socket.on('message', function(message) {
        	//alert('Le serveur a un message pour vous : ' + message);
        	var reponse = JSON.parse(message);
			//alert(reponse.length);
			
			var ul = document.getElementById("links");
			ul.innerHTML = "";
			
			var counterClick = 0;
			for(var pos in reponse){
				ajouterLien(reponse[pos].id, decodeURIComponent(reponse[pos].link));
				counterClick += reponse[pos].countClick;
			}
			updateCounterClick(counterClick);
			
			
   })
}
