function positionLock(){
	if(Xrm.Page.getControl("sabre_positionno") != null && Xrm.Page.getAttribute("sabre_positionno").getValue() != null){
		Xrm.Page.getControl("sabre_positionno").setDisabled(true);
	}
	
}

function candidateLock(){
	if(Xrm.Page.getControl("sabre_candidate") != null && Xrm.Page.getAttribute("sabre_candidate").getValue() != null){
		Xrm.Page.getControl("sabre_candidate").setDisabled(true);
	}
	
}