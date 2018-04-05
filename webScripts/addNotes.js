function AddNotes() {
	Xrm.Page.getControl("sabre_NoofOpenings");
    var noof = Xrm.Page.getAtrribute("sabre_NoofOpenings").getValue();
	Xrm.Page.getControl("sabre_OldNoofOpenings");
	var oldnoof = Xrm.Page.getAtrribute("sabre_OldNoofOpenings").getValue();
	if (oldnoof == null){
		oldnoof = 0;
	}
	if (noof == null){
		noof = 0;
	}
    var noteText = "Number of openings changed from " + oldnoof + " to " + noof + ".";
    var positionId = Xrm.Page.data.entity.getId();
    var serverUrl = Xrm.Page.context.getServerUrl().toString();
    var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc";
    var objAnnotation = new Object();
    var ODATA_EntityCollection = "/AnnotationSet";
    objAnnotation.NoteText = noteText;
    objAnnotation.Subject = "Note Subject";

    var refPosition = new Object();
    refPosition.LogicalName = "sabre_position";
    refPosition.Id = sabre_positionId;

    objAnnotation.ObjectId = refPosition;
    objAnnotation.ObjectTypeCode = refPosition.LogicalName;

    // Parse the entity object into JSON 
    var jsonEntity = window.JSON.stringify(objAnnotation);

    // Asynchronous AJAX function to Create a CRM record using OData 
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        url: serverUrl + ODATA_ENDPOINT + ODATA_EntityCollection,
        data: jsonEntity,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + "; ErrorThrown: " + errorThrown);
        }
    });
}