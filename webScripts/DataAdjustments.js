 function adjustCandidateValues(){
	SDK.JQuery.retrieveMultipleRecords("sabre_candidate", "?$select=processid,OwnerId,sabre_BankAcct,sabre_candidateId,sabre_BankNo,sabre_Communication,sabre_DateofBirth,sabre_PermittedtoWork,sabre_SIN,sabre_TD1,sabre_TD1ON,sabre_TransitNo,stageid", function(results) {
		console.log(results);

		for (var i = 0; i < results.length; i++) {
			var processid = results[i].processid; //b4ed4082-f546-4bef-85b7-ab5adf10b825 is temp, whatever the live is it aint that.
			var sabre_BankAcct = results[i].sabre_BankAcct;
			var sabre_BankNo = results[i].sabre_BankNo;
			var sabre_Communication = results[i].sabre_Communication; //set this.Value to 837770001
			var sabre_candidateId = results[i].sabre_candidateId;
			var sabre_DateofBirth = results[i].sabre_DateofBirth;
			var sabre_PermittedtoWork = results[i].sabre_PermittedtoWork; //set to true
			var sabre_SIN = results[i].sabre_SIN;
			var sabre_TD1 = results[i].sabre_TD1;
			var ownerId = results[i].OwnerId;
			var sabre_TD1ON = results[i].sabre_TD1ON;
			var sabre_TransitNo = results[i].sabre_TransitNo;

			var stageid = results[i].stageid; //"0de2fa53-6669-4adb-8f4d-bd1e9a4ca430" is Draft, whatever active is it aint that. "a8b62c32-08ad-0351-7487-76610e0ec581" is active //0e95b961-763c-4362-1b41-54b69824e770 payroll
			if(sabre_candidateId != null && processid == "b4ed4082-f546-4bef-85b7-ab5adf10b825" && ownerId != null && ownerId.Name != null && ownerId.Name == "David Rew"){
				var entity = {};
				entity.sabre_TD1 = true;
				entity.sabre_TD1ON = true;
				entity.sabre_Communication = {
					Value: 837770001
				};
				entity.sabre_PermittedtoWork = true;
				SDK.JQuery.updateRecord(sabre_candidateId, entity, "sabre_candidate", function() {
					//Success - No Return Data - Do Something
				}, function(error) {
					Xrm.Utility.alertDialog(error.message);
				});
			}
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		//On Complete - Do Something
		SDK.JQuery.retrieveMultipleRecords("sabre_candidate", "?$select=processid,OwnerId,sabre_BankAcct,sabre_candidateId,sabre_BankNo,sabre_Communication,sabre_DateofBirth,sabre_PermittedtoWork,sabre_SIN,sabre_TD1,sabre_TD1ON,sabre_TransitNo,stageid", function(results) {
			console.log(results);

			for (var i = 0; i < results.length; i++) {
				var processid = results[i].processid; //b4ed4082-f546-4bef-85b7-ab5adf10b825 is temp, whatever the live is it aint that.
				var sabre_BankAcct = results[i].sabre_BankAcct;
				var sabre_BankNo = results[i].sabre_BankNo;
				var sabre_Communication = results[i].sabre_Communication; //set this.Value to 837770001
				var sabre_candidateId = results[i].sabre_candidateId;
				var sabre_DateofBirth = results[i].sabre_DateofBirth;
				var sabre_PermittedtoWork = results[i].sabre_PermittedtoWork; //set to true
				var sabre_SIN = results[i].sabre_SIN;
				var sabre_TD1 = results[i].sabre_TD1;
				var ownerId = results[i].OwnerId;
				var sabre_TD1ON = results[i].sabre_TD1ON;
				var sabre_TransitNo = results[i].sabre_TransitNo;
				var stageid = results[i].stageid; //"0de2fa53-6669-4adb-8f4d-bd1e9a4ca430" is Draft, whatever active is it aint that. "a8b62c32-08ad-0351-7487-76610e0ec581" is active //0e95b961-763c-4362-1b41-54b69824e770 payroll
				if(sabre_candidateId != null && processid == "b4ed4082-f546-4bef-85b7-ab5adf10b825" && ownerId != null && ownerId.Name != null && ownerId.Name == "David Rew" ){
					var entity = {};
					entity.stageid = "0e95b961-763c-4362-1b41-54b69824e770";
					SDK.JQuery.updateRecord(sabre_candidateId, entity, "sabre_candidate", function() {
						//Success - No Return Data - Do Something
					}, function(error) {
						Xrm.Utility.alertDialog(error.message);
					});
				}
			}
		}, function(error) {
			Xrm.Utility.alertDialog(error.message);
		}, function() {
			//On Complete - Do Something
			SDK.JQuery.retrieveMultipleRecords("sabre_candidate", "?$select=processid,OwnerId,sabre_CandidateApplicationStage,sabre_BankAcct,sabre_candidateId,sabre_BankNo,sabre_Communication,sabre_DateofBirth,sabre_PermittedtoWork,sabre_SIN,sabre_TD1,sabre_TD1ON,sabre_TransitNo,stageid", function(results) {
				console.log(results);

				for (var i = 0; i < results.length; i++) {
					var processid = results[i].processid; //b4ed4082-f546-4bef-85b7-ab5adf10b825 is temp, whatever the live is it aint that.
					var sabre_BankAcct = results[i].sabre_BankAcct;
					var sabre_BankNo = results[i].sabre_BankNo;
					var sabre_Communication = results[i].sabre_Communication; //set this.Value to 837770001
					var sabre_candidateId = results[i].sabre_candidateId;
					var sabre_DateofBirth = results[i].sabre_DateofBirth;
					var sabre_PermittedtoWork = results[i].sabre_PermittedtoWork; //set to true
					var sabre_SIN = results[i].sabre_SIN;
					var sabre_TD1 = results[i].sabre_TD1;
					var ownerId = results[i].OwnerId;
					var sabre_CandidateApplicationStage = results[i].sabre_CandidateApplicationStage;
					var sabre_TD1ON = results[i].sabre_TD1ON;
					var sabre_TransitNo = results[i].sabre_TransitNo;
					var stageid = results[i].stageid; //"0de2fa53-6669-4adb-8f4d-bd1e9a4ca430" is Draft, whatever active is it aint that. "a8b62c32-08ad-0351-7487-76610e0ec581" is active //0e95b961-763c-4362-1b41-54b69824e770 payroll
					if(sabre_candidateId != null && processid == "b4ed4082-f546-4bef-85b7-ab5adf10b825" && ownerId != null && ownerId.Name != null && ownerId.Name == "David Rew" ){
						var entity = {};
						entity.sabre_CandidateApplicationStage = {
							Value: 837770001
						};
						entity.stageid = "a8b62c32-08ad-0351-7487-76610e0ec581";
						SDK.JQuery.updateRecord(sabre_candidateId, entity, "sabre_candidate", function() {
							//Success - No Return Data - Do Something
						}, function(error) {
							Xrm.Utility.alertDialog(error.message);
						});
					}
				}
			}, function(error) {
				Xrm.Utility.alertDialog(error.message);
			}, function() {
				//On Complete - Do Something
			});
		});
	});
	
/*
	 SDK.JQuery.retrieveMultipleRecords("sabre_candidate", "?$select=processid,sabre_BankAcct,sabre_candidateId,sabre_BankNo,sabre_Communication,sabre_DateofBirth,sabre_PermittedtoWork,sabre_SIN,sabre_TD1,sabre_TD1ON,sabre_TransitNo,stageid", function(results) {
		console.log(results);

		for (var i = 0; i < results.length; i++) {
			var processid = results[i].processid; //b4ed4082-f546-4bef-85b7-ab5adf10b825 is temp, whatever the live is it aint that.
			var sabre_BankAcct = results[i].sabre_BankAcct;
			var sabre_BankNo = results[i].sabre_BankNo;
			var sabre_Communication = results[i].sabre_Communication; //set this.Value to 837770001
			var sabre_candidateId = results[i].sabre_candidateId;
			var sabre_DateofBirth = results[i].sabre_DateofBirth;
			var sabre_PermittedtoWork = results[i].sabre_PermittedtoWork; //set to true
			var sabre_SIN = results[i].sabre_SIN;
			var sabre_TD1 = results[i].sabre_TD1;
			var sabre_TD1ON = results[i].sabre_TD1ON;
			var sabre_TransitNo = results[i].sabre_TransitNo;
			var stageid = results[i].stageid; //"0de2fa53-6669-4adb-8f4d-bd1e9a4ca430" is Draft, whatever active is it aint that. "a8b62c32-08ad-0351-7487-76610e0ec581" is active //0e95b961-763c-4362-1b41-54b69824e770 payroll
			if(sabre_candidateId != null && processid == "b4ed4082-f546-4bef-85b7-ab5adf10b825"){
				var entity = {};
				entity.stageid = "a8b62c32-08ad-0351-7487-76610e0ec581";
				entity.sabre_Communication = {
					Value: 837770001
				};
				entity.sabre_PermittedtoWork = true;
				SDK.JQuery.updateRecord(sabre_candidateId, entity, "sabre_candidate", function() {
					//Success - No Return Data - Do Something
				}, function(error) {
					Xrm.Utility.alertDialog(error.message);
				});
			}
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		//On Complete - Do Something
	});*/
 }
 
 function rmExtraDigits(){
	 SDK.JQuery.retrieveMultipleRecords("sabre_position", "?$select=sabre_name,sabre_positionId", function(results) {
		for (var i = 0; i < results.length; i++) {
			
			var sabre_name = results[i].sabre_name;
			var sabre_positionId = results[i].sabre_positionId;
			if (sabre_name != null && sabre_positionId != null && sabre_name.length > 15){
				sabre_name = sabre_name.substr(2);
				var entity = {};
				entity.sabre_name = sabre_name;

				SDK.JQuery.updateRecord(sabre_positionId, entity, "sabre_position", function() {
					//Success - No Return Data - Do Something
				}, function(error) {
					Xrm.Utility.alertDialog(error.message);
				});
			}
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		//On Complete - Do Something
	});
 }
 
function rmDashFromPlacement(){
	SDK.JQuery.retrieveMultipleRecords("sabre_placement", "?$select=sabre_name,sabre_placementId", function(results) {
		console.log(results);
		for (var i = 0; i < results.length; i++) {
			var sabre_name = results[i].sabre_name;
			var sabre_placementId = results[i].sabre_placementId;
			sabre_name = sabre_name.replace("-", "");
			var entity = {};
			if(sabre_name != null && sabre_placementId != null){
				entity.sabre_name = sabre_name;

				SDK.JQuery.updateRecord(sabre_placementId, entity, "sabre_placement", function() {
					//Success - No Return Data - Do Something
				}, function(error) {
					Xrm.Utility.alertDialog(error.message);
				});
			}
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		//On Complete - Do Something
	});
}

function rmDashFromCompany(){
	SDK.JQuery.retrieveMultipleRecords("Account", "?$select=AccountId,AccountNumber", function(results) {
		console.log(results);
		
		for (var i = 0; i < results.length; i++) {
			var accountId = results[i].AccountId;
			var accountNumber = results[i].AccountNumber;
			if(accountId != null && accountNumber != null){
				accountNumber = accountNumber.replace("-", "");
				var entity = {};
				entity.AccountNumber = accountNumber;

				SDK.JQuery.updateRecord(accountId, entity, "Account", function() {
					//Success - No Return Data - Do Something
				}, function(error) {
					Xrm.Utility.alertDialog(error.message);
				});
			}
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		//On Complete - Do Something
	});
}

function adjustPositionValues(){
	SDK.JQuery.retrieveMultipleRecords("sabre_position", "?$select=OwnerId,processid,sabre_name,sabre_positionId,stageid", function(results) {
		console.log(results);
		for (var i = 0; i < results.length; i++) {
			var ownerId = results[i].OwnerId;
			var processid = results[i].processid;
			var sabre_name = results[i].sabre_name;
			var sabre_positionId = results[i].sabre_positionId;
			var stageid = results[i].stageid;
			if(sabre_positionId != null && ownerId != null && ownerId.Name != null && ownerId.Name == "David Rew"){
				if(processid != null && stageid != null){
					var entity = {};
					//entity.processid = "40a4fe76-6370-4d8d-a4f2-e9873fc71b7f";
					entity.stageid = "1da04c39-560a-81bd-0034-9ee2381ec111";
					SDK.JQuery.updateRecord(sabre_positionId
					, entity, "sabre_position", function() {
						//Success - No Return Data - Do Something
						
						
					}, function(error) {
						Xrm.Utility.alertDialog(error.message);
					});
				}
			}
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		//On Complete - Do Something
	});
	//Process 80c07e9b-4aa3-4462-827a-37f8c8ebb17a = PERM on Live 40a4fe76-6370-4d8d-a4f2-e9873fc71b7f =  TEMP on Live
	//STage 9424ae71-a347-46fc-acc8-2506b6ffe5ea = Draft(Perm JO) on live 0ade9252-e116-4bd7-9585-bbafef5f293d = Draft(Temp JO) 1da04c39-560a-81bd-0034-9ee2381ec111 = Active(Temp JO) on live.
	
}

function adjustPlacementValues(){
	SDK.JQuery.retrieveMultipleRecords("sabre_placement", "?$select=OwnerId,sabre_placementId,stageid", function(results) {
		console.log(results);
		for (var i = 0; i < results.length; i++) {
			var ownerId = results[i].OwnerId;
			var sabre_placementId = results[i].sabre_placementId;
			var stageid = results[i].stageid;
			if(ownerId != null && ownerId.Name != null && ownerId.Name == "David Rew" && sabre_placementId != null && stageid != null){
				var entity = {};
				entity.stageid = "b6814410-0b50-95b2-599a-cd599e00872b";
				SDK.JQuery.updateRecord(sabre_placementId
					, entity, "sabre_placement", function() {
						//Success - No Return Data - Do Something
						
						
					}, function(error) {
						Xrm.Utility.alertDialog(error.message);
					});
			}
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		//On Complete - Do Something
	});
	//Stage df7260f8-75a5-4744-8e37-c12ff9c2dfef = Draft Placement On Live b6814410-0b50-95b2-599a-cd599e00872b =  Active Placement on Live
	
}

function adjustCandidateValues2(){
	SDK.JQuery.retrieveMultipleRecords("sabre_candidate", "?$select=processid,OwnerId,sabre_BankAcct,sabre_candidateId,sabre_BankNo,sabre_Communication,sabre_DateofBirth,sabre_PermittedtoWork,sabre_SIN,sabre_TD1,sabre_TD1ON,sabre_TransitNo,stageid", function(results) {
		console.log(results);

		for (var i = 0; i < results.length; i++) {
			var processid = results[i].processid; //b4ed4082-f546-4bef-85b7-ab5adf10b825 is temp, whatever the live is it aint that.
			var sabre_BankAcct = results[i].sabre_BankAcct;
			var sabre_BankNo = results[i].sabre_BankNo;
			var sabre_Communication = results[i].sabre_Communication; //set this.Value to 837770001
			var sabre_candidateId = results[i].sabre_candidateId;
			var sabre_DateofBirth = results[i].sabre_DateofBirth;
			var sabre_PermittedtoWork = results[i].sabre_PermittedtoWork; //set to true
			var sabre_SIN = results[i].sabre_SIN;
			var sabre_TD1 = results[i].sabre_TD1;
			var ownerId = results[i].OwnerId;
			var sabre_TD1ON = results[i].sabre_TD1ON;
			var sabre_TransitNo = results[i].sabre_TransitNo;

			//var stageid = results[i].stageid; //"0de2fa53-6669-4adb-8f4d-bd1e9a4ca430" is Draft, whatever active is it aint that. "a8b62c32-08ad-0351-7487-76610e0ec581" is active //0e95b961-763c-4362-1b41-54b69824e770 payroll
			if(sabre_candidateId != null && ownerId != null && ownerId.Name != null && ownerId.Name == "David Rew"){
				var entity = {};
				if(sabre_BankNo != null && sabre_BankNo != ""){
					if(sabre_BankNo.length > 3){
					    sabre_BankNo = sabre_BankNo.slice(1);	
					}
					while (sabre_BankNo.length < 3){
						sabre_BankNo = "0" + sabre_BankNo;
					}
					entity.sabre_BankNo = sabre_BankNo;
				}
				SDK.JQuery.updateRecord(sabre_candidateId, entity, "sabre_candidate", function() {
					//Success - No Return Data - Do Something
				}, function(error) {
					Xrm.Utility.alertDialog(error.message);
				});
			}
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		//On Complete - Do Something
		
	});
}

function movePermitRequired(){
	SDK.JQuery.retrieveMultipleRecords("sabre_candidate", "?$select=sabre_candidateId,sabre_PermitIsRequired,sabre_PermitRequired", function(results) {
		for (var i = 0; i < results.length; i++) {
			var sabre_candidateId = results[i].sabre_candidateId;
			var sabre_PermitIsRequired = results[i].sabre_PermitIsRequired;
			var sabre_PermitRequired = results[i].sabre_PermitRequired;
			if(sabre_PermitRequired != null){
				var entity = {};
				if(sabre_PermitRequired == true){
					entity.sabre_PermitIsRequired = {
						Value: 837770001
					};
				}
				else{
					entity.sabre_PermitIsRequired = {
					    Value: 837770000
					};
				}
				SDK.JQuery.updateRecord(sabre_candidateId, entity, "sabre_candidate", function() {
					//Success - No Return Data - Do Something
				}, function(error) {
					Xrm.Utility.alertDialog(error.message);
				});
			}
		}
		//console.log(results);
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		//On Complete - Do Something
	});
}

function setDirtyStatus(){
	SDK.JQuery.retrieveMultipleRecords("Account", "?$select=AccountId,sabre_Dirty", function(results) {
		for (var i = 0; i < results.length; i++) {
			var accountId = results[i].AccountId;
			var sabre_Dirty = results[i].sabre_Dirty;
			var entity = {};
			entity.sabre_Dirty = true;

			SDK.JQuery.updateRecord(accountId, entity, "Account", function() {
				//Success - No Return Data - Do Something
			}, function(error) {
				Xrm.Utility.alertDialog(error.message);
			});
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		console.log("1/4");
		//On Complete - Do Something
	});
	
	SDK.JQuery.retrieveMultipleRecords("sabre_candidate", "?$select=sabre_candidateId,sabre_Dirty", function(results) {
		for (var i = 0; i < results.length; i++) {
			var sabre_candidateId = results[i].sabre_candidateId;
			var sabre_Dirty = results[i].sabre_Dirty;
			var entity = {};
			entity.sabre_Dirty = true;

			SDK.JQuery.updateRecord(sabre_candidateId, entity, "sabre_candidate", function() {
				//Success - No Return Data - Do Something
			}, function(error) {
				Xrm.Utility.alertDialog(error.message);
			});
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {		
		console.log("2/4");
		//On Complete - Do Something
	});
	
	SDK.JQuery.retrieveMultipleRecords("sabre_placement", "?$select=sabre_Dirty,sabre_placementId", function(results) {
		for (var i = 0; i < results.length; i++) {
			var sabre_Dirty = results[i].sabre_Dirty;
			var sabre_Placement = results[i].sabre_placementId;
			var entity = {};
			entity.sabre_Dirty = true;

			SDK.JQuery.updateRecord(sabre_Placement, entity, "sabre_placement", function() {
				//Success - No Return Data - Do Something
			}, function(error) {
				Xrm.Utility.alertDialog(error.message);
			});
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		console.log("3/4");

		//On Complete - Do Something
	});
	
	SDK.JQuery.retrieveMultipleRecords("sabre_position", "?$select=sabre_Dirty,sabre_positionId", function(results) {
		for (var i = 0; i < results.length; i++) {
			var sabre_Dirty = results[i].sabre_Dirty;
			var sabre_positionId = results[i].sabre_positionId;
			var entity = {};
			entity.sabre_Dirty = true;

			SDK.JQuery.updateRecord(sabre_positionId, entity, "sabre_position", function() {
				//Success - No Return Data - Do Something
			}, function(error) {
				Xrm.Utility.alertDialog(error.message);
			});
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		console.log("4/4");

		//On Complete - Do Something
	});
}

function updateCandidateIDs(){
	SDK.JQuery.retrieveMultipleRecords("sabre_candidate", "?$select=sabre_candidateId,sabre_CandidateNumber&$orderby=CreatedOn asc", function(results) {
		console.log(results);
		for (var i = 0; i < results.length; i++) {
			var sabre_candidateId = results[i].sabre_candidateId;
			var sabre_CandidateNumber = results[i].sabre_CandidateNumber;
			var entity = {};
			entity.sabre_CandidateNumber = "";
			entity.sabre_oldCandidateID = sabre_CandidateNumber;

			SDK.JQuery.updateRecord(sabre_candidateId, entity, "sabre_candidate", function() {
				//Success - No Return Data - Do Something
			}, function(error) {
				Xrm.Utility.alertDialog(error.message);
			});
		}
	}, function(error) {
		Xrm.Utility.alertDialog(error.message);
	}, function() {
		//On Complete - Do Something
	});
}