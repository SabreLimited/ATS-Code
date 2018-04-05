/** @license Copyright (c) Microsoft Corporation. All rights reserved. */
var MscrmControls;(function(MscrmControls){var CommonAppMagic;(function(CommonAppMagic){var Core;(function(Core){var Disposable=function(){function Disposable(){this._disposed=false;this._trackingKeys=[];this._trackedAnonymousObjects=[];this.self=this}Object.defineProperty(Disposable.prototype,"isDisposed",{"get":function(){return this._disposed},enumerable:true,configurable:true});Disposable.prototype.dispose=function(){if(this._disposed)return;for(var i=0,len=this._trackingKeys.length;i<len;i++){var key=this._trackingKeys[i];this._disposeItem(this.self[key]);this.self[key]=null}this._disposeAnonymousObjects();this._trackingKeys=[];this._disposed=true};Disposable.prototype._disposeAnonymousObjects=function(){for(var i=0,len=this._trackedAnonymousObjects.length;i<len;i++){var disposable=this._trackedAnonymousObjects[i];this._disposeItem(disposable)}this._trackedAnonymousObjects=[]};Disposable.prototype._disposeItem=function(obj){if(obj instanceof Array){for(var i=0,len=obj.length;i<len;i++)this._disposeItem(obj[i]);obj.splice(0)}else!MscrmCommon.ControlUtils.Object.isNullOrUndefined(obj)&&typeof obj.dispose==="function"&&obj.dispose()};Disposable.prototype.track=function(key,obj){this._disposeItem(this.self[key]);this.self[key]=obj;this._trackingKeys.indexOf(key)===-1&&this._trackingKeys.push(key)};Disposable.prototype.trackObjectProperties=function(key,obj){this.track(key,obj);for(var propertyName in obj){var property=obj[propertyName];typeof property.dispose==="function"&&this.trackAnonymous(property)}};Disposable.prototype.trackAnonymous=function(obj){var idx=this._trackedAnonymousObjects.indexOf(obj);idx===-1&&this._trackedAnonymousObjects.push(obj)};return Disposable}();Core.Disposable=Disposable})(Core=CommonAppMagic.Core||(CommonAppMagic.Core={}))})(CommonAppMagic=MscrmControls.CommonAppMagic||(MscrmControls.CommonAppMagic={}))})(MscrmControls||(MscrmControls={}));var __extends=this&&this.__extends||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d}__.prototype=b.prototype;d.prototype=new __},MscrmControls;(function(MscrmControls){var CommonAppMagic;(function(CommonAppMagic){var Core;(function(Core){var KnockoutDisposable=function(_super){__extends(KnockoutDisposable,_super);function KnockoutDisposable(){_super.apply(this,arguments);this._trackedObservableSubscriptions=[]}KnockoutDisposable.prototype.dispose=function(){_super.prototype.dispose.call(this);this._disposeObservableSubscriptions()};KnockoutDisposable.prototype._disposeObservableSubscriptions=function(){for(var i=0,len=this._trackedObservableSubscriptions.length;i<len;i++){var subscription=this._trackedObservableSubscriptions[i];subscription.dispose()}this._trackedObservableSubscriptions=[]};KnockoutDisposable.prototype.trackObservable=function(key,obj){this.track(key,obj);var originalValue=obj();!MscrmCommon.ControlUtils.Object.isNullOrUndefined(originalValue)&&this._trackedAnonymousObjects.indexOf(originalValue)===-1&&this._trackedAnonymousObjects.push(originalValue);var subscription=obj.subscribe(function(newValue){var idx=this._trackedAnonymousObjects.indexOf(newValue);idx===-1&&this._trackedAnonymousObjects.push(newValue)}.bind(this));this._trackedObservableSubscriptions.push(subscription)};return KnockoutDisposable}(Core.Disposable);Core.KnockoutDisposable=KnockoutDisposable})(Core=CommonAppMagic.Core||(CommonAppMagic.Core={}))})(CommonAppMagic=MscrmControls.CommonAppMagic||(MscrmControls.CommonAppMagic={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var CommonAppMagic;(function(CommonAppMagic){var Core;(function(Core){var EventTracker=function(_super){__extends(EventTracker,_super);function EventTracker(){_super.apply(this,arguments);this._trackedEvents=[]}EventTracker.prototype.add=function(dispatcher,eventName,handler,target){this._add(dispatcher,eventName,handler,target,false)};EventTracker.prototype.addCapture=function(dispatcher,eventName,handler,target){this._add(dispatcher,eventName,handler,target,true)};EventTracker.prototype._add=function(dispatcher,eventName,handler,target,useCapture){this.remove(dispatcher,eventName);if(target)handler=this._bind(handler,target,eventName);dispatcher.addEventListener(eventName,handler,useCapture);this._trackedEvents.push({dispatcher:dispatcher,eventName:eventName,handler:handler,useCapture:useCapture})};EventTracker.prototype.remove=function(dispatcher,eventName){var i=this._trackedEvents.length;while(i--){var item=this._trackedEvents[i];if(item.dispatcher===dispatcher&&item.eventName===eventName){item.dispatcher.removeEventListener(item.eventName,item.handler,item.useCapture);this._unbind(item.handler);this._trackedEvents.splice(i,1)}}};EventTracker.prototype.removeAll=function(){for(var i=0,len=this._trackedEvents.length;i<len;i++){var item=this._trackedEvents[i];item.dispatcher.removeEventListener(item.eventName,item.handler,item.useCapture);this._unbind(item.handler)}this._trackedEvents=[]};EventTracker.prototype._bind=function(functionToBind,boundObject,eventName){var objectToBindTo={},thisPropertyName="_boundThis_"+(eventName?eventName:"");eventName=null;objectToBindTo[thisPropertyName]=boundObject;boundObject=null;var ret=function(){var object=this[this.thisPropertyName];if(object===null||object===undefined)return function(){};return functionToBind.apply(object,arguments)}.bind(objectToBindTo);ret._bindInfo=objectToBindTo;ret._bindInfo.thisPropertyName=thisPropertyName;thisPropertyName=null;objectToBindTo=null;return ret};EventTracker.prototype._unbind=function(functionToUnbind){if(functionToUnbind._bindInfo){var bindInfo=functionToUnbind._bindInfo;bindInfo[bindInfo.thisPropertyName]=null;bindInfo.thisPropertyName=null;bindInfo._bindInfo=null;functionToUnbind._bindInfo=null}};EventTracker.prototype.dispose=function(){if(this.isDisposed)return;this.removeAll();this._trackedEvents=null;this._trackedEvents=[];_super.prototype.dispose.call(this)};return EventTracker}(MscrmControls.CommonAppMagic.Core.Disposable);Core.EventTracker=EventTracker})(Core=CommonAppMagic.Core||(CommonAppMagic.Core={}))})(CommonAppMagic=MscrmControls.CommonAppMagic||(MscrmControls.CommonAppMagic={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var CommonAppMagic;(function(CommonAppMagic){var Utilities;(function(Utilities){var CanvasUtility=function(){function CanvasUtility(){}CanvasUtility.saveCanvasToUrl=function(canvas){return canvas.toDataURL("image/png")};CanvasUtility.loadDataUrlToCanvas=function(dataUrl,context,userAgentContext){if(MscrmCommon.ControlUtils.Object.isNullOrUndefined(dataUrl))throw"Null or undefined data url";if(MscrmCommon.ControlUtils.Object.isNullOrUndefined(context))throw"Null or undefined canvas 2D context";if(MscrmCommon.ControlUtils.Object.isNullOrUndefined(userAgentContext))throw"Null or undefined user agent context";var img=new Image;img.src="";img.onload=function(){context.drawImage(img,0,0);img.onload=null};img.onerror=function(e){if(userAgentContext.isBrowserIE){var temporaryResource=e.srcElement,imageResourceMetadata=temporaryResource,fileCreatedDateError=typeof imageResourceMetadata.fileCreatedDate==="unknown"||typeof imageResourceMetadata.fileCreatedDate==="string"&&imageResourceMetadata.fileCreatedDate==="",fileModifiedDateError=typeof imageResourceMetadata.fileModifiedDate==="unknown"||typeof imageResourceMetadata.fileModifiedDate==="string"&&imageResourceMetadata.fileModifiedDate==="",fileUpdatedDateError=typeof imageResourceMetadata.fileUpdatedDate==="unknown"||typeof imageResourceMetadata.fileUpdatedDate==="string"&&imageResourceMetadata.fileUpdatedDate==="",mimeTypeError=typeof imageResourceMetadata.mimeType==="unknown"||typeof imageResourceMetadata.mimeType==="string"&&imageResourceMetadata.mimeType==="";if(fileCreatedDateError&&fileModifiedDateError&&fileUpdatedDateError&&mimeTypeError)return}throw"Could not load data URL to canvas"};img.src=dataUrl};return CanvasUtility}();Utilities.CanvasUtility=CanvasUtility})(Utilities=CommonAppMagic.Utilities||(CommonAppMagic.Utilities={}))})(CommonAppMagic=MscrmControls.CommonAppMagic||(MscrmControls.CommonAppMagic={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var CommonAppMagic;(function(CommonAppMagic){var Utilities;(function(Utilities){var Utility=function(){function Utility(){}Utility.createCompletablePromise=function(initFunction,cancelFunction){var complete,error,promise=new WinJS.Promise(function(c,e,progress){complete=c;error=e;initFunction&&initFunction(c,e,progress)},cancelFunction),returnValue={complete:complete,promise:promise,error:error};return returnValue};Utility.createOrSetPrivate=function(obj,propertyName,value){if(typeof obj[propertyName]==="undefined")Object.defineProperty(obj,propertyName,{configurable:true,enumerable:false,value:value,writable:true});else obj[propertyName]=value};Utility.endsWith=function(searchableString,suffix){return searchableString.indexOf(suffix,searchableString.length-suffix.length)!==-1};return Utility}();Utilities.Utility=Utility})(Utilities=CommonAppMagic.Utilities||(CommonAppMagic.Utilities={}))})(CommonAppMagic=MscrmControls.CommonAppMagic||(MscrmControls.CommonAppMagic={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var CommonAppMagic;(function(CommonAppMagic){var Utilities;(function(Utilities){var Converters=function(){function Converters(){}Converters.pxHorizontalConverter=function(width,value){if(value===null||value==0||MscrmCommon.ControlUtils.Object.isNullOrUndefined(width)||width==0)return "0";return (value||0)/width*100+"vw"};Converters.pxVerticalConverter=function(height,value){if(value===null||value==0||MscrmCommon.ControlUtils.Object.isNullOrUndefined(height)||height===0)return "0";return (value||0)/height*100+"vh"};return Converters}();Utilities.Converters=Converters})(Utilities=CommonAppMagic.Utilities||(CommonAppMagic.Utilities={}))})(CommonAppMagic=MscrmControls.CommonAppMagic||(MscrmControls.CommonAppMagic={}))})(MscrmControls||(MscrmControls={}))