//OnChange function, sets appropriate business process
function processControl(){
	enabledProcesses = [];
	var i = 0;
	//load all processes into array
	Xrm.Page.data.process.getEnabledProcesses(function (processes){
		for(var processId in processes){
		    //enabledProcesses.push({ id: processId, name: processes[processId]});
			enabledProcesses[i] = new Object();
			enabledProcesses[i].id = processId;
			enabledProcesses[i].name = processes[processId];
			i++;
		}
		
	  }
	);
	
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
				
				//if Work Type is Temporary - set process to temporary exclusive process.
				if(Position.sabre_Type.Value == "837770000"){
					var i = 0;
					while(enabledProcesses[i]!=null){
						if(enabledProcesses[i].name == "Temporary Candidate Onboarding Process"){
							if(Xrm.Page.getControl("sabre_submissionno") != null && Xrm.Page.getControl("sabre_candidate") != null && Xrm.Page.getAttribute("sabre_submissionno").getValue() != null && Xrm.Page.getAttribute("sabre_candidate").getValue() != null){
								window.parent.Xrm.Page.data.save();
								Xrm.Page.data.process.setActiveProcess(enabledProcesses[i].id, callbackFunction);
							}
						}
						i++;
					}
				}
				//otherwise set to normal process
				else{
					var i = 0;
					while(enabledProcesses[i]!=null){
						if(enabledProcesses[i].name == "Candidate Onboarding Process"){
							if(Xrm.Page.getControl("sabre_submissionno") != null && Xrm.Page.getControl("sabre_candidate") != null && Xrm.Page.getAttribute("sabre_submissionno").getValue() != null && Xrm.Page.getAttribute("sabre_candidate").getValue() != null){
								window.parent.Xrm.Page.data.save();
								Xrm.Page.data.process.setActiveProcess(enabledProcesses[i].id, callbackFunction);
							}

						}
						i++;
					}
				}
				
			},
			errorHandler
		);

	}
}

function callbackFunction(str){
}

function errorHandler(error){
	alert(error.message);
}

//Onload function, adds onStageChange to the Business Process flow when the stage changes
function stageControl(){
	if(Xrm.Page.ui.getFormType() != 6){
		Xrm.Page.data.process.addOnStageChange(onStageChange);
	}
}
	
function onStageChange(){
	var stageName = Xrm.Page.data.process.getActiveStage().getName();
	if (stageName == "Placement Completed"){
		Xrm.Page.getControl("sabre_affiliate").setDisabled(true);
		Xrm.Page.getControl("sabre_affiliate2").setDisabled(true);		
		Xrm.Page.getControl("sabre_feetype").setDisabled(true);
		Xrm.Page.getControl("sabre_posistion").setDisabled(true);
		Xrm.Page.getControl("sabre_candidate").setDisabled(true);
		Xrm.Page.getControl("sabre_actualstartdate").setDisabled(true);
		Xrm.Page.getControl("sabre_enddate").setDisabled(true);
		Xrm.Page.getControl("sabre_submissionno").setDisabled(true);
		Xrm.Page.getControl("sabre_specialcase").setDisabled(true);
		Xrm.Page.getControl("ownerid").setDisabled(true);
		Xrm.Page.getControl("sabre_openingno").setDisabled(true);
		Xrm.Page.getControl("sabre_hoursperweek").setDisabled(true);
		Xrm.Page.getControl("sabre_wagetype").setDisabled(true);
		Xrm.Page.getControl("sabre_regularwages").setDisabled(true);
		Xrm.Page.getControl("sabre_regularchargerate").setDisabled(true);
		Xrm.Page.getControl("sabre_overtimewages").setDisabled(true);
		Xrm.Page.getControl("sabre_overtimechargerate").setDisabled(true);
		Xrm.Page.getControl("sabre_overtime2wages").setDisabled(true);
		Xrm.Page.getControl("sabre_overtime2chargerate").setDisabled(true);
		Xrm.Page.getControl("sabre_statutorywages").setDisabled(true);
		Xrm.Page.getControl("sabre_statutorychargerate").setDisabled(true);
		Xrm.Page.getControl("sabre_splitpercent").setDisabled(true);
		Xrm.Page.getControl("sabre_splitpercent2").setDisabled(true);
		Xrm.Page.getControl("sabre_feevalue").setDisabled(true);
		Xrm.Page.getControl("sabre_vacationpay").setDisabled(true);
		Xrm.Page.getControl("sabre_vacationvalue").setDisabled(true);

        //it is not possible to manually lock bpf fields so a flag field was created to execute a Business rule that can lock bpf fields
		if(Xrm.Page.getControl("sabre_bpflock") != null && Xrm.Page.getAttribute("sabre_bpflock").getValue() == 0){
			Xrm.Page.getAttribute("sabre_bpflock").setValue(1);
		}
		else if(Xrm.Page.getControl("sabre_bpflock") != null && Xrm.Page.getAttribute("sabre_bpflock").getValue() == 0){
			
		}
		else{
			Xrm.Page.getAttribute("sabre_bpflock").setValue(1);
		}

	}
	else{
		//if we are leaving the completed status, reset the contract approval field.
	    if(Xrm.Page.getControl("sabre_affiliate").getDisabled() == true){
			Xrm.Page.getControl("sabre_contractapproved").setAttribute(false);
		}
		Xrm.Page.getControl("sabre_affiliate").setDisabled(false);
		Xrm.Page.getControl("sabre_affiliate2").setDisabled(false);
		Xrm.Page.getControl("sabre_feetype").setDisabled(false);
		Xrm.Page.getControl("sabre_posistion").setDisabled(false);
		Xrm.Page.getControl("sabre_candidate").setDisabled(false);
		Xrm.Page.getControl("sabre_actualstartdate").setDisabled(false);
		Xrm.Page.getControl("sabre_enddate").setDisabled(false);
		Xrm.Page.getControl("sabre_submissionno").setDisabled(false);
		Xrm.Page.getControl("sabre_specialcase").setDisabled(false);
		Xrm.Page.getControl("ownerid").setDisabled(false);
		Xrm.Page.getControl("sabre_openingno").setDisabled(false);
		Xrm.Page.getControl("sabre_hoursperweek").setDisabled(false);
		Xrm.Page.getControl("sabre_wagetype").setDisabled(false);
		Xrm.Page.getControl("sabre_regularwages").setDisabled(false);
		Xrm.Page.getControl("sabre_regularchargerate").setDisabled(false);
		Xrm.Page.getControl("sabre_overtimewages").setDisabled(false);
		Xrm.Page.getControl("sabre_overtimechargerate").setDisabled(false);
		Xrm.Page.getControl("sabre_overtime2wages").setDisabled(false);
		Xrm.Page.getControl("sabre_overtime2chargerate").setDisabled(false);
		Xrm.Page.getControl("sabre_statutorywages").setDisabled(false);
		Xrm.Page.getControl("sabre_statutorychargerate").setDisabled(false);
		Xrm.Page.getControl("sabre_splitpercent").setDisabled(false);
		Xrm.Page.getControl("sabre_splitpercent2").setDisabled(false);
		Xrm.Page.getControl("sabre_feevalue").setDisabled(false);
		Xrm.Page.getControl("sabre_details").setDisabled(false);
		Xrm.Page.getControl("sabre_vacationpay").setDisabled(false);
		Xrm.Page.getControl("sabre_vacationvalue").setDisabled(false);

		//it is not possible to manually lock bpf fields so a flag field was created to execute a Business rule that can lock bpf fields
		if(Xrm.Page.getControl("sabre_bpflock") != null && Xrm.Page.getAttribute("sabre_bpflock").getValue() == 1){
			Xrm.Page.getAttribute("sabre_bpflock").setValue(0);
		}
		else if(Xrm.Page.getControl("sabre_bpflock") != null && Xrm.Page.getAttribute("sabre_bpflock").getValue() == 1){
			
		}
		else{
			Xrm.Page.getAttribute("sabre_bpflock").setValue(0);
		}

		
	}
}

function sinVerification(){
	if(Xrm.Page.getControl("sabre_sinno") != null && Xrm.Page.getAttribute("sabre_sinno").getValue() != null){
		var sinNo = Xrm.Page.getAttribute("sabre_sinno").getValue();
		var n = sinNo.search(/^\d{3}([- ]?)\d{3}\1\d{3}$/);
		if(n == -1){
			Xrm.Page.getAttribute("sabre_sinno").setValue(null);
			alert("invalid SIN Number.");
		}
	}
	
}

//updates process stage field, sets process to the only correct one.
function placementProcessStageUpdate(){
	if(Xrm.Page.ui.getFormType() != 6){
		var enabledProcess = Xrm.Page.data.process.getActiveProcess();
		var enabledStage = Xrm.Page.data.process.getActiveStage();
		
		if(enabledProcess == null || enabledProcess.getName() != "Placement Activation Process"){
			Xrm.Page.data.process.getEnabledProcesses(function (processes){
				var i = 0;
				var enabledProcesses = [];
				for(var processId in processes){
					enabledProcesses[i] = new Object();
					enabledProcesses[i].id = processId;
					enabledProcesses[i].name = processes[processId];
					i++;
				}
				var i = 0;
				while(enabledProcesses[i]!=null){
					if(enabledProcesses[i].name == "Placement Activation Process"){
						Xrm.Page.data.process.setActiveProcess(enabledProcesses[i].id, callbackFunction);
					}
					i++;
				}
				
			});
			var enabledProcess = Xrm.Page.data.process.getActiveProcess();
			var enabledStage = Xrm.Page.data.process.getActiveStage();
		}
		
		if(enabledProcess.getName() == "Placement Activation Process"){
			if(Xrm.Page.getControl("sabre_placementprocessstage") != null && enabledStage.getName() == "Draft"){
				//Xrm.Page.getAttribute("sabre_placementprocessstage").setValue(837770000);
				
			}else if(Xrm.Page.getControl("sabre_placementprocessstage") != null && enabledStage.getName() == "Active") {
				Xrm.Page.getAttribute("sabre_placementprocessstage").setValue(837770001);
			}
		}
		
		//get candidateapplicationstage
		//retrieveRecord( ,function(error){ console.log(error);})
		if(Xrm.Page.getControl("sabre_candidate") != null && Xrm.Page.getAttribute("sabre_candidate").getValue("sabre_candidate") != null){
			var tempCandidate = Xrm.Page.getAttribute("sabre_candidate").getValue("sabre_candidate");
			var tempId = tempCandidate[0].id;
			tempId = tempId.slice(1, -1);
			SDK.JQuery.retrieveRecord(tempId, "sabre_candidate", null, "", updatePlacementCanProStage, function(error){ console.log(error);});
		}
		//console.log();
	}
}

function updatePlacementCanProStage(record){
	if(record != null && record.sabre_CandidateApplicationStage != null && record.sabre_CandidateApplicationStage.Value != null){
    	Xrm.Page.getAttribute("sabre_candidateprocessstage").setValue(record.sabre_CandidateApplicationStage.Value);
	}
	
}

function onBulkEdit(){
	// Checking the form type is equal to Bulk Edit
	if(Xrm.Page.ui.getFormType() == 6)
	{
		//code to disable the fields
		if(Xrm.Page.getControl("sabre_regularwages") != null){
			Xrm.Page.getControl("sabre_regularwages").setDisabled(false);
		}
		if(Xrm.Page.getControl("sabre_regularchargerate") != null){
			Xrm.Page.getControl("sabre_regularchargerate").setDisabled(false);
		}
		if(Xrm.Page.getControl("sabre_overtimewages") != null){
			Xrm.Page.getControl("sabre_overtimewages").setDisabled(false);
		}
		if(Xrm.Page.getControl("sabre_overtimechargerate") != null){
			Xrm.Page.getControl("sabre_overtimechargerate").setDisabled(false);
		}
		if(Xrm.Page.getControl("sabre_overtime2wages") != null){
			Xrm.Page.getControl("sabre_overtime2wages").setDisabled(false);
		}
		if(Xrm.Page.getControl("sabre_overtime2chargerate") != null){
			Xrm.Page.getControl("sabre_overtime2chargerate").setDisabled(false);
		}
		if(Xrm.Page.getControl("sabre_statutorywages") != null){
			Xrm.Page.getControl("sabre_statutorywages").setDisabled(false);
		}
		if(Xrm.Page.getControl("sabre_statutorychargerate") != null){
			Xrm.Page.getControl("sabre_statutorychargerate").setDisabled(false);
		}
	}
}