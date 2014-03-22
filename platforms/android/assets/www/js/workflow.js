//shows result div on screen
function showResults() {
	resultsDiv.className = 'results transition center';
}

//hides result div 
function hideResults() {
	resultsDiv.className = 'results transition right';
}

//shows the search bar div on screen
function showSearchBar () {
	searchbarDiv.className = 'page transition center';
}

//hides search bar div 
function hideSearchBar() {
	searchbarDiv.className = 'page transition up';
}

//shows the links bar div on screen
function showLinksBar() {
	linksbarDiv.className = 'page transition center';
}

//hides the links bar div
function hideLinksBar() {
	linksbarDiv.className = 'page transition down';
}

//add on results div, the element passed by parameter
function addOnResults(element) {
	resultsDiv.appendChild(element);
}

//add on results div, the element passed by parameter
function addOnLinkBar(element) {
	linksbarDiv.appendChild(element);
}

//clean the list docs
function cleanLinksBar() {
	//remove all divs from results div parent
	while ( linksbarDiv.firstChild ) linksbarDiv.removeChild( linksbarDiv.firstChild );
}

//function removes all components on result div
function cleanResultDiv() {
	//remove all divs from results div parent
	while ( resultsDiv.firstChild ) resultsDiv.removeChild( resultsDiv.firstChild );
}

//to open menu div
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

// to close menu div
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

//function is executed when the user click on search button 
function pushSearch() {
	try {
		console.log("Init Search...");
		//hide the search bar
		hideSearchBar();
		
		
		//TODO:calling to server with 
		sendRequest("/bubble-search");
		
		 
	}
	catch(e) {
		app.error(e, "Fatal error searching... Please contanct the site administrator.");
	}
}

function proSeach() {
	try {
		
	
		buildListDocBubble();
		drawListDocBubble();
		buildLinksBar(true);
		showLinksBar();
		//after to show the screen , we build subcategories and intension
		buildSubcategoriasIntension();
	}
	catch(e) {
		app.error(e, "Fatal on pro-search process... Please contanct the site administrator.");
	}
}



//it's executed when the user click on any intension bubble
function selectBubbleIntension() {
	try {
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
	catch(e) {
		app.error(e, "Fatal error loading result after to select an intension bubble... Please contanct the site administrator.");
	}
}

//it's executed when the user's clicked any subcategories bubble
function selectBubbleSubcategories() {
	try {
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
	catch(e) {
		app.error(e, "Fatal error loading result after to select a subcategories bubble... Please contanct the site administrator.");
	}
}


//function goes toward init screen
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



//function loads the components in order to show the intension bubbles 
function drawIntensionBubble() {
	try {
		//update the screen
		addOnResults(intensionBubble);
		buildScroll();
		showResults();	
	}
	catch(e) {
		app.error(e, "Fatal error drawing intension bubbles... Please contanct the site administrator.");
	}
}

//it draws the components in order to show the list of documents (extension of selected node)
function drawListDocBubble() {
	try {
		//update the screen
		addOnResults(listDocsBubble);
		buildScroll();
		//show results
		showResults();
	}
	catch(e) {
		app.error(e, "Fatal error drawing list of documents... Please contanct the site administrator.");
	}
}

//function loads the needed components to show the subcategories bubbles
function drawSubcategoriesBubble() {
	try {
		//update the screen
		addOnResults(subcategoriesBubble);
		buildScroll();
		showResults();	
	}
	catch(e) {
		app.error(e, "Fatal error drawing subcategories bubbles... Please contanct the site administrator.");
	}
	
}

//it builds the links bar. Depend on where the component will be show on list documents bubble or on subcategories/intension bubbles 
function buildLinksBar(isToDocsList) {
	try {
		cleanLinksBar();
		if(isToDocsList) { 
			linksbarDiv.style.width = "100%";
			addOnLinkBar(intensionButtonBubble);
			addOnLinkBar(subcategoriesButtonBubble);
			addOnLinkBar(initButtonBubble);
			addOnLinkBar(undoButtonBubble);
		}
		else {
			addOnLinkBar(backListButtonBubble);
		}
	}
	catch(e) {
		app.error(e, "Fatal error loading link bar... Please contanct the site administrator.");
	}
}

//function builds the iscroll components on result div
function buildScroll() {
	console.log('building scroll result');
	scrollResult = new IScroll('#results_div', {dimensions:{x:30,y:60}, mouseWheel: true });
	resultsDiv.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}

//Code to no related options
/*
function drawMoreBubble() {
	//update the screen
	addOnResults(moreBubble);
	buildScroll();
	showResults();
}


//user clicked on a bubble no related, then the user begin the search again 
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
*/