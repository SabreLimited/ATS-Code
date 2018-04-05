function LdCSS() {
var path="../WebResources/sabre_NEWCSS";
var head = top.document.getElementsByTagName('head')[0];
var link = top.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = path;
link.media = 'all';
head.appendChild(link);
console.log(head);
console.log(top.document.body.children);
var c = top.document.body.children;
for(var i = 0; i< c.length; i++){
	if(c[i].childNodes.length > 0){
		colorRed(c[i]);
	}
	c[i].style.backgroundColor = "red";
}
//var classes = top.document.getElementById('Candidate Name_label');
//console.log(classes);
//	classes.style = "color: red;";
console.log(top.document.body.children);
}
function colorRed(obj){
	if(obj.childNodes != null && obj.childNodes >0){
		for (var i = 0; i<obj.childNodes.length; i++){
			colorRed(obj.childNodes[i]);
		}
	}
	obj.style.backgroundColor = "red";
	obj.style.color = "red";
}
function LoadCSS() {
 var path = "../WebResources/sabre_NEWCSS";
 var head = document.getElementsByTagName('head')[0];
 var link = document.createElement('link');
 link.rel = 'stylesheet';
 link.type = 'text/css';
 link.href = path;
 link.media = 'all';
 head.appendChild(link);
}
 
