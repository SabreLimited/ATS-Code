function signedPaperwork(){
	//if true set sign date visibility true as well
	if(Xrm.Page.getControl("sabre_signedpaperwork") != null && Xrm.Page.getAttribute("sabre_signedpaperwork").getValue() == 1){
		Xrm.Page.getControl("sabre_signingdate").setVisible(true);
	}
	else{
		Xrm.Page.getControl("sabre_signingdate").setVisible(false);

	}
}

function doNotContact(){

	if(Xrm.Page.getControl("sabre_donotcontact") != null && Xrm.Page.getAttribute("sabre_donotcontact").getValue() == 1){
		Xrm.Page.ui.setFormNotification("Do not contact this individual.", "WARNING");
	}
	else{

	}
}

function hidePosts(){
	if(parent!=null && parent.parent!=null && parent!=undefined && parent.parent!=undefined){
		var contentPanel=parent.parent.document.getElementById("crmContentPanel");
		if(contentPanel!=null && contentPanel!=undefined){
			var contentFrame=contentPanel.children.contentIFrame0.contentWindow;
			if(contentFrame!=null && contentFrame!=undefined){
				var controlEle=contentFrame.document.getElementById("header_notescontrol");
				if(controlEle!=null && controlEle!=undefined&& controlEle.children!=null && controlEle.children.length>0){
					for(var i=0;i<controlEle.children.length;i++){
						var ctrl=controlEle.children[i];
						if(ctrl.title=="ONENOTE" || ctrl.title=="POSTS"){
							ctrl.style.display="none";
							if(i+1<controlEle.children.length){
								controlEle.children[i+1].click();
							}
							else if(i-1>=0){
								controlEle.children[i-1].click();
							}
						}
					}
				}
				else{
					setTimeout(HidePosts, 1000);
				}
			}
		}
	}
}

function pullFromAccount(){
	if(confirm("Should the Contact address be set to the Account's address?")){
		if(Xrm.Page.getControl("parentcustomerid") != null && Xrm.Page.getControl("parentcustomerid") != undefined){
			var accountObject = Xrm.Page.getAttribute("parentcustomerid").getValue();
			var accountId = accountObject[0].id;
			accountId = accountId.slice(1, -1);
			
			SDK.JQuery.retrieveRecord(
				accountId,
				"Account",
				null,
				null,
				function (account){
					//success
					if(Xrm.Page.getAttribute("address1_composite") != null && account.Address1_Composite != null){
						Xrm.Page.getAttribute("address1_composite").setValue(account.Address1_Composite);
					}
					if(Xrm.Page.getAttribute("address1_city") != null && account.Address1_City != null){
						Xrm.Page.getAttribute("address1_city").setValue(account.Address1_City);
					}
					if(Xrm.Page.getAttribute("address1_country") != null && account.Address1_Country != null){
						Xrm.Page.getAttribute("address1_country").setValue(account.Address1_Country);
					}
					if(Xrm.Page.getAttribute("sabre_country") != null && account.sabre_Country != null){
						Xrm.Page.getAttribute("sabre_country").setValue(account.sabre_Country);
					}
					if(Xrm.Page.getAttribute("address1_county") != null && account.Address1_County != null){
						Xrm.Page.getAttribute("address1_county").setValue(account.Address1_County);
					}
					if(Xrm.Page.getAttribute("address1_line1") != null && account.Address1_Line1 != null){
						Xrm.Page.getAttribute("address1_line1").setValue(account.Address1_Line1);
					}
					if(Xrm.Page.getAttribute("address1_line2") != null && account.Address1_Line2 != null){
						Xrm.Page.getAttribute("address1_line2").setValue(account.Address1_Line2);
					}
					if(Xrm.Page.getAttribute("address1_line3") != null && account.Address1_Line3 != null){
						Xrm.Page.getAttribute("address1_line3").setValue(account.Address1_Line3);
					}
					if(Xrm.Page.getAttribute("address1_stateorprovince") != null && account.Address1_StateOrProvince != null){
						Xrm.Page.getAttribute("address1_stateorprovince").setValue(account.Address1_StateOrProvince);
					}
					if(Xrm.Page.getAttribute("address1_postalcode") != null && account.Address1_PostalCode != null){
						Xrm.Page.getAttribute("address1_postalcode").setValue(account.Address1_PostalCode);
					}
					if(Xrm.Page.getAttribute("address1_name") != null && account.Address1_Name != null){
						Xrm.Page.getAttribute("address1_name").setValue(account.Address1_Name);
					}
					
					
				},
				errorHandler
			);
		}
	}
	
}

function errorHandler(error){
	alert(error.message);
}

function addressCompositeRelabel(){
		//Address 2 is not on this page right now.
		Xrm.Page.getControl("address1_composite_compositionLinkControl_address1_line1").setLabel("Address");
		//Xrm.Page.getControl("address2_composite_compositionLinkControl_address2_line1").setLabel("Address");
		Xrm.Page.getControl("address1_composite_compositionLinkControl_address1_line2").setLabel("Unit");
		//Xrm.Page.getControl("address2_composite_compositionLinkControl_address2_line2").setLabel("Unit");
}

function sendContactEmail(args){
	mailTarget = "mailto:?bcc=";
	if(args.length > 0){
		for (i = 0; i < args.length; i++){
			if(args[i].Id != null && args[i].TypeName != null){
				var contactId = args[i].Id;
				contactId = contactId.replace("{","").replace("}","");
				var req = new XMLHttpRequest();
				req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/contacts("+contactId+")?$select=emailaddress1", false);
				req.setRequestHeader("OData-MaxVersion", "4.0");
				req.setRequestHeader("OData-Version", "4.0");
				req.setRequestHeader("Accept", "application/json");
				req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
				req.onreadystatechange = function() {
					if (this.readyState === 4) {
						req.onreadystatechange = null;
						if (this.status === 200) {
							var result = JSON.parse(this.response);
							var emailaddress1 = result["emailaddress1"];
							if(args.length == 1){
								//window.location.href = "mailto:" + emailaddress1;
								mailTarget = "mailto:" + emailaddress1;
							}
							else if(i==0){
								mailTarget = mailTarget + emailaddress1;
							}
							else{
								mailTarget = mailTarget + ", " + emailaddress1;
							}
						} else {
							//Xrm.Utility.alertDialog(this.statusText);
						}
					}
				};
				req.send();
			}
		}
		window.location.href = mailTarget;
	}
}