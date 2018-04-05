function getAnnotation(){
	var serverUrl = Xrm.Page.context.getClientUrl();
	//console.log("something\n");
    var url = [""];
	url[0] = "" + serverUrl + "/Activities/Attachment/download.aspx?AttachmentType=5&AttachmentId=" //need id of note with attachment

	var idString = Xrm.Page.data.entity.getId();
	idString = idString.slice(1, -1);
	//console.log(idString);
	SDK.JQuery.retrieveMultipleRecords(
		"Annotation",
		"$filter=ObjectId/Id eq guid'" + idString +"'",
		returnHandler,
		errorHandler,
		function(){
		//OnComplete Handler
		}											
	);

	//console.log("beautiful\n");
	//url[0] = url[0] + attachmentId;
	//url[0] = url[0] + "&IsNotesTabAttachment=1&"
	
}

function returnHandler(results){
	var i = 0;
	if (results[i] != null){
		console.log(results[i]);
		var temp = results[i].ObjectId;
		//console.log(temp);
		//Xrm.Utility.openEntityForm("annotation", temp.Id);
		var serverUrl = Xrm.Page.context.getClientUrl();
		var url = "" + serverUrl + "/Activities/Attachment/download.aspx?AttachmentType=5&amp;AttachmentId=" + temp.Id;
        testPluginPass(results[i].AnnotationId);
		var decodedText = window.atob(results[i].DocumentBody);
		//console.log(decodedText);
		i++;
	}
}

function errorHandler(error){
  alert(error.message);
}

function openFile(event){
	reader = new FileReader();
	var temp = event.target
	reader.onload = function (/*evt*/){
		//console.log(reader.result);
		//console.log(input[0].files[0]);
		//console.log(input[0].files[0].type);
		//console.log(input[0].files[0].name);
		//console.log(event.path[0]);
		var string = uintToString(reader.result);
		//console.log(string);
		var str = arrayBufferToBase64(reader.result);
		createNote("Resume Upload", "Description", str, input[0].files[0].name, input[0].files[0].type);
		//console.log(str);
	}
	fileName = reader.result;
	reader.readAsArrayBuffer(temp.files[0]);

}

function uintToString(uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

function createFileDialog(){
	input = $(document.createElement('input'));
	input.attr('type', 'file');
	input.attr('onchange', 'openFile(event)');
}

function createDocument(){
	window.parent.Xrm.Page.data.save();
	if (confirm("Do you wish to upload this file as a resume?")){
		createFileDialog(true);
	}
	else{
		createFileDialog(false);
	}
	input.trigger("click"); // opening dialog

}

function arrayBufferToBase64(buffer){
	var binary = '';
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);

}

function createNote(title, description, docBody, fName, mType){
	var runAsNormal = true;
	if(runAsNormal == false){
		var entity = {};
		entity.sabre_name = "Testing";
		
		SDK.REST.createRecord(
			entity,
			"sabre_dummy",
			function (result) {
				console.log(result);
			},
			function (error) {
				Xrm.Utility.alertDialog(error.message, null);
			}
		);
	}
	else if(runAsNormal == true){
		var entity = {};
		if (docBody != null & fName != null & mType != null) {
			entity.DocumentBody = docBody;
			entity.FileName = fName;
			entity.MimeType = mType;
		}
		var objectId = window.parent.Xrm.Page.data.entity.getId();
		  
		//refObject is defining which object the Note will be attached to.
		var refObject = new Object();
		refObject.LogicalName = "sabre_candidate";
		refObject.Id = objectId;
		entity.ObjectId = refObject;
		entity.ObjectTypeCode = refObject.LogicalName;
		entity.Subject = title;
		entity.NoteText = description;
		SDK.REST.createRecord(
			entity,
			"Annotation",
			function (result) {
				var newEntityId = result.AnnotationId;
				testPluginPass(newEntityId);
			},
			function (error) {
				Xrm.Utility.alertDialog(error.message, null);
			}	
		);
	}
}

function getAnnotation2(){
	var serverUrl = Xrm.Page.context.getClientUrl();
	//console.log("something\n");
    var url = [""];
	url[0] = "" + serverUrl + "/Activities/Attachment/download.aspx?AttachmentType=5&AttachmentId=" //need id of note with attachment

	var idString = Xrm.Page.data.entity.getId();
	idString = idString.slice(1, -1);
	//console.log(idString);
	SDK.JQuery.retrieveMultipleRecords(
		"Annotation",
		"$filter=ObjectId/Id eq guid'" + idString +"'",
		function(results){
			console.log(results);
			},
		errorHandler,
		function(){
		//OnComplete Handler
		}											
	);
}

function createFileDialog(process){
	input = $(document.createElement('input'));
	input.attr('type', 'file');
	if(process){
		input.attr('onchange', 'openFile(event)');
	}
	else{
		input.attr('onchange', 'openFileFalse(event)');
	}
}

function createDocument2(){
	window.parent.Xrm.Page.data.save();
	createFileDialog(false);
	input.trigger("click"); // opening dialog

}

function openFileFalse(event){
	reader = new FileReader();
	var temp = event.target
	reader.onload = function (){
		var string = uintToString(reader.result);
		var str = arrayBufferToBase64(reader.result);
		createNoteFalse("File Upload", "Description", str, input[0].files[0].name, input[0].files[0].type);
	}
	fileName = reader.result;
	reader.readAsArrayBuffer(temp.files[0]);

}

function createNoteFalse(title, description, docBody, fName, mType){
	var entity = {};
	if (docBody != null & fName != null & mType != null) {
		entity.DocumentBody = docBody;
		entity.FileName = fName;
		entity.MimeType = mType;
	}
	var objectId = window.parent.Xrm.Page.data.entity.getId();
	  
	//refObject is defining which object the Note will be attached to.
	var refObject = new Object();
	refObject.LogicalName = "sabre_candidate";
	refObject.Id = objectId;
	entity.ObjectId = refObject;
	entity.ObjectTypeCode = refObject.LogicalName;
	entity.Subject = title;
	entity.NoteText = description;
	SDK.REST.createRecord(
		entity,
		"Annotation",
		function (result) {
			var newEntityId = result.AnnotationId;
		},
		function (error) {
			Xrm.Utility.alertDialog(error.message, null);
		}
	);
}