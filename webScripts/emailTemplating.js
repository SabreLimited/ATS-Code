//Determines what functions are available to use based on regarding target of email.
function onRegardingChange(){
	var regardingObject = new Object();
	if(Xrm.Page.getControl("regardingobjectid") != null && Xrm.Page.getAttribute("regardingobjectid") != null){
		regardingObject = Xrm.Page.getAttribute("regardingobjectid").getValue();
		
		if(regardingObject != null && regardingObject.length != null && regardingObject.length > 0) {
			//If this correctly returns a usable value for entity type we can set various flags for the ribbon workbench
			if(regardingObject[0].entityType == "sabre_position"){
				//setpositionFlag
				if(Xrm.Page.getControl("sabre_positionflag") != null){
					Xrm.Page.getAttribute("sabre_positionflag").setValue(1);
				}
				if(Xrm.Page.getControl("sabre_candidateflag") != null){
					Xrm.Page.getAttribute("sabre_candidateflag").setValue(0);
				}
			}
			else if (regardingObject[0].entityType == "sabre_candidate"){
				//setCandidateFlate
				if(Xrm.Page.getControl("sabre_candidateflag") != null){
					Xrm.Page.getAttribute("sabre_candidateflag").setValue(1);
				}
				if(Xrm.Page.getControl("sabre_positionflag") != null){
					Xrm.Page.getAttribute("sabre_positionflag").setValue(0);
				}
			}
			else{
				if(Xrm.Page.getControl("sabre_candidateflag") != null){
					Xrm.Page.getAttribute("sabre_candidateflag").setValue(0);
				}
				if(Xrm.Page.getControl("sabre_positionflag") != null){
					Xrm.Page.getAttribute("sabre_positionflag").setValue(0);
				}
			}
		}
	}
	
}

function applyPositionTemplate(){
	//retrieve record: Regarding, use data to fill in.
	//Key fields: sabre_PayRate, sabre_account, sabre_SpecialRequirementsandConditions, sabre_PositionStatus, sabre_JobDescription
	//sabre_DutiesandResponsibilities, sabre_name, sabre_WageType, sabre_StartDate, sabre_EndDate
	if(Xrm.Page.getControl("sabre_positionflag") != null && Xrm.Page.getAttribute("sabre_positionflag").getValue() == 1){

		if(Xrm.Page.getControl("regardingobjectid") != null && Xrm.Page.getControl("regardingobjectid") != undefined){
			var positionObject = Xrm.Page.getAttribute("regardingobjectid").getValue();
			var positionId = positionObject[0].id;
			positionId = positionId.slice(1, -1);
			SDK.JQuery.retrieveRecord(
			    positionId,
				"sabre_position",
				null,
				null,
				positionFound,
				errorHandler
			);
		}
		
	}
}

function positionFound(position){
	var subjectString = "";
	var descriptionString = "";
	Xrm.Page.getControl("subject");
	Xrm.Page.getControl("description");
	var tempObj = new Object();
	if(position.sabre_name != null){
		descriptionString = descriptionString + "Job Title: "+position.sabre_name + "\r\n";
		subjectString = subjectString + "Information on " + position.sabre_name;
		Xrm.Page.getAttribute("description").setValue(descriptionString);
	}
	if(position.sabre_PositionStatus != null){
		tempObj = position.sabre_PositionStatus;
		if(tempObj.Value = 837770001){
		    descriptionString = descriptionString + "Job Status: Open\r\n";	
		}
		if(tempObj.Value = 837770000){
		    descriptionString = descriptionString + "Job Status: Draft\r\n";	
		}
		if(tempObj.Value = 837770002){
		    descriptionString = descriptionString + "Job Status: On-Hold\r\n";	
		}
		if(tempObj.Value = 837770003){
		    descriptionString = descriptionString + "Job Status: Filled\r\n";	
		}
		if(tempObj.Value = 837770004){
		    descriptionString = descriptionString + "Job Status: Closed\r\n";	
		}		
		Xrm.Page.getAttribute("description").setValue(descriptionString);
	}
	if(position.sabre_JobDescription != null){
		descriptionString = descriptionString + "Job Description: "+position.sabre_JobDescription + "\r\n";
	}
	if(position.sabre_account != null){
		tempObj = position.sabre_account;
		descriptionString = descriptionString + "Employer: "+tempObj.Name + "\r\n";
	}
	if(position.sabre_Pay_Rate != null){
		descriptionString = descriptionString + "Pay Rate: "+position.sabre_Pay_Rate + "\r\n";
	}
	if(position.sabre_WageType != null){
		tempObj = position.sabre_WageType;
		if(tempObj.Value != null){
		    descriptionString = descriptionString + "Wage Type: "+tempObj.Value + "\r\n";
		}
	}
	if(position.sabre_StartDate != null){
		descriptionString = descriptionString + "Start Date: "+position.sabre_StartDate + "\r\n";
	}
	if(position.sabre_EndDate != null){
		descriptionString = descriptionString + "End Date: "+position.sabre_EndDate + "\r\n";
	}
	if(position.sabre_DutiesandResponsibilities != null){
		descriptionString = descriptionString + "Duties and Responsibilities: "+position.sabre_DutiesandResponsibilities + "\r\n";
	}
	if(position.sabre_SpecialRequirementsandConditions != null){
		descriptionString = descriptionString + "Special Requirements and Conditions: "+position.sabre_SpecialRequirementsandConditions + "\r\n";
	}
	
	Xrm.Page.getAttribute("subject").setValue(subjectString);
	Xrm.Page.getAttribute("description").setValue(descriptionString);
}

function applyCandidateTemplate(){
	//retrieve record: Regarding, use data to fill in.
	//Key Fields - sabre_name, sabre_DateofBirth, sabre_SIN, sabre_WorkingStatus, sabre_EmailAddress,
	//sabre_CellPhone, sabre_HomePhone, sabre_AddressCity, sabre_AddressLine1, sabre_Province, sabre_USState
	//sabre_SpecialRequirements, sabre_Description, sabre_Type
	if(Xrm.Page.getControl("sabre_candidateflag") != null && Xrm.Page.getAttribute("sabre_candidateflag").getValue() == 1){

		if(Xrm.Page.getControl("regardingobjectid") != null && Xrm.Page.getControl("regardingobjectid") != undefined){
			var candidateObject = Xrm.Page.getAttribute("regardingobjectid").getValue();
			var candidateId = candidateObject[0].id;
			candidateId = candidateId.slice(1, -1);
			SDK.JQuery.retrieveRecord(
			    candidateId,
				"sabre_candidate",
				null,
				null,
				candidateFound,
				errorHandler
			);
		}
		
	}
}

function candidateFound(candidate){
	var subjectString = "";
	var descriptionString = "";
	Xrm.Page.getControl("subject");
	Xrm.Page.getControl("description");
	var tempObj = new Object();
	console.log(candidate);
	
	if(candidate.sabre_name != null){
		descriptionString = descriptionString + "Candidate Name: "+candidate.sabre_name + "\r\n";
		subjectString = subjectString + "Information on " + candidate.sabre_name;
	}
	if(candidate.sabre_WorkingStatus != null){//optionset
	    tempObj = candidate.sabre_WorkingStatus;
	    if(tempObj.Value != null){
			if(tempObj.Value == 837770000){
				descriptionString = descriptionString + "Working Status: Working\r\n";
			}
			if(tempObj.Value == 837770001){
				descriptionString = descriptionString + "Working Status: Unemployed\r\n";
			}
			if(tempObj.Value == 837770002){
				descriptionString = descriptionString + "Working Status: Open for Opportunities\r\n";
			}
			if(tempObj.Value == 837770003){
				descriptionString = descriptionString + "Working Status: Self-Employed\r\n";
			}			
		}
	}
	if(candidate.sabre_DateofBirth != null){
		descriptionString = descriptionString + "Date of Birth: "+candidate.sabre_DateofBirth + "\r\n";
	}
	if(candidate.sabre_AddressLine1 != null){
		descriptionString = descriptionString + "Address: "+candidate.sabre_AddressLine1 + "\r\n";
	}
	if(candidate.sabre_AddressCity != null){
		descriptionString = descriptionString + "         "+candidate.sabre_AddressCity + "\r\n";
	}
	/*if(candidate.sabre_Province != null){
		tempObj = candidate.sabre_Province;
		if(tempObj.Value != null){
			descriptionString = descriptionString + "         "+candidate.sabre_Province + "\r\n"; //optionset
		}
	}
	if(candidate.sabre_USState != null){
		tempObj = candidate.sabre_USState;
		if(tempObj.Value != null){
		    descriptionString = descriptionString + "         "+candidate.sabre_USState + "\r\n"; //optionset
		}
	}*/
	if(candidate.sabre_EmailAddress != null){
		descriptionString = descriptionString + "\r\nEmail Address: "+candidate.sabre_EmailAddress + "\r\n";
	}
	if(candidate.sabre_CellPhone != null){
		descriptionString = descriptionString + "Cell Phone Number: "+candidate.sabre_CellPhone + "\r\n";
	}
	if(candidate.sabre_SIN != null){
		descriptionString = descriptionString + "SIN #: "+candidate.sabre_SIN + "\r\n";
	}
//	if(candidate.sabre_Description != null){
//		descriptionString = descriptionString + "\r\nDescription: "+candidate.sabre_Description + "\r\n";
//	}
	if(candidate.sabre_SpecialRequirements != null){
		descriptionString = descriptionString + "Special Requirements: "+candidate.sabre_SpecialRequirements + "\r\n";
	}
	Xrm.Page.getAttribute("subject").setValue(subjectString);
	Xrm.Page.getAttribute("description").setValue(descriptionString);
}

function errorHandler(error){
	alert(error.message);
}

function refreshRibbonOnChange(){
    Xrm.Page.ui.refreshRibbon();
}