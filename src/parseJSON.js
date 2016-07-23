// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	//The general idea is to read each character, and if it identifies it as an object
	//or array, to call a recursive function which returns that entire new object parsed
	var building;

	json = stripWhiteSpace(json);
	var objects = json.match(/^{(.*)}$/); //Greedy method makes sure only the outermost is selected
  	var arrays = json.match(/^\[(.*)\]$/);
  
  	//console.log(objects, arrays);

  	function stripWhiteSpace(entry){
  		var quotes = entry.match(/\".*?\"/g);
  		var strip = entry.replace(/[\s\n\t\r]/g,"");
      	var tooFar = strip.match(/\".*?\"/g);
      	if(quotes){
      		tooFar.forEach(function(entry,index){
          		strip = strip.replace(entry, quotes[index]);
        	});
      	}

  		return strip;
  	}


  	function findVal(entry){
  		var oneMatch;
  		if(entry.match(/^{(.*)}$/))
  			return parseJSON(entry);
  		if(entry.match(/^\[(.*)\]$/))
  			return parseJSON(entry);
  		if(entry.match(/^true$/))
  			return true;
  		if(entry.match(/^false$/))
  			return false;
  		if(entry.match(/^null$/))
  			return null;
  		if(oneMatch = entry.match(/^\"(.*)\"$/)){
  			//if(!oneMatch[1])
  				//return oneMatch[0];
  			//else
  				return oneMatch[1];
  		}
  		if(entry.match(/^[+-]?(\d+|\d*\.\d+|\d+\.\d*)([eE][+-]?\d+)?$/))
  			//I made this in eloquent javascript chapter on regEx
  			return parseFloat(entry);
  	}
  
  	if (objects){
      	building = {};
      	var bool = true;
      	var workingObj = objects[1];

      	while(bool){
      		bool = false;
      		var nextEntry = workingObj.match(/^("(.*?)":([0-9\.eE+-]+|\".*?\"|\[.*\]|\{.*\}|null|false|true)),(.*)/) ||
      						workingObj.match(/^("(.*?)":(.*))/);
      		console.log(nextEntry);
        	if(nextEntry){
        		building[nextEntry[2]] = findVal(nextEntry[3]);
        		if(nextEntry.length > 4){
        			workingObj = nextEntry[4];
        			bool = true;
        		}
        	}
      	}
    }
  
  	if (arrays){
      	building = [];
      	var bool = true;
      	var workingObj = arrays[1];

      	while(bool){
      		bool = false;
      		var nextEntry = workingObj.match(/^(null|false|true),(.*)/) ||
      						workingObj.match(/^(\".*?\"),(.*)/) ||
      						workingObj.match(/^(\[.*\]),(.*)/) ||
      						workingObj.match(/^(\{.*\}),(.*)/) ||
      						workingObj.match(/^([+-]?(\d+|\d*\.\d+|\d+\.\d*)([eE][+-]?\d+)?),[ \t\r\n]*(.*)/) ||
      						workingObj.match(/(.*)/);
      						//Use short circuit evaluation to make sure
      						//we don't accidentally grab an entry inside a larger
      						//entry.

      		console.log(nextEntry);
        	if(nextEntry[0].length > 0){
        		building.push(findVal(nextEntry[1]));
        	}
        	if(nextEntry.length > 2){
        		workingObj = nextEntry[nextEntry.length-1];
        		bool = true;
        	}
      	}
    }
    
  	return building;
  	

};
