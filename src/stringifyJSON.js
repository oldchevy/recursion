// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  
  var str = '{';
  var Astr = '[';
  var Obool = true;
  var Abool = true;

  //This must be the first check, since null is an Object
  if (obj === null){
  	return 'null';
  }

  //Recursive buildup for objects
  //The second condition is to catch empty arrays, which have typeof object
  else if (typeof obj === 'object' && !(obj instanceof Array)){
  	for (var key in obj){
  		
  		if(typeof obj[key] === 'function' || obj[key] === undefined);
  		//Censors entries that are functions or undefined

  		else if (Obool){
  			str += ('"'+key+'"'+':'+stringifyJSON(obj[key]));
  			Obool = false;
  		}
  		else {
  			str += (',"'+key+'"'+':'+stringifyJSON(obj[key]));
  		}
  	}

  	return str+'}';
  }

  //Recursive buildup for arrays
  //Ditto, the second condition catches empty arrays
  else if(obj instanceof Array){
  	for(var i = 0; i<obj.length; i++){
  		if(Abool){
  			Astr += stringifyJSON(obj[i]);
  			Abool = false;
  		}
  		else{
  			Astr += (','+stringifyJSON(obj[i]));
  		}
  	}

  	return Astr+']';
  }

  //Base cases
  else if (typeof obj === 'boolean' || typeof obj === 'number'){
  	return obj.toString();
  }
  else if (typeof obj === 'string'){
  	return '"'+obj+'"';
  }


};
