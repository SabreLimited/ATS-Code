function Form_Onload() {
	var contextParams = Xrm.Page.context.getQueryStringParameters();

	if (contextParams._CreateFromType != null && contextParams._CreateFromType == 112) {  //determines that Quick Create is being clled from Case Form.
		var contactLookup = top.document.getElementById("new_contact_i_lookup_quickcreate"); //gets contactLookup
		var customerLookup = top.document.getElementById("customerid_i_lookup_quickcreate"); //gets customerLookup
		var contentFrame = top.document.getElementById("contentIFrame0");

		if (contentFrame != null) {
			var clientLookup = contentFrame.contentWindow.Xrm.Page.getAttribute("new_account");

			if (clientLookup != null) {
				var clientValue = clientLookup.getValue();

				if (clientValue != null) {
					Xrm.Page.getAttribute("parentcustomerid").setValue(clientValue);
				}
			}																					//above region retrieves data from main content frame window.

			if (customerLookup != null) {
				Xrm.Page.getAttribute("customertypecode").setValue(100000000); //Customer
			}

			if (contactLookup != null) {
				Xrm.Page.getAttribute("customertypecode").setValue(100000001); //Contact
			}
		}
	}
}

function testQuickCreate(){
	console.log(Xrm.Page.context.getQueryStringParameters());
}

function pipelineChangeJO(){
	//check whether or not pipeline would duplicate existing JO. If it would, prevent progress.
	if(Xrm.Page.getControl("sabre_positionno") != null && Xrm.Page.getAttribute("sabre_positionno").getValue() != undefined && Xrm.Page.getControl("sabre_candidate") != null && Xrm.Page.getAttribute("sabre_candidate").getValue() != undefined){
		var position = Xrm.Page.getAttribute("sabre_positionno").getValue();
		var candidate = Xrm.Page.getAttribute("sabre_candidate").getValue();
		SDK.JQuery.retrieveMultipleRecords(
		"sabre_submission",
		"$select=sabre_submissionId&$filter=(sabre_PositionNo/Id eq (Guid'" + position[0].id +"')) and (sabre_Candidate/Id eq (Guid'"+ candidate[0].id +"'))",
		duplicatesFound,
		errorCallback,
		function(){
		//OnComplete Handler
		}
	);
	}
}

function duplicatesFound(results){
	if (results.length > 0){
		//Xrm.Page.getAttribute("sabre_positionno").setValue(null);
		//removed because people wanted to be able to create duplicates but also not create duplicates.
		Xrm.Page.ui.setFormNotification("This candidate has already been submitted to that Job Order.", "WARNING", '1');
	}
	else{
		Xrm.Page.ui.clearFormNotification('1');
	}
}

function errorCallback(error){
	console.log(error);
}

function placementOnChangeCandidate(){
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