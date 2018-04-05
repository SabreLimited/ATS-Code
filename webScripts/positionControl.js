function positionSetWageType(){
    if(Xrm.Page.getControl("sabre_type") != null && Xrm.Page.getAttribute("sabre_type").getValue() != null){
	    Xrm.Page.getControl("sabre_wagetype");
		if(Xrm.Page.getAttribute("sabre_type").getValue() == 837770001){
		    var setVal = 837770000;
		}
		else{
		    var setVal = 837770001;
		}
		Xrm.Page.getAttribute("sabre_wagetype").setValue(setVal);
	}
}

//function called in the onchange event of Internally Reviewed
function internallyReviewed(){
	//if it's been signed, set the signee to the current user
	if(Xrm.Page.getControl("sabre_internallyreviewed") != null && Xrm.Page.getAttribute("sabre_internallyreviewed").getValue() == 1){
		Xrm.Page.getControl("sabre_internalreviewsignee");

		var userArray = new Array();
		userArray[0] = new Object();
		userArray[0].id = Xrm.Page.context.getUserId().slice(1, -1);
		userArray[0].name = Xrm.Page.context.getUserName();
		userArray[0].entityType = "systemuser";

		Xrm.Page.getControl("sabre_internalreviewsignee").setDisabled(false);
		Xrm.Page.getAttribute("sabre_internalreviewsignee").setValue(userArray);
		Xrm.Page.getControl("sabre_internalreviewsignee").setVisible(true);
		Xrm.Page.getControl("sabre_internalreviewsignee").setDisabled(true);
		
		var currentDateTime = new Date();
		
		Xrm.Page.getControl("sabre_revieweddatetime").setDisabled(false);
		Xrm.Page.getAttribute("sabre_revieweddatetime").setValue(currentDateTime);
		Xrm.Page.getControl("sabre_revieweddatetime").setVisible(true);
		Xrm.Page.getControl("sabre_revieweddatetime").setDisabled(true);
		
	}
	
}

function accountChangeBFSH(){
	//function to change Bill For Stat Hours field in Job Order/Position when the Account or something else is changed or set.
	if(Xrm.Page.getControl("sabre_billforstathours") != null){
			var account = Xrm.Page.getAttribute("sabre_account").getValue();
			account.id = account.id
			SDK.JQuery.retrieveRecord(account[0].id,
				"Account",
				null, "",
				acctRetrieved, errorCallback);
	}
}

function acctRetrieved(result){
	if (result != null && result.sabre_BillforStatHours != null){
			Xrm.Page.getAttribute("sabre_billforstathours").setValue(result.sabre_BillforStatHours);
	}
}

function fillJobOrder(){
	if(Xrm.Page.getControl("sabre_availableopenings") != null && Xrm.Page.getAttribute("sabre_availableopenings").getValue() > 0){
		//actual functionality
		var obj = new Object();
		var id = Xrm.Page.data.entity.getId();
		id = id.slice(1, -1);
		obj.id = id;
		obj.name = Xrm.Page.getAttribute("sabre_name").getValue();
		obj.entityType = "sabre_position";
		//Xrm.Utility.openQuickCreate("sabre_submission", obj).then(successSubmissionCreate, errorCallback);
		//no longer utilizing submissions for this.
		Xrm.Utility.openQuickCreate("sabre_placement", obj);
		//actual functionality
	}
	else{
		alert("Insufficient Openings to perform action");
	}
}

function successSubmissionCreate(object){
	newObject = new Object();
	newObject.sabre_submissionstatus = 837770000;
	positionObject = new Object();
	positionObject.Id = Xrm.Page.data.entity.getId();
	positionObject.LogicalName = "sabre_position";
	newObject.sabre_PositionNo = positionObject;
	SDK.JQuery.retrieveRecord(object.savedEntityReference.id,
		object.savedEntityReference.entityType,
		null, "",
		submissionRetrieved, errorCallback);
}

function submissionRetrieved(record){
	//record.sabre_Candidate = newObject.sabre_Candidate; //dunno why we need this.
	newObject.sabre_Candidate = record.sabre_Candidate;
	record.sabre_SubmissionStatus.Value = 837770000;
	SDK.JQuery.updateRecord(  //update self
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
	//RMR for other Submissions here.
	SDK.JQuery.retrieveMultipleRecords("sabre_submission", "?$filter=sabre_Candidate/Id eq (guid'"+ record.sabre_Candidate.Id +"') and sabre_PositionNo/Id eq (guid'" +record.sabre_PositionNo.Id +"') and sabre_submissionId ne (guid'"+record.sabre_submissionId+"')", foundDupes, errorCallback, function(){});
	newPlacement.sabre_SubmissionNo = submissionObject;
	newPlacement.sabre_Posistion = record.sabre_PositionNo;
	newPlacement.sabre_Candidate = record.sabre_Candidate;
	//SDK.JQuery.createRecord( //create related placement
	//  newPlacement,
	//  "sabre_placement",
	//  placementCreated,
	//  errorCallback
	//);
}

function foundDupes(records){
	if(records != null && records.length > 0){
		newPlacement = new Object();
		var submissionRef = new Object();
		var candidateRef = new Object();
		submissionRef.Id = records[0].sabre_submissionId;
		submissionRef.LogicalName = "sabre_submission";
	    newPlacement.sabre_SubmissionNo = submissionRef;
		newPlacement.sabre_Posistion = records[0].sabre_PositionNo;
		candidateRef.Id = records[0].sabre_Candidate.Id;
		candidateRef.LogicalName = records[0].sabre_Candidate.LogicalName;
		newPlacement.sabre_Candidate = candidateRef;
		SDK.JQuery.retrieveMultipleRecords("sabre_placement", "?$filter=sabre_Candidate/Id eq (guid'"+records[0].sabre_Candidate.Id+"') and sabre_Posistion/Id eq (guid'"+records[0].sabre_PositionNo.Id+"')", foundDupePlacements, errorCallback, function(){});
		
		SDK.JQuery.deleteRecord(
		  submissionObject.Id,
		  "sabre_submission",
		  function(){},
		  errorCallback
		);
	}
}

function successUpdate(){
	
}

function foundDupePlacements(records){
	if(records != null && records.length > 0){
		window.parent.alert("Completing this action would result in a duplicate placement");
	} else {
		SDK.JQuery.createRecord( //create related placement
		  newPlacement,
		  "sabre_placement",
		  placementCreated,
		  errorCallback
		);
	}
}

function placementCreated(object){
	//console.log(object);
	thePlacement = new Object();
	thePlacement = object;
	SDK.JQuery.retrieveMultipleRecords( //fill openings
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
        alert("Candidate Placed.");
		window.parent.Xrm.Page.data.refresh();
	}
	else{
		alert("Error: insufficient openings to correctly place.");
	}
}

//default function for error output to console.
function errorCallback(error){
	console.log(error);
}

function hideBusinessProcessFlow()
{
	if(Xrm.Page.ui.process != null && Xrm.Page.ui.process.getVisible() != null){
        Xrm.Page.ui.process.setVisible(false);
	}
}


function onChangePayRate(){
	//Update Overtime Pay Rate
	if(Xrm.Page.getControl("sabre_pay_rate") != null){
	    var payRate = 0;
		if(Xrm.Page.getAttribute("sabre_pay_rate").getValue() != null){
			payRate = Xrm.Page.getAttribute("sabre_pay_rate").getValue();
		}
		if(Xrm.Page.getControl("sabre_mincost") != null){
			if(payRate < 1000000000){
			    Xrm.Page.getAttribute("sabre_mincost").setValue(payRate*1.5);
			}
		}
		//Update Bill Rate
		if(Xrm.Page.getControl("sabre_markuptype") != null && Xrm.Page.getControl("sabre_markupvalue") != null && Xrm.Page.getControl("sabre_billrate") != null){
			var markupValue = 0;
			if(Xrm.Page.getAttribute("sabre_markupvalue").getValue() != null){
				markupValue = Xrm.Page.getAttribute("sabre_markupvalue").getValue();
			}
			if(Xrm.Page.getAttribute("sabre_markuptype").getValue() == 0 || Xrm.Page.getAttribute("sabre_markuptype").getValue() == null){
				if(payRate < 1000000000 && markupValue < 1000000000){
				Xrm.Page.getAttribute("sabre_billrate").setValue(markupValue + payRate);
				}
			}
			else{
				if(markupValue < 1000000 && payRate < 1000000000){
					Xrm.Page.getAttribute("sabre_pay_rate").setValue(payRate*((markupValue/100)+1));
				}
			}
			//Update Overtime Bill Rate
			if(Xrm.Page.getControl("sabre_maxcost") != null && Xrm.Page.getControl("sabre_mincost") != null){
				if(Xrm.Page.getAttribute("sabre_markuptype").getValue() == 0 || Xrm.Page.getAttribute("sabre_markuptype").getValue() == null){
					if(markupValue < 1000000000 && Xrm.Page.getAttribute("sabre_billrate").getValue() < 1000000000){
					    Xrm.Page.getAttribute("sabre_maxcost").setValue(Xrm.Page.getAttribute("sabre_mincost").getValue() + markupValue);
					}
				}
				else{
					if(markupValue < 1000000 && Xrm.Page.getAttribute("sabre_billrate").getValue() < 1000000000){
						Xrm.Page.getAttribute("sabre_maxcost").setValue(Xrm.Page.getAttribute("sabre_mincost").getValue()*((markupValue/100)+1));
					}
				}
			}
		}
	}
}

function onChangeBillRate(){
	//Update Overtime Bill Rate
	if(Xrm.Page.getControl("sabre_markuptype") != null && Xrm.Page.getControl("sabre_markupvalue") != null && Xrm.Page.getControl("sabre_billrate") != null){
		var markupValue = 0;
		if(Xrm.Page.getAttribute("sabre_markupvalue").getValue() != null){
			markupValue = Xrm.Page.getAttribute("sabre_markupvalue").getValue();
		}
		if(Xrm.Page.getControl("maxcost") != null){
			if(Xrm.Page.getAttribute("sabre_markuptype").getValue() == 0 || Xrm.Page.getAttribute("sabre_markuptype").getValue() == null){
				if(markupValue < 1000000000 && Xrm.Page.getAttribute("sabre_billrate").getValue() < 1000000000){
				    Xrm.Page.getAttribute("maxcost").setValue(Xrm.Page.getAttribute("sabre_billrate").getValue() + markupValue);
				}
			}
			else{
				if(markupValue < 1000000 && Xrm.Page.getAttribute("sabre_billrate").getValue() < 1000000000){
				    Xrm.Page.getAttribute("maxcost").setValue(Xrm.Page.getAttribute("sabre_billrate").getValue()*((markupValue/100)+1));
				}
			}
		}
	}
}

function statPayOnChange(){
	//update statBillRate
	if(Xrm.Page.getControl("sabre_statutorypayrate") != null && Xrm.Page.getControl("sabre_statutorybillrate") != null){
		if(Xrm.Page.getAttribute("sabre_statutorypayrate").getValue() < 768333333333333){
			Xrm.Page.getAttribute("sabre_statutorybillrate").setValue(Xrm.Page.getAttribute("sabre_statutorypayrate").getValue() * 1.2);		
		}
	}
}

function hideByVacationPay(){

    //hide or make visible Vacation Pay field.
	if(Xrm.Page.getControl("sabre_vacationpay") != null && Xrm.Page.getControl("sabre_vacationpayment") != null && (Xrm.Page.getAttribute("sabre_vacationpay") == null || Xrm.Page.getAttribute("sabre_vacationpay").getValue() == false || Xrm.Page.getAttribute("sabre_vacationpay").getValue() == null)){
	    Xrm.Page.getControl("sabre_vacationpayment").setVisible(0);
	}
	else if(Xrm.Page.getControl("sabre_vacationpay") != null && Xrm.Page.getControl("sabre_vacationpayment") != null){
	    Xrm.Page.getControl("sabre_vacationpayment").setVisible(1);
	}
}

function onChangeMarkupType(){
	//calls onChangePayRate
	onChangePayRate();
}

function onChangeMarkupValue(){
	//calls onChangePayRate
	onChangePayRate();
}

function rectifyOpeningQuantity(selectedItems){
	    var jobGuids = [];
        jobList = [];
		openingList = [];
        for (var i = 0; i < selectedItems.length; i++) {
            jobGuids.push(selectedItems[i]["Id"].replace("{", "").replace("}", ""));
			var req = new XMLHttpRequest();
			req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/sabre_positions("+jobGuids[i]+")?$select=sabre_name,sabre_noofopenings,sabre_positionid", true);
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
						validateOpenings(result);
					} else {
						Xrm.Utility.alertDialog(this.statusText);
					}
				}
			};
			req.send();
        }

		
}

function validateOpenings(result){
	jobList.push(result);
var req = new XMLHttpRequest();
req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/sabre_placements?$select=sabre_actualstartdate,sabre_enddate&$filter=_sabre_posistion_value eq "+result.sabre_positionid+"", true);
req.setRequestHeader("OData-MaxVersion", "4.0");
req.setRequestHeader("OData-Version", "4.0");
req.setRequestHeader("Accept", "application/json");
req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
req.onreadystatechange = function() {
    if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (this.status === 200) {
            var results = JSON.parse(this.response);
			gblConsumedOpenings = 0;
            for (var i = 0; i < results.value.length; i++) {
                var sabre_actualstartdate = results.value[i]["sabre_actualstartdate"];
                var sabre_enddate = results.value[i]["sabre_enddate"];
				var tempDate = new Date();
				var startDate = new Date(sabre_actualstartdate);
				var endDate = new Date(sabre_enddate);
				if(endDate != null && startDate != null && endDate.getTime() != null && startDate.getTime() != null && startDate.getTime() <= tempDate.getTime() && endDate.getTime() >= tempDate.getTime()){
					gblConsumedOpenings = gblConsumedOpenings + 1;
				} else if(endDate != null && endDate.getTime() != null && endDate.getTime() >= tempDate.getTime() && startDate.getTime() == null){
					gblConsumedOpenings = gblConsumedOpenings + 1;
				} else if(startDate != null && startDate.getTime() != null && startDate.getTime() <= tempDate.getTime() && endDate.getTime() == null){
					gblConsumedOpenings = gblConsumedOpenings + 1;
				}
            }
			
			updPos(result.sabre_noofopenings - gblConsumedOpenings, result.sabre_positionid);
        } else {
            Xrm.Utility.alertDialog(this.statusText);
        }
    }
};
req.send();
}

function createOpening(positionId, positionName, counter, opStatus){
	var entity = {};
	entity.sabre_name = positionName+"-"+counter;
	entity.sabre_OpeningStatus = {
		Value: opStatus
	};
	entity.sabre_PositionNo = {
		Id: positionId,
		LogicalName: "sabre_position"
	};

	var req = new XMLHttpRequest();
	req.open("POST", encodeURI(Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/sabre_openingSet"), true);
	req.setRequestHeader("Accept", "application/json");
	req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	req.onreadystatechange = function() {
		if (this.readyState === 4) {
			this.onreadystatechange = null;
			if (this.status === 201) {
				var result = JSON.parse(this.responseText).d;
				var newEntityId = result.sabre_openingId;
			} else {
				Xrm.Utility.alertDialog(this.statusText);
			}
		}
	};
	req.send(JSON.stringify(entity));
}

function returnedOps(results){
	console.log(results);
	var arr = [];
	openingList.push(arr);
	for(var i = 0; i < results.value.length; i++){
		openingList.push(results.value[i].sabre_position, results.value[i]);
	}
}

function updateOpCount(result){
	var req = new XMLHttpRequest();
	req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.1/sabre_openings?$filter=_sabre_positionno_value eq "+result.sabre_positionid+"&$count=true", true);
	req.setRequestHeader("OData-MaxVersion", "4.0");
	req.setRequestHeader("OData-Version", "4.0");
	req.setRequestHeader("Accept", "application/json");
	req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
	req.onreadystatechange = function() {
		if (this.readyState === 4) {
			req.onreadystatechange = null;
			if (this.status === 200) {
				console.log("first success");
				var results = JSON.parse(this.response);
				var recordCount = results["@odata.count"];
				updPos(recordCount, result.sabre_positionid);
			} else {
				Xrm.Utility.alertDialog(this.statusText);
			}
		}
	};
	req.send();
}

function updPos(openings, posId){
	var entity = {};
	entity.sabre_availableopenings = openings;

	var req = new XMLHttpRequest();
	req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/sabre_positions("+posId+")", true);
	req.setRequestHeader("OData-MaxVersion", "4.0");
	req.setRequestHeader("OData-Version", "4.0");
	req.setRequestHeader("Accept", "application/json");
	req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	req.onreadystatechange = function() {
		if (this.readyState === 4) {
			req.onreadystatechange = null;
			if (this.status === 204) {
				console.log("updated openings to: " +openings);
				//Success - No Return Data - Do Something
			} else {
				Xrm.Utility.alertDialog(this.statusText);
			}
		}
	};
	req.send(JSON.stringify(entity));
}

function updateJobOrderProcess(){
	var enabledProcess = Xrm.Page.data.process.getActiveProcess();
	var enabledStage = Xrm.Page.data.process.getActiveStage();

	if(enabledProcess == null || enabledProcess.getName() == null || enabledProcess.getName() == "Position Setup Process" ||
	(Xrm.Page.getControl("sabre_type") != null && (Xrm.Page.getAttribute("sabre_type").getValue() == 837770000 || Xrm.Page.getAttribute("sabre_type").getValue() == 837770002)&& enabledProcess.getName() != "Temp Job Order Business Process Flow") ||
	(Xrm.Page.getControl("sabre_type") != null && (Xrm.Page.getAttribute("sabre_type").getValue() == 837770001)&& enabledProcess.getName() != "Perm Job Order Business Process Flow")
	&& (Xrm.Page.data.entity.getId() != null && Xrm.Page.data.entity.getId() != '')){
	    Xrm.Page.data.process.getEnabledProcesses(function (processes){
			var i = 0;
				for(var processId in processes){

					if(Xrm.Page.getControl("sabre_type") != null &&(Xrm.Page.getAttribute("sabre_type").getValue() == 837770000 || Xrm.Page.getAttribute("sabre_type").getValue() == 837770002)){
						if(processes[processId] == "Temp Job Order Business Process Flow"){
							Xrm.Page.data.process.setActiveProcess(processId, callbackFunction);
						}
					}
					else if(Xrm.Page.getControl("sabre_type") != null && Xrm.Page.getAttribute("sabre_type").getValue() == 837770001){
						if(processes[processId] == "Perm Job Order Business Process Flow"){
							Xrm.Page.data.process.setActiveProcess(processId, callbackFunction);
						}
					}
					i++;
				}
		});
	}
	if(Xrm.Page.ui.process != null && Xrm.Page.ui.process.getVisible() != null){
        Xrm.Page.ui.process.setVisible(true);
	}
}

function callbackFunction(str){
	
}

function onJobClosed(){
	if(Xrm.Page.getControl("sabre_positionstatus") != null && Xrm.Page.getAttribute("sabre_positionstatus") != null && Xrm.Page.getAttribute("sabre_positionstatus").getValue() == 837770004){
		Xrm.Utility.confirmDialog("Would you also like to deactivate this record?", function(){
			var entity = {};
			entity.statuscode = {
				Value: 2
			};
			entity.statecode = {
				Value: 1
			};
			var pageId = Xrm.Page.data.entity.getId();
			pageId = pageId.replace("{", '').replace("}", '');

			SDK.REST.updateRecord(pageId, entity, "sabre_position", function() {
				//Success - No Return Data - Do Something
				Xrm.Page.data.refresh(true);
			}, function(error) {
				Xrm.Utility.alertDialog(error.message);
			});
		}, function(){});
	}
}

function onChangePayRate2(){
	console.log("test");
	if(Xrm.Page.getControl("sabre_pay_rate") != null && Xrm.Page.getControl("sabre_account") != null){
		console.log("test2");
		var tempCompany = Xrm.Page.getAttribute("sabre_account").getValue();
		var tempId = tempCompany[0].id;
		tempId = tempId.replace("{", '').replace("}", '');
		SDK.REST.retrieveRecord(tempId, "Account", "sabre_Markup", null, useMarkup, errorCallback);
	}
}

function useMarkup(result){
	console.log(result);
	if(Xrm.Page.getControl("sabre_billrate") != null && result.sabre_Markup != null){
		console.log(parseFloat(result.sabre_Markup));
		var newRateVal = Xrm.Page.getAttribute("sabre_pay_rate").getValue();
		console.log(newRateVal);
		newRateVal = newRateVal * (1+(parseFloat(result.sabre_Markup)/100));
		console.log(newRateVal);
		Xrm.Page.getAttribute("sabre_billrate").setValue(newRateVal);
	}
}

function onChangeJobDesc(){
	if(Xrm.Page.getControl("sabre_jobdescription") != null && Xrm.Page.getAttribute("sabre_jobdescription").getValue() != null && Xrm.Page.getControl("sabre_jobdescriptionplaintext") != null){
		Xrm.Page.getAttribute("sabre_jobdescriptionplaintext").setValue(Xrm.Page.getAttribute("sabre_jobdescription").getValue().replace(/<(?:.|\n)*?>/gm, '').replace('&nbsp;', ''));
	}
}

function onPageLoad(){
	if(Xrm.Page.getControl("sabre_availableopenings") != null){
		Xrm.Page.getControl("sabre_availableopenings").setDisabled(true);
	}
	if(Xrm.Page.getControl("sabre_positiontitle") != null){
		setTimeout(function () {
			var allelem = window.parent.document.all;
			for (var i = 0; i < allelem.length; i++) {
				var id = allelem[i].id || allelem[i].getAttribute('id');
				if (id == 'FormTitle') {
					// H1 element where title is displayed
					allelem[i].childNodes[0].innerText = Xrm.Page.getAttribute("sabre_positiontitle").getValue();
					break;
				}
			}
		}, 500);
	}
	
}

function onPositionTitleChange(){
	if(Xrm.Page.getControl("sabre_positiontitle") != null){
		setTimeout(function () {
			var allelem = window.parent.document.all;
			for (var i = 0; i < allelem.length; i++) {
				var id = allelem[i].id || allelem[i].getAttribute('id');
				if (id == 'FormTitle') {
					// H1 element where title is displayed
					allelem[i].childNodes[0].innerText = Xrm.Page.getAttribute("sabre_positiontitle").getValue();
					break;
				}
			}
		}, 500);
	}
}

function tempUpdateJobOrderTitle(){
	SDK.JQuery.retrieveMultipleRecords("sabre_position", "?$select=sabre_JobDescription,sabre_JobDescriptionPlainText,sabre_positionId,sabre_PositionTitle", function(results) {
		console.log(results[0].sabre_JobDescriptionPlainText);
		for (var i = 0; i < results.length; i++) {
			var sabre_JobDescription = results[i].sabre_JobDescription;
			var sabre_JobDescriptionPlainText = results[i].sabre_JobDescriptionPlainText;
			var sabre_positionId = results[i].sabre_positionId;
			var sabre_PositionTitle = results[i].sabre_PositionTitle;
			var entity = {};
			if(sabre_JobDescriptionPlainText == null){
				if(sabre_JobDescription != null && sabre_JobDescription.length < 101) {
			      entity.sabre_PositionTitle = sabre_JobDescription;
				}
			}
			else{
				if(sabre_JobDescriptionPlainText != null && sabre_JobDescriptionPlainText.length < 101){
					entity.sabre_PositionTitle = sabre_JobDescriptionPlainText;
				}
			}

			SDK.JQuery.updateRecord(sabre_positionId, entity, "sabre_position", function() {
			}, function(error) {
				Xrm.Utility.alertDialog(error.message);
			});
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
	});
		
		
}

function placeMultipleCandidateFromJob(){
	/*//Mscrm.Utilities.returnLookupItems = function (lookupItems) {
	//	callBack(lookupItems.items);
	//}
    var callbackFunctionObject = Mscrm.Utilities.createCallbackFunctionObject('returnLookupItems', Mscrm.Utilities, [null, null], false);
	//Sab-Jo 15/05/2017								//single or multi
	LookupObjectsWithCallback(callbackFunctionObject, null, "multi", 10005, 0, null, null, 1, 1, false, "", "", "", "", "", null, null, null, null, null, null, "", null,
		// filter
		//encodeURIComponent('<filter type="and" ><condition attribute="sabre_positionstatus" operator="not-in" ><value>837770004</value><value>837770003</value></condition></filter>')
		null, "");
		
	console.log(callbackFunctionObject);*/
	        var options = new Xrm.DialogOptions;
        options.width = 500;
        options.height = 350;
	 Xrm.Internal.openDialog("/WebResources/sabre_mutiLookupJob",
            options,
            null,
            null,
            function (response) {console.log(resonse);});
	
}

function setActiveAccountField(){
	if(Xrm.Page.getAttribute("sabre_account") != null && Xrm.Page.getAttribute("sabre_account").getValue() != null){
		var account = Xrm.Page.getAttribute("sabre_account").getValue();
		SDK.JQuery.retrieveRecord(account[0].id, "Account", "AccountId,sabre_bpfstatus", null, function(result) {
			var accountId = result.AccountId;
			var sabre_bpfstatus = result.sabre_bpfstatus;
			if (sabre_bpfstatus != null && sabre_bpfstatus.Value != null ){
				if(sabre_bpfstatus.Value == 837770001){ //01 = Active, 00 =  Inactive
					if(Xrm.Page.getAttribute("sabre_accountactive") != null){
						Xrm.Page.getAttribute("sabre_accountactive").setValue(837770000);
					}
				}
				else if(sabre_bpfstatus.Value == 837770000){
					if(Xrm.Page.getAttribute("sabre_accountactive") != null){
						Xrm.Page.getAttribute("sabre_accountactive").setValue(null);
					}
				}
			}
		}, function(error) {
			Xrm.Utility.alertDialog(error.message);
		});
	}
}