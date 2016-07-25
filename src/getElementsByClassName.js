// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:


var getElementsByClassName = function(className, element) {

	var elementArray = [];

	//Checks where to begin from, and saves working point if not the top
	var workingElement = element ? element : document.body;
	// element = element || document.body;

	//If an element has no classes, classList is undefined so we must check that first.
	//Then check to see if the class list contains the target
	if( workingElement.classList && workingElement.classList.contains(className)){
		elementArray.push(workingElement);
	}

	//The recursive part: if child nodes exist, it calls the function on each one.
	//If a recursive call returns anything, it will be passed up the call stack.
	//If not, the function will return undefined and nothing will be added to our array buildup
	if(workingElement.hasChildNodes()){

		for (var i=0; i<workingElement.childNodes.length; i++){
			var next = getElementsByClassName(className, workingElement.childNodes[i]);
			if (next)
				elementArray = elementArray.concat(next);
				//can fix the flatten issue with concat i'm pretty sure
		}

	}

	// If nothing has been built up, nothing is returned. Also, flatten the
	// array inside the recursive call.
	return elementArray.length > 0 ? elementArray : undefined;
  	
};
