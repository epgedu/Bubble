/**
 * file which contains the UI Components and their behaviours 
 */

//Build the common components (buttons)
function buildCommonComponents() {
	console.log("buildCommonComponents method executing....");
	try {
		//build init button in order to start again
		buildInitButton();
		//built back to main list button
		buildBackListButton();
		//built undo button
		buildUndoButton();
		//build subcategories button
		buildSubcategoriesButton();
		//build intesion button
		buildIntensionButton();
		//build not related button
		buildMoreButton();
	}
	catch(e) {
		app.error(e, "Fatal error building common elements... Please contanct the site administrator.");
	}
}

//Build init button
function buildInitButton() {
	//button bubble init
	initButtonBubble = document.createElement("div");
	
	var image = document.createElement("img"); 
	image.className = 'link_init_bubble';
	image.src = "img/init.png"; 
    image.alt = "Go to init";
	initButtonBubble.appendChild(image); 
	
    
	initButtonBubble.addEventListener('touchstart', function(e) {
		event.preventDefault();
		console.log('the user cliked on init button');
		goInit();
	}, false);
}

//Build button in order to come to main list documents back
function buildBackListButton() {
	//button div
	backListButtonBubble = document.createElement('div');
	var image = document.createElement("img"); 
	image.className = 'back_list_bubble';
	image.src = "img/back.png"; 
	image.alt = "Return to results";
	backListButtonBubble.appendChild(image); 
	
	backListButtonBubble.addEventListener('touchstart', function(e) {
		event.preventDefault();
		console.log('the user clicked on go back to list documents button');
		//hide the result layer
		hideResults();
		//remove all divs from results div parent
		cleanResultDiv();
		//hide de links bar
		hideLinksBar();
		//build the link bar, draw docs list and show link bar
		window.setTimeout("buildLinksBar(true);drawListDocBubble();showLinksBar();",1000); //1second is the spent time on the hide transition
	}, false);
}

//Build button in order to show the subcategories
function buildSubcategoriesButton() {
	//subcategories button div
	subcategoriesButtonBubble = document.createElement('div');
	var image = document.createElement("img"); 
	image.className = 'link_subcategories_bubble';
	image.src = "img/add.png";
	image.alt = "Add filter";
	subcategoriesButtonBubble.appendChild(image);
	
	subcategoriesButtonBubble.addEventListener('touchstart', function(e) {
		event.preventDefault();
		console.log('the user clicked on subcategories button');
		//hide the result layer
		hideResults();
		//hide docs link bar
		hideLinksBar();
		//remove all divs from results div parent
		cleanResultDiv();
		//build the links var, draw subcategories and show link bar
		window.setTimeout("buildLinksBar(false);drawSubcategoriesBubble();showLinksBar();",1000); //1second is the spent time on the hide transition
	}, false);
}

//Build intension button
function buildIntensionButton() {
	//intension button div
	intensionButtonBubble = document.createElement('div');
	var image = document.createElement("img"); 
	image.className = 'link_intension_bubble';
	image.src = "img/home.png";
	image.alt = "Your filters";
	intensionButtonBubble.appendChild(image);
	
	intensionButtonBubble.addEventListener('touchstart', function(e) {
		event.preventDefault();
		console.log(' the user clicked on intension button');
		//hide the result layer
		hideResults();
		//hide docs link bar
		hideLinksBar();
		//remove all divs from results div parent
		cleanResultDiv();
		//build the links var, draw subcategories and show link bar
		window.setTimeout("buildLinksBar(false);drawIntensionBubble();showLinksBar();",1000); //1second is the spent time on the hide transition
	}, false);
}

//Build undo button
function buildUndoButton() {
	//undo button div
	undoButtonBubble = document.createElement('div');
	var image = document.createElement("img"); 
	image.className = 'link_undo_bubble';
	image.src = "img/undo.png";
	image.alt = "Back";
	undoButtonBubble.appendChild(image);
	
	undoButtonBubble.addEventListener('touchstart', function(e) {
		event.preventDefault();
		console.log('the user clicked on undo button');
		
		//check if there is history
		var previousHistory = getPreviousHistory();
		if(previousHistory != false) {
			selectBubbleHistory(previousHistory);
		}
		else {
			app.info(null, "No more results on history");
		}
	}, false);
}

//buid more (not related) button
function buildMoreButton() {
	moreButtonBubble = document.createElement('div');
	var image = document.createElement("img"); 
	image.className = 'link_notrelated_bubble';
	image.src = "img/notrelated.png";
	image.alt = "No related";
	moreButtonBubble.appendChild(image);
	
	moreButtonBubble.addEventListener('touchstart', function(e) {
		event.preventDefault(); //in order to avoid open the menu
		console.log('the user clicked on not related button');
		//hide the result layer
		hideResults();
		//hide docs link bar
		hideLinksBar();
		//remove all divs from results div parent
		cleanResultDiv();
		//build the links var, draw subcategories and show link bar
		window.setTimeout("buildLinksBar(false);drawNotRelatedBubble();showLinksBar();",1000); //1second is the spent time on the hide transition
	}, false);	
}



//Build list docs bubble div. This div contains the results which belong to extension of the selected node.  
function buildListDocBubble() {
	try {
		//if the component hasn't been built then it builds the components. Just once.
		if(!isBuiltListDocsBubble) {
			console.log("creating the list docs bubble component...");
			listDocsBubble = document.createElement('div');
			listDocsBubble.className = 'scroller_bubble';
			listDocsBubble.id = 'scroller_list_docs_bubble';
			isBuiltListDocsBubble = true; //this object will not be built again
			
			listDocsBubble.addEventListener('touchmove', function(e) {
				event.preventDefault();
			}, false);
		}
		
		//refresh datas on list doc bubble
		console.log("refresing datas on list documents bubble...");
		listDocsBubble.innerHTML = "Results...";
	
		//it creates the bubbles with datas
		var tittle;
		var spliter;
		var url;
		for (i=0; i<formalConcept.extension.length; i++) {
			var listLink = document.createElement('li');
			listLink.className = 'li_list_doc';
			
			/*split the tittle, spliter and url*/
			
			/*TODO: en el ejemplo de salida no tenemos descripcion porque es una salida de  video. Por lo tanto,  establecemos como titulo y descripcion el mismo texto.
			 */
			var initUrl = (formalConcept.extension[i].value).indexOf("http"); //http or https
			var auxUrl = (formalConcept.extension[i].value).substring(initUrl, (formalConcept.extension[i].value).length);
			var endUrl = auxUrl.indexOf(" ");
			if(endUrl == -1) {
				//then thre is not space after the url
				url = auxUrl;
			}
			else {
				url = auxUrl.substring(initUrl, endUrl);
				
			}
			
			tittle = (formalConcept.extension[i].value).substring(0, initUrl);
			spliter = "";
			
			console.log(formalConcept.extension[i].value);
			console.log(tittle);
			console.log(url);
			
			listLink.style.marginLeft = '5%';
			listLink.style.marginRight = '5%';
			listLink.innerHTML = "<b>"+tittle+"</b><br>";
			listLink.innerHTML += "<i>"+spliter+"</i><br>";
			listLink.innerHTML += "<a href='#'>"+url+"</a>";
			
			listLink.addEventListener('touchstart', function(event) {
				auxX = event.targetTouches[0].pageX;
	    	}, false);
			
			listLink.addEventListener('touchend', function(event) {
				if(auxX == event.changedTouches[0].pageX) { //if not moving
					console.log("opening link on external webview...");
					window.open(url, '_blank', 'location=yes');
				}
			}, false);
			listDocsBubble.appendChild(listLink);
		}
	
	}
	catch(e) {
		app.error(e, "Fatal error building list docs bubble... Please contanct the site administrator.");
	}
}

//buids the subcategories and intension bubbles div
function buildSubcategoriasIntension(){
	buildIntension();
	buildSubcategories();
	buildNotRelated();
}

//Buids the intension bubble div
function buildIntension() {
	try {
		//if the component hasn't been built then it builds the components. Just once.
		if(!isBuiltIntensionBubble) {
			console.log("creating the intension bubble component...");
			intensionBubble = document.createElement('div');
			intensionBubble.className = 'scroller_bubble';
			intensionBubble.id = 'scroller_search_trace_bubble';
			isBuiltIntensionBubble = true; //this object will not be built again
		
			intensionBubble.addEventListener('touchmove', function(e) {
				event.preventDefault();
			}, false);	
		}
		
		//refresh data on intension bubble
		console.log("refresing datas on intension bubble...");
		intensionBubble.innerHTML = "Your categories...";
				
		//draw the bubble without content. Totally 10 bubbles
		for (i=0; i<10; i++) {
			var xy = getRandomPositionOnResultsDiv();
			intensionBubble.innerHTML += "<li class='li_space' style='left:"+xy[0]+"px;top:"+xy[1]+"px'></li>";
		}
		//draw the bubbles with datas 
		for (i=0; i<intensionDescriptors.length; i++) {
			var left = '0%'; //position bubbles with content
			if (i % 3 == 0) {left = '30%';}
			if (i % 3 == 1) {left = '10%';}
			if (i % 3 == 2) {left = '55%';}
			var bubbleLink = document.createElement('li');
			bubbleLink.className = 'li_bubble';
			
			//setting id element "li" with the id descriptor. That way, when the user ckick on the bubble, we can know the selected descriptor during the event
			bubbleLink.id = intensionDescriptors[i].id;
			
			
			bubbleLink.style.marginLeft = left;
			bubbleLink.style.background = getRandomColour();
			bubbleLink.innerHTML = "<br><br><br> "+intensionDescriptors[i].value;
			
			bubbleLink.addEventListener('touchstart', function(event) {
				auxX = event.targetTouches[0].pageX;
	    	}, false);
			
			bubbleLink.addEventListener('touchend', function(event) {
				event.stopPropagation();
				if(auxX == event.changedTouches[0].pageX) { //if not moving
					console.log("refreshing from intension bubble...");
					selectBubbleIntension(event.target.id); 
				}
			}, false);
			
			intensionBubble.appendChild(bubbleLink);
		}
		
	}
	catch(e) {
		app.error(e, "Fatal error building intension bubble... Please contanct the site administrator.");
	}
}




//Builds the refine bubble div
function buildSubcategories() {
	try {
		if(!isBuiltSubcategoriesBubble) {
			console.log("creating the subcategories bubble component...");
			subcategoriesBubble = document.createElement('div');
			subcategoriesBubble.id = 'scroller_refine_bubble'; 
			subcategoriesBubble.className = 'scroller_bubble';
			isBuiltSubcategoriesBubble = true; //this object will not be built again
				
			subcategoriesBubble.addEventListener('touchmove', function(e) {
				event.preventDefault(); //in order to avoid open the menu
			}, false);	
		}
		
		//refresh subcategories bubble
		console.log("refresing datas on subcategories bubble...");
		subcategoriesBubble.innerHTML = "Subcategories..."; 
			
		//draw the bubble without content. Totally 10 bubbles  DUPLICADO
		for (i=0; i<10; i++) {
			var xy = getRandomPositionOnResultsDiv();
			subcategoriesBubble.innerHTML += "<li class='li_space' style='left:"+xy[0]+"px;top:"+xy[1]+"px'></li>";
		}
			
		//draw the bubbles with datas
		for (i=0; i<subCategoriesDescriptors.length; i++) {
			var left = '0%'; //position bubbles with content
			if (i % 3 == 0) {left = '30%';}
			if (i % 3 == 1) {left = '10%';}
			if (i % 3 == 2) {left = '55%';}
			var bubbleLink = document.createElement('li');
			bubbleLink.className = 'li_bubble';
			
			//setting id element "li" with the id descriptor. That way, when the user ckick on the bubble, we can know the selected descriptor during the event
			bubbleLink.id = subCategoriesDescriptors[i].id;
			
			bubbleLink.style.marginLeft = left;
			bubbleLink.style.background = getRandomColour();
			bubbleLink.innerHTML = "<br><br><br>"+subCategoriesDescriptors[i].value; 
				
			bubbleLink.addEventListener('touchstart', function(event) {
				auxX = event.targetTouches[0].pageX;
	    	}, false);
			
			bubbleLink.addEventListener('touchend', function(event) {
				event.stopPropagation();
				if(auxX == event.changedTouches[0].pageX) { //if not moving
					console.log("refreshing from subcategories bubble...");
					selectBubbleSubcategories(event.target.id); 
				}
			}, false);
			
			subcategoriesBubble.appendChild(bubbleLink);
		}
		 
	}
	catch(e) {
		app.error(e, "Fatal error building refine bubble... Please contanct the site administrator.");
	}
}

/*
 * function to built the not related bubble
 */
function buildNotRelated() {
	try {
		if(!isBuiltNotRelatedBubble) {
			console.log("creating the not related bubble component...");
			notRelatedBubble = document.createElement('div');
			notRelatedBubble.id = 'scroller_notrelated_bubble'; 
			notRelatedBubble.className = 'scroller_bubble';
			isBuiltNotRelatedBubble = true; //this object will not be built again
				
			notRelatedBubble.addEventListener('touchmove', function(e) {
				event.preventDefault(); //in order to avoid open the menu
			}, false);	
		}
		
		//refresh not related bubble
		console.log("refresing datas on not related bubble...");
		notRelatedBubble.innerHTML = "Not Related with your current filters... "; 
			
		//draw the bubble without content. Totally 10 bubbles  DUPLICADO
		for (i=0; i<10; i++) {
			var xy = getRandomPositionOnResultsDiv();
			notRelatedBubble.innerHTML += "<li class='li_space' style='left:"+xy[0]+"px;top:"+xy[1]+"px'></li>";
		}
			
		//draw the bubbles with datas
		for (i=0; i<notRelatedDescriptors.length; i++) {
			var left = '0%'; //position bubbles with content
			if (i % 3 == 0) {left = '30%';}
			if (i % 3 == 1) {left = '10%';}
			if (i % 3 == 2) {left = '55%';}
			var bubbleLink = document.createElement('li');
			bubbleLink.className = 'li_bubble';
			
			//setting id element "li" with the id descriptor. That way, when the user ckick on the bubble, we can know the selected descriptor during the event
			bubbleLink.id = notRelatedDescriptors[i].id;
			
			bubbleLink.style.marginLeft = left;
			bubbleLink.style.background = getRandomColour();
			bubbleLink.innerHTML = "<br><br><br>"+notRelatedDescriptors[i].value; 
				
			bubbleLink.addEventListener('touchstart', function(event) {
				auxX = event.targetTouches[0].pageX;
	    	}, false);
			
			bubbleLink.addEventListener('touchend', function(event) {
				event.stopPropagation();
				if(auxX == event.changedTouches[0].pageX) { //if not moving
					console.log("refreshing from not related bubble...");
					selectBubbleNotRelated(event.target.id); 
				}
			}, false);
			
			notRelatedBubble.appendChild(bubbleLink);
		}
		 
	}
	catch(e) {
		app.error(e, "Fatal error building not related bubble... Please contanct the site administrator.");
	}
	
}


/*
 * function to build error screen.
 * If an error is cought then it does not call to app.error because this will call to buildError again, so theard is looping. 
 * Therefore, it catches the error, but handles it on this function, never calls to app.error. 
 */
function buildError(msg) {
	try {
		if(!isBuiltErrorBubble) { 
			console.log("creating error bubble component...");
			errorScreen = document.createElement('div');
			errorScreen.id = 'error';
			errorScreen.className = 'error';
			msgError = document.createElement('p');
			msgError.id = 'errormsg';
			msgError.className = 'msg_error';
			errorScreen.appendChild(msgError);
			
			//buttom init from error screen
			initError = document.createElement('div');
			initError.id = 'error_bubble';
			initError.className = 'link_error_bubble';
			errorScreen.appendChild(initError);
		
			initError.addEventListener('touchstart', function(e) {
				console.log('click on init error');
				goInit();
			}, false);
			
			isBuiltErrorBubble = true;
		}	
		console.log("loading error bubble...")
		//hide results
		hideResults();
		//remove all divs from results div parent
		cleanResultDiv();
		//hide the links bar
		hideLinksBar();
		//add the error div to results
		addOnResults(errorScreen);
		document.getElementById('errormsg').innerHTML = "Sorry, we had some problems...<br/>"+msg;
		//show results
		showResults();
	}
	catch(e) {
		console.error("Exception: "+e+", Message: FATAL Error building error bubble div");
		navigator.notification.alert("FATAL Error building error bubble div...Please contanct the site administrator", function() {}, "Info");
		app.vibrate();
	}
}
