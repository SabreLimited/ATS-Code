//Called upon change of Top 100 Value
function top100Check(set){
	//sorts through all accounts for their top 100 value
	if(Xrm.Page.getControl("sabre_top100") != null && Xrm.Page.getAttribute("sabre_top100").getValue() == 1){
		SDK.JQuery.retrieveMultipleRecords(
			set,
			"$select=sabre_Top100",
			ResultsHandler100,
			errorHandler,
			function(){
			//OnComplete Handler
			}											
		);
	}
}

//restricts selection if it tries to get more than 100 top 100s.
function ResultsHandler100(results){
	var i = 0;
	var top100Count = 0;
	while (results[i] != null) {
		if(results[i].sabre_Top100 == 1){
			top100Count = top100Count + 1;
		}
		i = i+1;
	}
	if(top100Count > 99){
		alert("Cannot select more than 100 Top 100 Accounts");
		Xrm.Page.getAttribute("sabre_top100").setValue(0);
	}
}

//Called upon change of Top 25 Value
function top25Check(set){
	//sorts through all accounts for their top 100 value
	if(Xrm.Page.getControl("sabre_top25") != null && Xrm.Page.getAttribute("sabre_top25").getValue() == 1){
		SDK.JQuery.retrieveMultipleRecords(
			set,
			"$select=sabre_Top25",
			ResultsHandler25,
			errorHandler,
			function(){
			//OnComplete Handler
			}											
		);
	}
}

//restricts selection if it tries to get more than 100 top 100s.
function ResultsHandler25(results){
	var i = 0;
	var top25Count = 0;
	while (results[i] != null) {
		if(results[i].sabre_Top25 == 1){
			top25Count = top25Count + 1;
		}
		i = i+1;
	}
	if(top25Count > 24){
		alert("Cannot select more than 25 Top 25 Accounts");
		Xrm.Page.getAttribute("sabre_top25").setValue(0);
	}
}

function errorHandler(error){
	alert(error.message);
}