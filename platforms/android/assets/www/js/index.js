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

// global variables
var body, menu, results, state, searchbar, buttonsbar, attributes, unrelatedResults;

// save the variables in order to get it later without to look for it
body = document.getElementById("body"),
menu = document.getElementById("menu");
results = document.getElementById("results");
searchbar = document.getElementById("searchbar");
buttonsbar = document.getElementById("buttonsbar");
attributes = document.getElementById("attributes");
unrelatedResults = document.getElementById("unrelated_results");


//var to save the position and to handle the swipe event
var down_x = null;
var up_x = null;

var app = {
    // Application Constructor
    initialize: function() {
    	// Initial state showing the body on central page
        state="body";
        // A–adimos las clases necesarias
        body.className = 'page center';
        menu.className = 'page center';
        results.className = 'layer_results left';
        attributes.className = 'layer_attributes left';
        buttonsbar.className = 'page down';
        unrelatedResults.className = 'page right';
        //build the events
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // Ejecutamos la funci—n FastClick, que es la que nos elimina esos 300ms de espera al hacer click
        new FastClick(document.body);
  
        //handle swipe event on results layer in order to open the menu
        body.addEventListener('touchstart', function(e) {
            // If there's exactly one finger inside this element
            var touch = e.targetTouches[0];
            console.log('start move on results');
        	down_x = touch.pageX;
        }, false);
        
        body.addEventListener('touchmove', function(e) {
        	console.log('moving on results');
        	e.preventDefault();
        	var touch = e.targetTouches[0];
    		up_x = touch.pageX;
      	}, false);
        
        body.addEventListener('touchend', function(e) {
        	console.log('end move on results');
    		openMenu();
      	}, false);
        
        //handle swipe event in order to close the menu
        menu.addEventListener('touchstart', function(e) {
            var touch = e.targetTouches[0];
            console.log('start move on menu');
        	down_x = touch.pageX;
        }, false);
        
        menu.addEventListener('touchmove', function(e) {
        	console.log('moving on menu');
        	e.preventDefault();
        	var touch = e.targetTouches[0];
    		up_x = touch.pageX;
      	  
        }, false);
        
        menu.addEventListener('touchend', function(e) {
        	console.log('end move on menu');
    		closeMenu();
      	}, false);
                
        
        setupSearchPage();
        
        //check the internet connection
        if(navigator.network.connection.type == Connection.NONE) {
    		navigator.notification.alert("Sorry, you are offline.", function() {}, "Offline!");
    		app.vibrate();
    		//desactivar boton de busqueda
    	} 
        document.addEventListener("online", this.toggleCon, false);
    	document.addEventListener("offline", this.toggleCon, false);
        
        
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    //internet conection 
    toggleCon: function toggleCon(e) {
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
    	console.error("Exception: "+e+", Message: "+id);
    	//the div results get the error style, add image and message and button ok

    }

};

function setupSearchPage() {
	console.log('Draw the seearch page');
}


function pushSearch() {
	console.log("Init Search...");
	//hide the search bar
	searchbar.className = 'page transition up';
	//show the bottom bar
	buttonsbar.className = 'page transition center';
	//show the results layer
	results.className = 'layer_results transition centre';
	//show the attributes layer
	attributes.className = 'layer_attributes transition centre';
}

function restart() {
	console.log("Restart Search...");
	//hide the results layer
	results.className = 'layer_results transition left';
	//hide the attributes layer
	attributes.className = 'layer_attributes transition left';
	//hide buttonsbar
	buttonsbar.className = 'page transition down';
	//show the search bar
	searchbar.className = 'page transition center';
}


function openMenu()
{
	//if swipe left more 50px on results layer
    if ((up_x - down_x) > 50) {
    	//if state is body
    	if(state=="body"){ 
    		console.log('open menu');
            body.className = 'page transition right';
            state="menu";
        }
    }
}

function closeMenu()
{
	//if swipe right more 50px on menu layer
    if ((down_x - up_x) > 50) {
    	//if state is menu
	  if(state=="menu"){
		  	console.log('close menu');
	        body.className = 'page transition center';
	        state="body";        
		}
    }
}

function unrelated(){
	console.log("Unrelated Bubbles...");
	body.className = 'page transition left';
	menu.className = 'page transition left';
	
}

function backUnrelated() {
	
	
	
	
	
}




