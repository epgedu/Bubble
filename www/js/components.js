/**
 * file which contains the UI Components and their behaviours 
 */

/*
 * Open menu div
 */
function openMenu() {
	try {
		//if swipe left more 80px on results layer
	    if ((up_x - down_x) > 80) {
	    	//if state is body
	    	if(state=="body"){ 
	    		console.log('open menu');
	    		appDiv.className = 'page transition right';
	            state="menu";
	        }
	    }
	}
	catch(e) {
		app.error(e, "Fatal error opening menu... Please contanct the site administrator.");
	}
}

/*
 * Close menu div
 */
function closeMenu() {
	try {
		//if swipe right more 30px on menu layer
		if ((down_x - up_x) > 30) {
	    	//if state is menu
		  if(state=="menu"){
			  	console.log('close menu');
			  	appDiv.className = 'page transition center';
			  	state="body";        
			}
	    }
	}
	catch(e) {
		app.error(e, "Fatal error closing menu... Please contanct the site administrator.");
	}
}

function buildCommonComponents() {
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

function showResults() {
	resultsDiv.className = 'results transition center';
}

function hideResults() {
	resultsDiv.className = 'results transition right';
}

function showSearchBar () {
	searchbarDiv.className = 'page transition center';
}

function hideSearchBar() {
	searchbarDiv.className = 'page transition up';
}

function showLinksBar() {
	linksbarDiv.className = 'page transition center';
}

function hideLinksBar() {
	linksbarDiv.className = 'page transition down';
}

function buildScroll() {
	console.log('building scroll result');
	scrollResult = new IScroll('#results_div', {dimensions:{x:30,y:60}, mouseWheel: true });
	resultsDiv.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}

function buildInitButton() {
	//bubble init
	initButtonBubble = document.createElement('div');
	initButtonBubble.className = 'link_init_bubble';
	initButtonBubble.innerHTML += 'Init';
	
	initButtonBubble.addEventListener('touchstart', function(e) {
		console.log('click on init');
		event.preventDefault();
		
		goInit();
		
	}, false);
}

function buildBackListButton() {
	backListButtonBubble = document.createElement('div');
	backListButtonBubble.className = 'back_list_bubble';
	backListButtonBubble.innerHTML += 'Back';
	
	backListButtonBubble.addEventListener('touchstart', function(e) {
		console.log('click go to ppal results');
		event.preventDefault();
		//hide the result layer
		hideResults();
		//remove all divs from results div parent
		cleanResultDiv();
		//hide de links bar
		hideLinksBar();
		//get the last results
		//TODO
		
		//build the link bar, draw docs list and show link bar
		window.setTimeout("buildLinksBar(true);drawListDocBubble();showLinksBar();",1000); //1second is the spent time on the hide transition
		
		
	}, false);
}

function buildSubcategoriesButton() {
	subcategoriesButtonBubble = document.createElement('div');
	subcategoriesButtonBubble.className = 'link_subcategories_bubble';
	subcategoriesButtonBubble.innerHTML += 'subcategories';
	
	subcategoriesButtonBubble.addEventListener('touchstart', function(e) {
		console.log('click go to subcategories results');
		event.preventDefault();
		//hide the result layer
		hideResults();
		//hide docs link bar
		hideLinksBar();
		//remove all divs from results div parent
		cleanResultDiv();
		//build the links var, draw subcategories and show link bar
		window.setTimeout("buildLinksBar(false);drawRefineBubble();showLinksBar();",1000); //1second is the spent time on the hide transition
		
		
	}, false);
}

function buildIntensionButton() {
	intensionButtonBubble = document.createElement('div');
	intensionButtonBubble.className = 'link_intension_bubble';
	intensionButtonBubble.innerHTML += 'You are here';
	
	intensionButtonBubble.addEventListener('touchstart', function(e) {
		console.log('click go to intension results');
		event.preventDefault();
		//hide the result layer
		hideResults();
		//hide docs link bar
		hideLinksBar();
		//remove all divs from results div parent
		cleanResultDiv();
		//build the links var, draw subcategories and show link bar
		window.setTimeout("buildLinksBar(false);drawSearchTraceBubble();showLinksBar();",1000); //1second is the spent time on the hide transition
	}, false);
}

function buildUndoButton() {
	//bubble back
	undoButtonBubble = document.createElement('div');
	undoButtonBubble.className = 'link_undo_bubble';
	undoButtonBubble.innerHTML += 'Undo';
	
	undoButtonBubble.addEventListener('touchstart', function(e) {
		console.log('click on undo');
		event.preventDefault();
		
		app.error(backBubble, "ejemplo de mensaje de error")
		
	}, false);
	//TODO: falta la funcion goBack()
}

//function is executes when user push search button 
function pushSearch() {
	try {
		console.log("Init Search...");
		//hide the search bar
		hideSearchBar();
		
		
		//TODO:calling to server
		
		buildListDocBubble();
		drawListDocBubble();
		buildLinksBar(true);
		showLinksBar();
		//after to show the screen , we build subcategories and intension
		buildSubcategoriasIntension(); 
		
		
		
	}
	catch(e) {
		app.error(e, "Fatal error searching... Please contanct the site administrator.");
	}
}	



/*
 * Build list docs bubble div 
 */
function buildListDocBubble() {
	try {
		if(!isBuiltListDocsBubble) {
			
			listDocsBubble = document.createElement('div');
			listDocsBubble.className = 'scroller_bubble';
			listDocsBubble.id = 'scroller_list_docs_bubble';
			isBuiltListDocsBubble = true; //this object will not be built again
			
			listDocsBubble.addEventListener('touchmove', function(e) {
				event.preventDefault();
			}, false);
		}
		
		//refresh datas on list doc bubble
		listDocsBubble.innerHTML = "Results: \n";
	
		//draw the bubbles with datas //DUPLICADO
		for (i=0; i<10; i++) {
			var left = '5%'; //position bubbles with content
			var listLink = document.createElement('li');
			listLink.className = 'li_list_doc';
			
			listLink.style.marginLeft = left;
			listLink.style.marginRight = '10%';
			listLink.innerHTML = "<b>titulo es el titulo del enlace ,que sera mas corto que este</b><br>";
			listLink.innerHTML += "<i>descripcion, la descripcion puede que sea larga de cojones, entonces escribimos algo mas, para que ver como se comporta el estilo</i><br>";
			listLink.innerHTML += "<a href='#'>www.as.com</a>";
			
			listLink.addEventListener('touchstart', function(event) {
				
				auxX = event.targetTouches[0].pageX;
	    	}, false);
			
			listLink.addEventListener('touchend', function(event) {
				event.stopPropagation();
				if(auxX == event.changedTouches[0].pageX) { //if not moving
					window.open('http://www.as.com', '_system', 'location=yes');
					
				}
			}, false);
			
			
			
			
			listDocsBubble.appendChild(listLink);
		}
	
	}
	catch(e) {
		app.error(e, "Fatal error building list docs bubble... Please contanct the site administrator.");
	}
}

function drawListDocBubble() {
	
	//update the screen
	addOnResults(listDocsBubble);
	buildScroll();
	//show results
	showResults();
	
}

//add on results div, the element passed by parameter
function addOnResults(element) {
	resultsDiv.appendChild(element);
}
//add on results div, the element passed by parameter
function addOnLinkBar(element) {
	linksbarDiv.appendChild(element);
}


//build the link bar 
function buildLinksBar(isToDocsList) {
	
	cleanLinksBar();
	if(isToDocsList) { 
		addOnLinkBar(intensionButtonBubble);
		addOnLinkBar(subcategoriesButtonBubble);
		addOnLinkBar(initButtonBubble);
		addOnLinkBar(undoButtonBubble);
	}
	else {
		addOnLinkBar(backListButtonBubble);
	}
}

//clean the list docs
function cleanLinksBar() {
	//remove all divs from results div parent
	while ( linksbarDiv.firstChild ) linksbarDiv.removeChild( linksbarDiv.firstChild );
}


function buildSubcategoriasIntension(){
	buildIntension();
	buildSubcategories();
}


/*
 * Built the search trace bubble
 */
function buildIntension() {
	try {
		
		if(!isBuiltTraceBubble) {
			//the div searchTraceBubble is the scroller rol
			searchTraceBubble = document.createElement('div');
			searchTraceBubble.className = 'scroller_bubble';
			searchTraceBubble.id = 'scroller_search_trace_bubble';
			isBuiltTraceBubble = true; //this object will not be built again
		
			searchTraceBubble.addEventListener('touchmove', function(e) {
				event.preventDefault();
			}, false);	
			
			
		}
		
		//refresh data on search trace bubble
		searchTraceBubble.innerHTML = "You are here: \n";
		searchTraceBubble.innerHTML += "8 de 10";
		
		//draw the bubble without content. Totally 10 bubbles
		for (i=0; i<10; i++) {
			var xy = getRandomPositionOnResultsDiv();
			searchTraceBubble.innerHTML += "<li class='li_space' style='left:"+xy[0]+"px;top:"+xy[1]+"px'></li>";
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
			bubbleLink.innerHTML = "<br><br><br>datos para este nodo lololovhdvn bnc sdsd  dscjwn jnd jsd ";
			
			bubbleLink.addEventListener('touchstart', function(event) {
				
				auxX = event.targetTouches[0].pageX;
	    	}, false);
			
			bubbleLink.addEventListener('touchend', function(event) {
				event.stopPropagation();
				if(auxX == event.changedTouches[0].pageX) { //if not moving
					selectBubbleIntension(); 
				}
			}, false);
			
			searchTraceBubble.appendChild(bubbleLink);
		}
		
	}
	catch(e) {
		app.error(e, "Fatal error building search trace bubble... Please contanct the site administrator.");
	}
}

function selectBubbleIntension() {
	//hide the result layer
	hideResults();
	//hide docs link bar
	hideLinksBar();
	//remove all divs from results div parent
	cleanResultDiv();
	
	//get the new datas
	//TODO

	//refresh the components
	buildListDocBubble();
	//build the links var, draw docs list and show link bar
	window.setTimeout("buildLinksBar(true);drawListDocBubble();showLinksBar();",1000); //1second is the spent time on the hide transition

	//after to show the screen , we build subcategories and intension
	buildSubcategoriasIntension(); 
	
	
	
}

/**
 * Build refine bubble div
 */
function buildSubcategories() {
	try {
		if(!isBuiltRefineBubble) {
			
			refineBubble = document.createElement('div');
			refineBubble.id = 'scroller_refine_bubble'; 
			refineBubble.className = 'scroller_bubble';
			isBuiltRefineBubble = true; //this object will not be built again
				
			refineBubble.addEventListener('touchmove', function(e) {
				event.preventDefault(); //in order to avoid open the menu
			}, false);	
		}
		
		//refresh data
		refineBubble.innerHTML = "Subcategories: \n"; 
			
		//draw the bubble without content. Totally 10 bubbles  DUPLICADO
		for (i=0; i<10; i++) {
			var xy = getRandomPositionOnResultsDiv();
			refineBubble.innerHTML += "<li class='li_space' style='left:"+xy[0]+"px;top:"+xy[1]+"px'></li>";
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
					selectBubbleSubcategories(); 
				}
			}, false);
			
			refineBubble.appendChild(bubbleLink);
		}
		 
	}
	catch(e) {
		app.error(e, "Fatal error building refine bubble... Please contanct the site administrator.");
	}
}

function selectBubbleSubcategories() {
	//hide the result layer
	hideResults();
	//hide docs link bar
	hideLinksBar();
	//remove all divs from results div parent
	cleanResultDiv();
	
	//get the new datas
	//TODO

	//refresh the components
	buildListDocBubble();
	//build the links var, draw docs list and show link bar
	window.setTimeout("buildLinksBar(true);drawListDocBubble();showLinksBar();",1000); //1second is the spent time on the hide transition

	//after to show the screen , we build subcategories and intension
	buildSubcategoriasIntension(); 
	
	
	
}

/*
 * Build more bubble div
 */
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

/*
 * function to go toward init screen
 */
function goInit() {
	try {
		hideResults();
		hideLinksBar();
		//remove all divs from results div parent
		cleanResultDiv();
		showSearchBar();
	}
	catch (e) {
		app.error(e, "Fatal error going to init screen... Please contanct the site administrator.");
	}
}


/*
 * function to build erro screen.
 * It catchs any error but not call to app.error because we will be calling to buildError again, therefore it will be a loop. 
 * Therefore, we catch the error, but handle it on this function. 
 */
function buildError(msg) {
	try {
		if(!isBuiltError) { 
			errorScreen = document.createElement('div');
			errorScreen.id = 'error';
			errorScreen.className = 'error';
		
			//msg error
			errorScreen.innerHTML = "<p style=\"margin-top: 85%;\" id='errormsg' ></p>";
		
			//buttom init from error screen
			var initError = document.createElement('div');
			initError.id = 'bubble_gray';
			initError.className = 'bubble_gray';
			initError.style.marginLeft = "35%";
			initError.style.marginTop = "10%";
			initError.innerHTML += 'Exit';
			errorScreen.appendChild(initError);
		
			initError.addEventListener('touchstart', function(e) {
				console.log('click on init error');
				goInit();
			}, false);
			
			isBuiltError = true;
		}	
		
		//remove all divs from results div parent
		while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
		//add the error div to results
		resultsDiv.appendChild(errorScreen);
		document.getElementById('errormsg').innerHTML = "Sorry, we had some problems...<br/>"+msg;
	}
	catch(e) {
		console.error("Exception: "+e+", Message: FATAL Error building error bubble div");
		navigator.notification.alert("FATAL Error building error bubble div...Please contanct the site administrator", function() {}, "Info");
		app.vibrate();
	}
}

/**
 * get the random position from result-width, result-height and the size of resultDiv
 * 
 * min position left -20, max left position (resultsDiv.offsetWidth - 50)
 * min position top -20, max top position ( (resultsDiv.offsetHeight * 3) - 20). *3 due to iscroll
 * It means that the bubbles can be out left, top and rigth 20 px.
 * 
 * Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
 * 
 * @param heightElement
 * @param widthElement
 * @returns {Array}
 */
function getRandomPositionOnResultsDiv() {
	var x = Math.floor(Math.random() * (resultsDiv.offsetWidth - 20) ) - 50;   
	var y = Math.floor(Math.random() * ( (resultsDiv.offsetHeight * 3) - 20) ) - 20;
	return [x,y];
}

/**
 * get a random colour
 * 
 * @returns
 */
function getRandomColour() {
	//instead to get a random colour, we gonna choose a colour among a list of colurs. That is due to sometime the random colour is too much dark and the user cannnot read the text. 
	//so we got a number between 0 and 13 (we have an array with 14 colours)
	//Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
	return colours[ (Math.floor(Math.random() * (13 - 0 + 1)) )];
}

/**
 * user clicked on a bubble to change the search
 */
function selectBubble() {
	console.log ("select bubble");
	console.log ("refresh datas");
	
	console.log ("come back to brief results");
	//hide the result layer
	resultsDiv.className = 'results transition right';
	//remove all divs from results div parent
	while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
	//we have not created a new content because we did not refresh 
	//show the result layer
	window.setTimeout("refreshDatas = true;buildResultsBrief();",1000); //1second is the spent time on the hide transition
}

/**
 * user clicked on a bubble no related, then the user begin the search again 
 */
function selectBubbleNoRelated() {
	console.log ("select bubble no related");
	console.log ("come back to brief results");
	
	//hide the result layer
	resultsDiv.className = 'results transition right';
	//remove all divs from results div parent
	while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
	//we have not created a new content because we did not refresh 
	//show the result layer
	window.setTimeout("pushSearch();",1000); //1second is the spent time on the hide transition
}

function cleanResultDiv() {
	//remove all divs from results div parent
	while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
}

function drawSearchTraceBubble() {
	
	//update the screen
	addOnResults(searchTraceBubble);
	buildScroll();
	showResults();
}

function drawRefineBubble() {
	//update the screen
	addOnResults(refineBubble);
	buildScroll();
	showResults();
}

function drawMoreBubble() {
	//update the screen
	addOnResults(moreBubble);
	buildScroll();
	showResults();
}