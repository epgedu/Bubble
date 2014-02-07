/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// global variables (div's)
var appDiv, searchbarDiv, resultsDiv, searchTraceBriefBubble, initBubble, listBriefBubble, refineBriefBubble, backBubble, moreBubble, searchTraceBubble, listBubble, refineBubble, errorScreen;

//save the variables in order to get it later without to look for it
appDiv = document.getElementById("app_div");
searchbarDiv = document.getElementById("searchbar_div");
resultsDiv = document.getElementById("results_div");
menuDiv = document.getElementById("menu_div");

//global variables (load control)
var refreshDatas, isBackBubble, isBuiltRefineBriefBubble, isBuiltListBriefBubble, isBuiltInitBubble, isBuiltTracerBriefBubble, isMoreBubble, isBuiltTraceBubble, refreshDataTraceBubble, isBuiltListBubble, refreshDataListBubble, isBuiltRefineBubble, refreshDataRefineBubble, isBuiltError = false; 

//var to save the position and to handle the swipe event
var down_x = null;
var up_x = null;

var app = {
    // Application Constructor
    initialize: function() {
    	// Initial state showing the body on central page
        state="body";
        //inital positions div's
        appDiv.className = 'page center';
        menuDiv.className = 'page center';
        resultsDiv.className = 'results right'
        
        this.bindEvents();
    },
    
    
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are: 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent' function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // Ejecutamos la funci—n FastClick, que es la que nos elimina esos 300ms de espera al hacer click
        new FastClick(document.body);
        
        //handle swipe event on results layer in order to open the menu
        appDiv.addEventListener('touchstart', function(e) {
            // If there's exactly one finger inside this element
            var touch = e.targetTouches[0];
            console.log('start move on results');
        	down_x = touch.pageX;
        }, false);
        
        appDiv.addEventListener('touchmove', function(e) {
        	console.log('moving on results');
        	e.preventDefault();
        	var touch = e.targetTouches[0];
    		up_x = touch.pageX;
      	}, false);
        
        appDiv.addEventListener('touchend', function(e) {
        	console.log('end move on results');
    		openMenu();
      	}, false);
        
        //handle swipe event in order to close the menu
        menuDiv.addEventListener('touchstart', function(e) {
            var touch = e.targetTouches[0];
            console.log('start move on menu');
        	down_x = touch.pageX;
        }, false);
        
        menuDiv.addEventListener('touchmove', function(e) {
        	console.log('moving on menu');
        	e.preventDefault();
        	var touch = e.targetTouches[0];
    		up_x = touch.pageX;
      	  
        }, false);
        
        menuDiv.addEventListener('touchend', function(e) {
        	console.log('end move on menu');
    		closeMenu();
      	}, false);
        
                
        //check the internet connection
        if(navigator.network.connection.type == Connection.NONE) {
    		navigator.notification.alert("Sorry, you are offline.", function() {}, "Offline!");
    		app.vibrate();
    		//desactivar boton de busqueda
    	} 
        document.addEventListener("online", this.handleConnection, false);
    	document.addEventListener("offline", this.handleConnection, false);
    	
    	//Finally, build the next screens: search bar and menu
    	buildInitScreen();
    },
    
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    
    
    //internet conection 
    handleConnection: function getNotificationConnection(e) {
    	if(e.type == "offline") {
    		//TODO: desactivar botono de busqueda
    		navigator.notification.alert("Sorry, you are offline.", function() {}, "Offline!");
    		app.vibrate();
    		//desactivar boton
    	} else {
    		//activar boton de busqueda
    		navigator.notification.alert("Woot, you are back online.", function() {}, "Online!");
    		app.vibrate();
    		//activar boton
    	}	
    },
    
    
    vibrate: function () {
    	//TODO: Establecer el segundo de vibracion como una propiedad externa
    	navigator.notification.vibrate(1000);
    },
    
    
    //handle errors
    error: function(e, msg){
        //show on div results, the error image and the text
    	buildError(msg);
    	console.error("Exception: "+e+", Message: "+msg);
    }
    
};

function openMenu() {
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

function closeMenu() {
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

/*building the init screen */
function buildInitScreen() {
	buildMenu();
	
}

/*building the menu on the left div */
function buildMenu() {
	
	
}





//function is executes when user push search button 
function pushSearch() {
	console.log("Init Search...");
	//hide the search bar
	searchbarDiv.className = 'page transition up';
	
	//TODO:calling to server
	
	//build the results brief on appDiv
	refreshDatas = true;
	buildResultsBrief();
	refreshDatas = false;
}	

//building the first screen with results
function buildResultsBrief() {
	buildSearchTraceBrief();
	buildListBrief();
	buildRefineBrief();
	
	resultsDiv.className = 'results transition center';
}


//build the search trace brief bubble
function buildSearchTraceBrief() {
	
	if(!isBuiltTracerBriefBubble) {
		//bubble where the search trace is saved
		searchTraceBriefBubble = document.createElement('div');
		searchTraceBriefBubble.id = 'search_trace_brief_bubble';
		searchTraceBriefBubble.className = 'search_trace_brief_bubble';
		searchTraceBriefBubble.style.marginLeft = "25%";
		isBuiltTracerBriefBubble = true; //this object will not be built again
		
		$('#search_trace_brief_bubble').longTap(function(event){
			console.log('long tap...');
			event.preventDefault();
			
			//searchTraceBriefBubble.className = 'search_trace_brief_bubble hover';
			
			//hide the result layer
			resultsDiv.className = 'results transition right';
			//create a new content on result layer
			//show the result layer
			window.setInterval("buildSearchTrace(); resultsDiv.className = 'results transition center'",2000); //2seconds is the spent time on the hide transition 
			
			
			
			
		});
		
		/*
		$('#search_trace_brief_bubble').doubleTap(function(event){
			console.log('doubleTap...');
			event.preventDefault();
			searchTraceBriefBubble.className = 'search_trace_brief_bubble';
		});
		*/
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
			goInit();
		}, false);
		
		isBuiltInitBubble = true; //this object will not be built again
	}
	
	//datas
	if(refreshDatas) {
		searchTraceBriefBubble.innerHTML = "You are here:";
		//also refresh the bubble size
		searchTraceBriefBubble.className = 'search_trace_brief_bubble';
		//show the built divs
		resultsDiv.appendChild(searchTraceBriefBubble);
		resultsDiv.appendChild(initBubble);
		//if searchTraceBriefBubble has been refreshed then searchTraceBubble has to be refreshed
		refreshDataTraceBubble = true;
		
	}
}

function buildListBrief() {
	if(!isBuiltListBriefBubble) {
		listBriefBubble = document.createElement('div');
		listBriefBubble.id = 'list_brief_bubble';
		listBriefBubble.className = 'list_brief_bubble';
		listBriefBubble.style.marginLeft = "5%";
		listBriefBubble.style.marginTop = "5%";
		isBuiltListBriefBubble = true;
		
		$('#list_brief_bubble').longTap(function(event){
			console.log('long tap...');
			event.preventDefault();
			
			//listBriefBubble.className = 'list_brief_bubble hover';
			//hide the result layer
			resultsDiv.className = 'results transition right';
			//create a new content on result layer
			//show the result layer
			window.setInterval("buildList(); resultsDiv.className = 'results transition center'",2000); //2seconds is the spent time on the hide transition 
			
			
		});
		
		/*
		$('#list_brief_bubble').doubleTap(function(event){
			console.log('doubleTap...');
			event.preventDefault();
			listBriefBubble.className = 'list_brief_bubble';
		});
		*/
		
	}
	//datas
	if(refreshDatas) {
		listBriefBubble.innerHTML = "Results:";
		//also refresh the bubble size
		listBriefBubble.className = 'list_brief_bubble';
		//show the built div
		resultsDiv.appendChild(listBriefBubble);
		//if listBriefBubble has been refreshed then listBubble has to be refreshed
		refreshDataListBubble = true;
	}
}

function buildRefineBrief() {
	if(!isBuiltRefineBriefBubble) {
		refineBriefBubble = document.createElement('div');
		refineBriefBubble.id = 'refine_brief_bubble';
		refineBriefBubble.className = 'refine_brief_bubble';
		refineBriefBubble.style.marginLeft = "8%";
		refineBriefBubble.style.marginTop = "5%";
		isBuiltRefineBriefBubble = true;
		
		$('#refine_brief_bubble').longTap(function(event){
			console.log('long tap...');
			event.preventDefault();
			
			//refineBriefBubble.className = 'refine_brief_bubble hover';
			//hide the result layer
			resultsDiv.className = 'results transition right';
			//create a new content on result layer
			//show the result layer
			window.setInterval("buildRefine(); resultsDiv.className = 'results transition center'",2000); //2seconds is the spent time on the hide transition 
			
		});
		
		/*
		$('#refine_brief_bubble').doubleTap(function(event){
			console.log('doubleTap...');
			event.preventDefault();
			refineBriefBubble.className = 'refine_brief_bubble';
		});
		*/
		
	}

	if(!isBackBubble) {
		//bubble back
		backBubble = document.createElement('div');
		backBubble.className = 'bubble_yellow_small';
		backBubble.style.left = "0px";
		backBubble.style.bottom = "0px";
		backBubble.innerHTML += 'Back';
		
		backBubble.addEventListener('touchstart', function(e) {
			console.log('click on back');
			
			app.error(backBubble, "ejemplo de mensaje de error")
		}, false);
		//TODO: falta la funcion goBack()
		
		isBackBubble = true;
	}
	
	
	if(!isMoreBubble) {
		//bubble back
		moreBubble = document.createElement('div');
		moreBubble.className = 'bubble_red_small';
		moreBubble.style.right = "0px";
		moreBubble.style.bottom = "0px";
		moreBubble.innerHTML += 'More...';
		
		moreBubble.addEventListener('touchstart', function(e) {
			console.log('click on more');
			
			goInit();
		}, false);
		//TODO: falta la funcion goMore()
		
		isMoreBubble = true;
	}
	
	
	
	//datas
	if(refreshDatas) {
		refineBriefBubble.innerHTML = "Subcategories:";
		//also refresh the bubble size
		refineBriefBubble.className = 'refine_brief_bubble';
		//show the built divs
		resultsDiv.appendChild(refineBriefBubble);
		resultsDiv.appendChild(moreBubble);
		resultsDiv.appendChild(backBubble);
		//if refineBriefBubble has been refreshed then refineBubble has to be refreshed
		refreshDataRefineBubble = true;
	}

}

function buildSearchTrace() {
	if(!isBuiltTraceBubble) {
		//bubble where completed search trace is saved
		searchTraceBubble = document.createElement('div');
		searchTraceBubble.id = 'search_trace_bubble';
		searchTraceBubble.className = 'search_trace_bubble';
		
		
		//remove the last bubbles on result div
		resultsDiv.removeChild(searchTraceBriefBubble);
		resultsDiv.removeChild(initBubble);
		resultsDiv.removeChild(listBriefBubble);
		resultsDiv.removeChild(refineBriefBubble);
		resultsDiv.removeChild(backBubble);
		resultsDiv.removeChild(moreBubble);
		
		//add the new bubble to results div
		resultsDiv.appendChild(searchTraceBubble);
		isBuiltTraceBubble = true; //this object will not be built again
		
	
	}
	//if we have to refresh the datas on this bubble
	if(refreshDataTraceBubble) {
		searchTraceBubble.innerHTML = "You are here: \n";
		searchTraceBubble.innerHTML += "8 de 10";
		//include all bubbles
		refreshDataTraceBubble = false;
	}
	
	
}

function buildList() {
	if(!isBuiltListBubble) {
		
		listBubble = document.createElement('div');
		listBubble.id = 'list_bubble';
		listBubble.className = 'list_bubble';
		
		
		//remove the last bubbles on result div
		resultsDiv.removeChild(searchTraceBriefBubble);
		resultsDiv.removeChild(initBubble);
		resultsDiv.removeChild(listBriefBubble);
		resultsDiv.removeChild(refineBriefBubble);
		resultsDiv.removeChild(backBubble);
		resultsDiv.removeChild(moreBubble);
		
		//add the new bubble to results div
		resultsDiv.appendChild(listBubble);
		isBuiltListBubble = true; //this object will not be built again
		
	
	}
	//if we have to refresh the datas on this bubble
	if(refreshDataListBubble) {
		listBubble.innerHTML = "Results: \n";
		//include all bubbles
		refreshDataListBubble = false;
	}
}

function buildRefine() {
	
	if(!isBuiltRefineBubble) {
		
		refineBubble = document.createElement('div');
		refineBubble.id = 'refine_bubble';
		refineBubble.className = 'refine_bubble';
		
		
		//remove the last bubbles on result div
		resultsDiv.removeChild(searchTraceBriefBubble);
		resultsDiv.removeChild(initBubble);
		resultsDiv.removeChild(listBriefBubble);
		resultsDiv.removeChild(refineBriefBubble);
		resultsDiv.removeChild(backBubble);
		resultsDiv.removeChild(moreBubble);
		
		//add the new bubble to results div
		resultsDiv.appendChild(refineBubble);
		isBuiltRefineBubble = true; //this object will not be built again
		
	
	}
	//if we have to refresh the datas on this bubble
	if(refreshDataRefineBubble) {
		refineBubble.innerHTML = "Subcategories: \n";
		//include all bubbles
		refreshDataRefineBubble = false;
	}
	
	
}




function goInit() {
	resultsDiv.className = 'results transition right';
	searchbarDiv.className = 'page transition center';
}


function buildError(msg) {
	
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


