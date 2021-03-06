function testPluginPass(annotationId){
	//var options  = "?$filter=sabre_data eq '" + annotationId +"'"; 41f57f87-a764-e611-80d1-000d3a013699
	//console.log(annotationId);
	var object = new Object();
	object.sabre_data = annotationId;
	SDK.JQuery.updateRecord(
	   "41f57f87-a764-e611-80d1-000d3a013699",    //"f3b52c75-fadb-e611-80d2-000d3a013699",
	  object,
	  "sabre_dummy",
	  function(){
		  //
	  },
	  function(error){console.log("error is in tpp"); errorFunction(error);}
	  );
	
	var options = "$filter=sabre_data eq '" +annotationId +"'";
	SDK.JQuery.retrieveMultipleRecords("sabre_dummy", options, retrieveRCallback, function(error){console.log("error is in tpp, the second");errorFunction(error);}, recordsReturned);

}


//////////////////DISABLED SKILLS


async function retrieveRCallback(retrievedRecords){
	    if(retrievedRecords.length < 0){
		  await sleep(500);	
		}
	    //console.log(retrievedRecords);
		if (retrievedRecords.length > 0 && retrievedRecords[0].sabre_data != null && window.parent.Xrm.Page.getControl("sabre_resumecontents") != null){
			retrievedRecords[0].sabre_data = retrievedRecords[0].sabre_data.replace(/(?:\r\n|\r|\n)/g, '<br />');
			window.parent.Xrm.Page.getAttribute("sabre_resumecontents").setValue(retrievedRecords[0].sabre_data);

			//attempting to improve readability in the HTML version.
			//window.parent.Xrm.Page.getAttribute("sabre_resumecontents").setValue(retrievedRecords[0].sabre_data);
		}
		if (retrievedRecords.length > 0 && retrievedRecords[0].sabre_data2 != null){
			var x2js = new X2JS();
			var myDoc = x2js.xml_str2json(retrievedRecords[0].sabre_data2);//myDoc.Resume;
			var myClass = myDoc.Resume;
			//var myClass = eval('(' +retrievedRecords[0].sabre_data2+ ')');
			console.log(myClass);
			//PERFORM ACTIONS ON myClass variable to add Name, Address, Phone, Email, and skills. 
			//MISSING EMAIL AND SKILLS
			if (myClass.StructuredXMLResume != null && myClass.StructuredXMLResume.ContactInfo != null && myClass.StructuredXMLResume.ContactInfo.PersonName != null){
			  setCandidateName(myClass.StructuredXMLResume.ContactInfo.PersonName);
			}
			console.log("issue after person name");
			if(myClass.StructuredXMLResume != null && myClass.StructuredXMLResume.ContactInfo != null){
			  setCandidateAddress(myClass.StructuredXMLResume.ContactInfo);
			}
			if(myClass.StructuredXMLResume != null && myClass.StructuredXMLResume.Qualifications != null){
				setCandidateSkills(myClass.StructuredXMLResume.Qualifications);
			}
			if(myClass.StructuredXMLResume != null && myClass.StructuredXMLResume.EmploymentHistory != null){
				setCandidateEmploymentHistory(myClass.StructuredXMLResume.EmploymentHistory);
			}
			if(myClass.StructuredXMLResume != null && myClass.StructuredXMLResume.EducationHistory != null){
				setCandidateEducationHistory(myClass.StructuredXMLResume.EducationHistory);
			}
			//console.log(retrievedRecords[0].sabre_data2);
		}
		else{
			console.log(retrievedRecords);
			window.parent.alert("Error! Please try uploading the file again in a few seconds.");
			console.log("Error! Try uploading the file again!");
		}
		//window.parent.Xrm.Page.data.save();
		//window.parent.Xrm.Page.data.refresh();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//function called if error found retrieveMultipleRecords Function call
function errorFunction(error){
	alert("error!");
	console.log(error);
}

//function called upon end of function
function recordsReturned(){

}

function setCandidateName(NameData){
	if (NameData.FamilyName != null && window.parent.Xrm.Page.getControl("sabre_lastname")!= null){
		//Set Last Name to NameData.FamilyName;
		window.parent.Xrm.Page.getAttribute("sabre_lastname").setValue(NameData.FamilyName);
		
	}
	if (NameData.GivenName != null && window.parent.Xrm.Page.getControl("sabre_firstsname")!= null){
		//Set Given Name to NameData.GivenName;
		window.parent.Xrm.Page.getAttribute("sabre_firstsname").setValue(NameData.GivenName);
	}
	window.parent.Xrm.Page.data.save(true);
	
}

function setCandidateAddress(AddressData){
	if(AddressData.ContactMethod.length > 0){
		console.log(AddressData.ContactMethod);
		for(var i = 0; i < AddressData.ContactMethod.length; i++){
			if(AddressData.ContactMethod[i].PostalAddress != null){
				if(AddressData.ContactMethod[i].PostalAddress.CountryCode != null && window.parent.Xrm.Page.getControl("sabre_country") != null){
					if(AddressData.ContactMethod[i].PostalAddress.CountryCode == "US"){
					window.parent.Xrm.Page.getAttribute("sabre_country").setValue(837770001); //US
					}
					else{
					window.parent.Xrm.Page.getAttribute("sabre_country").setValue(837770000); //CA						
					}					
				}
				if(AddressData.ContactMethod[i].PostalAddress.Municipality != null && window.parent.Xrm.Page.getControl("sabre_addresscity") != null){
					window.parent.Xrm.Page.getAttribute("sabre_addresscity").setValue(AddressData.ContactMethod[i].PostalAddress.Municipality);
				}
				if(AddressData.ContactMethod[i].PostalAddress.DeliveryAddress!= null && AddressData.ContactMethod[i].PostalAddress.DeliveryAddress.AddressLine != null && window.parent.Xrm.Page.getControl("sabre_addressline1") != null){
					window.parent.Xrm.Page.getAttribute("sabre_addressline1").setValue(AddressData.ContactMethod[i].PostalAddress.DeliveryAddress.AddressLine);
				}
				if(AddressData.ContactMethod[i].PostalAddress.PostalCode != null && window.parent.Xrm.Page.getControl("sabre_addresspostalcode") != null){
                    window.parent.Xrm.Page.getAttribute("sabre_addresspostalcode").setValue(AddressData.ContactMethod[i].PostalAddress.PostalCode);
				}
				if(AddressData.ContactMethod[i].PostalAddress.Region != null && window.parent.Xrm.Page.getControl("sabre_usstate") != null && window.parent.Xrm.Page.getControl("sabre_usstate")){
					
					var upperRegion = AddressData.ContactMethod[i].PostalAddress.Region.toUpperCase();
					
					if(upperRegion == "ON" || upperRegion == "ONTARIO"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770050);
					}
					else if(upperRegion == "AB" || upperRegion == "ALBERTA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770057);						
					}
					else if(upperRegion == "BC" || upperRegion == "BRITISH COLUMBIA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770056);
					}
					else if(upperRegion == "MB" || upperRegion == "MANITOBA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770058);
					}
					else if(upperRegion == "NL" || upperRegion == "NEWFOUNDLAND AND LABRADOR"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770055);
					}
					else if(upperRegion == "NS" || upperRegion == "NOVA SCOTIA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770053);
					}
					else if(upperRegion == "NT" || upperRegion == "NORTHWEST TERRITORIES"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770060);
					}
					else if(upperRegion == "NU" || upperRegion == "NUNAVUT"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770062);
					}
					else if(upperRegion == "PE" || upperRegion == "PRINCE EDWARD ISLAND"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770054);
					}
					else if(upperRegion == "QC" || upperRegion == "QUEBEC"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770051);
					}
					else if(upperRegion == "SK" || upperRegion == "SASKATCHEWAN"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770059);
					}
					else if(upperRegion == "YT" || upperRegion == "YUKON"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770061);
					}
					else if(upperRegion == "ALABAMA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770000);
					}
					else if(upperRegion == "ALASKA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770001);
					}
					else if(upperRegion == "ARIZONA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770002);
					}
					else if(upperRegion == "ARKANSAS"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770003);
					}
					else if(upperRegion == "CALIFORNIA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770004);
					}
					else if(upperRegion == "COLORADO"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770005);
					}
					else if(upperRegion == "CONNECTICUT"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770006);
					}
					else if(upperRegion == "DELAWARE"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770007);
					}
					else if(upperRegion == "FLORIDA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770008);
					}
					else if(upperRegion == "GEORGIA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770009);
					}
					else if(upperRegion == "HAWAII"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770010);
					}
					else if(upperRegion == "IDAHO"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770011);
					}
					else if(upperRegion == "ILLINOIS"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770012);
					}
					else if(upperRegion == "INDIANA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770013);
					}
					else if(upperRegion == "IOWA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770014);
					}
					else if(upperRegion == "KANSAS"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770015);
					}
					else if(upperRegion == "KENTUCKY"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770016);
					}
					else if(upperRegion == "LOUISIANA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770017);
					}
					else if(upperRegion == "MAINE"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770018);
					}
					else if(upperRegion == "MARYLAND"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770019);
					}
					else if(upperRegion == "MASSACHUSETTS"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770020);
					}
					else if(upperRegion == "MICHIGAN"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770021);
					}
					else if(upperRegion == "MINNESOTA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770022);
					}
					else if(upperRegion == "MISSISSIPPI"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770023);
					}
					else if(upperRegion == "MISSOURI"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770024);
					}
					else if(upperRegion == "MONTANA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770025);
					}
					else if(upperRegion == "NEBRASKA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770026);
					}
					else if(upperRegion == "NEVADA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770027);
					}
					else if(upperRegion == "NEW HAMPSHIRE"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770028);
					}
					else if(upperRegion == "NEW JERSEY"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770029);
					}
					else if(upperRegion == "NEW MEXICO"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770030);
					}
					else if(upperRegion == "NEW YORK"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770031);
					}
					else if(upperRegion == "NORTH CAROLINA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770032);
					}
					else if(upperRegion == "NORTH DAKOTA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770033);
					}
					else if(upperRegion == "OHIO"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770034);
					}
					else if(upperRegion == "OKLAHOMA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770035);
					}
					else if(upperRegion == "OREGON"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770036);
					}
					else if(upperRegion == "PENNSYLVANIA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770037);
					}
					else if(upperRegion == "RHODE ISLAND"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770038);
					}
					else if(upperRegion == "SOUTH CAROLINA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770039);
					}
					else if(upperRegion == "SOUTH DAKOTA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770040);
					}
					else if(upperRegion == "TENNESSEE"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770041);
					}
					else if(upperRegion == "TEXAS"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770042);
					}
					else if(upperRegion == "UTAH"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770043);
					}
					else if(upperRegion == "VERMONT"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770044);
					}
					else if(upperRegion == "VIRGINIA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770045);
					}
					else if(upperRegion == "WASHINGTON"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770046);
					}
					else if(upperRegion == "WEST VIRGINIA"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770047);
					}
					else if(upperRegion == "WISCONSIN"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770048);
					}
					else if(upperRegion == "WYOMING"){
						window.parent.Xrm.Page.getAttribute("sabre_usstate").setValue(837770049);
					}
					
					
				}
				
			}
			if(AddressData.ContactMethod[i].InternetEmailAddress != null && window.parent.Xrm.Page.getControl("sabre_emailaddress") != null){
				window.parent.Xrm.Page.getAttribute("sabre_emailaddress").setValue(AddressData.ContactMethod[i].InternetEmailAddress);
			}
			if(AddressData.ContactMethod[i].Mobile != null && AddressData.ContactMethod[i].Mobile.FormattedNumber != null && window.parent.Xrm.Page.getControl("sabre_cellphone") != null){
				window.parent.Xrm.Page.getAttribute("sabre_cellphone").setValue(AddressData.ContactMethod[i].Mobile.FormattedNumber);
			}
			if(AddressData.ContactMethod[i].Telephone != null && AddressData.ContactMethod[i].Telephone.FormattedNumber != null && window.parent.Xrm.Page.getControl("sabre_homephone") != null){
				window.parent.Xrm.Page.getAttribute("sabre_homephone").setValue(AddressData.ContactMethod[i].Telephone.FormattedNumber);
			}
		}
		if(window.parent.Xrm.Page.getControl("sabre_homephone") != null && window.parent.Xrm.Page.getControl("sabre_cellphone") != null){
			if(window.parent.Xrm.Page.getAttribute("sabre_cellphone").getValue() == null && window.parent.Xrm.Page.getAttribute("sabre_homephone").getValue() != null){
				window.parent.Xrm.Page.getAttribute("sabre_cellphone").setValue(window.parent.Xrm.Page.getAttribute("sabre_homephone").getValue());
				window.parent.Xrm.Page.getAttribute("sabre_homephone").setValue(null);
			}
		}
	}
}

function setCandidateSkills(skillsData){
	if(skillsData.Competency.length > 0){
		qualifications = skillsData;
		var skillName = skillsData.Competency[0]._name;
		var skillArray = new Array();
		skillArray[skillArray.length] = skillName;
		var j;
		var isDuplicate;
		var skillText;
		var filterContents = "$filter=sabre_name eq '" +String(skillName)+ "'";
		for(var i = 1; i < skillsData.Competency.length; i++){
			skillName = skillsData.Competency[i]._name;
			isDuplicate = 0;
			for(j = 0; j<skillArray.length; j++){
				if(skillArray[j] == skillName){
					isDuplicate = 1;
				}
			}
			if(isDuplicate == 0){
				skillArray[skillArray.length] = skillName;
			}
			
        }
		if(skillArray.length > 0){
			skillText = skillArray[0];
			for(var i = 1; i<skillArray.length; i++){
				skillText = skillText + "\n" + skillArray[i];
			}
		}
		if(window.parent.Xrm.Page.getControl("sabre_skillstext") != null){
			window.parent.Xrm.Page.getAttribute("sabre_skillstext").setValue(skillText);
		}
        skillResult = new Array();		


		
	}
}

function setCandidateEmploymentHistory(employmentRecords){

	if(employmentRecords.EmployerOrg != null &&employmentRecords.EmployerOrg.length != null && employmentRecords.EmployerOrg.length > 0){
		for(var i = 0; i<employmentRecords.EmployerOrg.length; i++){
			createPosListing(employmentRecords.EmployerOrg[i]);
		}
	}
	else if(employmentRecords.EmployerOrg != null){
		createPosListing(employmentRecords.EmployerOrg);
	}
}

function createPosListing(empOrg){
	if(empOrg.PositionHistory != null && empOrg.PositionHistory.length != null && empOrg.PositionHistory.length >0){
		for(var i = 0; i< empOrg.PositionHistory.length; i++){
			var tempObj = new Object();
			if(empOrg.PositionHistory.Title != null){
				tempObj.sabre_name = empOrg.PositionHistory.Title;
			} else {
				tempObj.sabre_name = "Unknown";
			}
			if(empOrg.EmployerOrgName != null){
				tempObj.sabre_Company = empOrg.EmployerOrgName;
			}
			if(empOrg.PositionHistory.StartDate != null && empOrg.PositionHistory.StartDate.AnyDate != null){
				tempObj.sabre_StartDate = new Date(empOrg.PositionHistory.StartDate.AnyDate);
			}
			if(empOrg.PositionHistory.EndDate != null && empOrg.PositionHistory.EndDate.AnyDate != null){
				tempObj.sabre_EndDate = new Date(empOrg.PositionHistory.EndDate.AnyDate);
			}
			var tempCandidate = new Object();
			tempCandidate.Id = window.parent.Xrm.Page.data.entity.getId();
			tempCandidate.Id = tempCandidate.Id.slice(1, -1);
			tempCandidate.LogicalName = "sabre_candidate";
			tempObj.sabre_Candidate = tempCandidate;
			SDK.JQuery.createRecord(
				tempObj,
				"sabre_nonagencyplacement",
				napCreated,
				errorFunction
			);
		}
	} else if(empOrg.PositionHistory != null){
		var tempObj = new Object();
		if(empOrg.PositionHistory.Title != null){
			tempObj.sabre_name = empOrg.PositionHistory.Title;
		} else {
			tempObj.sabre_name = "Unknown";
		}
		if(empOrg.EmployerOrgName != null){
			tempObj.sabre_Company = empOrg.EmployerOrgName;
		}
		if(empOrg.PositionHistory.StartDate != null && empOrg.PositionHistory.StartDate.AnyDate != null){
			tempObj.sabre_StartDate = empOrg.PositionHistory.StartDate.AnyDate;
		}
		if(empOrg.PositionHistory.EndDate != null && empOrg.PositionHistory.EndDate.AnyDate != null){
			tempObj.sabre_EndDate = empOrg.PositionHistory.EndDate.AnyDate;
		}
		var tempCandidate = new Object();
		tempCandidate.Id = window.parent.Xrm.Page.data.entity.getId();
		tempCandidate.Id = tempCandidate.Id.slice(1, -1);
		tempCandidate.LogicalName = "sabre_candidate";
		tempObj.sabre_Candidate = tempCandidate;
		SDK.JQuery.createRecord(
			tempObj,
			"sabre_nonagencyplacement",
			napCreated,
			errorFunction
		);
	}
}

function setCandidateEducationHistory(education){
	if(education.SchoolOrInstitution != null && education.SchoolOrInstitution.length != null && education.SchoolOrInstitution.length > 0){
		var educationArray = new Array();
		var educationText;
		for(var i = 0; i<education.SchoolOrInstitution.length; i++){
			if(education.SchoolOrInstitution.Degree != null && education.SchoolOrInstitution.Degree.DegreeMajor != null){
				educationText = "";
				if(education.SchoolOrInstitution.Degree._degreeType != null){
					educationText = education.SchoolOrInstitution.Degree._degreeType + " in ";
				}
				educationText = educationText + education.SchoolOrInstitution.Degree.DegreeMajor.Name;
				if(education.SchoolOrInstitution.School != null && education.SchoolOrInstitution.School.SchoolName != null){
					educationText = educationText + " at " + education.SchoolOrInstitution.School.SchoolName;
				}
				if(education.SchoolOrInstitution.Degree.DegreeMinor != null){
					educationText = educationText + " minor in " + education.SchoolOrInstitution.Degree.DegreeMinor.Name
				}
				educationText = educationText + "\n";
				educationArray[educationArray.length] = educationText;
			}
			else if(education.SchoolOrInstitution.Degree != null && education.SchoolOrInstitution.Degree.Comments != null){
					educationArray[educationArray.length] = education.SchoolOrInstitution.Degree.Comments;
			}
		}
		educationText = "";
		for(var i  = 0; i<educationArray.length;i++){
			educationText = educationText + educationArray[i] + "\n";
		}
		if(window.parent.Xrm.Page.getControl("sabre_educationhistory") != null){
			window.parent.Xrm.Page.getAttribute("sabre_educationhistory").setValue(educationText);
		}
		
	} else if (education.SchoolOrInstitution != null){
		if(education.SchoolOrInstitution.Degree != null && education.SchoolOrInstitution.Degree.DegreeMajor != null){
			var educationText;
			if(education.SchoolOrInstitution.Degree._degreeType != null){
				educationText = education.SchoolOrInstitution.Degree._degreeType + " in ";
			}
			educationText = educationText + education.SchoolOrInstitution.Degree.DegreeMajor.Name;
			if(education.SchoolOrInstitution.School != null && education.SchoolOrInstitution.School.SchoolName != null){
				educationText = educationText + " at " + education.SchoolOrInstitution.School.SchoolName;
			}
			if(education.SchoolOrInstitution.Degree.DegreeMinor != null){
				educationText = educationText + " minor in " + education.SchoolOrInstitution.Degree.DegreeMinor.Name
			}
			educationText = educationText + "\n";
			if(window.parent.Xrm.Page.getControl("sabre_educationhistory") != null){
				window.parent.Xrm.Page.getAttribute("sabre_educationhistory").setValue(educationText);
			}
		}
		else if(education.SchoolOrInstitution.Degree != null && education.SchoolOrInstitution.Degree.Comments != null){
			if(window.parent.Xrm.Page.getControl("sabre_educationhistory") != null){
				window.parent.Xrm.Page.getAttribute("sabre_educationhistory").setValue(education.SchoolOrInstitution.Degree.Comments);
			}
		}
	}
}

function napCreated(result){
}

function skillFinal(){
	for (var i = 0; i < qualifications.Competency.length; i++){
			for(var j = 0; j<qualifications.Competency.length; j++){
			    if(qualifications.Competency[i].CompetencyEvidence != null && qualifications.Competency[i].CompetencyEvidence.name != null){
				    if(qualifications.Competency[j].CompetencyEvidence != null && qualifications.Competency[j].CompetencyEvidence.name != null){
                        if(qualifications.Competency[i].CompetencyEvidence.name == qualifications.Competency[j].CompetencyEvidence.name && i != j){
							qualifications.Competency.splice(i, 1);
							if(i>0){
								i--;
							}
							if(j>0){
								j--;
							}
						}						
					}	
                }
			}
		}
	
	
	needConnectionTo = new Array();
	if(skillResult != null && skillResult.length > 0){
		//create connection between resulting object and current Candidate
		//console.log(skillResult);
		for(var j = 0; j<qualifications.Competency.length; j++){
			var duplicate = -1;
			for (var i = 0; i<skillResult.length; i++){
				if(skillResult[i].sabre_name != null && qualifications.Competency[j].CompetencyEvidence != null && qualifications.Competency[j].CompetencyEvidence.name != null && skillResult[i].sabre_name == qualifications.Competency[j].CompetencyEvidence.name){
				  duplicate = i;
				  //console.log(skillResult[j].sabre_name);
				}
			}
			if(duplicate == -1){
				console.log("error is in skillFinal");
				var skillObject = new Object();
				skillObject.sabre_name = qualifications.Competency[j].CompetencyEvidence.name;
				//console.log(skillObject.sabre_name);
				SDK.JQuery.createRecord(
				  skillObject,
				  "sabre_skills",
				  returnNewSkill,
				  errorFunction
				);
			}
			else{
				
				newSkill = new Array();
				newSkill[0] = skillResult[duplicate];
				newSkill[1] = 0;
				needConnectionTo.push(newSkill);
				var windowId = window.parent.Xrm.Page.data.entity.getId();
				windowId = windowId.slice(1, -1);
				//var filterValues = "$filter=Record1Id eq '" + skillResult[duplicate].sabre_skillsId + "' and Record2Id eq '" + windowId + "'";
				var filterValues = "$filter=Record1Id/Id eq guid'" + skillResult[duplicate].sabre_skillsId + "' and Record2Id/Id eq guid'"+ windowId +"'";
				console.log("error is in skillFinal, second");
				SDK.JQuery.retrieveMultipleRecords(
				    "Connection",
				    filterValues,
		            foundConnections,
		            errorFunction,
		            function(skillResult){

					}
				);  
				//check if there is a preexisting conenction between Skill and Candidate
				//if there is do nothing, else create connection.
			}
		}
	}
	else{
		
		for(var i = 0; i < qualifications.Competency.length; i++){
			if(qualifications.Competency[i].CompetencyEvidence != null && qualifications.Competency[i].CompetencyEvidence.name != null){

				//create skill object
				var skillObject = new Object();
				skillObject.sabre_name = qualifications.Competency[i].CompetencyEvidence.name;
				console.log("error is in skillFinal, third");

				SDK.JQuery.createRecord(
				  skillObject,
				  "sabre_skills",
				  returnNewSkill,
				  errorFunction
				);
					//within return value of skill object creation, manufacture connection between object and Candidate.
			}
		}
	}
}

function returnResults(results){
    
	for (var i = 0; i<results.length; i++){
	    skillResult.push(results[i]);
	}

}

function outputRes(results){
	//console.log(results);
}

function returnNewSkill(result){
	var connectionObject = new Object();
	connectionObject.Name = "Skill-Candidate Parser created connection";
	var skillObjRole = new Object();
	var candidateObjRole = new Object();
	var skillObj = new Object();
	var candidateObj = new Object();
	skillObj.LogicalName = "sabre_skills";
	skillObj.Id = result.sabre_skillsId;
	candidateObj.LogicalName = "sabre_candidate";
	candidateObj.Id = window.parent.Xrm.Page.data.entity.getId();
	candidateObj.Id = candidateObj.Id.slice(1, -1);
	candidateObjRole.LogicalName = "connectionrole";
	candidateObjRole.Id = "20872a5f-a4fc-e511-80cd-000d3a013699";
	skillObjRole.LogicalName = "connectionrole";
	skillObjRole.Id = "4243c146-a4fc-e511-80cd-000d3a013699";
	connectionObject.Record1Id = skillObj;
	connectionObject.Record1RoleId = skillObjRole;
	connectionObject.Record2Id = candidateObj;
	console.log("error is in returnNewSkill");

	SDK.JQuery.createRecord(
	  connectionObject,
	  "Connection",	
	  function(result){
		  //console.log(result);
	  },
	  errorFunction
	);
}

function foundConnections(results){
	//connection found, do nothing
	var i = 0;
	while (needConnectionTo[i][1] != 0){
		i++;
	}
	if (results != null && results.length > 0){


	}
	else{ //no connection, MAKE ONE
		///How do I know what skill to create?
		//console.log("foundnoConenction");
		//console.log(results)
		//console.log(needConnectionTo[i][0]);
		
		var connectionObject = new Object();
		connectionObject.Name = "Skill-Candidate Parser created connection";
		var skillObjRole = new Object();
		var candidateObjRole = new Object();
		var skillObj = new Object();
		var candidateObj = new Object();
		skillObj.LogicalName = "sabre_skills";
		skillObj.Id = needConnectionTo[i][0].sabre_skillsId;
		candidateObj.LogicalName = "sabre_candidate";
		candidateObj.Id = window.parent.Xrm.Page.data.entity.getId();
		candidateObj.Id = candidateObj.Id.slice(1, -1);
		candidateObjRole.LogicalName = "connectionrole";
		candidateObjRole.Id = "20872a5f-a4fc-e511-80cd-000d3a013699";
		skillObjRole.LogicalName = "connectionrole";
		skillObjRole.Id = "4243c146-a4fc-e511-80cd-000d3a013699";
		connectionObject.Record1Id = skillObj;
		connectionObject.Record1RoleId = skillObjRole;
		connectionObject.Record2Id = candidateObj;
		console.log("error is in foundCOnnections");
		SDK.JQuery.createRecord(
		  connectionObject,
		  "Connection",	
		  function(result){
			  //console.log(result);
		  },
		  errorFunction
		);
		
        
	}
	needConnectionTo[i][1] = 1;
}

function parseXml(xml, arrayTags)
{
    var dom = null;
    if (window.DOMParser)
    {
        dom = (new DOMParser()).parseFromString(xml, "text/xml");
    }
    else if (window.ActiveXObject)
    {
        dom = new ActiveXObject('Microsoft.XMLDOM');
        dom.async = false;
        if (!dom.loadXML(xml))
        {
            throw dom.parseError.reason + " " + dom.parseError.srcText;
        }
    }
    else
    {
        throw "cannot parse xml string!";
    }

    function isArray(o)
    {
        return Object.prototype.toString.apply(o) === '[object Array]';
    }

    function parseNode(xmlNode, result)
    {
        if(xmlNode.nodeName == "#text" && xmlNode.nodeValue.trim() == "")
        {
            return;
        }

        var jsonNode = {};
        var existing = result[xmlNode.nodeName];
        if(existing)
        {
            if(!isArray(existing))
            {
                result[xmlNode.nodeName] = [existing, jsonNode];
            }
            else
            {
                result[xmlNode.nodeName].push(jsonNode);
            }
        }
        else
        {
            if(arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1)
            {
                result[xmlNode.nodeName] = [jsonNode];
            }
            else
            {
                result[xmlNode.nodeName] = jsonNode;
            }
        }

        if(xmlNode.attributes)
        {
            var length = xmlNode.attributes.length;
            for(var i = 0; i < length; i++)
            {
                var attribute = xmlNode.attributes[i];
                jsonNode[attribute.nodeName] = attribute.nodeValue;
            }
        }

        var length = xmlNode.childNodes.length;
        for(var i = 0; i < length; i++)
        {
            parseNode(xmlNode.childNodes[i], jsonNode);
        }
    }

    var result = {};
    if(dom.childNodes.length)
    {
        parseNode(dom.childNodes[0], result);
    }

    return result;
}

(function (root, factory) {
     if (typeof define === "function" && define.amd) {
         define([], factory);
     } else if (typeof exports === "object") {
         module.exports = factory();
     } else {
         root.X2JS = factory();
     }
 }(this, function () {
	return function (config) {
		'use strict';
			
		var VERSION = "1.2.0";
		
		config = config || {};
		initConfigDefaults();
		initRequiredPolyfills();
		
		function initConfigDefaults() {
			if(config.escapeMode === undefined) {
				config.escapeMode = true;
			}
			
			config.attributePrefix = config.attributePrefix || "_";
			config.arrayAccessForm = config.arrayAccessForm || "none";
			config.emptyNodeForm = config.emptyNodeForm || "text";		
			
			if(config.enableToStringFunc === undefined) {
				config.enableToStringFunc = true; 
			}
			config.arrayAccessFormPaths = config.arrayAccessFormPaths || []; 
			if(config.skipEmptyTextNodesForObj === undefined) {
				config.skipEmptyTextNodesForObj = true;
			}
			if(config.stripWhitespaces === undefined) {
				config.stripWhitespaces = true;
			}
			config.datetimeAccessFormPaths = config.datetimeAccessFormPaths || [];
	
			if(config.useDoubleQuotes === undefined) {
				config.useDoubleQuotes = false;
			}
			
			config.xmlElementsFilter = config.xmlElementsFilter || [];
			config.jsonPropertiesFilter = config.jsonPropertiesFilter || [];
			
			if(config.keepCData === undefined) {
				config.keepCData = false;
			}
		}
	
		var DOMNodeTypes = {
			ELEMENT_NODE 	   : 1,
			TEXT_NODE    	   : 3,
			CDATA_SECTION_NODE : 4,
			COMMENT_NODE	   : 8,
			DOCUMENT_NODE 	   : 9
		};
		
		function initRequiredPolyfills() {		
		}
		
		function getNodeLocalName( node ) {
			var nodeLocalName = node.localName;			
			if(nodeLocalName == null) // Yeah, this is IE!! 
				nodeLocalName = node.baseName;
			if(nodeLocalName == null || nodeLocalName=="") // =="" is IE too
				nodeLocalName = node.nodeName;
			return nodeLocalName;
		}
		
		function getNodePrefix(node) {
			return node.prefix;
		}
			
		function escapeXmlChars(str) {
			if(typeof(str) == "string")
				return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
			else
				return str;
		}
	
		function unescapeXmlChars(str) {
			return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
		}
		
		function checkInStdFiltersArrayForm(stdFiltersArrayForm, obj, name, path) {
			var idx = 0;
			for(; idx < stdFiltersArrayForm.length; idx++) {
				var filterPath = stdFiltersArrayForm[idx];
				if( typeof filterPath === "string" ) {
					if(filterPath == path)
						break;
				}
				else
				if( filterPath instanceof RegExp) {
					if(filterPath.test(path))
						break;
				}				
				else
				if( typeof filterPath === "function") {
					if(filterPath(obj, name, path))
						break;
				}
			}
			return idx!=stdFiltersArrayForm.length;
		}
		
		function toArrayAccessForm(obj, childName, path) {
			switch(config.arrayAccessForm) {
				case "property":
					if(!(obj[childName] instanceof Array))
						obj[childName+"_asArray"] = [obj[childName]];
					else
						obj[childName+"_asArray"] = obj[childName];
					break;
				/*case "none":
					break;*/
			}
			
			if(!(obj[childName] instanceof Array) && config.arrayAccessFormPaths.length > 0) {
				if(checkInStdFiltersArrayForm(config.arrayAccessFormPaths, obj, childName, path)) {
					obj[childName] = [obj[childName]];
				}			
			}
		}
		
		function fromXmlDateTime(prop) {
			// Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
			// Improved to support full spec and optional parts
			var bits = prop.split(/[-T:+Z]/g);
			
			var d = new Date(bits[0], bits[1]-1, bits[2]);			
			var secondBits = bits[5].split("\.");
			d.setHours(bits[3], bits[4], secondBits[0]);
			if(secondBits.length>1)
				d.setMilliseconds(secondBits[1]);
	
			// Get supplied time zone offset in minutes
			if(bits[6] && bits[7]) {
				var offsetMinutes = bits[6] * 60 + Number(bits[7]);
				var sign = /\d\d-\d\d:\d\d$/.test(prop)? '-' : '+';
	
				// Apply the sign
				offsetMinutes = 0 + (sign == '-'? -1 * offsetMinutes : offsetMinutes);
	
				// Apply offset and local timezone
				d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset())
			}
			else
				if(prop.indexOf("Z", prop.length - 1) !== -1) {
					d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));					
				}
	
			// d is now a local time equivalent to the supplied time
			return d;
		}
		
		function checkFromXmlDateTimePaths(value, childName, fullPath) {
			if(config.datetimeAccessFormPaths.length > 0) {
				var path = fullPath.split("\.#")[0];
				if(checkInStdFiltersArrayForm(config.datetimeAccessFormPaths, value, childName, path)) {
					return fromXmlDateTime(value);
				}
				else
					return value;			
			}
			else
				return value;
		}
		
		function checkXmlElementsFilter(obj, childType, childName, childPath) {
			if( childType == DOMNodeTypes.ELEMENT_NODE && config.xmlElementsFilter.length > 0) {
				return checkInStdFiltersArrayForm(config.xmlElementsFilter, obj, childName, childPath);	
			}
			else
				return true;
		}	
	
		function parseDOMChildren( node, path ) {
			if(node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
				var result = new Object;
				var nodeChildren = node.childNodes;
				// Alternative for firstElementChild which is not supported in some environments
				for(var cidx=0; cidx <nodeChildren.length; cidx++) {
					var child = nodeChildren.item(cidx);
					if(child.nodeType == DOMNodeTypes.ELEMENT_NODE) {
						var childName = getNodeLocalName(child);
						result[childName] = parseDOMChildren(child, childName);
					}
				}
				return result;
			}
			else
			if(node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
				var result = new Object;
				result.__cnt=0;
				
				var nodeChildren = node.childNodes;
				
				// Children nodes
				for(var cidx=0; cidx <nodeChildren.length; cidx++) {
					var child = nodeChildren.item(cidx); // nodeChildren[cidx];
					var childName = getNodeLocalName(child);
					
					if(child.nodeType!= DOMNodeTypes.COMMENT_NODE) {
						var childPath = path+"."+childName;
						if (checkXmlElementsFilter(result,child.nodeType,childName,childPath)) {
							result.__cnt++;
							if(result[childName] == null) {
								result[childName] = parseDOMChildren(child, childPath);
								toArrayAccessForm(result, childName, childPath);					
							}
							else {
								if(result[childName] != null) {
									if( !(result[childName] instanceof Array)) {
										result[childName] = [result[childName]];
										toArrayAccessForm(result, childName, childPath);
									}
								}
								(result[childName])[result[childName].length] = parseDOMChildren(child, childPath);
							}
						}
					}								
				}
				
				// Attributes
				for(var aidx=0; aidx <node.attributes.length; aidx++) {
					var attr = node.attributes.item(aidx); // [aidx];
					result.__cnt++;
					result[config.attributePrefix+attr.name]=attr.value;
				}
				
				// Node namespace prefix
				var nodePrefix = getNodePrefix(node);
				if(nodePrefix!=null && nodePrefix!="") {
					result.__cnt++;
					result.__prefix=nodePrefix;
				}
				
				if(result["#text"]!=null) {				
					result.__text = result["#text"];
					if(result.__text instanceof Array) {
						result.__text = result.__text.join("\n");
					}
					//if(config.escapeMode)
					//	result.__text = unescapeXmlChars(result.__text);
					if(config.stripWhitespaces)
						result.__text = result.__text.trim();
					delete result["#text"];
					if(config.arrayAccessForm=="property")
						delete result["#text_asArray"];
					result.__text = checkFromXmlDateTimePaths(result.__text, childName, path+"."+childName);
				}
				if(result["#cdata-section"]!=null) {
					result.__cdata = result["#cdata-section"];
					delete result["#cdata-section"];
					if(config.arrayAccessForm=="property")
						delete result["#cdata-section_asArray"];
				}
				
				if( result.__cnt == 0 && config.emptyNodeForm=="text" ) {
					result = '';
				}
				else
				if( result.__cnt == 1 && result.__text!=null  ) {
					result = result.__text;
				}
				else
				if( result.__cnt == 1 && result.__cdata!=null && !config.keepCData  ) {
					result = result.__cdata;
				}			
				else			
				if ( result.__cnt > 1 && result.__text!=null && config.skipEmptyTextNodesForObj) {
					if( (config.stripWhitespaces && result.__text=="") || (result.__text.trim()=="")) {
						delete result.__text;
					}
				}
				delete result.__cnt;			
				
				if( config.enableToStringFunc && (result.__text!=null || result.__cdata!=null )) {
					result.toString = function() {
						return (this.__text!=null? this.__text:'')+( this.__cdata!=null ? this.__cdata:'');
					};
				}
				
				return result;
			}
			else
			if(node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
				return node.nodeValue;
			}	
		}
		
		function startTag(jsonObj, element, attrList, closed) {
			var resultStr = "<"+ ( (jsonObj!=null && jsonObj.__prefix!=null)? (jsonObj.__prefix+":"):"") + element;
			if(attrList!=null) {
				for(var aidx = 0; aidx < attrList.length; aidx++) {
					var attrName = attrList[aidx];
					var attrVal = jsonObj[attrName];
					if(config.escapeMode)
						attrVal=escapeXmlChars(attrVal);
					resultStr+=" "+attrName.substr(config.attributePrefix.length)+"=";
					if(config.useDoubleQuotes)
						resultStr+='"'+attrVal+'"';
					else
						resultStr+="'"+attrVal+"'";
				}
			}
			if(!closed)
				resultStr+=">";
			else
				resultStr+="/>";
			return resultStr;
		}
		
		function endTag(jsonObj,elementName) {
			return "</"+ (jsonObj.__prefix!=null? (jsonObj.__prefix+":"):"")+elementName+">";
		}
		
		function endsWith(str, suffix) {
			return str.indexOf(suffix, str.length - suffix.length) !== -1;
		}
		
		function jsonXmlSpecialElem ( jsonObj, jsonObjField ) {
			if((config.arrayAccessForm=="property" && endsWith(jsonObjField.toString(),("_asArray"))) 
					|| jsonObjField.toString().indexOf(config.attributePrefix)==0 
					|| jsonObjField.toString().indexOf("__")==0
					|| (jsonObj[jsonObjField] instanceof Function) )
				return true;
			else
				return false;
		}
		
		function jsonXmlElemCount ( jsonObj ) {
			var elementsCnt = 0;
			if(jsonObj instanceof Object ) {
				for( var it in jsonObj  ) {
					if(jsonXmlSpecialElem ( jsonObj, it) )
						continue;			
					elementsCnt++;
				}
			}
			return elementsCnt;
		}
		
		function checkJsonObjPropertiesFilter(jsonObj, propertyName, jsonObjPath) {
			return config.jsonPropertiesFilter.length == 0
				|| jsonObjPath==""
				|| checkInStdFiltersArrayForm(config.jsonPropertiesFilter, jsonObj, propertyName, jsonObjPath);	
		}
		
		function parseJSONAttributes ( jsonObj ) {
			var attrList = [];
			if(jsonObj instanceof Object ) {
				for( var ait in jsonObj  ) {
					if(ait.toString().indexOf("__")== -1 && ait.toString().indexOf(config.attributePrefix)==0) {
						attrList.push(ait);
					}
				}
			}
			return attrList;
		}
		
		function parseJSONTextAttrs ( jsonTxtObj ) {
			var result ="";
			
			if(jsonTxtObj.__cdata!=null) {										
				result+="<![CDATA["+jsonTxtObj.__cdata+"]]>";					
			}
			
			if(jsonTxtObj.__text!=null) {			
				if(config.escapeMode)
					result+=escapeXmlChars(jsonTxtObj.__text);
				else
					result+=jsonTxtObj.__text;
			}
			return result;
		}
		
		function parseJSONTextObject ( jsonTxtObj ) {
			var result ="";
	
			if( jsonTxtObj instanceof Object ) {
				result+=parseJSONTextAttrs ( jsonTxtObj );
			}
			else
				if(jsonTxtObj!=null) {
					if(config.escapeMode)
						result+=escapeXmlChars(jsonTxtObj);
					else
						result+=jsonTxtObj;
				}
			
			return result;
		}
		
		function getJsonPropertyPath(jsonObjPath, jsonPropName) {
			if (jsonObjPath==="") {
				return jsonPropName;
			}
			else
				return jsonObjPath+"."+jsonPropName;
		}
		
		function parseJSONArray ( jsonArrRoot, jsonArrObj, attrList, jsonObjPath ) {
			var result = ""; 
			if(jsonArrRoot.length == 0) {
				result+=startTag(jsonArrRoot, jsonArrObj, attrList, true);
			}
			else {
				for(var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
					result+=startTag(jsonArrRoot[arIdx], jsonArrObj, parseJSONAttributes(jsonArrRoot[arIdx]), false);
					result+=parseJSONObject(jsonArrRoot[arIdx], getJsonPropertyPath(jsonObjPath,jsonArrObj));
					result+=endTag(jsonArrRoot[arIdx],jsonArrObj);
				}
			}
			return result;
		}
		
		function parseJSONObject ( jsonObj, jsonObjPath ) {
			var result = "";	
	
			var elementsCnt = jsonXmlElemCount ( jsonObj );
			
			if(elementsCnt > 0) {
				for( var it in jsonObj ) {
					
					if(jsonXmlSpecialElem ( jsonObj, it) || (jsonObjPath!="" && !checkJsonObjPropertiesFilter(jsonObj, it, getJsonPropertyPath(jsonObjPath,it))) )
						continue;			
					
					var subObj = jsonObj[it];						
					
					var attrList = parseJSONAttributes( subObj )
					
					if(subObj == null || subObj == undefined) {
						result+=startTag(subObj, it, attrList, true);
					}
					else
					if(subObj instanceof Object) {
						
						if(subObj instanceof Array) {					
							result+=parseJSONArray( subObj, it, attrList, jsonObjPath );					
						}
						else if(subObj instanceof Date) {
							result+=startTag(subObj, it, attrList, false);
							result+=subObj.toISOString();
							result+=endTag(subObj,it);
						}
						else {
							var subObjElementsCnt = jsonXmlElemCount ( subObj );
							if(subObjElementsCnt > 0 || subObj.__text!=null || subObj.__cdata!=null) {
								result+=startTag(subObj, it, attrList, false);
								result+=parseJSONObject(subObj, getJsonPropertyPath(jsonObjPath,it));
								result+=endTag(subObj,it);
							}
							else {
								result+=startTag(subObj, it, attrList, true);
							}
						}
					}
					else {
						result+=startTag(subObj, it, attrList, false);
						result+=parseJSONTextObject(subObj);
						result+=endTag(subObj,it);
					}
				}
			}
			result+=parseJSONTextObject(jsonObj);
			
			return result;
		}
		
		this.parseXmlString = function(xmlDocStr) {
			var isIEParser = window.ActiveXObject || "ActiveXObject" in window;
			if (xmlDocStr === undefined) {
				return null;
			}
			var xmlDoc;
			if (window.DOMParser) {
				var parser=new window.DOMParser();			
				var parsererrorNS = null;
				// IE9+ now is here
				if(!isIEParser) {
					try {
						parsererrorNS = parser.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI;
					}
					catch(err) {					
						parsererrorNS = null;
					}
				}
				try {
					xmlDoc = parser.parseFromString( xmlDocStr, "text/xml" );
					if( parsererrorNS!= null && xmlDoc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
						//throw new Error('Error parsing XML: '+xmlDocStr);
						xmlDoc = null;
					}
				}
				catch(err) {
					xmlDoc = null;
				}
			}
			else {
				// IE :(
				if(xmlDocStr.indexOf("<?")==0) {
					xmlDocStr = xmlDocStr.substr( xmlDocStr.indexOf("?>") + 2 );
				}
				xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async="false";
				xmlDoc.loadXML(xmlDocStr);
			}
			return xmlDoc;
		};
		
		this.asArray = function(prop) {
			if (prop === undefined || prop == null)
				return [];
			else
			if(prop instanceof Array)
				return prop;
			else
				return [prop];
		};
		
		this.toXmlDateTime = function(dt) {
			if(dt instanceof Date)
				return dt.toISOString();
			else
			if(typeof(dt) === 'number' )
				return new Date(dt).toISOString();
			else	
				return null;
		};
		
		this.asDateTime = function(prop) {
			if(typeof(prop) == "string") {
				return fromXmlDateTime(prop);
			}
			else
				return prop;
		};
	
		this.xml2json = function (xmlDoc) {
			return parseDOMChildren ( xmlDoc );
		};
		
		this.xml_str2json = function (xmlDocStr) {
			var xmlDoc = this.parseXmlString(xmlDocStr);
			if(xmlDoc!=null)
				return this.xml2json(xmlDoc);
			else
				return null;
		};
	
		this.json2xml_str = function (jsonObj) {
			return parseJSONObject ( jsonObj, "" );
		};
	
		this.json2xml = function (jsonObj) {
			var xmlDocStr = this.json2xml_str (jsonObj);
			return this.parseXmlString(xmlDocStr);
		};
		
		this.getVersion = function () {
			return VERSION;
		};	
	}
}))