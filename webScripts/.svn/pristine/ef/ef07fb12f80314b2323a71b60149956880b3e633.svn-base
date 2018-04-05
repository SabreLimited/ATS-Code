function hideByPositionType(){

    var visibilityControl = isFullTimePosition();
	if(Xrm.Page.getControl("sabre_salary") != null){
      Xrm.Page.getControl("sabre_salary").setVisible(visibilityControl);
	}
	//Xrm.Page.getControl("sabre_from").setVisible(!visibilityControl);//removed sabre_from
	//Xrm.Page.getControl("sabre_to").setVisible(!visibilityControl); //removed billto
	
}

function isFullTimePosition(){
    if(Xrm.Page.getControl("sabre_type") != null){
	    if(Xrm.Page.getAttribute("sabre_type").getValue() == 837770001){
		    return true;
		}
		else{
		    return false;
		}
	}
	return false;

}

function stateVisibility(){
	if(Xrm.Page.ui.getFormType() == 6){
		return;
	}
  if(Xrm.Page.getControl("sabre_country") != null && Xrm.Page.getAttribute("sabre_country").getValue() != null){
	var i = 0;
	var j = 0;
	if(Xrm.Page.getAttribute("sabre_country").getValue() == 837770000){
		setVisibleStates(837770050, 837770063); //range for CA provinces
	}
	else if (Xrm.Page.getAttribute("sabre_country").getValue() == 837770001){
		setVisibleStates(837770000, 837770050); //range for US States
	}
	else{
		setVisibleStates(837770000, 837770063); //all
	}
  }
}

function setVisibleStates(lowerBound, upperBound){
	var optionSet = Xrm.Page.ui.controls.get("sabre_stateprovince");
	//console.log(optionSet);
	if (optionSet != null && optionSet.getAttribute() != null && optionSet.getAttribute().getOptions() != null){
		var optionSetValues = optionSet.getAttribute().getOptions();
		for( i = 837770000; i< 837770063;i++){
			Xrm.Page.getControl("sabre_stateprovince").removeOption(i);
		}
		//add states
		for(i = lowerBound; i<upperBound;i++){
			var tempOption = new Object();
			tempOption.value = i;
			for(j = 0; j<optionSetValues.length; j++){
				if(optionSetValues[j].value == i){
					tempOption.text = optionSetValues[j].text;
				}
			}
			Xrm.Page.getControl("sabre_stateprovince").addOption(tempOption);
			
		}
	}
}

function onCountryChange2(){
  if(Xrm.Page.getControl("sabre_country2") != null && Xrm.Page.getAttribute("sabre_country2").getValue() != null){

	//var optionSet = Xrm.Page.ui.controls.get("sabre_usstate");
	//console.log(optionSet.getAttribute().getOptions());
	//var optionSetValues = optionSet.getAttribute().getOptions();
	var i = 0;
	var j = 0;
	if(Xrm.Page.getAttribute("sabre_country2").getValue() == 837770000){
		setVisibleStates2(837770050, 837770063); //range for CA provinces
	}
	else if (Xrm.Page.getAttribute("sabre_country2").getValue() == 837770001){
		setVisibleStates2(837770000, 837770050); //range for US States
	}
	else{
		setVisibleStates2(837770000, 837770063); //all
	}

  }
}

function setVisibleStates2(lowerBound, upperBound){
	var optionSet = Xrm.Page.ui.controls.get("sabre_usstate");
	var optionSetValues = optionSet.getAttribute().getOptions();
	for( i = 837770000; i< 837770063;i++){
			    Xrm.Page.getControl("sabre_usstate").removeOption(i);
			}
			//add states
			for(i = lowerBound; i<upperBound;i++){
				var tempOption = new Object();
				tempOption.value = i;
				for(j = 0; j<optionSetValues.length; j++){
					if(optionSetValues[j].value == i){
						tempOption.text = optionSetValues[j].text;
					}
				}
				Xrm.Page.getControl("sabre_usstate").addOption(tempOption);
				//console.log(tempOption);
				
			}
}

function hideByPlacementType(){
    if(Xrm.Page.ui.getFormType() != 6){
		var visibilityControl = isFullTimePlacement();
		Xrm.Page.getControl("sabre_overtimewages").setVisible(!visibilityControl);
		Xrm.Page.getControl("sabre_overtimechargerate").setVisible(!visibilityControl);
		Xrm.Page.getControl("sabre_overtime2wages").setVisible(!visibilityControl);
		Xrm.Page.getControl("sabre_overtime2chargerate").setVisible(!visibilityControl);
		Xrm.Page.getControl("sabre_statutorywages").setVisible(!visibilityControl);
		Xrm.Page.getControl("sabre_statutorychargerate").setVisible(!visibilityControl);
	}
}

function isFullTimePlacement(){
    if(Xrm.Page.getControl("sabre_wagetype") != null){
	    if(Xrm.Page.getAttribute("sabre_wagetype").getValue() == 837770000){
		    return true;
		}
		else{
		    return false;
		}
	}
	return false;

}

function hideByVacationPay(){
	if(Xrm.Page.ui.getFormType() != 6){
		if(Xrm.Page.getControl("sabre_vacationpay") != null){
			var visibilityControl = hasVacationPay();
			Xrm.Page.getControl("sabre_vacationvalue").setVisible(visibilityControl);
		}
	}
}

//returns whether or not there is vacation pay associated with the job.
function hasVacationPay(){
	if(Xrm.Page.getAttribute("sabre_vacationpay").getValue() == 1){
		return true;
	}
	else{
		return false;
	}
	
}

function hideSecondAffiliate(){
	if(Xrm.Page.ui.getFormType() != 6){
		var visibilityControl = hasFirstAffiliate();
		Xrm.Page.getControl("sabre_affiliate2").setVisible(visibilityControl);
		Xrm.Page.getControl("sabre_splitpercent2").setVisible(visibilityControl);
	}
}

//returns whether or not there is vacation pay associated with the job.
function hasFirstAffiliate(){
	if(Xrm.Page.getAttribute("sabre_affiliate") != null && Xrm.Page.getAttribute("sabre_affiliate").getValue() != null){
		var tempObject = Xrm.Page.getAttribute("sabre_affiliate").getValue();
		if(tempObject[0].name != null){
			return true;
		}
		else{
			return false;
		}

    }
    return false;
}