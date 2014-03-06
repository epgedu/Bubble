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
	}
	catch(e) {
		app.error(e, "Fatal error building common elements... Please contanct the site administrator.");
	}
}

//Build init button
function buildInitButton() {
	//button bubble init
	initButtonBubble = document.createElement('div');
	initButtonBubble.className = 'link_init_bubble';
	
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
	backListButtonBubble.className = 'back_list_bubble';
	
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
	subcategoriesButtonBubble.className = 'link_subcategories_bubble';
	
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
	intensionButtonBubble.className = 'link_intension_bubble';
	
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
	undoButtonBubble.className = 'link_undo_bubble';
	
	undoButtonBubble.addEventListener('touchstart', function(e) {
		event.preventDefault();
		console.log('the user clicked on undo button');
		
		//TODO: falta la funcion goBack()
		app.error(null, "ejemplo de mensaje de error")
		
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
		listDocsBubble.innerHTML = "Results: \n";
	
		//it creates the bubbles with datas 
		for (i=0; i<10; i++) {
			var listLink = document.createElement('li');
			listLink.className = 'li_list_doc';
			
			listLink.style.marginLeft = '5%';
			listLink.style.marginRight = '5%';
			listLink.innerHTML = "<b>titulo es el titulo del enlace ,que sera mas corto que este</b><br>";
			listLink.innerHTML += "<i>descripcion, la descripcion puede que sea larga de cojones, entonces escribimos algo mas, para que ver como se comporta el estilo. Inserto algo mas de texto para evaluar el margen en un dispositivo ancho como una table</i><br>";
			listLink.innerHTML += "<a href='#'>www.as.com</a>";
			
			listLink.addEventListener('touchstart', function(event) {
				auxX = event.targetTouches[0].pageX;
	    	}, false);
			
			listLink.addEventListener('touchend', function(event) {
				if(auxX == event.changedTouches[0].pageX) { //if not moving
					console.log("opening link on external webview...");
					window.open('http://as.com/', '_blank', 'location=yes');
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
		intensionBubble.innerHTML = "You are here: ";
		intensionBubble.innerHTML += "8 de 10";
		
		//draw the bubble without content. Totally 10 bubbles
		for (i=0; i<10; i++) {
			var xy = getRandomPositionOnResultsDiv();
			intensionBubble.innerHTML += "<li class='li_space' style='left:"+xy[0]+"px;top:"+xy[1]+"px'></li>";
		}
		//draw the bubbles with datas 
		for (i=0; i<10; i++) {
			var left = '0%'; //position bubbles with content
			if (i % 3 == 0) {left = '30%';}
			if (i % 3 == 1) {left = '10%';}
			if (i % 3 == 2) {left = '55%';}
			var bubbleLink = document.createElement('li');
			bubbleLink.className = 'li_bubble';
			bubbleLink.style.marginLeft = left;
			bubbleLink.style.background = getRandomColour();
			bubbleLink.innerHTML = "<br><br><br>datos para este nodo lololovhdvn bnc sdsd  dscjwn jnd jsd ";
			
			bubbleLink.addEventListener('touchstart', function(event) {
				auxX = event.targetTouches[0].pageX;
	    	}, false);
			
			bubbleLink.addEventListener('touchend', function(event) {
				event.stopPropagation();
				if(auxX == event.changedTouches[0].pageX) { //if not moving
					console.log("refreshing from intension bubble...");
					selectBubbleIntension(); 
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
		subcategoriesBubble.innerHTML = "Subcategories: "; 
			
		//draw the bubble without content. Totally 10 bubbles  DUPLICADO
		for (i=0; i<10; i++) {
			var xy = getRandomPositionOnResultsDiv();
			subcategoriesBubble.innerHTML += "<li class='li_space' style='left:"+xy[0]+"px;top:"+xy[1]+"px'></li>";
		}
			
		//draw the bubbles with datas //DUPLICADO
		for (i=0; i<10; i++) {
			var left = '0%'; //position bubbles with content
			if (i % 3 == 0) {left = '30%';}
			if (i % 3 == 1) {left = '10%';}
			if (i % 3 == 2) {left = '55%';}
			var bubbleLink = document.createElement('li');
			bubbleLink.className = 'li_bubble';
			bubbleLink.style.marginLeft = left;
			bubbleLink.style.background = getRandomColour();
			bubbleLink.innerHTML = "<br><br><br>datos para este nodo";
				
			bubbleLink.addEventListener('touchstart', function(event) {
				auxX = event.targetTouches[0].pageX;
	    	}, false);
			
			bubbleLink.addEventListener('touchend', function(event) {
				event.stopPropagation();
				if(auxX == event.changedTouches[0].pageX) { //if not moving
					console.log("refreshing from subcategories bubble...");
					selectBubbleSubcategories(); 
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
			//msg error
			//errorScreen.innerHTML = "<p style=\"margin-top: 85%;\" id='errormsg' ></p>";
		
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


/*
 * Build more bubble div

function buildMore() {
	try {
		if(!isBuiltMoreBubble) {
			
			moreBubble = document.createElement('div');
			moreBubble.id = 'scroller_more_bubble';
			moreBubble.className = 'scroller_bubble';
			isBuiltMoreBubble = true; //this object will not be built again
			
			moreBubble.addEventListener('touchmove', function(e) {
				event.preventDefault(); //in order to avoid open the menu
			}, false);	
			
		}
		
		//refresh data
		moreBubble.innerHTML = "try another way: \n";
		//get datas	
		//draw the bubble without content. Totally 10 bubbles  DUPLICADO
		for (i=0; i<10; i++) {
			var xy = getRandomPositionOnResultsDiv();
			moreBubble.innerHTML += "<li class='li_space' style='left:"+xy[0]+"px;top:"+xy[1]+"px'></li>";
		}
			
		
	}
	catch (e) {
		app.error(e, "Fatal error building more bubble... Please contanct the site administrator.");
	}
}
*/

