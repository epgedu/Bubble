/**
 * File which contains the data structures and methods in order to get and set the information  
 


var lattice = new Array();

var formalConcept = new Object();

var objectContents = new Array();

var descriptorContents = new Array();

var objectContent = new Object();

var descriptorContent = new Object();


function formalConcept (conceptId, extension, intension, ascendents, descendents) {
	this.conceptId = conceptId;
	this.extension = extension;
	this.intension = intension;
	this.ascendent = ascendent;
	this.descendent = descendent;
}


function objectContent (id, value) {
	this.id = id;
	this.value = value;
}


function descriptorContent (id, value) {
	this.id = id;
	this.value = value;
}



var idRootLattice;

var currentNodeLattice;

//
var xmlAfc=loadXMLDoc("afc.xml");

var posConceptId = 0;
var posExtensionAfc = 1;
var posIntensionAfc = 2;
var posParentsAfc = 3;
var posChildrensAfc = 4;
var posObjContentId = 0;
var posObjContentValue = 1;
var posDesContentId = 0;
var posDesContentValue = 1;

function buildLatticeFromAfc(xmlAfc) {
	//for each formalConcept
	var formalConceptAfc;
	var extensionAfc;
	var intensionAfc;
	var parentsAfc;
	var childrensAfc;
	
	var conceptId;
	var extensionArray = new Array();
	var intensionArray = new Array();
	var parentsArray = new Array();
	var childrensArray = new Array();
	
	var formalConceptsAfc = xmlAfc.getElementsByTagName("formalConcept");

	
	for (i=0; i<formalConceptsAfc.length; i++) {
		
		formalConceptAfc = formalConceptsAfc[i];
		
		conceptId = formalConceptAfc.childNodes[posConceptId].nodeValue;
		
		extensionAfc = formalConceptAfc.childNodes[posExtensionAfc].childNodes;
		for (j=0, j<extensionAfc.length; j++) {
			extensionArray[j] = extensionAfc[j].nodeValue;
		}
		
		intensionAfc = formalConceptAfc.childNodes[posIntensionAfc].childNodes;
		for (j=0, j<intensionAfc.length; j++) {
			intensionArray[j] = intensionAfc[j].nodeValue;
		}
		
		//parents 
		parentsAfc = formalConceptAfc.childNodes[posParentsAfc].childNodes;
		for (j=0, j<parentsAfc.length; j++) {
			parentsArray[j] = parentsAfc[j].nodeValue;
		}
		
		//childrens
		childrensAfc = formalConceptAfc.childNodes[posChildrensAfc].childNodes;
		for (j=0, j<childrensAfc.length; j++) {
			childrensArray[j] = childrensAfc[j].nodeValue;
		}
		
		lattice[i] = formalConcept (conceptId, extensionArray, intensionArray, parentsArray, childrensArray);
	}
}

function buildObjectContents(xmlAfc) {
	var objectContentsAfc = xmlAfc.getElementsByTagName("objetoContenido");
	var objectContentAfc;
	var objectContent;
	
	for (i=0; i<objectContentsAfc.length; i++) {
		objectContentAfc = objectContentsAfc[i];
		objectContent = objectContent(objectContentAfc.childNodes[posObjContentId].nodeValue , objectContentAfc.childNodes[posObjContentValue].nodeValue);
		objectContents[i] = objectContent;
	}
	
}

function buildDecriptorContents(xmlAfc) {
	var descriptorContentsAfc = xmlAfc.getElementsByTagName("descriptorContenido");
	var descriptorContentAfc;
	var descriptorContent;
	
	for (i=0; i<descriptorContentsAfc.length; i++) {
		descriptorContentAfc = descriptorContentsAfc[i];
		descriptorContent = descriptorContent(descriptorContentAfc.childNodes[posDesContentId].nodeValue , descriptorContentAfc.childNodes[posDesContentValue].nodeValue);
		descriptorContents[i] = descriptorContent;
	}
	
}


function buildSubcategories (conceptId) {
	
	
}

function buildInitialComponent(xmlAfc) {
	buildLatticeFromAfc(xmlAfc);
	buildObjectContents(xmlAfc);
	buildDecriptorContents(xmlAfc);
}

function getInformationCurrentNode ( currentNodeLattice ) {
	
	var currentFormalConcept = lattice[currentNodeLattice];
	
	listDocBubble = currentFormalConcept.extension;
	intensionBubble = currentFormalConcept.intension;
	
	subcategories = getSubcategories(currentNodeLattice);

}


function getSubcategories(currentNodeLattice) {
	
	var currentFormalConcept = lattice[currentNodeLattice];
	//1- get all intension from childrens
	
	var childrens = currentFormalConcept.descendent;
	
	var children;
	var conceptFormalChildren;
	for(i=0; i<childrens.length; i++) {
		children = childrens[i]
		conceptFormalChildren = lattice[children];
		
		//add the intension from each children
		addIntensionSubcategories (conceptFormalChildren.intension);
		
		//remove on subcategories, the descriptor which are on intension of the current node
		removeIntensionCurrentNode ();
	}
	
	
}

var subcategories;

function addIntensionSubcategories(intension) {
	
	for (j=0; j<intension.length; j++) {
		if(!existDescriptorOnSubcategories) {
			//insert descriptor on subcategories
		}
		
	} 
	
}

function removeIntensionCurrentNode() {
	
	
}

*/