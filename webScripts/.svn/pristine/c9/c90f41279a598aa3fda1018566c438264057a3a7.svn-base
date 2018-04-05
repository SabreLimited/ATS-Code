//sets active BPF based on Employee Type and Job Type
//Contractor, Employee, and Permanent work each have different flows.
function candidateProcessSelection() {

    enabledProcesses = [];

    //load all processes into array
    Xrm.Page.data.process.getEnabledProcesses(function (processes) {
        var i = 0;
        for (var processId in processes) {
            enabledProcesses[i] = new Object();
            enabledProcesses[i].id = processId
            enabledProcesses[i].name = processes[processId];
            i++;
        }
        if (Xrm.Page.getControl("sabre_type") != null) {
            if (Xrm.Page.getAttribute("sabre_type").getValue() == "837770001") {
                //set process to Employee
                var i = 0;
                while (enabledProcesses[i] != null) {
                    if (enabledProcesses[i].name == "Contractor Process Flow") {
                        Xrm.Page.data.process.setActiveProcess(enabledProcesses[i].id, callbackFunction);
                    }
                    i++;
                }
            }
            else if (Xrm.Page.getAttribute("sabre_type").getValue() == "837770000") {
                //set process to Contractor
                var i = 0;
                while (enabledProcesses[i] != null) {
                    if (enabledProcesses[i].name == "Employee Process Flow") {
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
function updateCandidateApplicationStage() {
    var enabledProcess = Xrm.Page.data.process.getActiveProcess();
    var enabledStage = Xrm.Page.data.process.getActiveStage();
    if (enabledProcess.getName() != "Candidate Application Process") {
        Xrm.Page.data.process.getEnabledProcesses(function (processes) {
            var i = 0;
            var enabledProcesses = [];
            for (var processId in processes) {
                enabledProcesses[i] = new Object();
                enabledProcesses[i].id = processId;
                enabledProcesses[i].name = processes[processId];
                i++;
            }
            var i = 0;
            while (enabledProcesses[i] != null) {
                if (enabledProcesses[i].name == "Candidate Application Process") {
                    Xrm.Page.data.process.setActiveProcess(enabledProcesses[i].id, callbackFunction);
                }
                i++;
            }

        });
        var enabledProcess = Xrm.Page.data.process.getActiveProcess();
        var enabledStage = Xrm.Page.data.process.getActiveStage();
    }

    setToObject = new Object();
    setToObject.Value = -1;
    if (enabledProcess.getName() == "Candidate Application Process") {
        if (Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Draft") {
            Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770000);
            setToObject.Value = 0;


        } else if (Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Registered") {
            Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770001);
            setToObject.Value = 1;
        }
		else if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Payroll"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770002);
            setToObject.Value = 2;
		}
		else if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Advanced"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770003);
            setToObject.Value = 3;
		}
		else if(Xrm.Page.getControl("sabre_candidateapplicationstage") != null && enabledStage.getName() == "Internal Interview"){
			Xrm.Page.getAttribute("sabre_candidateapplicationstage").setValue(837770004);
            setToObject.Value = 4;
		}

    }
    //Candidate Exclusive section: Update all related Placements with correct value for stage.
    if (setToObject.Value == 1 || setToObject.Value == 0 || setToObject.Value == 2 || setToObject.Value == 3 || setToObject.Value == 4) {
        SDK.JQuery.retrieveMultipleRecords(
            "sabre_placement",
            "$select=*&$filter=sabre_Candidate/Id eq (Guid'" + Xrm.Page.data.entity.getId() + "')",
            retrievedPlacementsForUpdate,
            errorCallback,
            function () {
                //OnComplete Handler
            });
    }

}

function retrievedPlacementsForUpdate(results) {
    //console.log(results);
    if (results != null && (setToObject.Value == 1 || setToObject.Value == 0)) {
        var i = 0;
        var updatePlacement;
        while (i < results.length) {
            updatePlacement = results[i];
            //console.log(updatePlacement);
            if (setToObject.Value == 1) {
                updatePlacement.sabre_CandidateProcessStage.Value = 837770001;
                SDK.JQuery.updateRecord(updatePlacement.sabre_placementId, updatePlacement, "sabre_placement", callbackFunction, errorCallback);

            }
            else if (setToObject.Value == 0) {
                updatePlacement.sabre_CandidateProcessStage.Value = 837770000;
                SDK.JQuery.updateRecord(updatePlacement.sabre_placementId, updatePlacement, "sabre_placement", callbackFunction, errorCallback);


            }
			else if (setToObject.Value == 2){
				updatePlacement.sabre_CandidateProcessStage.Value = 837770002;
				SDK.JQuery.updateRecord(updatePlacement.sabre_placementId, updatePlacement, "sabre_placement", callbackFunction, errorCallback);

			}
			else if (setToObject.Value == 3){
				updatePlacement.sabre_CandidateProcessStage.Value = 837770003;
				SDK.JQuery.updateRecord(updatePlacement.sabre_placementId, updatePlacement, "sabre_placement", callbackFunction, errorCallback);

			}
			else if (setToObject.Value == 4){
				updatePlacement.sabre_CandidateProcessStage.Value = 837770004;
				SDK.JQuery.updateRecord(updatePlacement.sabre_placementId, updatePlacement, "sabre_placement", callbackFunction, errorCallback);

			}
            i++;
        }
    }

}

function hideBusinessProcessFlow() {
    Xrm.Page.ui.process.setVisible(false);
}

function callbackFunction(str) {

}

//places 1+ candidates on a job from the list of candidates
function placeCandidates(selectedItems) {
    try {

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
                inputParams.push({ key: "StartDate", type: "c:dateTime", value: response.StartDate });
                inputParams.push({ key: "EndDate", type: "c:dateTime", value: response.EndDate });

                CallAction("sabre_PlaceCandidatesAction",
                    inputParams,
                    // Success callback
                    function () {
                        Xrm.Utility.alertDialog("Placements has been created.");
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


function jobSelectionCallback(results) {
    //get number of available openings

    //compare with # of candidates
    //add as many candidates as possible to job

    //Create Submission with values, set callback as returnToPath, errorCalback;

    //report that X# of candidates were unable to be placed due to space limitations.

}

function jobRetrieveCallback(rec) {


}

function placeCandidate() {
    //open quick create to allow users to swiftly set a position.
    //first validate that Candidate can be placed
    var eAsNormal = 1;
    if (Xrm.Page.getControl("sabre_type") != null && Xrm.Page.getAttribute("sabre_type").getValue() == 837770000) {
        if (Xrm.Page.getControl("sabre_td_1") != null && (Xrm.Page.getAttribute("sabre_td_1").getValue() == false || Xrm.Page.getAttribute("sabre_td_1").getValue() == null)) {
            //eAsNormal = 0;
            window.parent.alert("This candidate is missing a TD1.");
        }
        else if (Xrm.Page.getControl("sabre_td_1on") != null && (Xrm.Page.getAttribute("sabre_td_1on").getValue() == false || Xrm.Page.getAttribute("sabre_td_1on").getValue() == null)) {
            //eAsNormal = 0;
            window.parent.alert("This candidate is missing a TD1ON.");
        }
        else if (Xrm.Page.getControl("sabre_voidcheque") != null && (Xrm.Page.getAttribute("sabre_voidcheque").getValue() == false || Xrm.Page.getAttribute("sabre_voidcheque").getValue() == null)) {
            //eAsNormal = 0;
            window.parent.alert("This candidate is missing a Void Cheque.");
        }
        else if (Xrm.Page.getControl("sabre_specialrequirements") != null && (Xrm.Page.getAttribute("sabre_specialrequirements").getValue() == false || Xrm.Page.getAttribute("sabre_specialrequirements").getValue() == null)) {
            //eAsNormal = 0;
            window.parent.alert("This candidate may have special requirements that are not met.");
        }
    }
    else if (Xrm.Page.getControl("sabre_type") != null && Xrm.Page.getAttribute("sabre_type").getValue() == 837770001) {
        if (Xrm.Page.getControl("sabre_contract") != null && (Xrm.Page.getAttribute("sabre_contract").getValue() == false || Xrm.Page.getAttribute("sabre_contract").getValue() == null)) {
            //eAsNormal = 0;
            window.parent.alert("You have not signed a contract with this candidate.");
        }
        else if (Xrm.Page.getControl("sabre_businessname") != null && (Xrm.Page.getAttribute("sabre_businessname").getValue() == null)) {
            //eAsNormal = 0;
            window.parent.alert("This candidate is missing a Business Name.");
        }
        else if (Xrm.Page.getControl("sabre_businessnumber") != null && (Xrm.Page.getAttribute("sabre_businessnumber").getValue() == null)) {
            //eAsNormal = 0;
            window.parent.alert("This candidate is missing a Business Number.");
        }
        else if (Xrm.Page.getControl("sabre_voidcheque") != null && (Xrm.Page.getAttribute("sabre_voidcheque").getValue() == false || Xrm.Page.getAttribute("sabre_voidcheque").getValue() == null)) {
            //eAsNormal = 0;
            window.parent.alert("This candidate is missing a Void Cheque.");
        }
    }
    if (eAsNormal == 1) {
        var obj = new Object();
        var id = Xrm.Page.data.entity.getId();
        id = id.slice(1, -1);
        obj.id = id;
        obj.name = Xrm.Page.getAttribute("sabre_name").getValue();
        obj.entityType = "sabre_candidate";
        Xrm.Utility.openQuickCreate("sabre_submission", obj).then(successCallbackQuickCreate, errorCallback);
    }
}

//function called when quick creation successful.
function successCallbackQuickCreate(object) {
    newObject = new Object();
    console.log(object);
    newObject.sabre_submissionstatus = 837770000;
    candidateObject = new Object();
    candidateObject.Id = Xrm.Page.data.entity.getId();
    candidateObject.LogicalName = "sabre_candidate";
    newObject.sabre_Candidate = candidateObject;
    SDK.JQuery.retrieveRecord(object.savedEntityReference.id,
        object.savedEntityReference.entityType,
        null, "",
        recordRetrieved, errorCallback);

}

function placementCreated(object) {
    console.log(object);
    thePlacement = new Object();
    thePlacement = object;
    SDK.JQuery.retrieveMultipleRecords(
        "sabre_opening",
        "$select=*&$filter=sabre_PositionNo/Id eq (Guid'" + thePlacement.sabre_Posistion.Id + "') and (sabre_OpeningStatus/Value eq 837770001)",
        retrievedOpenings,
        errorCallback,
        function () {
            //OnComplete Handler
        }
    );

}

function retrievedOpenings(openings) {
    if (openings.length > 0) {
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
            function () {
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
            function () {
            },
            errorCallback
        );
        alert("Candidate Placed.");
    }
    else {
        alert("Error: insufficient openings to correctly place.");
    }
}

function successUpdate() {

}


//record retrieval return function for submission
function recordRetrieved(record) {
    record.sabre_Candidate = newObject.sabre_Candidate;
    record.sabre_SubmissionStatus.Value = 837770000;
    newObject = record;
    console.log(record);//temp example of current state.
    SDK.JQuery.retrieveMultipleRecords(
        "sabre_submission",
        "$select=sabre_submissionId&$filter=(sabre_PositionNo/Id eq (Guid'{" + record.sabre_PositionNo.Id + "}')) and (sabre_Candidate/Id eq (Guid'" + record.sabre_Candidate.Id + "')) and (sabre_submissionId ne (Guid'{" + record.sabre_submissionId + "}'))",
        resultsDuplicates,
        errorCallback,
        function () {
            //OnComplete Handler
        }
    );

}

function resultsDuplicates(results) {
    if (results.length > 0) {
        window.alert("Candidate already has a Pipeline for this Job.");

    } else {
        returnToPath(newObject);
    }
}

function returnToPath(newRes) {
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
function errorCallback(error) {
    console.log(error);
}

function sin1Verification() {
    /*if(Xrm.Page.getControl("sabre_sin1") != null && Xrm.Page.getAttribute("sabre_sin1").getValue() != ""){
		var val = Xrm.Page.getAttribute("sabre_sin1").getValue();
		if(is3Digits(val)){
			trySetSin();
			if(startsWith9(val)){
				Xrm.Page.getControl("sabre_sin1").setNotification("Temporary SIN Number!", "sin1");
			}
		}
		else{
			Xrm.Page.getAttribute("sabre_sin1").setValue("");
			Xrm.Page.getControl("sabre_sin1").setNotification("Invalid SIN Number.", "sin1");
		}
	}*/
}
function sin2Verification() {
    /*if(Xrm.Page.getControl("sabre_sin2") != null && Xrm.Page.getAttribute("sabre_sin2").getValue() != ""){
    var val = Xrm.Page.getAttribute("sabre_sin2").getValue();
    if(is3Digits(val)){
        trySetSin();
    }
    else{
        Xrm.Page.getAttribute("sabre_sin2").setValue("");
        Xrm.Page.getControl("sabre_sin2").setNotification("Invalid SIN Number.", "sin2");
    }
}*/
}
function sin3Verification() {
    /*if(Xrm.Page.getControl("sabre_sin3") != null && Xrm.Page.getAttribute("sabre_sin3").getValue() != ""){
    var val = Xrm.Page.getAttribute("sabre_sin3").getValue();
    if(is3Digits(val)){
        trySetSin();
    }
    else{
        Xrm.Page.getAttribute("sabre_sin3").setValue("");
        Xrm.Page.getControl("sabre_sin3").setNotification("Invalid SIN Number.", "sin3");
    }
}*/
}

function trySetSin() {
    /*if(Xrm.Page.getControl("sabre_sin1") != null && Xrm.Page.getControl("sabre_sin2") != null && Xrm.Page.getControl("sabre_sin3") != null && Xrm.Page.getControl("sabre_sin") != null){
		var sin1 = Xrm.Page.getAttribute("sabre_sin1").getValue();
		var sin2 = Xrm.Page.getAttribute("sabre_sin2").getValue();
		var sin3 = Xrm.Page.getAttribute("sabre_sin3").getValue();
		if(is3Digits(sin1) && is3Digits(sin2) && is3Digits(sin3)){
			Xrm.Page.getAttribute("sabre_sin").setValue(sin1 + "-" + sin2 + "-" + sin3);
		}
		else{
			Xrm.Page.getAttribute("sabre_sin").setValue("");
		}
		Xrm.Page.getControl("sabre_sin").clearNotification("sin");
		Xrm.Page.getControl("sabre_sin1").clearNotification("sin1");
		Xrm.Page.getControl("sabre_sin2").clearNotification("sin2");
		Xrm.Page.getControl("sabre_sin3").clearNotification("sin3");
	}*/
}


function BranchNoVerification() {
    if (Xrm.Page.getControl("sabre_branchno") != null && Xrm.Page.getAttribute("sabre_branchno").getValue() != "") {
        var val = Xrm.Page.getAttribute("sabre_branchno").getValue();
        if (is5Digits(val)) {
            //Xrm.Page.getControl("sabre_branchno").clearNotification("branchno");
            Xrm.Page.ui.clearFormNotification('1');
        }
        else {
            Xrm.Page.getAttribute("sabre_branchno").setValue("");
            //Xrm.Page.getControl("sabre_branchno").setNotification("Invalid Branch Number.", "branchno");
            Xrm.Page.ui.setFormNotification("Invalid Branch Number.", "WARNING", '1');
        }
    }
}


function TransitNoVerification() {
    if (Xrm.Page.getControl("sabre_transitno") != null && Xrm.Page.getAttribute("sabre_transitno").getValue() != "") {
        var val = Xrm.Page.getAttribute("sabre_transitno").getValue('1');
        if (is5Digits(val)) {
            //Xrm.Page.getControl("sabre_transitno").clearNotification("transitno");
            Xrm.Page.ui.clearFormNotification('1');
        }
        else {
            Xrm.Page.getAttribute("sabre_transitno").setValue("");
            //Xrm.Page.getControl("sabre_transitno").setNotification("Invalid Transit Number.", "transitno");
            Xrm.Page.ui.setFormNotification("Invalid Transit Number.", "WARNING", '1');
        }
    }
}


function BankNoVerification() {
    if (Xrm.Page.getControl("sabre_bankno") != null && Xrm.Page.getAttribute("sabre_bankno").getValue() != "") {
        var val = Xrm.Page.getAttribute("sabre_bankno").getValue();
        if (is3Digits(val)) {
            //Xrm.Page.getControl("sabre_bankno").clearNotification("bankno");
            Xrm.Page.ui.clearFormNotification('1');
        }
        else {
            Xrm.Page.getAttribute("sabre_bankno").setValue("");
            //Xrm.Page.getControl("sabre_bankno").setNotification("Invalid Bank Number.", "bankno");
            Xrm.Page.ui.setFormNotification("Invalid Bank Number.", "WARNING", '1');
        }
    }
}



function is3Digits(val) {
    if (val != null) {
        var n = val.search(/^\d{3}$/);
        if (n == -1) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
}


function is5Digits(val) {
    if (val != null) {
        var n = val.search(/^\d{5}$/);
        if (n == -1) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }

}



function startsWith9(val) {
    var n = val.search(/^[9][0-9]{2}$/);
    if (n == -1) {
        return false;
    }
    return true;
}

function sinVerificationCandidate() {
    if (Xrm.Page.getControl("sabre_sin") != null && Xrm.Page.getAttribute("sabre_sin").getValue() != null && Xrm.Page.getAttribute("sabre_sin").getValue() != "") {
        var sinNo = Xrm.Page.getAttribute("sabre_sin").getValue();
        var n = sinNo.search(/^\d{3}([- ]?)\d{3}\1\d{3}$/);
        if (n == -1) {
            Xrm.Page.getAttribute("sabre_sin").setValue("");
            //Xrm.Page.getControl("sabre_sin").setNotification("Invalid SIN Number.");
            Xrm.Page.ui.clearFormNotification('1');
            Xrm.Page.ui.setFormNotification("Invalid SIN Number", "WARNING", '1');


            //endChanges
        }
        else {
            n = sinNo.search(/^\d{9}$/);
            if (n != -1) {
                var tempStr = "-";
                sinNo = [sinNo.slice(0, 6), tempStr, sinNo.slice(6)].join('');
                sinNo = [sinNo.slice(0, 3), tempStr, sinNo.slice(3)].join('');
                Xrm.Page.getAttribute("sabre_sin").setValue(sinNo);

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

function retrievedSelf(result) {
    if (result != null) {

        SDK.JQuery.retrieveMultipleRecords(
            "sabre_candidate",
            "$select=*&$filter=OwningBusinessUnit/Id eq (Guid'" + result.OwningBusinessUnit.Id + "') and (sabre_SIN eq '" + Xrm.Page.getAttribute("sabre_sin").getValue() + "')",
            retrievedSINCandidates,
            errorCallback,
            function () {
                //OnComplete Handler
            }
        );
    }
}

function retrievedSINCandidates(results) {
    if (results.length > 0) {
        Xrm.Page.ui.setFormNotification("Duplicate SIN with " + results[0].sabre_name, "WARNING", '1');
        //Xrm.Page.getControl("sabre_sin").setNotification("Duplicate SIN with " + results[0].sabre_name);
    }
    //console.log(results);
}

function addCandidateToPipeline() {
    //open quick create to allow users to swiftly set a position.
    var obj = new Object();
    var id = Xrm.Page.data.entity.getId();
    id = id.slice(1, -1);
    obj.id = id;
    obj.name = Xrm.Page.getAttribute("sabre_name").getValue();
    obj.entityType = "sabre_candidate";
    Xrm.Utility.openQuickCreate("sabre_submission", obj).then(successCallbackPipeline, errorCallback);
}

function successCallbackPipeline(object) {
    //console.log(object);
}

function eContactUpdate() {
    if (Xrm.Page.getControl("sabre_emergencycontact") != null && Xrm.Page.getControl("sabre_emergencyphone") != null && Xrm.Page.getAttribute("sabre_emergencycontact").getValue() != null) {
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

function contactRetrieved(result) {
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
