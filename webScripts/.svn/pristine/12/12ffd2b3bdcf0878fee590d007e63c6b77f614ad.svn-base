// JScript source code 
function LetterOnLoad() { 
    var context = Xrm.Page.context; 
    var serverUrl = context.getServerUrl(); 
    var ODATA_ENDPOINT = "/api/data/v8.0; 
    var CRMObject = new Object(); 
    ///////////////////////////////////////////////////////////// 
    // Specify the ODATA entity collection 
    var ODATA_EntityCollection = "/sabre_openingSet"; 
    ///////////////////////////////////////////////////////////// 
    // Define attribute values for the CRM object you want created 
	var lookupFieldObject = Xrm.Page.data.entity.attributes.get('sabre_PositionNo');
    CRMObject.sabre_name = "TEST-0001";
    //Parse the entity object into JSON 
    var jsonEntity = window.JSON.stringify(CRMObject); 
    //Asynchronous AJAX function to Create a CRM record using OData 
    $.ajax({ type: "POST", 
        contentType: "application/json; charset=utf-8", 
        datatype: "json", 
        url: serverUrl + ODATA_ENDPOINT + ODATA_EntityCollection, 
        data: jsonEntity, 
        beforeSend: function (XMLHttpRequest) { 
            //Specifying this header ensures that the results will be returned as JSON. 
            XMLHttpRequest.setRequestHeader("Accept", "application/json"); 
        }, 
        success: function (data, textStatus, XmlHttpRequest) { 
            alert("success"); 
            var NewCRMRecordCreated = data["d"]; 
            alert("CRM GUID created: " + NewCRMRecordCreated.sabre_openingId); 
        }, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
            alert("failure"); 
        } 
    }); 
}