function positionLock(){
	if(Xrm.Page.getControl("sabre_positionno") != null && Xrm.Page.getAttribute("sabre_positionno").getValue() != null){
		Xrm.Page.getControl("sabre_positionno").setDisabled(true);
	}
	
}

function candidateLock(){
	if(Xrm.Page.getControl("sabre_candidate") != null && Xrm.Page.getAttribute("sabre_candidate").getValue() != null){
		Xrm.Page.getControl("sabre_candidate").setDisabled(true);
	}
	
}

function onUpdateStage(){
		var windowId = window.parent.Xrm.Page.data.entity.getId();
		windowId = windowId.slice(1, -1);
		//var filterValues = "$filter=Record1Id eq '" + skillResult[duplicate].sabre_skillsId + "' and Record2Id eq '" + windowId + "'";
		var filterValues = "$filter=Record2Id/Id eq guid'" + windowId + "' and Record2RoleId/Id eq guid'{11ED094E-AF59-E611-80D0-000D3A013699}'";
		
		SDK.JQuery.retrieveMultipleRecords(
			"Connection",
			filterValues,
			foundConnections,
			errorFunction,
			function(skillResult){

			}
		);
}

function errorFunction(error){
	console.log(error);
}

function foundConnections(results){
	console.log(results);
}

function createPlacement(){
	verifyCandidate();
	var obj = new Object();
	var id = Xrm.Page.data.entity.getId();
	id = id.slice(1, -1);
	obj.id = id;
	obj.name = Xrm.Page.getAttribute("sabre_name").getValue();
	obj.entityType = "sabre_submission";
	Xrm.Utility.openQuickCreate("sabre_placement", obj).then(successSubmissionCreate, errorFunction);
}

function verifyCandidate(){
	if(Xrm.Page.getControl('sabre_candidate') != null && Xrm.Page.getAttribute('sabre_candidate').getValue() != null){
		var candidate = Xrm.Page.getAttribute('sabre_candidate').getValue();
		candidate = candidate[0].id;
		candidate = candidate.replace("}", "").replace("{", "")
	    SDK.JQuery.retrieveRecord(candidate, "sabre_candidate", "sabre_BusinessName,sabre_BusinessNumber,sabre_candidateId,sabre_SpecialRequirements,sabre_TD1,sabre_TD1ON,sabre_Type,sabre_VoidCheque", null, function(result) {
			var sabre_BusinessName = result.sabre_BusinessName;
			var sabre_BusinessNumber = result.sabre_BusinessNumber;
			var sabre_candidateId = result.sabre_candidateId;
			var sabre_SpecialRequirements = result.sabre_SpecialRequirements;
			var sabre_TD1 = result.sabre_TD1;
			var sabre_TD1ON = result.sabre_TD1ON;
			var sabre_Type = result.sabre_Type;
			var sabre_VoidCheque = result.sabre_VoidCheque;
			if(sabre_candidateId != null){
				if((sabre_Type == 837770001) && sabre_BusinessName == null){
					window.parent.alert("This candidate is missing a Business Name.");
				}
				else if((sabre_Type == 837770001) && sabre_BusinessNumber == null){
					window.parent.alert("This candidate is missing a Business Number.");
				}
				else if((sabre_Type == 837770001 || sabre_Type == 837770000) && sabre_VoidCheque == null || sabre_VoidCheque == false){
					window.parent.alert("This candidate is missing a Void Cheque.");
				}
				else if((sabre_Type == 837770001) && sabre_contract == null || sabre_contract == false){
					window.parent.alert("You have not signed a contract with this candidate.");
				}
				else if((sabre_Type == 837770000) && sabre_SpecialRequirements == null || sabre_SpecialRequirements == false){
					window.parent.alert("This candidate may have special requirements that are not met.");
				}
				else if((sabre_Type == 837770000) && sabre_TD1 == null || sabre_TD1 == false){
					window.parent.alert("This candidate is missing a TD1.");
				}
				else if((sabre_Type == 837770000) && sabre_TD1ON == null || sabre_TD1ON == false){
					window.parent.alert("This candidate is missing a TD1ON.");
				}
			}
		}, function(error) {
			Xrm.Utility.alertDialog(error.message);
		});
	}
}

function placementCreated(object){}

function onChangePayRate(){
	if(Xrm.Page.getControl("sabre_payrate") != null && Xrm.Page.getControl("sabre_positionno") != null && Xrm.Page.getAttribute("sabre_positionno").getValue() != null && Xrm.Page.getControl("sabre_billrate") != null){
		//Retrieve Record of Position
		var tempPosition = Xrm.Page.getAttribute("sabre_positionno").getValue();
		var tempPositionId = tempPosition[0].id;
		tempPositionId = tempPositionId.replace("{", "").replace("}", "");
		SDK.JQuery.retrieveRecord(tempPositionId, "sabre_position", "sabre_Account", null, function(result) {
			var sabre_Account = result.sabre_Account;
			SDK.JQuery.retrieveRecord(sabre_Account.Id, "Account", "sabre_Markup", null, function(result) {
				var sabre_Markup = result.sabre_Markup;
				Xrm.Page.getAttribute("sabre_billrate").setValue(parseFloat(Xrm.Page.getAttribute("sabre_payrate").getValue()) + parseFloat(sabre_Markup));
			}, function(error) {
				Xrm.Utility.alertDialog(error.message);
			});
		}, function(error) {
			Xrm.Utility.alertDialog(error.message);
		});
	}
}

function quickCreateChangeDate(){
	//Xrm.Page.ui.clearFormNotification('5');
	overlap = false;
	if(Xrm.Page.getControl("sabre_candidate") != null && Xrm.Page.getAttribute("sabre_candidate").getValue() != null){
		if(Xrm.Page.getControl("sabre_positionno") != null && Xrm.Page.getAttribute("sabre_positionno").getValue() != null){
			if(Xrm.Page.getControl("sabre_startdate") != null && Xrm.Page.getAttribute("sabre_startdate").getValue() != null){
				Xrm.Page.getControl("sabre_startdate").clearNotification("5");
				if(Xrm.Page.getControl("sabre_enddate") != null && Xrm.Page.getAttribute("sabre_enddate").getValue() != null){
					Xrm.Page.getControl("sabre_enddate").clearNotification("6");
					var position = Xrm.Page.getAttribute("sabre_positionno").getValue();
					var positionId = position[0].id;
					positionId = positionId.replace("{","").replace("}","");
					var candidate = Xrm.Page.getAttribute("sabre_candidate").getValue();
					var candidateId = candidate[0].id;
					candidateId = candidateId.replace("{","").replace("}","");
					SDK.JQuery.retrieveMultipleRecords("sabre_placement", "?$select=sabre_ActualStartDate,sabre_EndDate&$filter=sabre_Posistion/Id eq (guid'"+ positionId +"') and sabre_Candidate/Id eq (guid'"+ candidateId +"')", function(results) {
						var startDate = Xrm.Page.getAttribute("sabre_startdate").getValue();
						var endDate = Xrm.Page.getAttribute("sabre_enddate").getValue();
						for (var i = 0; i < results.length; i++) {
							
							var sabre_ActualStartDate = results[i].sabre_ActualStartDate;
							var sabre_EndDate = results[i].sabre_EndDate;
							if(sabre_ActualStartDate != null && sabre_ActualStartDate != "" && sabre_EndDate != null && sabre_EndDate != ""){
								if(sabre_ActualStartDate < endDate && sabre_EndDate > startDate){
									overlap = true;
								}
							}
						}
					}, function(error) {
						Xrm.Utility.alertDialog(error.message);
					}, function() {
						if(overlap == true){
							//Xrm.Page.ui.setFormNotification("Overlapping Placement Periods detected.", "ERROR" ,'5');
							var firstError = new Object();
							firstError.messages = new Array();
							firstError.messages[0] = "Overlapping Placement periods detected.";
							firstError.uniqueId = "5";
							Xrm.Page.getControl("sabre_startdate").addNotification(firstError);
							var secondError = new Object();
							secondError.messages = new Array();
							secondError.messages[0] = "Overlapping Placement periods detected.";
							secondError.uniqueId = "6";
							Xrm.Page.getControl("sabre_enddate").addNotification(secondError);
							
						}
						//On Complete - Do Something
					});
				}
			}
			
		}
	}
}