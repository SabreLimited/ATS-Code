//Annotation Creation function
function CreateRecord2016(){
  if( Xrm.Page.data.entity.getId() != null && Xrm.Page.data.entity.getId() != ''){
	  //setting information up for Note creation. Object contains the data the note will possess.
	  var object = new Object();
	  //there is no new Annotation created if this is a new object
	  if(Xrm.Page.getControl("sabre_oldnoofopenings") != null && Xrm.Page.getControl("sabre_noofopenings") != null && Xrm.Page.getAttribute("sabre_oldnoofopenings").getValue() != Xrm.Page.getAttribute("sabre_noofopenings").getValue()){
		  //object.NoteText = //prompt("For what reason is the Number of Openings being changed?");
		  //object.Subject = "Number of Openings changed";
		  positionId = Xrm.Page.data.entity.getId();
		  

		  
		  //refPosition is defining which object the Note will be attached to.
		  var refPosition = new Object();
		  refPosition.LogicalName = "sabre_position";
		  refPosition.Id = positionId;
		  object.ObjectId = refPosition;
		  object.ObjectTypeCode = refPosition.LogicalName;
			
		  object.NoteText = "Manually Changed to: " + Xrm.Page.getAttribute("sabre_noofopenings").getValue() + " from: " + Xrm.Page.getAttribute("sabre_oldnoofopenings").getValue();
		  //creating new opening record
		  var openingObject = new Object();
		  openingObject.sabre_name = object.NoteText;
		  openingObject.sabre_PositionNo = refPosition;
		  openingObject.sabre_PreviousOpenings = Xrm.Page.getAttribute("sabre_oldnoofopenings").getValue();
		  openingObject.sabre_Openings = Xrm.Page.getAttribute("sabre_noofopenings").getValue();
		  SDK.JQuery.createRecord(
			openingObject,
			"sabre_opening",
			function(object){},
			errorHandler
		  );
		  //
		  
		  //SDK function for creating CRM Records pass an object containing fields you want filled, the name of the entity<capitalized>,
		  //a function to call on success, and a function to call on failure
		  /*SDK.JQuery.createRecord(
			object,
			"Annotation",
			function (object) {
			  Xrm.Page.data.save(true, function(){
						Xrm.Utility.openEntityForm(Xrm.Page.data.entity.getEntityName(), Xrm.Page.data.entity.getId()); 

			  });
		  
			  },
			errorHandler
		  );*/
	  } 

  }
}

//function for mass creation of openings upon increasing opening count.
/*function CreateOpening(){

  //value assignment to object that will be created.
  var object = new Object();
  var lookupid = Xrm.Page.data.entity.getId();
  //have to call getControl before getting attributes or problems occur
  Xrm.Page.getControl("sabre_name");
  var lookupLabel = Xrm.Page.getAttribute("sabre_name").getValue();
  object.sabre_PositionNo = { Id: lookupid, Name: lookupLabel};
  object.sabre_name = "Opening";
  
  if(Xrm.Page.getControl("sabre_startdate")!= null){
    object.sabre_StartDate = Xrm.Page.getAttribute("sabre_startdate").getValue();  
  }
  
  if(Xrm.Page.getControl("sabre_enddate") != null){
	object.sabre_EndDate = Xrm.Page.getAttribute("sabre_enddate").getValue();  
  }
  
  if(window.parent.Xrm.Page.getAttribute("sabre_address1") != null){ //correct, others aren't filling in.
    object.sabre_WorkAddress = window.parent.Xrm.Page.getAttribute("sabre_address1").getValue();
  }
  
  //if we have something in noofopenings
  if(Xrm.Page.getControl("sabre_noofopenings") != null){
	  //is this increasing the number of openings
	  if(Xrm.Page.getControl("sabre_oldnoofopenings") == null || Xrm.Page.getAttribute("sabre_noofopenings").getValue() > Xrm.Page.getAttribute("sabre_oldnoofopenings").getValue()){
		  Xrm.Page.getControl("sabre_noofopenings");
		  if(Xrm.Page.getControl("sabre_oldnoofopenings") != null && Xrm.Page.getAttribute("sabre_oldnoofopenings").getValue() != null && Xrm.Page.getControl("sabre_oldnoofopenings") != undefined){
			//diff is the difference between the new and old values of number of openings.
			var diff = Xrm.Page.getAttribute("sabre_noofopenings").getValue() - Xrm.Page.getAttribute("sabre_oldnoofopenings").getValue();
		  }
		  else{//else condition is fired when oldnoofopenings is null, assumes it is null because it is a new object and thus at 1
			var diff = Xrm.Page.getAttribute("sabre_noofopenings").getValue() -1 ; //constant value 1 assumed for new objects.
			
		  }
		  gblDiffCount = new Object();
		  
		  while (diff > 0){
		    object.sabre_name = "OPEN-" + (diff+Xrm.Page.getAttribute("sabre_oldnoofopenings").getValue());
			SDK.JQuery.createRecord(
				object,
				"sabre_opening",
				function (val) {
				//function runs on success of createRecord, enter logic here if needed.
				},
				errorHandler
			);
			diff = diff - 1;
		  }
	  }
	  //is this a new position?
	  else if(Xrm.Page.getControl("sabre_oldnoofopenings") != null && Xrm.Page.getAttribute("sabre_noofopenings").getValue() == Xrm.Page.getAttribute("sabre_oldnoofopenings").getValue()){
		diff = Xrm.Page.getAttribute("sabre_noofopenings").getValue();
	    while (diff > 0){
		  object.sabre_name = "NEWOPEN" + diff;
		  SDK.JQuery.createRecord(
				object,
				"sabre_opening",
				function (val) {
				//function runs on success of createRecord, enter logic here if needed.
				},
				errorHandler
		  );
		  diff = diff - 1;
		}
	  }
	  else if(Xrm.Page.getAttribute("sabre_noofopenings").getValue() < Xrm.Page.getAttribute("sabre_oldnoofopenings").getValue()){

		//no longer using this script for actions when the number of openings is decreased.
		  
	  }
	  
  }

}*/


//new function to get currently availableopenings for a job.
function getAvailableOpenings(){
	var posId = Xrm.Page.data.entity.getId();
	if(Xrm.Page.getControl("sabre_noofopenings") != null && Xrm.Page.getAttribute("sabre_noofopenings").getValue() != null && posId != '' && posId != null){
		
		//get all related placements where today is
		gblConsumedOpenings = 0;
		
		SDK.JQuery.retrieveMultipleRecords("sabre_placement", "?$select=sabre_ActualStartDate,sabre_EndDate&$filter=sabre_Posistion/Id eq (guid'"+ posId +"') and statuscode/Value eq 1", function(results) {
			for (var i = 0; i < results.length; i++) {
				var sabre_ActualStartDate = results[i].sabre_ActualStartDate;
				var sabre_EndDate = results[i].sabre_EndDate;
				var tempDate = new Date();
				if(Xrm.Page.getControl("sabre_startdate") != null && Xrm.Page.getAttribute("sabre_startdate").getValue() != null){
					if (tempDate < Xrm.Page.getAttribute("sabre_startdate").getValue()){
						tempDate = Xrm.Page.getAttribute("sabre_startdate").getValue();
					}
				}
				if(sabre_EndDate != null && sabre_ActualStartDate != null && sabre_EndDate.getTime() != null && sabre_ActualStartDate.getTime() != null && sabre_ActualStartDate.getTime() <= tempDate.getTime() && sabre_EndDate.getTime() >= tempDate.getTime()){
					gblConsumedOpenings = gblConsumedOpenings + 1;
				} else if(sabre_EndDate != null && sabre_EndDate.getTime() != null && sabre_EndDate.getTime() >= tempDate.getTime() && (sabre_ActualStartDate == null || sabre_ActualStartDate.getTime() == null)){
					gblConsumedOpenings = gblConsumedOpenings + 1;
				} else if(sabre_ActualStartDate != null && sabre_ActualStartDate.getTime() != null && sabre_ActualStartDate.getTime() <= tempDate.getTime() && (sabre_EndDate == null || sabre_EndDate.getTime() == null)){
					gblConsumedOpenings = gblConsumedOpenings + 1;
				}
			}
		}, function(error) {
			Xrm.Utility.alertDialog(error.message);
		}, function() {
			console.log(gblConsumedOpenings);
			if(Xrm.Page.getControl("sabre_availableopenings") != null && Xrm.Page.getControl("sabre_noofopenings") != null){
				Xrm.Page.getAttribute("sabre_availableopenings").setValue(Xrm.Page.getAttribute("sabre_noofopenings").getValue() - gblConsumedOpenings);
			}
			//On Complete - Do Something
		});
	}
}

function updateOldNoofOpenings(){
	if(Xrm.Page.getControl("sabre_noofopenings") != null && Xrm.Page.getControl("sabre_oldnoofopenings") != null && Xrm.Page.getAttribute("sabre_noofopenings").getValue() != null){
		Xrm.Page.getAttribute("sabre_oldnoofopenings").setValue(Xrm.Page.getAttribute("sabre_noofopenings").getValue());
	}
}

//function for onLoad and onChange Triggers in Position Entity
function evaluateAvailableOpenings(){
	//Get all openings attached to position
	if(Xrm.Page.getControl("sabre_name") != null && Xrm.Page.getAttribute("sabre_name").getValue() != null){
	var idString = Xrm.Page.data.entity.getId();
	idString = idString.slice(1, -1);
	totalOpenings = [];
	SDK.JQuery.retrieveMultipleRecords(
		"sabre_opening",
		"$filter=sabre_PositionNo/Id eq (Guid'" + idString +"')",
		resultsHandler,
		errorHandler,
		function(){
		//OnComplete Handler
		var openingCount = 0;
		for(var i = 0; i<totalOpenings.length; i++){
			openingCount = openingCount + totalOpenings[i];
		}
		Xrm.Page.getControl("sabre_availableopenings");
		Xrm.Page.getAttribute("sabre_availableopenings").setValue(openingCount);
		}											
	);
	}
	
}
		//get count of all open openings
			
function resultsHandler(results){
	var i = 0;
	var openingCount = 0;
	while (results[i] != null){
		//The first part of this If statement cleans up any openings associated with this position that should have been deleted
		if (results[i].sabre_MarkedForDeletion == true){
			SDK.JQuery.deleteRecord(
			    results[i].sabre_openingId,
			    "sabre_opening",
			    function(){
					
				},
				errorHandler
			);
		}
		else if(results[i].sabre_OpeningStatus.Value == 837770001){
		   openingCount++;
		}
		i++;
	}
	totalOpenings.push(openingCount);
	


}

function errorHandler(error){
  alert(error.message);
}