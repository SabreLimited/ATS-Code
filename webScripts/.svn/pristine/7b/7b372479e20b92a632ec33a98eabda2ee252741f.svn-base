function createSharedPosition(){
	var object = new Object();
	var lookupObject = new Object();
	var datObj = new Object();
	var varId;
	var varLabel;
	
	if(window.parent.Xrm.Page.getControl("sabre_wagetype")!= null){
		lookupObject = window.parent.Xrm.Page.getAttribute("sabre_wagetype").getValue();
		object.sabre_WageType = {Value: lookupObject};  
	}
	if(window.parent.Xrm.Page.getControl("sabre_name")!= null){
		object.sabre_name = window.parent.Xrm.Page.getAttribute("sabre_name").getValue();										
	}
	if(window.parent.Xrm.Page.getControl("sabre_dutiesandresponsibilities")!= null){
		object.sabre_DutiesandResponsibilities = window.parent.Xrm.Page.getAttribute("sabre_dutiesandresponsibilities").getValue();
	}
	if(window.parent.Xrm.Page.getControl("sabre_specialrequirementsandconditions")!= null){
		object.sabre_SpecialRequirementsandConditions = window.parent.Xrm.Page.getAttribute("sabre_specialrequirementsandconditions").getValue();  
	}
	if(window.parent.Xrm.Page.getControl("sabre_type")!= null){
		lookupObject = window.parent.Xrm.Page.getAttribute("sabre_type").getValue();
		object.sabre_Type = {Value: lookupObject};  
	}
	if(window.parent.Xrm.Page.getControl("sabre_pay_rate")!= null){
		object.sabre_PayRate = window.parent.Xrm.Page.getAttribute("sabre_pay_rate").getValue();
	}
	
	varId = window.parent.Xrm.Page.data.entity.getId();
	varId = varId.slice(1, -1);
	varLabel = window.parent.Xrm.Page.getAttribute("sabre_name").getValue();
	object.sabre_SourcePosition = { Id: varId, Name: varLabel};

	
	SDK.JQuery.createRecord(
		object,
		"sabre_sharedposition",
		function (val) {
		//function runs on success of createRecord, enter logic here if needed.
		alert("Shared Position successfully created!");
		},
		errorHandler
	);
}

function errorHandler(error){
	alert(error.message);
}