function onChangeCompany(){
	//function changes sales rep to client/company/acct's owner when company is changed
	if(Xrm.Page.getControl("sabre_hostingcompany") != null && Xrm.Page.getAttribute("sabre_hostingcompany").getValue() != null){
		var tempCompany = Xrm.Page.getAttribute("sabre_hostingcompany").getValue();
		SDK.JQuery.retrieveRecord(tempCompany[0].id,
			"Account",
			null, "",
			changeCompanyRetrieved, errorCallback);
	}
}

function changeCompanyRetrieved(result){
	var lookupData = new Array();
	var tempUser = new Object();
	tempUser.entityType = result.OwnerId.LogicalName;
	tempUser.id = result.OwnerId.Id;
	tempUser.name = result.OwnerId.Name;
	lookupData.push(tempUser);
	if(Xrm.Page.getControl("sabre_affiliate") != null){
		Xrm.Page.getAttribute("sabre_affiliate").setValue(lookupData);
	}
}

function errorCallback(error){
	console.log(error);
}

function statPayOnChange(){
	if(Xrm.Page.getControl("sabre_statutorywages") != null && Xrm.Page.getControl("sabre_statutorychargerate") != null && Xrm.Page.getAttribute("sabre_statutorywages").getValue() != null){
		if(Xrm.Page.getAttribute("sabre_statutorywages").getValue() < 768333333333333){
			Xrm.Page.getAttribute("sabre_statutorychargerate").setValue(Xrm.Page.getAttribute("sabre_statutorywages").getValue() * 1.2);		
		}
	}
}

function normalPayOnChange(){
	if(Xrm.Page.getControl("sabre_regularwages") != null && Xrm.Page.getControl("sabre_overtimewages") != null && Xrm.Page.getAttribute("sabre_regularwages").getValue() != null){
		if(Xrm.Page.getAttribute("sabre_regularwages").getValue() < 768333333333333){
			Xrm.Page.getAttribute("sabre_overtimewages").setValue(Xrm.Page.getAttribute("sabre_regularwages").getValue() * 1.5);		
		}
	}
}

function normalBillOnChange(){
	if(Xrm.Page.getControl("sabre_regularchargerate") != null && Xrm.Page.getControl("sabre_overtimechargerate") != null && Xrm.Page.getAttribute("sabre_regularchargerate").getValue() != null){
		if(Xrm.Page.getAttribute("sabre_regularchargerate").getValue() < 768333333333333){
			Xrm.Page.getAttribute("sabre_overtimechargerate").setValue(Xrm.Page.getAttribute("sabre_regularchargerate").getValue() * 1.5);		
		}
	}
}

function preExportSetup(){
	var earliestDate = new Date();
	earliestDate.setDate(earliestDate.getDate() - 2);
	earliestDate.toJSON();
	var req = new XMLHttpRequest();
	req.open("GET", Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/sabre_placementSet?$select=sabre_FirstTimeCandidate,sabre_FirstTimeExport,sabre_placementId,statecode,statuscode,sabre_placement_Posistion/sabre_PositionStatus&$expand=sabre_placement_Posistion&$filter=statuscode/Value eq 1 and ( sabre_FirstTimeExport eq null or  sabre_FirstTimeExport ge datetime'"+earliestDate.toJSON()/*2017-01-09T05:00:00.000Z*/+"')", false);
	//req.open("GET", Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/sabre_placementSet?$select=sabre_FirstTimeCandidate,sabre_FirstTimeExport,sabre_placementId,statecode,statuscode&$expand=sabre_placement_Posistion&$filter=sabre_placement_Posistion/sabre_PositionStatus/Value ne 837770004 and statuscode/Value eq 1 and ( sabre_FirstTimeExport eq null or  sabre_FirstTimeExport ge datetime'"+earliestDate.toJSON()/*2017-01-09T05:00:00.000Z*/+"')", false);	
	req.setRequestHeader("Accept", "application/json");
	req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	req.onreadystatechange = function() {
		if (this.readyState === 4) {
			this.onreadystatechange = null;
			if (this.status === 200) {
				var returned = JSON.parse(this.responseText).d;
				var results = returned.results;
				executeOnResults(results);
				for (var i = 0; i < results.length; i++) {
					var sabre_FirstTimeCandidate = results[i].sabre_FirstTimeCandidate;
					var sabre_FirstTimeExport = results[i].sabre_FirstTimeExport;
					var statecode = results[i].statecode;
					var statuscode = results[i].statuscode;
				}
			} else {
				Xrm.Utility.alertDialog(this.statusText);
			}
		}
	};
	req.send();
	/*SDK.JQuery.retrieveMultipleRecords(
		"sabre_placement",
		"$filter=statuscode/Value eq 1 and ( sabre_FirstTimeExport eq null or  sabre_FirstTimeExport ge datetime'"+earliestDate+"')", 
		returnFiltered,
		errorHandler,
		function(){
			//nothing
			console.log("final countdown");
		}
	);*/
}

function executeOnResults(results){
	var earliestDate = new Date();
	earliestDate.setDate(earliestDate.getDate());
	var objUpdateCounter = 0;
	if(results != null && results.length > 0){
		for(var i  = 0; i<results.length; i++){
			if(results[i].sabre_placement_Posistion != null && results[i].sabre_placement_Posistion.sabre_PositionStatus.Value != null && results[i].sabre_placement_Posistion.sabre_PositionStatus.Value != 837770004 ){
				objUpdateCounter = objUpdateCounter + 1;
				var entity = {};
				entity.sabre_FirstTimeCandidate = false;
				entity.sabre_FirstTimeExport = earliestDate;//new Date("01/09/2017").toLocaleString();

				var req = new XMLHttpRequest();
				req.open("POST", Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/sabre_placementSet(guid'"+results[i].sabre_placementId+"')", false);
				req.setRequestHeader("Accept", "application/json");
				req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				req.setRequestHeader("X-HTTP-Method", "MERGE");
				req.onreadystatechange = function() {
					if (this.readyState === 4) {
						this.onreadystatechange = null;
						if (this.status === 204 || this.status === 1223) {
							//Success - No Return Data - Do Something
						} else {
							Xrm.Utility.alertDialog(this.statusText);
						}
					}
				};
				req.send(JSON.stringify(entity));
			}
		}
	}

	window.parent.alert(objUpdateCounter+" Objects Updated");
}

function errorHandler(error){
	console.log(error);
}

function onChangeJobOrder(){
	//Need to update all payment values based on Job Order.
	if(Xrm.Page.getControl("sabre_posistion") != null && Xrm.Page.getAttribute("sabre_posistion").getValue() != null){
	    var tempPosition = Xrm.Page.getAttribute("sabre_posistion").getValue();
		SDK.JQuery.retrieveRecord(tempPosition[0].id,
			"sabre_position",
			null, "",
			updateFromPosition, errorCallback);
		
	}

}

function updateFromPosition(result){
	if(Xrm.Page.getControl("sabre_feevalue") != null && (Xrm.Page.getAttribute("sabre_feevalue").getValue() == null || Xrm.Page.getAttribute("sabre_feevalue").getValue() == 0)){
		if(Xrm.Page.getControl("sabre_feetype") != null ){
			Xrm.Page.getAttribute("sabre_feetype").setValue(result.sabre_MarkupType);
		}
		Xrm.Page.getAttribute("sabre_feevalue").setValue(result.sabre_MarkupValue);
	}
	if(Xrm.Page.getControl("sabre_vacationvalue") != null && (Xrm.Page.getAttribute("sabre_vacationvalue").getValue() == null || Xrm.Page.getAttribute("sabre_vacationvalue").getValue() == 0)){
		if(Xrm.Page.getControl("sabre_vacationpay") != null){
			Xrm.Page.getAttribute("sabre_vacationpay").setValue(result.sabre_VacationPay);
		}
		Xrm.Page.getAttribute("sabre_vacationvalue").setValue(result.sabre_VacationPayment.Value);
	}
	updateIfPresentNullOrBlank("sabre_regularwages", result.sabre_Pay_Rate.Value);
	updateIfPresentNullOrBlank("sabre_regularchargerate", result.sabre_BillRate.Value);
	updateIfPresentNullOrBlank("sabre_overtimewages", result.sabre_MinCost.Value);
	updateIfPresentNullOrBlank("sabre_overtimechargerate", result.sabre_MaxCost.Value);
	updateIfPresentNullOrBlank("sabre_overtime2wages", result.sabre_PremiumPayRate.Value);
	updateIfPresentNullOrBlank("sabre_overtime2chargerate", result.sabre_PremiumBillRate.Value);
	updateIfPresentNullOrBlank("sabre_statutorywages", result.sabre_StatutoryPayRate.Value);
	updateIfPresentNullOrBlank("sabre_statutorychargerate", result.sabre_StatutoryBillRate.Value);
	if(typeof(hideByVacationPay) === typeof(Function)){
	  hideByVacationPay();
	}
				//Updating Job Order Name
	if(Xrm.Page.getControl("sabre_positionname")!= null){
		Xrm.Page.getAttribute("sabre_positionname").setValue(result.sabre_PositionTitle);
	}
}

function updateIfPresentNullOrBlank(updatee, updater){
	if(Xrm.Page.getControl(updatee) != null && (Xrm.Page.getAttribute(updatee).getValue() == null || Xrm.Page.getAttribute(updatee).getValue() == 0)){
	    Xrm.Page.getAttribute(updatee).setValue(updater);
	}
}

function quickCreateChangeDate(){
	//Xrm.Page.ui.clearFormNotification('5');
	overlap = false;
	if(Xrm.Page.getControl("sabre_candidate") != null && Xrm.Page.getAttribute("sabre_candidate").getValue() != null){
		if(Xrm.Page.getControl("sabre_posistion") != null && Xrm.Page.getAttribute("sabre_posistion").getValue() != null){
			if(Xrm.Page.getControl("sabre_actualstartdate") != null && Xrm.Page.getAttribute("sabre_actualstartdate").getValue() != null){
				Xrm.Page.getControl("sabre_actualstartdate").clearNotification("5");
				if(Xrm.Page.getControl("sabre_enddate") != null && Xrm.Page.getAttribute("sabre_enddate").getValue() != null){
					Xrm.Page.getControl("sabre_enddate").clearNotification("6");
					var position = Xrm.Page.getAttribute("sabre_posistion").getValue();
					var positionId = position[0].id;
					positionId = positionId.replace("{","").replace("}","");
					var candidate = Xrm.Page.getAttribute("sabre_candidate").getValue();
					var candidateId = candidate[0].id;
					candidateId = candidateId.replace("{","").replace("}","");
					placementId = Xrm.Page.data.entity.getId();
					placementId = placementId.replace("{", "").replace("}", "");
					var searchString = "?$select=sabre_ActualStartDate,sabre_EndDate&$filter=sabre_Posistion/Id eq (guid'"+ positionId +"') and sabre_Candidate/Id eq (guid'"+ candidateId +"')";
					
					if(placementId.length > 0){
						searchString = "?$select=sabre_ActualStartDate,sabre_EndDate&$filter=sabre_Posistion/Id eq (guid'"+ positionId +"') and sabre_Candidate/Id eq (guid'"+ candidateId +"') and sabre_placementId ne (guid'"+ placementId +"')";
					}
					SDK.JQuery.retrieveMultipleRecords("sabre_placement", searchString, function(results) {
						var startDate = Xrm.Page.getAttribute("sabre_actualstartdate").getValue();
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
							firstError.notificationLefl = "ERROR";
							firstError.uniqueId = "5";
							Xrm.Page.getControl("sabre_actualstartdate").addNotification(firstError);
							var secondError = new Object();
							secondError.messages = new Array();
							secondError.messages[0] = "Overlapping Placement periods detected.";
							secondError.notificationLefl = "ERROR";
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

function setActiveJobOrderField(){
	if(Xrm.Page.getAttribute("sabre_posistion") != null && Xrm.Page.getAttribute("sabre_posistion").getValue() != null){
		var Position = Xrm.Page.getAttribute("sabre_posistion").getValue();
		SDK.JQuery.retrieveRecord(Position[0].id, "sabre_position", "sabre_positionId,sabre_bpfstatus", null, function(result) {
			var positionId = result.sabre_PositionId;
			var sabre_bpfstatus = result.sabre_bpfstatus;
			if (sabre_bpfstatus != null && sabre_bpfstatus.Value != null ){
				if(sabre_bpfstatus.Value == 837770001){ //01 = Active, 00 =  Inactive
					if(Xrm.Page.getAttribute("sabre_joborderactive") != null){
						Xrm.Page.getAttribute("sabre_joborderactive").setValue(837770000);
					}
				}
				else if(sabre_bpfstatus.Value == 837770000){
					if(Xrm.Page.getAttribute("sabre_joborderactive") != null){
						Xrm.Page.getAttribute("sabre_joborderactive").setValue(null);
					}
				}
			}
		}, function(error) {
			Xrm.Utility.alertDialog(error.message);
		});
	}
}

function setActiveCandidateField(){
	if(Xrm.Page.getAttribute("sabre_candidate") != null && Xrm.Page.getAttribute("sabre_candidate").getValue() != null){
		var Candidate = Xrm.Page.getAttribute("sabre_candidate").getValue();
		SDK.JQuery.retrieveRecord(Candidate[0].id, "sabre_candidate", "sabre_CandidateApplicationStage,sabre_candidateId", null, function(result) {
			var sabre_CandidateApplicationStage = result.sabre_CandidateApplicationStage;
			var sabre_candidateId = result.sabre_candidateId;
			if (sabre_CandidateApplicationStage != null && sabre_CandidateApplicationStage.Value != null ){
				if(sabre_CandidateApplicationStage.Value == 837770001){ //01 = Active, 00 =  Inactive
					if(Xrm.Page.getAttribute("sabre_candidateactive") != null){
						Xrm.Page.getAttribute("sabre_candidateactive").setValue(837770000);
					}
				}
				else if(sabre_CandidateApplicationStage.Value == 837770000){
					if(Xrm.Page.getAttribute("sabre_candidateactive") != null){
						Xrm.Page.getAttribute("sabre_candidateactive").setValue(null);
					}
				}
			}
		}, function(error) {
			Xrm.Utility.alertDialog(error.message);
		});
	}
}