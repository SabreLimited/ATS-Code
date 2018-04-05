//Calculates the Regular Charge rate given that two other fields are filled in.
function calculateRegCharge(){
  if (Xrm.Page.getControl("sabre_feetype") != null && Xrm.Page.getControl("sabre_feevalue") != null && Xrm.Page.getControl("sabre_regularwages") != null){
    if(Xrm.Page.getAttribute("sabre_feetype").getValue() == 0){
	   Xrm.Page.getControl("sabre_regularwages");
	   var regCharge = Xrm.Page.getAttribute("sabre_regularwages").getValue() + Xrm.Page.getAttribute("sabre_feevalue").getValue();
	}
	else{
	   Xrm.Page.getControl("sabre_regularwages");
	   var regCharge = Xrm.Page.getAttribute("sabre_regularwages").getValue() * (((Xrm.Page.getAttribute("sabre_feevalue").getValue())/100) + 1);
	}
	Xrm.Page.getControl("sabre_regularchargerate");
	Xrm.Page.getAttribute("sabre_regularchargerate").setValue(regCharge);
	if(Xrm.Page.getControl("sabre_overtimechargerate") != null){
		Xrm.Page.getAttribute("sabre_overtimechargerate").setValue(regCharge * 1.5);
	}
  }

}

function calculateRegChargeRework(){
	if (Xrm.Page.getControl("sabre_fee") != null && Xrm.Page.getControl("sabre_feecost") != null && Xrm.Page.getControl("sabre_regularwages") != null){
	    if(Xrm.Page.getAttribute("sabre_fee").getValue() == 837770000){ //If Fixed Rate Per Week.
			var regCharge = Xrm.Page.getAttribute("sabre_feecost").getValue();

		}
		else if(Xrm.Page.getAttribute("sabre_fee").getValue() == 837770001){ //else if percent of salary
			Xrm.Page.getControl("sabre_regularwages");
			var regCharge = Xrm.Page.getAttribute("sabre_regularwages").getValue() * Xrm.Page.getAttribute("sabre_feecost").getValue();
		}
		else if(Xrm.Page.getAttribute("sabre_fee").getValue() == 837770002){ //else if flat fee
			Xrm.Page.getControl("sabre_regularwages");
			var regCharge = Xrm.Page.getAttribute("sabre_regularwages").getValue() + Xrm.Page.getAttribute("sabre_feecost").getValue();
		}
		else{
			var regCharge = 0;
		}
		Xrm.Page.getControl("sabre_regularchargerate");
		Xrm.Page.getAttribute("sabre_regularchargerate").setValue(regCharge);
		if(Xrm.Page.getControl("sabre_overtimechargerate") != null){
			Xrm.Page.getAttribute("sabre_overtimechargerate").setValue(regCharge * 1.5);
		}
	}
}