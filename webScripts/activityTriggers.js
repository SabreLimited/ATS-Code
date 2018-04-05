function setSubject(){
  if(Xrm.Page.getControl("subject") != null && Xrm.Page.getControl("sabre_activitytype") != null){
    console.log(Xrm.Page.getAttribute("sabre_activitytype").getText());
    Xrm.Page.getAttribute("subject").setValue(Xrm.Page.getAttribute("sabre_activitytype").getText());
  }
}