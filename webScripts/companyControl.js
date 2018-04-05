function placeCandidate(){
	//Xrm.Utility.openQuickCreate("sabre_submission").then(successCallbackQuickCreate, errorCallback);
	//not using "sabre_submission on quickplace
	var obj = new Object();
	var id = Xrm.Page.data.entity.getId();
	id = id.slice(1, -1);
	obj.id = id;
	obj.name = Xrm.Page.getAttribute("name").getValue();
	obj.entityType = "account";
	Xrm.Utility.openQuickCreate("sabre_placement", obj);
}

function successCallbackQuickCreate(object){
	newObject = new Object();
	SDK.JQuery.retrieveRecord(object.savedEntityReference.id,
		object.savedEntityReference.entityType,
		null, "",
		recordRetrieved, errorCallback);
}

function recordRetrieved(record){
	record.sabre_SubmissionStatus.Value = 837770000;
	SDK.JQuery.updateRecord(
		record.sabre_submissionId,
	    record,
		"sabre_submission",
		successUpdate,
		errorCallback
	);
	var newPlacement = new Object();
	submissionObject = new Object();
	submissionObject.Id = record.sabre_submissionId;
	submissionObject.LogicalName = "sabre_submission";
	newPlacement.sabre_SubmissionNo = submissionObject;
	newPlacement.sabre_Posistion = record.sabre_PositionNo;
	newPlacement.sabre_Candidate = record.sabre_Candidate;
	SDK.JQuery.createRecord(
	  newPlacement,
	  "sabre_placement",
	  placementCreated,
	  errorCallback
	);
}

function successUpdate(){
	
}

function placementCreated(object){
	thePlacement = new Object();
	thePlacement = object;
	SDK.JQuery.retrieveMultipleRecords(
				"sabre_opening",
				"$select=*&$filter=sabre_PositionNo/Id eq (Guid'" + thePlacement.sabre_Posistion.Id +"') and (sabre_OpeningStatus/Value eq 837770001)",
				retrievedOpenings,
				errorCallback,
				function(){
				//OnComplete Handler
				}											
	); 
	
}

function errorCallback(error){
	console.log(error);
}

function retrievedOpenings(openings){
	console.log("TESTING");
	if(openings.length > 0){

		var tempObject = new Object();
		tempObject.Id = thePlacement.sabre_placementId;
		tempObject.LogicalName = "sabre_placement";
		openings[0].sabre_Placement = tempObject;
		SDK.JQuery.updateRecord(
			openings[0].sabre_openingId,
			openings[0],
			"sabre_opening",
			function(){
				console.log("return update opening");
			},
			errorCallback
	    );
		tempObject = new Object();
		tempObject.Id = openings[0].sabre_openingId;
		tempObject.LogicalName = "sabre_opening";
		thePlacement.sabre_Opening = tempObject;
		SDK.JQuery.updateRecord(
			thePlacement.sabre_placementId,
			thePlacement,
			"sabre_placement",
			function(){
				console.log("return update placement");
			},
			errorCallback
	    );
        alert("Candidate Placed.");
	}
	else{
		alert("Error: insufficient openings to correctly place.");
	}
}

function createJobOrderFromCompany(){
	var obj = new Object();
	var id = Xrm.Page.data.entity.getId();
	id = id.slice(1, -1);
	obj.id = id;
	obj.name = Xrm.Page.getAttribute("name").getValue();
	obj.entityType = "account";
	Xrm.Utility.openQuickCreate("sabre_position", obj).then(successCallbackPipeline, errorCallback);

}

function addressCompositeRelabel(){
		Xrm.Page.getControl("address1_composite_compositionLinkControl_address1_line1").setLabel("Address");
		Xrm.Page.getControl("address2_composite_compositionLinkControl_address2_line1").setLabel("Address");
		Xrm.Page.getControl("address1_composite_compositionLinkControl_address1_line2").setLabel("Unit");
		Xrm.Page.getControl("address2_composite_compositionLinkControl_address2_line2").setLabel("Unit");
}
function onUpdateClientStatus(){
	Xrm.Page.ui.clearFormNotification('1');
	if(Xrm.Page.getControl("sabre_contractsigned") != null && Xrm.Page.getAttribute("sabre_contractsigned").getValue() != null){
		if(Xrm.Page.getControl("sabre_clientstatus") != null && Xrm.Page.getAttribute("sabre_clientstatus").getValue() != null){
			var contractSigned = Xrm.Page.getAttribute("sabre_contractsigned").getValue();
			if(contractSigned == false){
				if(Xrm.Page.getAttribute("sabre_clientstatus").getValue() == 837770001){
					Xrm.Page.getAttribute("sabre_clientstatus").setValue(837770000);
					Xrm.Page.ui.setFormNotification("Contract has not been signed.", "WARNING", '1');
				}
			}
		}
	} else{
		if(Xrm.Page.getControl("sabre_clientstatus") != null && Xrm.Page.getAttribute("sabre_clientstatus").getValue() != null){
			if(Xrm.Page.getAttribute("sabre_clientstatus").getValue() == 837770001){
				Xrm.Page.getAttribute("sabre_clientstatus").setValue(837770000);
				Xrm.Page.ui.setFormNotification("Contract has not been signed.", "WARNING", '1');
			}
		}
	}
}