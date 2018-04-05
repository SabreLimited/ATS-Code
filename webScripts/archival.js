function archiveRecords(){
	var today = new Date().toISOString().substr(0,10);
	var options = "$select=*&$filter=sabre_EndDate lt datetime'" + today + "'"; 
    alert(options);
	SDK.REST.retrieveMultipleRecords("sabre_position", options, retrieveRecordsCallback, errorFunction, recordsReturned);
}

function retrieveRecordsCallback(retrievedRecords){
	alert("into the callback");
	var today = newDate();
	var totalRecordCount = totalRecordCount + retrievedRecords.length;
	alert(totalRecordCount);
    for (var i = 0; i < retrievedRecords.length; i++) {
		var position = retrievedRecords[i];
		if(position.sabre_EndDate != null && position.sabre_EndDate < today){
			upDatePos = new Object();
			upDatePos.sabre_archivalstatus = 1;
			//updateRecord(position.sabre_positionId, upDatePos, "Position", errorFunction);
		}
	}
}

function updateRecordCallback(){
	alert("Record Updated");
}

function recordsReturned(){
	alert("DONE!");
}

function errorFunction(error){
	alert(error.message);
}