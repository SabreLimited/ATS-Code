
function quickCreatePreFilterPosition(){
	try{
		console.log("something");
		if (Xrm.Page.getControl("sabre_positionno") != null && Xrm.Page.getControl("sabre_positionno") != undefined) {
			Xrm.Page.getControl("sabre_positionno").addPreSearch(function(){
				console.log("here");
				quickCreateLookupFilter();
			});
		}
	} catch (e) {
		throw new Error(e.Message);
	}
}

function quickCreateLookupFilter(){
	try {
		fetchXml = "<filter type='and'><condition attribute='sabre_availableopenings' operator='gt' value='0' /><condition attribute='sabre_positionstatus' operator='in'><value>837770001</value><value>837770000</value></condition></filter>";
		Xrm.Page.getControl("sabre_positionno").addCustomFilter(fetchXml);
	} catch (e) {
		throw new Error(e.Message);
	}
}

function preFilterPosition(){
	try{
		if (Xrm.Page.getControl("sabre_posistion") != null && Xrm.Page.getControl("sabre_posistion") != undefined) {
			Xrm.Page.getControl("sabre_posistion").addPreSearch(function(){
				addInitPositionFilter();
			});
		}
	} catch (e) {
		throw new Error(e.Message);
	}
}

function addInitPositionFilter(){
	try {
		fetchXml = "<filter type='and'><condition attribute='sabre_availableopenings' operator='gt' value='0' /><condition attribute='sabre_positionstatus' operator='in'><value>837770001</value><value>837770000</value></condition></filter>";
		Xrm.Page.getControl("sabre_posistion").addCustomFilter(fetchXml);
	} catch (e) {
		throw new Error(e.Message);
	}
}

function preFilterLookupPosition2(){
	try{
		if (Xrm.Page.getControl("sabre_posistion") != null && Xrm.Page.getControl("sabre_posistion") != undefined) {
			Xrm.Page.getControl("sabre_submissionno").addPreSearch(function(){
				addCustomeLookupFilter2();
			});
		}
	} catch (e) {
		throw new Error(e.Message);
	}
}

function addCustomeLookupFilter2() {
	var functionName = "addCustomeLookupFilter2";
	try {
		var RecordId = Xrm.Page.data.entity.getId();
		var positionObject = Xrm.Page.getAttribute("sabre_posistion").getValue();
		var accountID = positionObject[0].id;
		accountID = accountID.slice(1, -1);
		if (accountID != null && accountID != undefined) {
			fetchXml = "<filter type='and'><condition attribute='sabre_positionno' operator='eq' uitype='sabre_position' value='" + accountID + "' /></filter>";
			Xrm.Page.getControl("sabre_submissionno").addCustomFilter(fetchXml);
		}
	} catch (e) {
		throw new Error(e.Message);
	}
}

function fillCandidate(){
	if(Xrm.Page.getControl("sabre_submissionno") != null && Xrm.Page.getControl("sabre_submissionno") != undefined){
		var submissionObject = Xrm.Page.getAttribute("sabre_submissionno").getValue();
		var candidateId = submissionObject[0].id;
		candidateId = candidateId.slice(1, -1);
	}
	SDK.JQuery.retrieveRecord(
		candidateId,
		"sabre_submission",
		null,
		null,
		function (Submission){
			//SUCCESS
			var subCandidate = new Object();
			var setCandidate = new Object();
			var lookupData = new Array();
			
			subCandidate = Submission.sabre_Candidate;
			console.log(subCandidate);
			setCandidate.id = subCandidate.Id;
			setCandidate.name = subCandidate.Name;
			setCandidate.entityType = subCandidate.LogicalName;
			lookupData.push(setCandidate);

		    Xrm.Page.getAttribute("sabre_candidate").setValue(lookupData);
			onCandidateChange();
		},
		errorHandler
	);
}

function errorHandler(error){
	alert(error.message);
}

//currently disabled
function onCandidateChange(){
	//Determine if position is direct hire or otherwise
	//ensure that Position is set before trying to use it to pull Work Type
	if(Xrm.Page.getControl("sabre_posistion") != null && Xrm.Page.getControl("sabre_posistion") != undefined && Xrm.Page.getAttribute("sabre_posistion").getValue() != null){
		var positionObject = Xrm.Page.getAttribute("sabre_posistion").getValue();
		var positionId = positionObject[0].id;
		positionId = positionId.slice(1, -1);
		//retrieve all information about position
		SDK.JQuery.retrieveRecord(
			positionId,
			"sabre_position",
			null,
			null,
			function (Position){
				//SUCCESS			
				
				//if temp work verify ability to be placed, else do nothing
				if(Position.sabre_Type.Value == "837770000" || Position.sabre_Type.Value == "837770002"){
					if(Xrm.Page.getControl("sabre_candidate") != null){
						var candidateObject = Xrm.Page.getAttribute("sabre_candidate").getValue();
						if(candidateObject.length > 0){
							var candidateId = candidateObject[0].id;
							//removing unnecessary brackets
							//candidateId = candidateId.slice(1,-1);

							SDK.JQuery.retrieveRecord(
								candidateId,
								"sabre_candidate",
								null,
								null,
								function (Candidate){
																	//Employee       //Fails one of the mandatory requirements 												//Contractor       //Fails one of thi mandatory requirements
									if((Candidate.sabre_Type.Value == "837770000" && (Candidate.sabre_VoidCheque == "0" || Candidate.sabre_SpecialRequirements == "0")) || (Candidate.sabre_Type.Value == "837770001" &&(Candidate.sabre_Contract == "0" ||  Candidate.sabre_BusinessName == null || Candidate.sabre_BusinessNumber == null  || Candidate.sabre_VoidCheque == "0"))){
										Xrm.Page.getAttribute("sabre_candidate").setValue(null);
										alert("The chosen Candidate does not meet the requirements to be placed at this temporary job.");
										Xrm.Page.getControl("sabre_submissionno");
										Xrm.Page.getAttribute("sabre_submissionno").setValue(null);
									}
								},
								errorHandler
						);
						}
					}
				}
				//otherwise do nothing
				else{
					
				}
				
			},
			errorHandler
		);

	}
	
}

function defaultCustomer(){
	Xrm.Page.getControl("parentcustomerid").addPreSearch(addCustomerFilter);

}

function addCustomerFilter(){
	var customerAccountFilter = "<filter type='and'><condition attribute='address1_city' operator='eq' value='ZpZpZpZpZpZp' /></filter>";
	Xrm.Page.getControl("parentcustomerid").addCustomFilter(customerAccountFilter, "contact");
	

}