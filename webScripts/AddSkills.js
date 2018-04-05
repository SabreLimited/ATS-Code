<!DOCTYPE html>
<html>
<head>
    <title></title>
        <meta charset="utf-8" />
        <script type="text/javascript" src="/webresources/ClientGlobalContext.js.aspx"></script>
        <script>
			function skillCreation(){
			  var enabledProcesses = [];

			  //Code to run in the OnLoad event 
			  
			  Xrm.Page.data.process.getEnabledProcesses(function (processes) {
				//Move processes to the global Sdk.enabledProcesses array;
				for (var processId in processes) {
				  Sdk.enabledProcesses.push({ id: processId, name: processes[processId] })
				}

				//Write the values of the Sdk.enabledProcesses array to the console
				if (Sdk.enabledProcesses.length < 0) {
				  Sdk.writeToConsole("There are no enabled business process flows for this entity.");
				}
				else {
				  Sdk.writeToConsole("These are the enabled business process flows for this entity:");
				  for (var i = 0; i < Sdk.enabledProcesses.length; i++) {
					var enabledProcess == Sdk.enabledProcesses[i];
					if (enabledProcess.name = "Add Skills"){
						setActiveProcess(enabledProcess.id, function(result){
						  if(result == "invalid"){
							  alert("Invalid process ID");
						  }
						});
					}
					Sdk.writeToConsole("id: " + enabledProcess.id + " name: " + enabledProcess.name)
				  }
				}

			   //Any code that depends on the Sdk.enabledProcesses array needs to be initiated here

			  });
			}
			function changeIcon() {
				document.getElementById("pButtonImg").src="../WebResources/sabre_bluePlus"
			}
			function normalIcon() {
				document.getElementById("pButtonImg").src="../WebResources/sabre_greyPlus";
			}
		</script>
		<style type="text/css">
			#pButtonImg {display:inline-block;}
		</style>
</head>
<body onload="">
	<div class="container">
        <input id="pButtonImg" type="image" src="../WebResources/sabre_greyPlus" onmouseover="javascript: changeIcon();" onmouseout="javascript: normalIcon();" onclick="javascript: skillCreation();"/>
	</div>
</body>
</html>