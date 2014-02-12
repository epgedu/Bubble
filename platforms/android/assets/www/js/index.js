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
initBubble, 
listBriefBubble, 
refineBriefBubble, 
backBubble,
moreBubble, 
searchTraceBubble, 
listBubble, 
refineBubble, 
errorScreen, 
moreBubble, 
moreBubbleLink, 
searchBtn; 

//save the variables in order to get it later without to look for it
appDiv = document.getElementById("app_div");
searchbarDiv = document.getElementById("searchbar_div");
resultsDiv = document.getElementById("results_div");
menuDiv = document.getElementById("menu_div");
searchBtn = document.getElementById("searchbtn");

//global variables (load control)
var refreshDatas, 
isBackBubble, 
isBuiltRefineBriefBubble, 
isBuiltListBriefBubble, 
isBuiltInitBubble, 
isBuiltTracerBriefBubble,  
isMoreLink, 
isBuiltTraceBubble, 
refreshDataTraceBubble, 
isBuiltListBubble, 
refreshDataListBubble, 
isBuiltRefineBubble, 
refreshDataRefineBubble, 
isBuiltError, 
isBuiltMoreBubble, 
refreshMoreBubble, 
wasMoved = false;

var updateFrom = '';

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
	    	
	    	//build the device info into the menu. 
	    	buildInfoDeviceMenu();
	        
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
	    	
	    	//var wrapper = document.getElementById('wrapper');
	    	//var myScroll = new IScroll('#wrapper', { mouseWheel: true });
	    	//wrapper.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    	}
    	catch (e) {
    		/*if the error happens during the app init, then it doesn't make sense go to error page, because the
    		 * app is not initialized. Then we set a notification and exit from app. 
    		 */ 
    		console.error("Exception: "+e);
    		navigator.notification.alert("Fatal error initializing... Please contanct the site administrator.", function() {navigator.app.exitApp();}, "Error");
    		app.vibrate();
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
    	if(e==null) { //info
    		console.log("Message: "+msg);
    	}
    	else { //error
    		console.error("Exception: "+e+", Message: "+msg);
    	}
    },
    
    //handle information
    info: function(e, msg) {
    	//show the problem through notification, not with error screen due to is not a important error
    	navigator.notification.alert(msg, function() {}, "Info");
		app.vibrate();
		if(e==null) { //info
    		console.log("Message: "+msg);
    	}
    	else { //error
    		console.error("Exception: "+e+", Message: "+msg);
    	}
    }
    
};

//add the device info into the menu
function buildInfoDeviceMenu() {
	//It is not a global variable
	var deviceInfoMenu = document.getElementById("infoDevice");
	deviceInfoMenu.innerHTML = 'Device Model: '    + device.model    + '<br />' +
	'Device Name: '  + device.name  + '<br />' +
    'Device Cordova: '  + device.cordova  + '<br />' +
    'Device Platform: ' + device.platform + '<br />' +
    'Device UUID: '     + device.uuid     + '<br />' +
    'Device Version: '  + device.version  + '<br />';
	
}
