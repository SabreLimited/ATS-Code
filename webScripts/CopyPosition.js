function copyPosition(){
	window.advanceDate = 0;
	window.placementArray = new Array();
	// acquire essential information before starting

	
	//Create New Position with duplicate information
	var object = new Object();
	var lookupObject = new Object();
	var datObj = new Object();
	var varId;
	var varLabel;
	
	if(window.parent.Xrm.Page.getControl("sabre_startdate")!= null){
		var lookupObject = window.parent.Xrm.Page.getAttribute("sabre_startdate").getValue();
		if(window.advanceDate == 1 && lookupObject != null){
				lookupObject.setDate(lookupObject.getDate()+7);
		}	
		object.sabre_StartDate = lookupObject;
	}
	if(window.parent.Xrm.Page.getControl("sabre_enddate")!= null){
		var lookupObject = window.parent.Xrm.Page.getAttribute("sabre_enddate").getValue();
		if(window.advanceDate == 1 && lookupObject != null){
				lookupObject.setDate(lookupObject.getDate()+7);
		}	
		object.sabre_EndDate = lookupObject;
	}
	if(window.parent.Xrm.Page.getControl("sabre_wagetype")!= null){
		lookupObject = window.parent.Xrm.Page.getAttribute("sabre_wagetype").getValue();
		object.sabre_WageType = {Value: lookupObject};  
	}
//	if(window.parent.Xrm.Page.getControl("sabre_name")!= null){ //SAB JAN 2 CHANGES
//		object.sabre_name = window.parent.Xrm.Page.getAttribute("sabre_name").getValue();										
//	}
	if(window.parent.Xrm.Page.getControl("sabre_address1")!= null){
		object.sabre_address1 = window.parent.Xrm.Page.getAttribute("sabre_address1").getValue();  
	}
	if(window.parent.Xrm.Page.getControl("sabre_daysperweek")!= null){
		object.sabre_DaysperWeek = window.parent.Xrm.Page.getAttribute("sabre_daysperweek").getValue();  
	}
	if(window.parent.Xrm.Page.getControl("sabre_departmentname")!= null){
		object.sabre_DepartmentName = window.parent.Xrm.Page.getAttribute("sabre_departmentname").getValue();  
	}
	//if(window.parent.Xrm.Page.getControl("sabre_from")!= null){
	//	lookupObject = window.parent.Xrm.Page.getAttribute("sabre_from").getValue().toString();
	//	object.sabre_From = { Value: lookupObject};  //nolonger using sabre_from
	//}
	if(window.parent.Xrm.Page.getControl("sabre_hoursperweek")!= null){
		object.sabre_HoursperWeek = window.parent.Xrm.Page.getAttribute("sabre_hoursperweek").getValue();  
	}
	if(window.parent.Xrm.Page.getControl("sabre_dutiesandresponsibilities")!= null){
		object.sabre_DutiesandResponsibilities = window.parent.Xrm.Page.getAttribute("sabre_dutiesandresponsibilities").getValue();
	}
	if(window.parent.Xrm.Page.getControl("sabre_jobdescription")!= null){
		object.sabre_JobDescription = window.parent.Xrm.Page.getAttribute("sabre_jobdescription").getValue();  
	}
	if(window.parent.Xrm.Page.getControl("sabre_positiontitle")!= null){
		object.sabre_JobDescription = window.parent.Xrm.Page.getAttribute("sabre_positiontitle").getValue();  
	}
	if(window.parent.Xrm.Page.getControl("sabre_maxcost")!= null){
		lookupObject = window.parent.Xrm.Page.getAttribute("sabre_maxcost").getValue().toString();
		object.sabre_MaxCost = { Value: lookupObject};  
	}
	if(window.parent.Xrm.Page.getControl("sabre_mincost")!= null){
		lookupObject = window.parent.Xrm.Page.getAttribute("sabre_mincost").getValue().toString();
		object.sabre_MinCost = { Value: lookupObject};  
	}
	if(window.parent.Xrm.Page.getControl("sabre_noofopenings")!= null){
		object.sabre_NoofOpenings = window.parent.Xrm.Page.getAttribute("sabre_noofopenings").getValue();  
	}
	if(window.parent.Xrm.Page.getControl("sabre_oldnoofopenings")!= null){
		object.sabre_OldNoofOpenings = window.parent.Xrm.Page.getAttribute("sabre_oldnoofopenings").getValue();  
	}
	if(window.parent.Xrm.Page.getControl("sabre_payrolltitle")!= null){
		object.sabre_PayrollTitle = window.parent.Xrm.Page.getAttribute("sabre_payrolltitle").getValue();  
	}
	if(window.parent.Xrm.Page.getControl("sabre_positionid")!= null){
		object.sabre_PositionId = window.parent.Xrm.Page.getAttribute("sabre_positionid").getValue();  
	}
	//if(window.parent.Xrm.Page.getControl("sabre_positionno")!= null){
	//	object.sabre_PositionNo = window.parent.Xrm.Page.getAttribute("sabre_positionno").getValue();  
	//} //removing field
	//if(window.parent.Xrm.Page.getControl("sabre_positionstatus")!= null){
		//lookupObject = window.parent.Xrm.Page.getAttribute("sabre_positionstatus").getValue();
		object.sabre_PositionStatus = {Value: 837770001};  
	//}
	
	if(window.parent.Xrm.Page.getControl("sabre_specialrequirementsandconditions")!= null){
		object.sabre_SpecialRequirementsandConditions = window.parent.Xrm.Page.getAttribute("sabre_specialrequirementsandconditions").getValue();  
	}
	if(window.parent.Xrm.Page.getControl("sabre_supervisorname")!= null){
		lookupObject = window.parent.Xrm.Page.data.entity.attributes.get("sabre_supervisorname");
		if (lookupObject.getValue() != null){
			varId = lookupObject.getValue()[0].id;
			varLabel = lookupObject.getValue()[0].name;
			object.sabre_SupervisorName = { Id: varId, Name: varLabel};
		}
	}
	if(window.parent.Xrm.Page.getControl("sabre_departmenthead")!= null){
		lookupObject = window.parent.Xrm.Page.data.entity.attributes.get("sabre_departmenthead");
		if (lookupObject.getValue() != null){
			varId = lookupObject.getValue()[0].id;
			varLabel = lookupObject.getValue()[0].name;
			object.sabre_DepartmentHead = { Id: varId, Name: varLabel};
		}
	}
	if(window.parent.Xrm.Page.getControl("sabre_maincontact")!= null){
		lookupObject = window.parent.Xrm.Page.data.entity.attributes.get("sabre_maincontact");
		if (lookupObject.getValue() != null){
			varId = lookupObject.getValue()[0].id;
			varLabel = lookupObject.getValue()[0].name;
			object.sabre_MainContact = { Id: varId, Name: varLabel};
		}
	}
	if(window.parent.Xrm.Page.getControl("sabre_account")!= null){
		lookupObject = window.parent.Xrm.Page.data.entity.attributes.get("sabre_account");
		if (lookupObject.getValue() !=null){
			varId = lookupObject.getValue()[0].id;
			varLabel = lookupObject.getValue()[0].name;
			object.sabre_Account = { Id: varId, Name: varLabel};
		}
	}
	//if(window.parent.Xrm.Page.getControl("sabre_to")!= null){
	//	lookupObject = window.parent.Xrm.Page.getAttribute("sabre_to").getValue().toString();
	//	object.sabre_To = { Value: lookupObject};
	//}
	if(window.parent.Xrm.Page.getControl("sabre_type")!= null){
		lookupObject = window.parent.Xrm.Page.getAttribute("sabre_type").getValue();
		object.sabre_Type = {Value: lookupObject};  
	}
	if(window.parent.Xrm.Page.getControl("sabre_workingtitle")!= null){
		object.sabre_WorkingTitle = window.parent.Xrm.Page.getAttribute("sabre_workingtitle").getValue();
	}
	if(window.parent.Xrm.Page.getControl("sabre_wsibcode")!= null){
		object.sabre_WSIBCode = window.parent.Xrm.Page.getAttribute("sabre_wsibcode").getValue();
	}
	if(window.parent.Xrm.Page.getControl("sabre_pay_rate")!= null){
		lookupObject = window.parent.Xrm.Page.getAttribute("sabre_pay_rate").getValue().toString();
		object.sabre_Pay_Rate = { Value: lookupObject};
	}

	SDK.JQuery.createRecord(
		object,
		"sabre_position",
		function (val) {
		//function runs on success of createRecord, enter logic here if needed.
		Xrm.Utility.openEntityForm("sabre_position", val.sabre_positionId);
			
		},
		errorHandler
	);
	
	//Prompt to transfer candidates to newly created openings.

	//if(confirm("Transfer candidates from old to new Position?")){
	//	transferCandidates = 1;
	//}
	
	//Create Duplicate Openings
	//Get Current Openings for Position
	//Get Current Placements for Opeings of Current Position

		  //reassign candidates, data retrieved through Candidate field in Placement related to old opening/old position

	
	

	//Lastly apply final changes to current Position
	//if(window.parent.Xrm.Page.getControl("sabre_positionstatus") != null && closeOld == 1){
	//	window.parent.Xrm.Page.getAttribute("sabre_positionstatus").setValue(837770004);
	//}
}

//add all openings(Placement info) associated with old position to global array
function resultsHandler(results){
//alert("success1");
	var i = 0;
	while(results[i] != null){

		if(results[i].sabre_Placement != null){
			window.placementArray[i] = results[i].sabre_Placement;
		}

		i = i + 1;
	}
//Results handled
}

//for each placement id & placement name, associate it with a different new position's opening.
function openingResultsHandler(results){
//alert("success2");
var i = 0;
var object = new Object();
while(results[i] != null && window.placementArray[i] != null){
	//update
	object.sabre_Placement = window.placementArray[i];
	SDK.JQuery.updateRecord(
		results[i].sabre_openingId,
		object,
		"sabre_opening",
		function(){
			//alert("success!!!");
		},
		errorHandler
	);
i=i+1;
}
//different results handled differently
}

function errorHandler(error){
	alert(error.message);
}