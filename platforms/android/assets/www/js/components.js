/**
 * file which contains the UI Components and their behaviours 
 */

/*
 * Open menu div
 */
function openMenu() {
	try {
		//if swipe left more 50px on results layer
	    if ((up_x - down_x) > 50) {
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
		//if swipe right more 50px on menu layer
		if ((down_x - up_x) > 50) {
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
		
		
		updateFrom = 'IS'; //initial search . handle the workflow to avoid useless updates  
		refreshDatas = true; // all datas has to be updated
		refreshMoreBubble = true; //with refreshMoreBubble we handle that the "no related" data are got once. only with a new search therefore with a new root node
		//build the results brief on appDiv
		buildResultsBrief();
		refreshDatas = false;
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
		
		
		if (device.model == "sdk") { //if the app is executed on emulator then simple touch (tap)
			console.log('executing on emulator');
		
			searchTraceBriefBubble.addEventListener('touchstart', function(e) {
				console.log('go to tracer bubble');
				event.preventDefault();
				//hide the result layer
				resultsDiv.className = 'results transition right';
				//create a new content on result layer
				//show the result layer
				window.setTimeout("buildSearchTrace(); resultsDiv.className = 'results transition center'",1000); //1second is the spent time on the hide transition 
				
			}, false);	
		}
		else { //if the app is executed on real device then multi touch (Spread)
			console.log('executing on real device');
			
			searchTraceBriefBubble.addEventListener("touchstart", function(event) {
	            if(event.targetTouches.length >1){
	                spread = true;
	                xFirstFinger = event.targetTouches[0].pageX;
	                xSecondFinger = event.targetTouches[1].pageX;
	                console.log('xFirstFinger: '+xFirstFinger);
	                console.log('xSecondFinger: '+xSecondFinger);
	            }               
			},false);
			searchTraceBriefBubble.addEventListener("touchmove", function(event) {
	            if(event.targetTouches.length <= 1){
	                spread = false;
	                console.log('end of spread');
	            }               
			},false);
			searchTraceBriefBubble.addEventListener("touchend", function(event) {
	            if(event.targetTouches.length > 1 && spread){
	            	console.log('xFirstFinger: '+xFirstFinger);
	                console.log('xSecondFinger: '+xSecondFinger);
	            	if(xFirstFinger - event.targetTouches[0].pageX > 15) {
	            		if(event.targetTouches[1].pageX - xSecondFinger  > 15) {
	            			console.log('spread gesture: go to tracer bubble');
	        				event.preventDefault();
	        				//hide the result layer
	        				resultsDiv.className = 'results transition right';
	        				//create a new content on result layer
	        				//show the result layer
	        				window.setTimeout("buildSearchTrace(); resultsDiv.className = 'results transition center'",1000); //1second is the spent time on the hide transition
		            	}
	            	}
	                spread = false;
	            }               
			},false);
		}
		
		
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
		searchTraceBriefBubble.innerHTML = "You are here:";
		if(updateFrom != 'TB') { //Trace Bubble
			//if searchTraceBriefBubble has been refreshed then searchTraceBubble has to be refreshed
			refreshDataTraceBubble = true;	
		}
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

	if(!isBackBubble) {
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
		moreBubbleLink.innerHTML += 'More...';
		
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
		refineBriefBubble.innerHTML = "Subcategories:";
		if(updateFrom != 'RB') {  
			//if refineBriefBubble has been refreshed and the refresh was not done from refine bubble then refineBubble has to be refreshed
			refreshDataRefineBubble = true;	
		}
	}
	//show the built divs
	resultsDiv.appendChild(refineBriefBubble);
	resultsDiv.appendChild(moreBubbleLink);
	resultsDiv.appendChild(backBubble);
}

/*
 * Built the search trace bubble
 */
var scroller2;
function buildSearchTrace() {
	try {
		
		if(!isBuiltTraceBubble) {
			
			scroller2 = document.createElement('div');
			scroller2.id = 'scroller2';
			
			
			
			
			
			//bubble where completed search trace is saved
			//searchTraceBubble = document.createElement('div');
			//searchTraceBubble.id = 'search_trace_bubble';
			//searchTraceBubble.className = 'search_trace_bubble';
			isBuiltTraceBubble = true; //this object will not be built again
		
			/*event
			scroller2.addEventListener('touchstart', function(e) {
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
			*/
			//add iscroll
			//var scrollerSearchTrace = document.createElement('div');
			//scrollerSearchTrace.className = 'scroller2';
			//searchTraceBubble.appendChild(scrollerSearchTrace);
			//var scrollSearchTrace = new IScroll('#search_trace_bubble', { mouseWheel: trueresultsDivarchTrace.addEventListener('touchmove', function (e) { console.log() e.preventDefault(); }, false);
		}
		
		//remove all divs from results div parent
		
		
		//if we have to refresh the datas on this bubble
		if(refreshDataTraceBubble) {
			scroller2.innerHTML = "You are here: \n";
			scroller2.innerHTML += "8 de 10";
			scroller2.innerHTML += "<ul><li>Pretty row 1</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li>";
			scroller2.innerHTML += "<li>Pretty row 2</li></ul>";
								
			refreshDataTraceBubble = false;
		}
		
		while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
		//add the new bubble
		resultsDiv.appendChild(scroller2);
		
		var myScroll2 = new IScroll('#results_div', { mouseWheel: true });
    	resultsDiv.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		//while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
		//add the new bubble
		//resultsDiv.appendChild(searchTraceBubble);
		
    	
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
			refineBubble.className = 'refine_bubble';
			isBuiltRefineBubble = true; //this object will not be built again
		
			refineBubble.addEventListener('touchstart', function(e) {
				console.log('click go to ppal results from refine bubble without changes');
				event.preventDefault();
				//hide the result layer
				resultsDiv.className = 'results transition right';
				//remove all divs from results div parent
				while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
				//we have not created a new content because we did not refresh from refine bubble 
				//show the result layer
				window.setTimeout("buildResultsBrief();",1000); //1second is the spent time on the hide transition 
			}, false);
		
			
			
		}
		
		//if we have to refresh the datas on this bubble
		if(refreshDataRefineBubble) {
			refineBubble.innerHTML = "Subcategories: \n";
			//include div with all bubbles 
			refreshDataRefineBubble = false;
		}
		
		//remove all divs from results div parent
		while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
		//add the new bubble to results div
		resultsDiv.appendChild(refineBubble);
		
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
			moreBubble.className = 'more_bubble';
			isBuiltMoreBubble = true; //this object will not be built again
			
			moreBubble.addEventListener('touchstart', function(e) {
				console.log('click go to ppal results from more bubble without changes');
				event.preventDefault();
				//hide the result layer
				resultsDiv.className = 'results transition right';
				//remove all divs from results div parent
				while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
				//we have not created a new content because we did not refresh from refine bubble 
				//show the result layer
				window.setTimeout("buildResultsBrief();",1000); //1second is the spent time on the hide transition 
			}, false);
		}
		//if we have to refresh the datas on this bubble
		if(refreshMoreBubble) { //only if it is a new search we need to refresh the no related nodes. Always the direct descedents from root node. TODO: ???????
			moreBubble.innerHTML = "try another way: \n";
			//get datas	
			refreshMoreBubble = false;
		}
		//remove all divs from results div parent
		while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
		
		//add the new bubble to results div
		resultsDiv.appendChild(moreBubble);	
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