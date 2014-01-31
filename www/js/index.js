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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("online", this.toggleCon, false);
    	document.addEventListener("offline", this.toggleCon, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        setupSearchPage();
        
        //check the internet connection
        if(navigator.network.connection.type == Connection.NONE) {
    		navigator.notification.alert("Sorry, you are offline.", function() {}, "Offline!");
    		//desactivar boton de busqueda
    	} 
        
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
    		//desactivar boton
    	} else {
    		//activar boton de busqueda
    		navigator.notification.alert("Woot, you are back online.", function() {}, "Online!");
    		//activar boton
    	}	
    	
    },
    //handle errors
    error: function(e, msg){
        //show on div results, the error image and the text
    	console.error("Exception: "+e+", Message: "+id);
    	//the div results get the error style, add image and message and button ok
    	$('#results').text('There was an error loading the data.');

    }

};

function setupSearchPage() {
	console.log('Draw the seearch page');
	$('#results').text('okokokokokok.');
}


