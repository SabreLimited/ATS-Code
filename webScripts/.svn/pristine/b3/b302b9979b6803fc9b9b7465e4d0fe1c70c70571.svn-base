function administrativeActions(){
  SDK.JQuery.retrieveMultipleRecords(
		"Contact",
		"",
		resultsHandler,
		errorHandler,
		function(){
		//OnComplete Handler
		}											
	);

}

function resultsHandler(results){
	var i = 0;
	while (results[i] != null){
		var object = new Object();
		object = results[i];
		var country = confirm("Does "+ results[i].Address1_Line1 + " " + results[i].Address1_City + " " +results[i].Address1_StateOrProvince + " " + results[i].Address1_PostalCode + " " + results[i].Address1_Country + " live in Canada?");
		if(country == true){
			//Set to Canada
			object.sabre_Country = {Value: 837770000};
		}
		else{
			//Set to US
			object.sabre_Country = {Value: 837770001};
		}
		SDK.JQuery.updateRecord(
			results[i].ContactId,
			object,
			"Contact",
			function(){
				
			},
			errorHandler
		);
		i++;
	}
}


/*  SDK.JQuery.retrieveMultipleRecords(
		"sabre_position",
		"",
		resultsHandler,
		errorHandler,
		function(){
		//OnComplete Handler
		}											
	);
}

function resultsHandler(results){
	//take position's pay rate and bill rate
	//newpayrate = payrate+ '-'+billrate
	var i = 0;
	while (results[i] != null) {
		var object = new Object();
		var objFrom = results[i].sabre_From;
		var objTo = results[i].sabre_To;
		var objFromVal = Number(objFrom.Value);
		objFromVal = objFromVal.toFixed(2);
		var objToVal = Number(objTo.Value);
		objToVal = objToVal.toFixed(2);
		object = results[i];
		//console.log(results[i]);
		object.sabre_PayRate = objFromVal.toString() + ' - ' + objToVal.toString();
		//console.log(object);
		SDK.JQuery.updateRecord(
			results[i].sabre_positionId,
			object,
			"sabre_position",
			function(){
				
			},
			errorHandler
		);
		i++;
	}
	
}*/

function errorHandler(error){
	alert(error.message);
}