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


//function is executes when user push search button 
function pushSearch() {
	try {
		console.log("Init Search...");
		//hide the search bar
		searchbarDiv.className = 'page transition up';
		//TODO:calling to server
		
		
		//updateFrom = 'IS'; //initial search . handle the workflow to avoid useless updates  TODO: remoce this variable
		refreshDatas = true; // all datas has to be updated
		refreshMoreBubble = true; //with refreshMoreBubble we handle that the "no related" data are got once. only with a new search therefore with a new root node
		//build the results brief on appDiv
		buildResultsBrief();
		
	}
	catch(e) {
		app.error(e, "Fatal error searching... Please contanct the site administrator.");
	}
}	

/* Building the first screen with results. 
 * It not needed to handle the errors. It an exception is raised then this will be caught by parent function (pushSearch function)
 */ 
function buildResultsBrief() {
	buildSearchTraceBrief();
	buildListBrief();
	buildRefineBrief();
	if(refreshDatas){refreshDatas = false;}
	
	resultsDiv.className = 'results transition center';
}


/* Build the search trace brief bubble
 * It not needed to handle the errors. It an exception is raised then this will be caught by parent function (pushSearch function)
 */
function buildSearchTraceBrief() {
	
	if(!isBuiltTracerBriefBubble) {
		//bubble where the search trace is saved
		searchTraceBriefBubble = document.createElement('div');
		searchTraceBriefBubble.id = 'search_trace_brief_bubble';
		searchTraceBriefBubble.className = 'search_trace_brief_bubble';
		searchTraceBriefBubble.style.marginLeft = "25%";
		isBuiltTracerBriefBubble = true; //this object will not be built again
		
		console.log('executing on emulator');
		
		searchTraceBriefBubble.addEventListener('touchstart', function(e) {
			console.log('go to tracer bubble');
			e.stopPropagation();
			//hide the result layer
			resultsDiv.className = 'results transition right';
			//create a new content on result layer
			//show the result layer
			window.setTimeout("buildSearchTrace(); resultsDiv.className = 'results transition center'",1000); //1second is the spent time on the hide transition 
		}, false);	
	}
	
	if(!isBuiltInitBubble) {
		//bubble init
		initBubble = document.createElement('div');
		initBubble.className = 'bubble_yellow_small';
		initBubble.style.left = "0px";
		initBubble.style.top = "0px";
		initBubble.innerHTML += 'Init';
		
		initBubble.addEventListener('touchstart', function(e) {
			console.log('click on init');
			event.preventDefault();
			
			goInit();
		}, false);
		
		isBuiltInitBubble = true; //this object will not be built again
	}
	
	//datas
	if(refreshDatas) {
		searchTraceBriefBubble.innerHTML = "Your filters";
		
		refreshDataTraceBubble = true;	
	}
	//show the built divs
	resultsDiv.appendChild(searchTraceBriefBubble);
	resultsDiv.appendChild(initBubble);
	
}

/* Build the list brief bubble
 * It not needed to handle the errors. It an exception is raised then this will be caught by parent function (pushSearch function)
 */
function buildListBrief() {
	if(!isBuiltListBriefBubble) {
		listBriefBubble = document.createElement('div');
		listBriefBubble.id = 'list_brief_bubble';
		listBriefBubble.className = 'list_brief_bubble';
		listBriefBubble.style.marginLeft = "5%";
		listBriefBubble.style.marginTop = "5%";
		isBuiltListBriefBubble = true;
		
		listBriefBubble.addEventListener('touchstart', function(e) {
			console.log('go to list bubble');
			event.preventDefault();
			//hide the result layer
			resultsDiv.className = 'results transition right';
			//create a new content on result layer
			//show the result layer
			window.setTimeout("buildList(); resultsDiv.className = 'results transition center'",1000); //1second is the spent time on the hide transition 
		}, false);
		
	}
	//datas
	if(refreshDatas) {
		listBriefBubble.innerHTML = "Results:";
		
		//if listBriefBubble has been refreshed then listBubble has to be refreshed
		refreshDataListBubble = true;
	}
	//show the built div
	resultsDiv.appendChild(listBriefBubble);
	
}

/* Build the refine brief bubble
 * It not needed to handle the errors. It an exception is raised then this will be caught by parent function (pushSearch function)
 */
function buildRefineBrief() {
	if(!isBuiltRefineBriefBubble) {
		refineBriefBubble = document.createElement('div');
		refineBriefBubble.id = 'refine_brief_bubble';
		refineBriefBubble.className = 'refine_brief_bubble';
		refineBriefBubble.style.marginLeft = "8%";
		refineBriefBubble.style.marginTop = "5%";
		isBuiltRefineBriefBubble = true;
		
		refineBriefBubble.addEventListener('touchstart', function(e) {
			console.log('go to refine bubble...');
			event.preventDefault();
			//hide the result layer
			resultsDiv.className = 'results transition right';
			//create a new content on result layer
			//show the result layer
			window.setTimeout("buildRefine(); resultsDiv.className = 'results transition center'",1000); //1second is the spent time on the hide transition 
			
		}, false);
	}

	if(!isBackBubble) { //Undo bubble
		//bubble back
		backBubble = document.createElement('div');
		backBubble.className = 'bubble_yellow_small';
		backBubble.style.left = "0px";
		backBubble.style.bottom = "0px";
		backBubble.innerHTML += 'Undo';
		
		backBubble.addEventListener('touchstart', function(e) {
			console.log('click on undo');
			event.preventDefault();
			
			app.error(backBubble, "ejemplo de mensaje de error")
		}, false);
		//TODO: falta la funcion goBack()
		
		isBackBubble = true;
	}
	
	
	if(!isMoreLink) {
		//bubble back
		console.log('build the more bubble link div');
		moreBubbleLink = document.createElement('div');
		moreBubbleLink.className = 'more_link';
		moreBubbleLink.style.right = "0px";
		moreBubbleLink.style.bottom = "0px";
		moreBubbleLink.innerHTML += 'Not related nodes';
		
		moreBubbleLink.addEventListener('touchstart', function(e) {
			console.log('click on more');
			event.preventDefault();
			//hide the result layer
			resultsDiv.className = 'results transition right';
			//create a new content on result layer
			
			//show the result layer
			window.setTimeout("buildMore(); resultsDiv.className = 'results transition center'",1000); //1second is the spent time on the hide transition 
		}, false);
		isMoreLink = true;
	}
	
	//datas
	if(refreshDatas) {
		refineBriefBubble.innerHTML = "Add filters";
		//if(updateFrom != 'RB') {  
			//if refineBriefBubble has been refreshed and the refresh was not done from refine bubble then refineBubble has to be refreshed
			refreshDataRefineBubble = true;	
		//}
	}
	//show the built divs
	resultsDiv.appendChild(refineBriefBubble);
	resultsDiv.appendChild(moreBubbleLink);
	resultsDiv.appendChild(backBubble);
}

/*
 * Built the search trace bubble
 */
function buildSearchTrace() {
	try {
		
		if(!isBuiltTraceBubble) {
			//the div searchTraceBubble is the scroller rol
			searchTraceBubble = document.createElement('div');
			searchTraceBubble.className = 'search_trace_bubble';
			searchTraceBubble.id = 'search_trace_bubble';
			isBuiltTraceBubble = true; //this object will not be built again
		
			searchTraceBubble.addEventListener('touchmove', function(e) {
				event.preventDefault();
			}, false);	
			
			if(!isBackBriefBubble) { //back brief screen
				backBriefBubble = document.createElement('div');
				backBriefBubble.className = 'bubble_yellow_small';
				backBriefBubble.style.left = "0px";
				backBriefBubble.style.top = "0px";
				backBriefBubble.innerHTML += 'Back';
				
				backBriefBubble.addEventListener('touchstart', function(e) {
					console.log('click go to ppal results search trace without results');
					event.preventDefault();
					//hide the result layer
					resultsDiv.className = 'results transition right';
					//remove all divs from results div parent
					while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
					//we have not created a new content because we did not refresh 
					//show the result layer
					window.setTimeout("buildResultsBrief();",1000); //1second is the spent time on the hide transition
				}, false);
				isBackBriefBubble = true;
			}
		}
		
		//remove all divs from results div parent
		while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
		//add the new bubble
		resultsDiv.appendChild(searchTraceBubble);
		resultsDiv.appendChild(backBriefBubble);
		
		//if we have to refresh the datas on this bubble
		if(refreshDataTraceBubble) {
			//create a div per results you're here
			searchTraceBubble.innerHTML = "You are here: \n";
			searchTraceBubble.innerHTML += "8 de 10";
			
			//draw the bubble without content. Totally 10 bubbles
			for (i=0; i<10; i++) {
				var xy = getRandomPositionOnResultsDiv(50, 50); //TODO: access to css and get the weidth and height
				searchTraceBubble.innerHTML += "<li class='li_space' style='left:"+xy[0]+"px;top:"+xy[1]+"px'></li>";
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
				bubbleLink.innerHTML = "><br><br><br>datos para este nodo";
				
				bubbleLink.addEventListener('touchstart', function(event) {
					selectBubble();
					event.stopPropagation();
				}, false);
				
				searchTraceBubble.appendChild(bubbleLink);
			}
			
			refreshDataTraceBubble = false;
		}
		
		
		console.log('building first and one time scroll result');
		scrollResult = new IScroll('#results_div', { mouseWheel: true }); //DUPLICATE
		isBuiltScrollResult = true; 
		
		
		resultsDiv.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	}
	catch(e) {
		app.error(e, "Fatal error building search trace bubble... Please contanct the site administrator.");
	}
}

/*
 * Build list bubble div 
 */
function buildList() {
	try {
		if(!isBuiltListBubble) {
			
			listBubble = document.createElement('div');
			listBubble.id = 'list_bubble';
			listBubble.className = 'list_bubble';
			isBuiltListBubble = true; //this object will not be built again
			
			listBubble.addEventListener('touchstart', function(e) {
				console.log('click go to ppal results from list bubble without chages');
				event.preventDefault();
				//hide the result layer
				resultsDiv.className = 'results transition right';
				//remove all divs from results div parent
				while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
				//we have not created a new content because we did not refresh 
				//show the result layer
				window.setTimeout("buildResultsBrief();",1000); //1second is the spent time on the hide transition 
			}, false);
		}
		//if we have to refresh the datas on this bubble
		if(refreshDataListBubble) {
			listBubble.innerHTML = "Results: \n";
			//include all bubbles
			refreshDataListBubble = false;
		}
		//remove all divs from results div parent
		while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
		//add the new bubble to results div
		resultsDiv.appendChild(listBubble);	
	}
	catch(e) {
		app.error(e, "Fatal error building list bubble... Please contanct the site administrator.");
	}
}

/**
 * Build refine bubble div
 */
function buildRefine() {
	try {
		if(!isBuiltRefineBubble) {
			
			refineBubble = document.createElement('div');
			refineBubble.id = 'refine_bubble'; 
			refineBubble.className = 'search_trace_bubble';//TODO: UNIFICAR NOMBRE AL ESTILO!!!
			isBuiltRefineBubble = true; //this object will not be built again
		
				
			refineBubble.addEventListener('touchmove', function(e) {
				event.preventDefault(); //in order to avoid open the menu
			}, false);	
			
			if(!isBackBriefBubble) { //back brief screen DUPLICADO
				backBriefBubble = document.createElement('div');
				backBriefBubble.className = 'bubble_yellow_small';
				backBriefBubble.style.left = "0px";
				backBriefBubble.style.top = "0px";
				backBriefBubble.innerHTML += 'Back';
				
				backBriefBubble.addEventListener('touchstart', function(e) {
					console.log('click go to ppal results search trace without results');
					event.preventDefault();
					//hide the result layer
					resultsDiv.className = 'results transition right';
					//remove all divs from results div parent
					while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
					//we have not created a new content because we did not refresh 
					//show the result layer
					window.setTimeout("buildResultsBrief();",1000); //1second is the spent time on the hide transition
				}, false);
				isBackBriefBubble = true;
			}
		}
		
		//remove all divs from results div parent
		while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild ); //TODO DUPLICADO hacer funcion para borrar e insertar divs dentro de otro
		//add the new bubble
		resultsDiv.appendChild(refineBubble);
		resultsDiv.appendChild(backBriefBubble);
		
		//if we have to refresh the datas on this bubble
		if(refreshDataRefineBubble) {
			//create a div per results you're here
			refineBubble.innerHTML = "Subcategories: \n"; 
			
			//draw the bubble without content. Totally 10 bubbles  DUPLICADO
			for (i=0; i<10; i++) {
				var xy = getRandomPositionOnResultsDiv(50, 50); //TODO: access to css and get the weidth and height
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
				bubbleLink.innerHTML = "><br><br><br>datos para este nodo";
				
				bubbleLink.addEventListener('touchstart', function(event) {
					selectBubble();
					event.stopPropagation();
				}, false);
				
				refineBubble.appendChild(bubbleLink);
			}
			
			refreshDataRefineBubble = false;
		}
		
		
		console.log('building first and one time scroll result');
		scrollResult = new IScroll('#results_div', { mouseWheel: true }); //duplicate
		isBuiltScrollResult = true; 
		
		resultsDiv.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
	}
	catch(e) {
		app.error(e, "Fatal error building refine bubble... Please contanct the site administrator.");
	}
}

/*
 * Build more bubble div
 */
function buildMore() {
	try {
		if(!isBuiltMoreBubble) {
			
			moreBubble = document.createElement('div');
			moreBubble.id = 'more_bubble';
			moreBubble.className = 'search_trace_bubble';//TODO: UNIFICAR NOMBRE AL ESTILO!!!
			isBuiltMoreBubble = true; //this object will not be built again
			
			moreBubble.addEventListener('touchmove', function(e) {
				event.preventDefault(); //in order to avoid open the menu
			}, false);	
			
			if(!isBackBriefBubble) { //back brief screen DUPLICADO
				backBriefBubble = document.createElement('div');
				backBriefBubble.className = 'bubble_yellow_small';
				backBriefBubble.style.left = "0px";
				backBriefBubble.style.top = "0px";
				backBriefBubble.innerHTML += 'Back';
				
				backBriefBubble.addEventListener('touchstart', function(e) {
					console.log('click go to ppal results search trace without results');
					event.preventDefault();
					//hide the result layer
					resultsDiv.className = 'results transition right';
					//remove all divs from results div parent
					while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
					//we have not created a new content because we did not refresh 
					//show the result layer
					window.setTimeout("buildResultsBrief();",1000); //1second is the spent time on the hide transition
				}, false);
				isBackBriefBubble = true;
			}
		}
		//remove all divs from results div parent
		while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild ); //TODO DUPLICADO hacer funcion para borrar e insertar divs dentro de otro
		//add the new bubble
		resultsDiv.appendChild(moreBubble);
		resultsDiv.appendChild(backBriefBubble);
		
		//if we have to refresh the datas on this bubble
		if(refreshMoreBubble) { //only if it is a new search we need to refresh the no related nodes. Always the direct descedents from root node. TODO: ???????
			moreBubble.innerHTML = "try another way: \n";
			//get datas	
			//draw the bubble without content. Totally 10 bubbles  DUPLICADO
			for (i=0; i<10; i++) {
				var xy = getRandomPositionOnResultsDiv(50, 50); //TODO: ELIMINAR LOS PARAMETROS NO SON NECESARIOS
				moreBubble.innerHTML += "<li class='li_space' style='left:"+xy[0]+"px;top:"+xy[1]+"px'></li>";
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
				bubbleLink.innerHTML = "><br><br><br>datos para este nodo";
				
				bubbleLink.addEventListener('touchstart', function(event) {
					selectBubbleNoRelated(); 
					event.stopPropagation();
				}, false);
				
				moreBubble.appendChild(bubbleLink);
			}
			refreshMoreBubble = false;
		}
		
		console.log('building first and one time scroll result');
		scrollResult = new IScroll('#results_div', { mouseWheel: true }); //DUPLICATE
		isBuiltScrollResult = true; 
		
		resultsDiv.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
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
		resultsDiv.className = 'results transition right';
		//remove all divs from results div parent
		while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
		searchbarDiv.className = 'page transition center';	
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
				//remove the error from results div
				resultsDiv.removeChild(errorScreen);
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
function getRandomPositionOnResultsDiv(heightElement, widthElement) {
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

