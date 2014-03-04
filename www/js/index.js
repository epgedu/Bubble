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
var appDiv, 
searchbarDiv, 
resultsDiv, 
searchTraceBriefBubble, 
linksbarDiv,
linkSearchTraceBubble,
linkRefineBubble,
linkMoreBubble,
initBubble, 
undoButtonBubble,
listBriefBubble, 
refineBriefBubble, 
backBubble,
backListButtonBubble,
backListBubble,
moreBubble, 
searchTraceBubble, 
listDocsBubble, 
refineBubble, 
errorScreen, 
moreBubble, 
moreBubbleLink, 
searchBtn,
initButtonBubble,
subcategoriesButtonBubble,
intensionButtonBubble; 

//scroll on result_div
var scrollResult;

//save the variables in order to get it later without to look for it
appDiv = document.getElementById("app_div");
searchbarDiv = document.getElementById("searchbar_div");
resultsDiv = document.getElementById("results_div");
menuDiv = document.getElementById("menu_div");
searchBtn = document.getElementById("searchbtn");
linksbarDiv = document.getElementById("linksbar_div");
linkSearchTraceBubble = document.getElementById("link_search_trace_bubble");
linkRefineBubble = document.getElementById("link_refine_bubble");
linkMoreBubble = document.getElementById("link_more_bubble");

//global variables (load control)
var refreshDatas, 
isUndoBubble, 
isBuiltRefineBriefBubble, 
isBuiltListBriefBubble, 
isBuiltInitBubble, 
isBuiltTracerBriefBubble,  
isMoreLink, 
isBuiltTraceBubble, 
refreshDataTraceBubble, 
isBuiltListDocsBubble, 
refreshDataListBubble, 
isBuiltRefineBubble, 
refreshDataRefineBubble, 
isBuiltError, 
isBuiltMoreBubble, 
refreshMoreBubble, 
wasMoved,
isBackBubble,
isBackListBubble,
isBuiltScrollResult = false;

var updateFrom = '';

//var to save the position and to handle the swipe event
var down_x = null;
var up_x = null;
//var to save the position and to handle the spread event
var xFirstFinger, xSecondFinger, idFirstFinger, idSecondFinger = null;
var pixelesTotal, pixelesSecond, pixelesFirst = 0;
var spread = false;
//var to split the iscroll moving and select bubble
var auxX;

//array colour bubbles TODO: llevarselo a otro javascript. styleBubble.js
var colours = new Array();
colours[0] = "#F08080"; //LightCoral
colours[1] = "#E9967A"; //DarkSalmon 
colours[2] = "#F08080"; //LightPink
colours[3] = "#FF6347"; //Tomato
colours[4] = "#FF8C00"; //DarkOrange
colours[5] = "#FFFF00"; //Yellow
colours[6] = "#FFE4B5"; //Moccasin
colours[7] = "#EE82EE"; //Violet
colours[8] = "#6A5ACD"; //SlateBlue
colours[9] = "#7FFF00"; //Chartreuse
colours[10] = "#00FF7F"; //SpringGreen
colours[11] = "#66CDAA"; //MediumAquamarine
colours[12] = "#40E0D0"; //Turquoise
colours[13] = "#00BFFF"; //DeepSkyBlue


var app = {
    // Application Constructor
    initialize: function() {
    	// Initial state showing the body on central page
        state="body";
        //inital positions div's
        
        appDiv.className = 'page center';
        menuDiv.className = 'page center';
        resultsDiv.className = 'results right';
        linksbarDiv.className = 'page down';
        
        
        this.bindEvents();
    },
    
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are: 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent' function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	
    	try {
	    	app.receivedEvent('deviceready');
	    	
	    	// Execute the FastClick function, which removes the 300ms delay when the user click 
	        new FastClick(document.body);
	        
	        //device features
	    	console.log('Device name: '+ device.name );
	    	console.log('Device model: '+ device.model);
	    	console.log('Device cordova: '+ device.cordova );
	    	console.log('Device platform: '+ device.platform );
	    	console.log('Device uuid: '+ device.uuid );
	    	console.log('Device version: '+ device.version );
	    	
	    	//info native browser
	    	console.log('Native browser: '+ navigator.userAgent );
	    	//checking if native browser support touch events
	    	var touchable = 'createTouch' in document;
	    	console.log('touch events are supported by native browser '+touchable);
	    	//show a message and exit from app
	    	if(touchable==false) {
	    		app.alertErrorAndExit(null, "Sorry, the native browser doesn't support touch events... Please contanct the site administrator.");
	    	}
	    	
    	
	    	//build the device info into the menu. 
	    	buildInfoDeviceMenu();
	    	
	    	//build the common components like back list bottom , undo bottom
	        buildCommonComponents();
	    	
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
	    		wasMoved = true;
	      	}, false);
	        
	        appDiv.addEventListener('touchend', function(e) {
	        	console.log('end move on results');
	    		if(wasMoved) {
	    			openMenu();
	    			wasMoved = false;
	    		}
	        	
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
	    		wasMoved = true;
	        }, false);
	        
	        menuDiv.addEventListener('touchend', function(e) {
	        	console.log('end move on menu');
	        	if(wasMoved) {
	        		closeMenu();
	        		wasMoved = false;
	        	}
	      	}, false);
	        
	                
	        //check the internet connection
	        if(navigator.network.connection.type == Connection.NONE) {
	        	app.error(null, "Sorry, you are offline...");
	    		//disable search buttom
	        	searchBtn.disabled = true;
	        } 
	        document.addEventListener("online", this.handleConnection, false);
	    	document.addEventListener("offline", this.handleConnection, false);
	    	
	    }
    	catch (e) {
    		/*if the error happens during the app init, then it doesn't make sense go to error page, because the
    		 * app is not initialized. Then we set a notification and exit from app. 
    		 */ 
    		app.alertErrorAndExit(e, "Fatal error initializing... Please contanct with the site administrator.");
    	}
    },
    
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    
    
    //internet conection 
    handleConnection: function getNotificationConnection(e) {
    	try {
	    	if(e.type == "offline") {
	    		app.error(null, "Sorry, you are offline...");
	    		//disable search buttom
	        	searchBtn.disabled = true;
	    	} else {
	    		app.info(null, "Woot, you are back online.");
	    		//able search buttom
	    		searchBtn.disabled = false;
	    	}
    	}
    	catch(e) {
    		app.error(e, "Fatal error handle the connection... Please contanct the site administrator.");
    	}
    },
    
    
    vibrate: function () {
    	try {
    		//TODO: Establecer el segundo de vibracion como una propiedad externa
    		navigator.notification.vibrate(1000);
    	}
    	catch (e) {
    		app.info(e, "Error with vibration... Please contanct the site administrator.");
    	}
    },
    
    
    //handle errors
    error: function(e, msg){
        //show on div results, the error image and the text
    	buildError(msg);
    	app.vibrate();
    	if(e != null) { msg = msg + "Exception: "+e;} 
    	console.log(msg);
    },
    
    //handle errors without error screen and exit
    alertErrorAndExit: function(e, msg){
    	app.vibrate();
    	navigator.notification.alert(msg, function() {navigator.app.exitApp();}, "Error");
    	if(e != null) { msg = msg + "Exception: "+e;}
    	console.log(msg);
	},
    
    info: function (e, msg) {
    	if(e != null) { msg = msg + "Exception: "+e;}
    	console.log(msg);
    }
    
};

//add the device info into the menu
function buildInfoDeviceMenu() {
	try {
		//It is not a global variable
		var deviceInfoMenu = document.getElementById("infoDevice");
		deviceInfoMenu.innerHTML = 'Device Model: '    + device.model    + '<br />' +
		'Device Name: '  + device.name  + '<br />' +
	    'Device Cordova: '  + device.cordova  + '<br />' +
	    'Device Platform: ' + device.platform + '<br />' +
	    'Device UUID: '     + device.uuid     + '<br />' +
	    'Device Version: '  + device.version  + '<br />';
	}
	catch(e) {
		app.alertErrorAndExit(e, "Fatal error building info device menu...Please contact with the site administrator.")
	}
	
}

//add the events for each links bar
function buildLinksBar() {
	try {
		//handle tocuh event on linkSearchTraceBubble component
		linkSearchTraceBubble.addEventListener('touchstart', function(e) {
	        console.log("go to search trace bubbles");
	        hideResults();
	    	cleanResultDiv();
	    	window.setTimeout("drawSearchTraceBubble();",1000); //1second is the spent time on the hide transition
	    	hideLinksBar(); 
	    }, false);
		
		//handle tocuh event on linkSearchTraceBubble component
		linkRefineBubble.addEventListener('touchstart', function(e) {
			console.log("go to subcategories bubbles");
			hideResults();
	    	cleanResultDiv();
	    	window.setTimeout("drawRefineBubble();",1000); //1second is the spent time on the hide transition
	    	hideLinksBar();
		}, false);
		
		//handle tocuh event on linkSearchTraceBubble component
		linkMoreBubble.addEventListener('touchstart', function(e) {
			console.log("go to not related bubbles");
			hideResults();
	    	cleanResultDiv();
	    	window.setTimeout("drawMoreBubble();",1000); //1second is the spent time on the hide transition
	    	hideLinksBar();
		}, false);	
	}
	catch(e) {
		app.alertErrorAndExit(e, "Fatal error building links bar...Please contact with the site administrator.")
	}
	
}





