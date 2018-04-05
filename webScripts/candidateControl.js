//sets active BPF based on Employee Type and Job Type
//Contractor, Employee, and Permanent work each have different flows.
function candidateProcessSelection(){

    enabledProcesses = [];
	
	//load all processes into array
	Xrm.Page.data.process.getEnabledProcesses(function (processes){
		var i = 0;
		for(var processId in processes){
			enabledProcesses[i] = new Object();
		    enabledProcesses[i].id = processId
			enabledProcesses[i].name = processes[processId];
			i++;
		}
		if(Xrm.Page.getControl("sabre_type") != null){
			if(Xrm.Page.getAttribute("sabre_type").getValue() == "837770001"){
				//set process to Employee
				var i = 0;
				while(enabledProcesses[i]!=null){
					if(enabledProcesses[i].name == "Contractor Process Flow"){
						Xrm.Page.data.process.setActiveProcess(enabledProcesses[i].id, callbackFunction);
					}
					i++;
				}
			}
			else if (Xrm.Page.getAttribute("sabre_type").getValue() == "837770000"){
				//set process to Contractor
				var i = 0;
				while(enabledProcesses[i]!=null){
					if(enabledProcesses[i].name == "Employee Process Flow"){
						Xrm.Page.data.process.setActiveProcess(enabledProcesses[i].id, callbackFunction);
					}
					i++;
				}
			}
		}
	  }
	);


}

//need to make version of this for Placement
//this function sets the stage field for the Candidate after setting the BPF to the current one if it was not already
function updateCandidateApplicationStage(){
	if(Xrm.Page.ui.getFormType() == 6){
		return;
	}
	var enabledProcess = Xrm.Page.data.process.getActiveProcess();
	var enabledStage = Xrm.Page.data.process.getActiveStage();
    if(enabledProcess == null || enabledProcess.getName() == null || (enabledProcess.getName() != "Temp Candidate Business Process Flow" && enabledProcess.getName() != "Perm Candidate Business Process Flow") || 
	(Xrm.Page.getControl("sabre_type") != null && Xrm.Page.getAttribute("sabre_type").getValue() == 837770003 && enabledProcess.getName() != "Perm Candidate Business Process Flow") ||
	(Xrm.Page.getControl("sabre_type") != null && (Xrm.Page.getAttribute("sabre_type").getValue() == 837770000 || Xrm.Page.getAttribute("sabre_type").getValue() == 837770001 || Xrm.Page.getAttribute("sabre_type").getValue() == 837770002) && enabledProcess.getName() != "Temp Candidate Business Process Flow")
	&& (Xrm.Page.data.entity.getId() != null && Xrm.Page.data.entity.getId() != '')){
		console.log("next");
		Xrm.Page.data.process.getEnabledProcesses(function (processes){enabledProcessOnCallBack(processes);});

		enabledProcess = Xrm.Page.data.process.getActiveProcess();
		enabledStage = Xrm.Page.data.process.getActiveStage();
	}
	else{

		setToObject = new Object();
		setToObject.Value = -1;
		if(enabledProcess != null && enabledProcess.getName() == "Candidate Application Process"){
			if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Draft"){
				Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770000);
				setToObject.Value = 0;

				
			}else if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Registered") {
				Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770001);
				setToObject.Value = 1;
			}
			
		} else if (enabledProcess != null && enabledProcess.getName() == "Temp Candidate Business Process Flow"){
			if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Draft"){
				Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770000);
				setToObject.Value = 0;
			} else if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Payroll"){
				Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770002);
				setToObject.Value = 2;
			} else if (Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Active"){
				Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770001);
				setToObject.Value = 1;
			}
		} else if (enabledProcess != null && enabledProcess.getName() == "Perm Candidate Business Process Flow"){
			if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Draft"){
				Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770000);
				setToObject.Value = 0;
			} else if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Internal Interview"){
				Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770004);
				setToObject.Value = 4;
			} else if (Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Advanced"){
				Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770003);
				setToObject.Value = 3;
			} else if (Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Active"){
				Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770001);
				setToObject.Value = 1;
			}
		}

	updPlacements();
    }

}

function enabledProcessOnCallBack(processes){
	var i = 0;

	var enabledProcesses = [];
	for(var processId in processes){
		enabledProcesses[i] = new Object();
		enabledProcesses[i].id = processId;
		enabledProcesses[i].name = processes[processId];
		i++;
	}
	i = 0;
	while(enabledProcesses[i]!=null){
		if(Xrm.Page.getControl("sabre_type") != null && (Xrm.Page.getAttribute("sabre_type").getValue() == 837770000 || Xrm.Page.getAttribute("sabre_type").getValue() == 837770001 || Xrm.Page.getAttribute("sabre_type").getValue() == 837770002)){
			if(enabledProcesses[i].name == "Temp Candidate Business Process Flow"){
				Xrm.Page.data.process.setActiveProcess(enabledProcesses[i].id, callbackFunction);
			}
		} else if (Xrm.Page.getControl("sabre_type") != null && Xrm.Page.getAttribute("sabre_type").getValue() == 837770003){
			if(enabledProcesses[i].name == "Perm Candidate Business Process Flow"){
				Xrm.Page.data.process.setActiveProcess(enabledProcesses[i].id, callbackFunction);
				
			}
		}
		

		i++;
	}
	enabledProcess = Xrm.Page.data.process.getActiveProcess();
	enabledStage = Xrm.Page.data.process.getActiveStage();
	setToObject = new Object();
	setToObject.Value = -1;
	if(enabledProcess != null && enabledProcess.getName() == "Candidate Application Process"){
		if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Draft"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770000);
			setToObject.Value = 0;

			
		}else if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Registered") {
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770001);
			setToObject.Value = 1;
		}
		
	} else if (enabledProcess != null && enabledProcess.getName() == "Temp Candidate Business Process Flow"){
		if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Draft"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770000);
			setToObject.Value = 0;
		} else if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Payroll"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770002);
			setToObject.Value = 2;
		} else if (Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Active"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770001);
			setToObject.Value = 1;
		}
	} else if (enabledProcess != null && enabledProcess.getName() == "Perm Candidate Business Process Flow"){
		if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Draft"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770000);
			setToObject.Value = 0;
		} else if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Internal Interview"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770004);
			setToObject.Value = 4;
		} else if (Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Advanced"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770003);
			setToObject.Value = 3;
		} else if (Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Active"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770001);
			setToObject.Value = 1;
		}
	}

	updPlacements();
}

function updSelf(record){
	console.log(record);
	record.sabre_CandidateApplicationStage = { Value : 837770000};
	record.processid = "{9A29082F-AC2C-44C5-BC5B-887179A73700}";
	record.stageid = "e0394ff1-dc42-431f-89b8-e0ed91b2d5be";
	SDK.JQuery.updateRecord(Xrm.Page.data.entity.getId(), record, "sabre_candidate", updPlacements, errorCallback);

}

function updPlacements(){
    //Candidate Exclusive section: Update all related Placements with correct value for stage.
	if(setToObject.Value == 1 || setToObject.Value == 0 || setToObject.Value == 2 || setToObject.Value == 3 || setToObject.Value == 4){
		SDK.JQuery.retrieveMultipleRecords(
		"sabre_placement",
		"$select=sabre_CandidateProcessStage,sabre_placementId&$filter=sabre_Candidate/Id eq (Guid'" + Xrm.Page.data.entity.getId() +"')",
		retrievedPlacementsForUpdate,
		errorCallback,
		function(){
		//OnComplete Handler
		});											
	}
}

function retrievedPlacementsForUpdate(results){
	if(results != null && (setToObject.Value == 1 || setToObject.Value == 0)){
		var i = 0;
		var updatePlacement;
		while (i <results.length){
			updatePlacement = results[i];
			if(setToObject.Value == 1){
				updatePlacement.sabre_CandidateProcessStage.Value = 837770001;
				SDK.JQuery.updateRecord(updatePlacement.sabre_placementId, updatePlacement, "sabre_placement", callbackFunction, errorCallback);

			}
			else if(setToObject.Value == 0){
				updatePlacement.sabre_CandidateProcessStage.Value = 837770000;
			    SDK.JQuery.updateRecord(updatePlacement.sabre_placementId, updatePlacement, "sabre_placement", callbackFunction, errorCallback);

			}
			else if(setToObject.Value == 2){
				updatePlacement.sabre_CandidateProcessStage.Value = 837770002;
			    SDK.JQuery.updateRecord(updatePlacement.sabre_placementId, updatePlacement, "sabre_placement", callbackFunction, errorCallback);

			}
			else if(setToObject.Value == 3){
				updatePlacement.sabre_CandidateProcessStage.Value = 837770003;
			    SDK.JQuery.updateRecord(updatePlacement.sabre_placementId, updatePlacement, "sabre_placement", callbackFunction, errorCallback);

			}
			else if(setToObject.Value == 4){
				updatePlacement.sabre_CandidateProcessStage.Value = 837770004;
			    SDK.JQuery.updateRecord(updatePlacement.sabre_placementId, updatePlacement, "sabre_placement", callbackFunction, errorCallback);

			}
			i++;
		}
	}
	
}

function hideBusinessProcessFlow()
{
    Xrm.Page.ui.process.setVisible(false);
}

function callbackFunction(str){
	
}

//places 1+ candidates on a job from the list of candidates
function placeCandidates(selectedItems){
    try {
		filledOut = true;
        for(var i = 0; i<selectedItems.length; i++){
			var temp = selectedItems[i]["Id"].replace("{", "").replace("}", "");
			var req = new XMLHttpRequest();
			req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/sabre_candidates("+temp+")?$select=sabre_businessname,sabre_businessnumber,sabre_candidateid,sabre_contract,sabre_firstsname,sabre_lastname,sabre_specialrequirements,sabre_td1,sabre_td1on,sabre_type,sabre_voidcheque", true);
			req.setRequestHeader("OData-MaxVersion", "4.0");
			req.setRequestHeader("OData-Version", "4.0");
			req.setRequestHeader("Accept", "application/json");
			req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
			req.onreadystatechange = function() {
				if (this.readyState === 4) {
					req.onreadystatechange = null;
					if (this.status === 200) {
						var result = JSON.parse(this.response);
						var sabre_businessname = result["sabre_businessname"];
						var sabre_businessnumber = result["sabre_businessnumber"];
						var sabre_candidateid = result["sabre_candidateid"];
						var sabre_firstsname = result["sabre_firstsname"];
						var sabre_lastname = result["sabre_lastname"];
						var sabre_specialrequirements = result["sabre_specialrequirements"];
						var sabre_specialrequirements_formatted = result["sabre_specialrequirements@OData.Community.Display.V1.FormattedValue"];
						var sabre_td1 = result["sabre_td1"];
						var sabre_td1_formatted = result["sabre_td1@OData.Community.Display.V1.FormattedValue"];
						var sabre_td1on = result["sabre_td1on"];
						var sabre_td1on_formatted = result["sabre_td1on@OData.Community.Display.V1.FormattedValue"];
						var sabre_type = result["sabre_type"];
						var sabre_type_formatted = result["sabre_type@OData.Community.Display.V1.FormattedValue"];
						var sabre_voidcheque = result["sabre_voidcheque"];
						var sabre_voidcheque_formatted = result["sabre_voidcheque@OData.Community.Display.V1.FormattedValue"];
						var sabre_contract = result["sabre_contract"];
						var sabre_contract_formatted = result["sabre_contract@OData.Community.Display.V1.FormattedValue"];
						if(sabre_candidateid != null){
							if((sabre_type == 837770001) && sabre_businessname == null){
								filledOut = false;
								window.parent.alert(sabre_firstsname + " " + sabre_lastname +" is missing a Business Name.");
							}
							else if((sabre_type == 837770001) && sabre_businessnumber == null){
								filledOut = false;
								window.parent.alert(sabre_firstsname + " " + sabre_lastname +" is missing a Business Number.");
							}
							else if((sabre_type == 837770001 || sabre_type == 837770000) && sabre_voidcheque == null || sabre_voidcheque == false){
								filledOut = false;
								window.parent.alert(sabre_firstsname + " " + sabre_lastname +" is missing a Void Cheque.");
							}
							else if((sabre_type == 837770001) && sabre_contract == null || sabre_contract == false){
								filledOut = false;
								window.parent.alert(sabre_firstsname + " " + sabre_lastname +" is missing a Contract.");
							}
							else if((sabre_type == 837770000) && sabre_specialrequirements == null || sabre_specialrequirements == false){
								filledOut = false;
								window.parent.alert(sabre_firstsname + " " + sabre_lastname +" may have special requirements that are left unfilled.");
							}
							else if((sabre_type == 837770000) && sabre_td1 == null || sabre_td1 == false){
								filledOut = false;
								window.parent.alert(sabre_firstsname + " " + sabre_lastname +" is missing a TD1");
							}
							else if((sabre_type == 837770000) && sabre_td1on == null || sabre_td1on == false){
								filledOut = false;
								window.parent.alert(sabre_firstsname + " " + sabre_lastname +" is missing a TD1ON");
							}
						}
					} else {
						Xrm.Utility.alertDialog(this.statusText);
					}
				}
			};
			req.send();


		}
							
								 
								  

        var candidateGuids = [];

        for (var i = 0; i < selectedItems.length; i++) {
            candidateGuids.push(selectedItems[i]["Id"].replace("{", "").replace("}", ""));
        }

        // Params for action 
        var inputParams = [
            { key: "CandidateGuids", type: "c:string", value: candidateGuids.join() }
        ];

        var options = new Xrm.DialogOptions;
        options.width = 500;
        options.height = 350;

        Xrm.Internal.openDialog("/WebResources/sabre_JobOrdersSelectionDialog.html",
            options,
            null,
            null,
            function (response) {
				
                inputParams.push({ key: "JobOrdersGuids", type: "c:string", value: response.JobOrders.join() });
				if(response.StartDate != null){
					if(response.StartDate.getMonth() > 0){
						inputParams.push({ key: "StartDate", type: "c:dateTime", value: response.StartDate });
					}
				}
				if(response.EndDate != null){
					if(response.EndDate.getMonth() > 0){
						inputParams.push({ key: "EndDate", type: "c:dateTime", value: response.EndDate });
					}
				}
				if(response.PayRate != null && response.PayRate != ""){//sabjo
					inputParams.push({ key: "PayRate", type: "c:string", value: response.PayRate });
				}//sabjo
				if(response.BillRate != null && response.BillRate != ""){
					inputParams.push({ key: "BillRate", type: "c:string", value: response.BillRate });
				}
                CallAction("sabre_PlaceCandidatesAction",
                    inputParams,
                    // Success callback
                    function () {
                        Xrm.Utility.alertDialog("Placements have been created.");
                    },
                    // Error callback
                    function (response) {
                        Xrm.Utility.alertDialog(response);
                    });

            });

    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}

function jobSelectionCallback(results){
	//get number of available openings
	
	//compare with # of candidates
	//add as many candidates as possible to job

		//Create Submission with values, set callback as returnToPath, errorCalback;

	//report that X# of candidates were unable to be placed due to space limitations.

}

function jobRetrieveCallback(rec){
	
	
}

function placeCandidate(){
	//open quick create to allow users to swiftly set a position.
    //first validate that Candidate can be placed
	var eAsNormal = 1;
	if(Xrm.Page.getControl("sabre_type") != null && Xrm.Page.getAttribute("sabre_type").getValue() == 837770000){
		if(Xrm.Page.getControl("sabre_td_1") != null && (Xrm.Page.getAttribute("sabre_td_1").getValue() == false || Xrm.Page.getAttribute("sabre_td_1").getValue() == null)){
			window.parent.alert("This candidate is missing a TD1.");
		}
		else if(Xrm.Page.getControl("sabre_td_1on") != null && (Xrm.Page.getAttribute("sabre_td_1on").getValue() == false || Xrm.Page.getAttribute("sabre_td_1on").getValue() == null)){
			window.parent.alert("This candidate is missing a TD1ON.");
		}
		else if (Xrm.Page.getControl("sabre_voidcheque") != null && (Xrm.Page.getAttribute("sabre_voidcheque").getValue() == false || Xrm.Page.getAttribute("sabre_voidcheque").getValue() == null)){
			window.parent.alert("This candidate is missing a Void Cheque.");
		}
		else if (Xrm.Page.getControl("sabre_specialrequirements") != null && (Xrm.Page.getAttribute("sabre_specialrequirements").getValue() == false || Xrm.Page.getAttribute("sabre_specialrequirements").getValue() == null)){
			window.parent.alert("This candidate may have special requirements that are not met.");
		}
	}
	else if (Xrm.Page.getControl("sabre_type") != null && Xrm.Page.getAttribute("sabre_type").getValue() == 837770001){
		if(Xrm.Page.getControl("sabre_contract") != null && (Xrm.Page.getAttribute("sabre_contract").getValue() == false || Xrm.Page.getAttribute("sabre_contract").getValue() == null)){
			window.parent.alert("You have not signed a contract with this candidate.");
		}
		else if(Xrm.Page.getControl("sabre_businessname") != null && (Xrm.Page.getAttribute("sabre_businessname").getValue() == null)){
			window.parent.alert("This candidate is missing a Business Name.");
		}
		else if (Xrm.Page.getControl("sabre_businessnumber") != null && (Xrm.Page.getAttribute("sabre_businessnumber").getValue() == null)){
			window.parent.alert("This candidate is missing a Business Number.");
		}
		else if (Xrm.Page.getControl("sabre_voidcheque") != null && (Xrm.Page.getAttribute("sabre_voidcheque").getValue() == false || Xrm.Page.getAttribute("sabre_voidcheque").getValue() == null)){
			window.parent.alert("This candidate is missing a Void Cheque.");
		}
	}
	if(eAsNormal == 1){
		var obj = new Object();
		var id = Xrm.Page.data.entity.getId();
		id = id.slice(1, -1);
		obj.id = id;
		obj.name = Xrm.Page.getAttribute("sabre_name").getValue();
		obj.entityType = "sabre_candidate";
		console.log(obj.id);
		//Xrm.Utility.openQuickCreate("sabre_submission", obj).then(successCallbackQuickCreate, function(error){errorCallback(error);});
		Xrm.Utility.openQuickCreate("sabre_placement", obj);
	}
}

//function called when quick creation successful.
function successCallbackQuickCreate(object){
	newObject = new Object();
	console.log(object);
	newObject.sabre_submissionstatus = 837770000;
	candidateObject = new Object();
	candidateObject.Id = Xrm.Page.data.entity.getId();
	candidateObject.LogicalName = "sabre_candidate";
	newObject.sabre_Candidate = candidateObject;
	console.log("scqc");
	SDK.JQuery.retrieveRecord(object.savedEntityReference.id,
		object.savedEntityReference.entityType,
		null, "",
		recordRetrieved, errorCallback);

}

function placementCreated(object){
	console.log(object);
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

function retrievedOpenings(openings){
	if(openings.length > 0){
		//console.log(openings[0]);
		//update openings[0], thePlacement
		var tempObject = new Object();
		tempObject.Id = thePlacement.sabre_placementId;
		tempObject.LogicalName = "sabre_placement";
		openings[0].sabre_Placement = tempObject;
		SDK.JQuery.updateRecord(
			openings[0].sabre_openingId,
			openings[0],
			"sabre_opening",
			function(){
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
			},
			errorCallback
	    );
        alert("Candidate Placed. Refresh the page to reload out of date views.");
	}
	else{
		alert("Error: insufficient openings to correctly place.");
	}
}

function successUpdate(){
	
}


//record retrieval return function for submission
function recordRetrieved(record){
	record.sabre_Candidate = newObject.sabre_Candidate;
	record.sabre_SubmissionStatus.Value = 837770000;
	newObject = record;
	console.log(record);//temp example of current state.
	SDK.JQuery.retrieveMultipleRecords(
		"sabre_submission",
		"$select=sabre_submissionId&$filter=(sabre_PositionNo/Id eq (Guid'{" + record.sabre_PositionNo.Id +"}')) and (sabre_Candidate/Id eq (Guid'"+ record.sabre_Candidate.Id +"')) and (sabre_submissionId ne (Guid'{"+ record.sabre_submissionId+"}'))",
		resultsDuplicates,
		errorCallback,
		function(){
		//OnComplete Handler
		}											
	);

}

function resultsDuplicates(results){
	if (results.length > 0){
		//window.alert("Candidate already has a Pipeline for this Job.");
		
	} else{
		returnToPath(newObject);
	}
}

function returnToPath(newRes){
	newRes.sabre_SubmissionStage = 837770004;
	SDK.JQuery.updateRecord(
		newRes.sabre_submissionId,
	    newRes,
		"sabre_submission",
		successUpdate,
		errorCallback
	);
	var newPlacement = new Object();
	submissionObject = new Object();
	submissionObject.Id = newRes.sabre_submissionId;
	submissionObject.LogicalName = "sabre_submission";
	newPlacement.sabre_SubmissionNo = submissionObject;
	newPlacement.sabre_Posistion = newRes.sabre_PositionNo;
	newPlacement.sabre_Candidate = newRes.sabre_Candidate;
	SDK.JQuery.createRecord(
	  newPlacement,
	  "sabre_placement",
	  placementCreated,
	  errorCallback
	);
}

//default function for error output to console.
function errorCallback(error){
	console.log(error);
}

function sin1Verification(){

}
function sin2Verification(){

}
function sin3Verification(){

}

function trySetSin(){

}


function BranchNoVerification(){
	if(Xrm.Page.getControl("sabre_branchno") != null && Xrm.Page.getAttribute("sabre_branchno").getValue() != "")
	{
		var val = Xrm.Page.getAttribute("sabre_branchno").getValue();
		if(is5Digits(val))
		{
			//Xrm.Page.getControl("sabre_branchno").clearNotification("branchno");
			Xrm.Page.ui.clearFormNotification('1');
		}
		else
		{
			Xrm.Page.getAttribute("sabre_branchno").setValue("");
			//Xrm.Page.getControl("sabre_branchno").setNotification("Invalid Branch Number.", "branchno");
			Xrm.Page.ui.setFormNotification("Invalid Branch Number.", "WARNING", '1');
		}
	}	
}


function TransitNoVerification()
{
	if(Xrm.Page.getControl("sabre_transitno") != null && Xrm.Page.getAttribute("sabre_transitno").getValue() != "")
	{
		var val = Xrm.Page.getAttribute("sabre_transitno").getValue('1');
		if(is5Digits(val))
		{
			//Xrm.Page.getControl("sabre_transitno").clearNotification("transitno");
			Xrm.Page.ui.clearFormNotification('1');
		}
		else
		{
			Xrm.Page.getAttribute("sabre_transitno").setValue("");
			//Xrm.Page.getControl("sabre_transitno").setNotification("Invalid Transit Number.", "transitno");
			Xrm.Page.ui.setFormNotification("Invalid Transit Number.", "WARNING", '1');
		}
	}	
}


function BankNoVerification()
{
	if(Xrm.Page.getControl("sabre_bankno") != null && Xrm.Page.getAttribute("sabre_bankno").getValue() != "")
	{
		var val = Xrm.Page.getAttribute("sabre_bankno").getValue();
		if(is3Digits(val))
		{
			//Xrm.Page.getControl("sabre_bankno").clearNotification("bankno");
			Xrm.Page.ui.clearFormNotification('1');
		}
		else
		{
			Xrm.Page.getAttribute("sabre_bankno").setValue("");
			//Xrm.Page.getControl("sabre_bankno").setNotification("Invalid Bank Number.", "bankno");
			Xrm.Page.ui.setFormNotification("Invalid Bank Number.", "WARNING", '1');
		}
	}	
}



function is3Digits(val){
	if(val != null){
	var n = val.search(/^\d{3}$/);
	if (n == -1){
		return false;
	}
	return true;
	}
	else{
		return false;
	}
}


function is5Digits(val)
{   if(val != null){
		var n = val.search(/^\d{5}$/);
		if (n == -1)
		{
			return false;
		}
		return true;
	}
	else{
		return false;
	}
	
}



function startsWith9(val){
	var n = val.search(/^[9][0-9]{2}$/);
	if(n == -1){
		return false;
	}
	return true;
}

function sinVerificationCandidate(){
	if(Xrm.Page.getControl("sabre_sin") != null && Xrm.Page.getAttribute("sabre_sin").getValue() != null && Xrm.Page.getAttribute("sabre_sin").getValue() != ""){
		var sinNo = Xrm.Page.getAttribute("sabre_sin").getValue();
		var n = sinNo.search(/^\d{3}([- ]?)\d{3}\1\d{3}$/);
		if(n == -1){
			Xrm.Page.getAttribute("sabre_sin").setValue("");
			//Xrm.Page.getControl("sabre_sin").setNotification("Invalid SIN Number.");
			Xrm.Page.ui.clearFormNotification('1');
			Xrm.Page.ui.setFormNotification("Invalid SIN Number", "WARNING", '1');


			//endChanges
		}
		else{
			n = sinNo.search(/^\d{9}$/);
			if(n != -1){
				var tempStr = "-";
				sinNo = [sinNo.slice(0, 6), tempStr, sinNo.slice(6)].join('');
				sinNo = [sinNo.slice(0, 3), tempStr, sinNo.slice(3)].join('');
				Xrm.Page.getAttribute("sabre_sin").setValue(sinNo);

			}
			var tempSinNo = sinNo.replace(/-/g,"");
			tempSinNo = tempSinNo.replace(/-/g,"");
			var tempVal = 0;
			var tempSum = 0;
			var veryTempSum = 0;
			var sinIterator = 0;
			for(var i = 0;i<tempSinNo.length;i++){
				if (-1 != tempSinNo[i].search(/^\d{1}$/)){
					tempVal = tempSinNo[i] * ((sinIterator%2)+1);
					if(tempVal > 9){
						while(tempVal > 9){
							veryTempSum = 0;
							while (tempVal){
								veryTempSum += tempVal % 10;
								tempVal = Math.floor(tempVal/10);
							}
						}
						tempSum = tempSum + veryTempSum;
					} else{
						tempSum = tempSum + tempVal;
					}
					//console.log(tempSum + 'i=' +sinIterator+'(i%2))=' +((sinIterator%2)));
					sinIterator++;
				}
			
			}
			console.log("TEMPSUM= "+tempSum);
			if(tempSum%10 != 0){
				Xrm.Page.getAttribute("sabre_sin").setValue("");
				Xrm.Page.ui.clearFormNotification('1');
				Xrm.Page.ui.setFormNotification("Invalid SIN Number", "WARNING", '1');
				return;
			}			
			Xrm.Page.ui.clearFormNotification('1');
			//Xrm.Page.getControl("sabre_sin").clearNotification();
			//console.log(Xrm.Page.getAttribute("sabre_sin").getValue());
			SDK.JQuery.retrieveRecord(
			Xrm.Page.data.entity.getId(),
			"sabre_candidate",
			null, "",
			retrievedSelf, errorCallback
			);
			 
		}
	}
}

function retrievedSelf(result){
	if(result != null){
		
		SDK.JQuery.retrieveMultipleRecords(
			"sabre_candidate",
			"$select=*&$filter=OwningBusinessUnit/Id eq (Guid'" + result.OwningBusinessUnit.Id +"') and (sabre_SIN eq '"+ Xrm.Page.getAttribute("sabre_sin").getValue() +"')",
			retrievedSINCandidates,
			errorCallback,
			function(){
			//OnComplete Handler
			}											
		);
	}
}

function retrievedSINCandidates(results){
	if (results.length > 0){
		Xrm.Page.ui.setFormNotification("Duplicate SIN with "+ results[0].sabre_name, "WARNING", '1');
		//Xrm.Page.getControl("sabre_sin").setNotification("Duplicate SIN with " + results[0].sabre_name);
	}
	//console.log(results);
}

function addCandidateToPipeline(){
	//open quick create to allow users to swiftly set a position.
		var obj = new Object();
		var id = Xrm.Page.data.entity.getId();
		id = id.slice(1, -1);
		obj.id = id;
		obj.name = Xrm.Page.getAttribute("sabre_name").getValue();
		obj.entityType = "sabre_candidate";
		Xrm.Utility.openQuickCreate("sabre_submission", obj).then(successCallbackPipeline, errorCallback);
}

function successCallbackPipeline(object){
	//console.log(object);
}

function eContactUpdate(){
	if(Xrm.Page.getControl("sabre_emergencycontact") != null && Xrm.Page.getControl("sabre_emergencyphone") != null && Xrm.Page.getAttribute("sabre_emergencycontact").getValue() != null){
		var tempVal = Xrm.Page.getAttribute("sabre_emergencycontact").getValue();
		tempVal[0].id;
		SDK.JQuery.retrieveRecord(
			tempVal[0].id,
			"Contact",
			null, "",
			contactRetrieved, errorCallback
		);
	}
}

function contactRetrieved(result){
	Xrm.Page.getAttribute("sabre_emergencyphone").setValue(result.Telephone1);
}

function showErrorMessage(message) {

    var guid = Date.now().toString();

    Xrm.Page.ui.setFormNotification(message, "ERROR", guid);

    setTimeout(clearMessage, 5000, guid);
}

function clearMessage(guid) {
    try {

        Xrm.Page.ui.clearFormNotification(guid);

    } catch (e) {
        alert(e.message);
    }
}

function CallAction(actionName, inputParams, successCallback, errorCallback, url) {
    if (url == null) {
        url = Xrm.Page.context.getClientUrl();
    }

    var requestXml = "<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'>" +
        "<s:Body>" +
        "<Execute xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>" +
        "<request xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>" +
        "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>";

    if (inputParams) {
        // Add each input param
        for (var i = 0; i < inputParams.length; i++) {
            var param = inputParams[i];

            var value = "";
            var displayXmlns = false;

            // Check the param type to determine how the value is formed
            switch (param.type) {
                case "c:boolean":
                case "c:int":
                case "c:string":
                    value = param.value;
                    displayXmlns = true;
                    break;
                case "c:dateTime":
                    value = param.value.toISOString();
                    displayXmlns = true;
                    break;
                case "a:EntityReference":
                    value = "<a:Id>" + param.value.id + "</a:Id>" +
                        "<a:LogicalName>" + param.value.entityType + "</a:LogicalName>" +
                        "<a:Name i:nil='true' />";
                    break;
                case "a:OptionSetValue":
                case "a:Money":
                    value = "<a:Value>" + param.value + "</a:Value>";
                    break;
                default:
                    if (errorCallback) {
                        errorCallback("Type of input parameter " + (i + 1) + " '" + param.type + "' is invalid or unsupported");
                    }
                    return;
                    break;
            }

            requestXml += "<a:KeyValuePairOfstringanyType>" +
                "<b:key>" + param.key + "</b:key>" +
                "<b:value i:type='" + param.type + "' " + (displayXmlns ? "xmlns:c='http://www.w3.org/2001/XMLSchema'" : "") + ">" + value + "</b:value>" +
                "</a:KeyValuePairOfstringanyType>";
        }
    }

    requestXml += "</a:Parameters>" +
        "<a:RequestId i:nil='true' />" +
        "<a:RequestName>" + actionName + "</a:RequestName>" +
        "</request>" +
        "</Execute>" +
        "</s:Body>" +
        "</s:Envelope>";

    var req = new XMLHttpRequest();
    req.open("POST", url + "/XRMServices/2011/Organization.svc/web", true);
    req.setRequestHeader("Accept", "application/xml, text/xml, */*");
    req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                // Action completed successfully - get output params
                var responseParams = req.responseXML.getElementsByTagName("a:KeyValuePairOfstringanyType"); // IE
                if (responseParams.length == 0) {
                    responseParams = req.responseXML.getElementsByTagName("KeyValuePairOfstringanyType"); // FireFox and Chrome
                }

                var outputParams = [];
                for (i = 0; i < responseParams.length; i++) {

                    var attrNameNode = responseParams[i].childNodes[0].firstChild;
                    var attributeName = attrNameNode.textContent || attrNameNode.nodeValue || attrNameNode.data || attrNameNode.text;

                    var attributeValue = "";
                    if (responseParams[i].childNodes[1].firstChild != null) {
                        var attrValueNode = responseParams[i].childNodes[1].firstChild;
                        attributeValue = attrValueNode.textContent || attrValueNode.nodeValue || attrValueNode.data || attrValueNode.text;
                    }

                    // Values will be string, figure out the types yourself
                    outputParams.push({ key: attributeName, value: attributeValue });

                    /*
                    DateTime = "2015-06-23T21:00:00Z" (AS UTC STRING)
                    bool = "true" (AS STRING)
                    OptionSet, int, etc = "1" (AS STRING)
                    */
                }

                if (successCallback) {
                    // Make sure the callback accepts exactly 1 argument - use dynamic function if you want more
                    successCallback(outputParams);
                }
            }
            else {
                // Error has occured, action failed
                if (errorCallback) {
                    var error = null;
                    try { error = req.responseXML.getElementsByTagName("Message")[0].firstChild.nodeValue; } catch (e) { }
                    errorCallback(error);
                }
            }
        }
    };

    req.send(requestXml);
}

function onBulkEdit(){

	// Checking the form type is equal to Bulk Edit
	if(Xrm.Page.ui.getFormType() == 6)
	{
	//code to disable the fields
	console.log("in form type 6");
	}
}

function loadStageChangeTriggers(){
	//executes on load of form to add function to stageChange triggers
	Xrm.Page.data.process.addOnStageChange(checkCurrentStage);
	
}

function checkCurrentStage(){
	var activeStage = Xrm.Page.data.process.getActiveStage();
	candidateId = Xrm.Page.data.entity.getId().replace("{", "").replace("}", "");
	//if active check all placements' jobs for active stage
	if (activeStage.$4C_0 == "a8b62c32-08ad-0351-7487-76610e0ec581") {  //active Candidate
	//retrieveMultipleRecords..checkJobStage
		SDK.REST.retrieveMultipleRecords("sabre_placement", "?$select=sabre_Posistion&$filter=sabre_Candidate/Id eq (guid'"+candidateId+"')", checkJobStage, errorCallback, function() {
			//On Complete - Do Something
		});
	}
	//else set placements to Draft Status
	else{
	//retrieveMultipleRecords..placementsToDraft
		SDK.REST.retrieveMultipleRecords("sabre_placement", "?$select=sabre_placementId,stageid&$filter=sabre_Candidate/Id eq (guid'"+ candidateId +"')",
			placementsToDraft,
			errorCallback,
			function() {
				//On Complete - Do Something
		});
	}
}

function checkJobStage(results){

	for (var i = 0; i < results.length; i++) {
		var sabre_Posistion = results[i].sabre_Posistion;
		SDK.REST.retrieveMultipleRecords("sabre_position", "?$select=sabre_positionId,stageid&$filter=sabre_positionId eq (guid'"+sabre_Posistion.Id+"')", actualCheckJobStage, errorCallback,
		function(){
			//do nothing
		});
	}
}

function actualCheckJobStage(results){
	for (var i = 0; i < results.length; i++) {
		var sabre_positionId = results[i].sabre_positionId;
		var stageid = results[i].stageid;
 //0ade9252-e116-4bd7-9585-bbafef5f293d draft, 9424ae71-a347-46fc-acc8-2506b6ffe5ea altDraft
		if(stageid == "1da04c39-560a-81bd-0034-9ee2381ec111" || stageid == "d3115bc9-abd4-e7de-4ae9-aed1bdbee519"){ //active and alt active
			SDK.REST.retrieveMultipleRecords("sabre_placement", "?$select=sabre_placementId,stageid&$filter=sabre_Candidate/Id eq (guid'"+candidateId+"') and sabre_Posistion/Id eq (guid'"+sabre_positionId+"')",
				placementsToActive,
				errorCallback,
				function(){}
			);
		} else{
			SDK.REST.retrieveMultipleRecords("sabre_placement", "?$select=sabre_placementId,stageid&$filter=sabre_Candidate/Id eq (guid'"+candidateId+"') and sabre_Posistion/Id eq (guid'"+sabre_positionId+"')",
				placementsToDraft,
				errorCallback,
				function(){}
			);
		}
	}
}

function placementsToActive(results){
	//set to Active "b6814410-0b50-95b2-599a-cd599e00872b"
	for (var i = 0; i < results.length; i++) {
        var sabre_placementId = results[i].sabre_placementId;
        var stageid = results[i].stageid;
		if(stageid == "b6814410-0b50-95b2-599a-cd599e00872b"){ //if is active do nothing.
			
		}
		else{
			var entity = {};
			entity.stageid = "b6814410-0b50-95b2-599a-cd599e00872b"; //sets to active
			SDK.REST.updateRecord(sabre_placementId, entity, "sabre_placement", function() {
				//Success - No Return Data - Do Something
			}, errorCallback);
		}
    }
}

function placementsToDraft(results){

    for (var i = 0; i < results.length; i++) {
        var sabre_placementId = results[i].sabre_placementId;
        var stageid = results[i].stageid;
		if(stageid == "df7260f8-75a5-4744-8e37-c12ff9c2dfef"){ //if is draft do nothing.
			
		}
		else{
			var entity = {};
			entity.stageid = "df7260f8-75a5-4744-8e37-c12ff9c2dfef"; //sets to draft
			SDK.REST.updateRecord(sabre_placementId, entity, "sabre_placement", function() {
				//Success - No Return Data - Do Something
			}, errorCallback);
		}
    }
}

function bankAcctNoVerification(){
	if(Xrm.Page.getControl("sabre_bankacct") != null && Xrm.Page.getAttribute("sabre_bankacct").getValue() != "" && Xrm.Page.getAttribute("sabre_bankacct").getValue() != null)
	{
		var bankAcctNo = Xrm.Page.getAttribute("sabre_bankacct").getValue();
		if (bankAcctNo.length > 19){
			Xrm.Page.getAttribute("sabre_bankacct").setValue("");
			Xrm.Page.ui.setFormNotification("Invalid Bank Account Number.", "WARNING", '100');
		} else{
			Xrm.Page.ui.clearFormNotification('100');
		}
	}
}



function getObjTypeCode(){
	entityName = "sabre_candidate";
		
	try {
		var lookupService = new this.parent.RemoteCommand("LookupService", "RetrieveTypeCode");
		lookupService.SetParameter("entityName", entityName);
		var result = lookupService.Execute();
		 
		if (result.Success && typeof result.ReturnValue == "number") {
			console.log( result.ReturnValue);
		}
		else {
			return null;
		}
	}
	catch (ex) {
		throw ex;
	}
}

//WIP
function sendCandidateEmail(args){
	mailTarget = "mailto:?bcc=";
	if(args.length > 0){
		for (i = 0; i < args.length; i++){
			if(args[i].Id != null && args[i].TypeName != null){
				var contactId = args[i].Id;
				contactId = contactId.replace("{","").replace("}","");
				var req = new XMLHttpRequest();
				req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/sabre_candidates("+contactId+")?$select=sabre_emailaddress", false);
				req.setRequestHeader("OData-MaxVersion", "4.0");
				req.setRequestHeader("OData-Version", "4.0");
				req.setRequestHeader("Accept", "application/json");
				req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
				req.onreadystatechange = function() {
					if (this.readyState === 4) {
						req.onreadystatechange = null;
						if (this.status === 200) {
							var result = JSON.parse(this.response);
							var emailaddress1 = result["sabre_emailaddress"];
							if(args.length == 1){
								//window.location.href = "mailto:" + emailaddress1;
								mailTarget = "mailto:" + emailaddress1;
							}
							else if(i==0){
								mailTarget = mailTarget + emailaddress1;
							}
							else{
								mailTarget = mailTarget + ", " + emailaddress1;
							}

						} else {
							//Xrm.Utility.alertDialog(this.statusText);
						}
					}
				};
				req.send();
			}
		}
		window.location.href = mailTarget;
	}
}

function onUpdateDOB(){
	if(Xrm.Page.getControl("sabre_dateofbirth") != null && Xrm.Page.getAttribute("sabre_dateofbirth").getValue() != "" && Xrm.Page.getAttribute("sabre_startdate") != null && Xrm.Page.getAttribute("sabre_startdate").getValue() != null && Xrm.Page.getAttribute("sabre_startdate") != ""){
		var startDate = Xrm.Page.getAttribute("sabre_startdate").getValue();
		var dob = Xrm.Page.getAttribute("sabre_dateofbirth").getValue();
		if(startDate <= dob){
			Xrm.Page.getAttribute("sabre_dateofbirth").setValue("");	
			Xrm.Page.ui.setFormNotification("Date of Birth exceeds or matches Start Date.", "WARNING", '100');
		}
		else{
			Xrm.Page.ui.clearFormNotification('100');
		}
	}
}