//variables determine which tab/section to show if admin
var section;
var tab;

//function hides a section of the Candidate page and then determines whether the user is an admin
function checkAdminStatus(){ //no longer needed.
  tab = "{e6114c50-374d-440e-8a1d-9e0f0921cf96}";
  section = "{e6114c50-374d-440e-8a1d-9e0f0921cf96}_section_5";
  Xrm.Page.ui.tabs.get(tab).sections.get(section).setVisible(false);
  checkUserRole("System Administrator");

}

//function hides a section of the Position page and then determines whether the user is an admin
function checkAdminStatusPosition(){
  tab = "tab_3";
  section = "{7905de18-7be8-4cd5-9eb4-dba71e481376}_section_6";
  Xrm.Page.ui.tabs.get(tab).sections.get(section).setVisible(false);
  checkUserRole("System Administrator");

}

/*function cASTopCandidate(){
	section = "{e6114c50-374d-440e-8a1d-9e0f0921cf96}_section_7";
	tab = "{e6114c50-374d-440e-8a1d-9e0f0921cf96}";
	Xrm.Page.ui.tabs.get(tab).sections.get(section).setVisible(false);
	checkUserRole("System Administrator");
	checkUserRole("Donaldson and James Sales Rep");
	
}*/

//function sets up the REST call to determine whether to reveal the page section
function checkUserRole(role){

	var options = "$select=RoleId&$filter=Name eq '" + role + "'";
    SDK.REST.retrieveMultipleRecords("Role", options, retrieveRecordsCallback, errorFunction, recordsReturned);
	
}

//called if there is no error in the function's execution
//function iterates through returned information and reveals hidden section
//if a match between current user and returned roleId is found
function retrieveRecordsCallback(retrievedRecords){
	var totalRecordCount = retrievedRecords.length;
    var userRoles = Xrm.Page.context.getUserRoles();
	for (var i = 0; i < retrievedRecords.length; i++) {
	    var current = retrievedRecords[i];
		for(var j = 0; j<userRoles.length; j++){
            if (userRoles[j] == current.RoleId){
	            Xrm.Page.ui.tabs.get(tab).sections.get(section).setVisible(true);

		    }
        }		  
	}

}

//function called if error found retrieveMultipleRecords Function call
function errorFunction(){
	alert("error!");
}

//function called upon end of function
function recordsReturned(){
}