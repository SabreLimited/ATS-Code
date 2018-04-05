function documentPreview(){



    var idString = Xrm.Page.data.entity.getId();
	idString = idString.slice(1, -1);
	//console.log(idString);
	SDK.JQuery.retrieveMultipleRecords(
		"Annotation",
		"$filter=ObjectId/Id eq guid'" + idString +"'",
		returnAnnotation,
		errorHandler,
		function(){
		//OnComplete Handler
		}											
	);
	
	
	
	
}

function returnAnnotation(result){
    if (result != null && result.length > 0){
		var idString = Xrm.Page.data.entity.getId();
	    idString = idString.slice(1, -1);
		var URL = "https://" + Xrm.Page.context.getServerUrl().toString() + "/userdefined/edit.aspx?etc=5&id=" + idString;
		$.get(URL, function (data) {
                var WRPCTokenElement = $(data).find("[WRPCTokenUrl]");
                if(WRPCTokenElement)
                {
                    var WRPCTokenUrl = WRPCTokenElement.attr("WRPCTokenUrl");
                    if (WRPCTokenUrl) {
                        URL = "/Activities/Attachment/download.aspx?AttachmentType=5&AttachmentId={" + annotation.id + "}&IsNotesTabAttachment=undefined" + WRPCTokenUrl;
                        window.open(URL);
                    }
                }
            });
	}	
}


