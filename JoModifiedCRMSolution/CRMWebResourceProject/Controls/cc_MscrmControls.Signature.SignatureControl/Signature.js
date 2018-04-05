/** @license Copyright (c) Microsoft Corporation. All rights reserved. */
var MscrmControls;(function(MscrmControls){var Signature;(function(Signature){var Ink;(function(Ink){var Constants;(function(Constants){"use strict";(function(PenTipShape){PenTipShape[PenTipShape["CIRCLE"]=0]="CIRCLE";PenTipShape[PenTipShape["RECTANGLE"]=1]="RECTANGLE"})(Constants.PenTipShape||(Constants.PenTipShape={}));var PenTipShape=Constants.PenTipShape;Constants.ContextRound="round";Constants.SourceOverCompositeOperation="source-over";Constants.DefaultStrokeSize=2;Constants.DefaultStrokeColor="rgba(0, 0, 0, 1)"})(Constants=Ink.Constants||(Ink.Constants={}))})(Ink=Signature.Ink||(Signature.Ink={}))})(Signature=MscrmControls.Signature||(MscrmControls.Signature={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var Signature;(function(Signature){var Ink;(function(Ink){"use strict"})(Ink=Signature.Ink||(Signature.Ink={}))})(Signature=MscrmControls.Signature||(MscrmControls.Signature={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var Signature;(function(Signature){var Ink;(function(Ink){"use strict"})(Ink=Signature.Ink||(Signature.Ink={}))})(Signature=MscrmControls.Signature||(MscrmControls.Signature={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var Signature;(function(Signature){var Ink;(function(Ink){"use strict";var Util=MscrmControls.CommonAppMagic.Utilities.Utility,EventConstants=MscrmCommon.EventConstants,ExceptionHandler=MscrmCommon.ErrorHandling.ExceptionHandler,InkControl=function(){function InkControl(){}InkControl.prototype.createControlContext=function(){var controlContext={isDisabled:true,isLoaded:true,signatureConfirmed:false,userStrokeDetected:false,size:Ink.Constants.DefaultStrokeSize,color:Ink.Constants.DefaultStrokeColor,image:Signature.SignatureControl.BlankSignature,container:null,isControlBoundToContainer:null,context:null,canvas:null,canvasContainer:null,penID:InkControl.DefaultPenId,inkVisualizer:new Ink.InkVisualizer,onPointerDownHandler:null,onPointerMoveHandler:null,onPointerUpHandler:null,onPointerOutHandler:null,onResizeHandler:null,onSignatureConfirmed:null,onSignatureCleared:null,onImageChangedExternal:null,onUserStrokeDetected:null,userAgentContext:null};Util.createOrSetPrivate(controlContext,"isControlBoundToContainer",this.isControlBoundToContainer.bind(this,controlContext));Util.createOrSetPrivate(controlContext,"onPointerDownHandler",this.onPointerDown.bind(this,controlContext));Util.createOrSetPrivate(controlContext,"onPointerMoveHandler",this.onPointerMove.bind(this,controlContext));Util.createOrSetPrivate(controlContext,"onPointerUpHandler",this.onPointerUp.bind(this,controlContext));Util.createOrSetPrivate(controlContext,"onPointerOutHandler",this.onPointerUp.bind(this,controlContext));Util.createOrSetPrivate(controlContext,"onResizeHandler",this.onResize.bind(this,controlContext));return controlContext};InkControl.prototype.disposeControlContext=function(controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");controlContext.isLoaded=false;controlContext.onPointerDownHandler=null;controlContext.onPointerMoveHandler=null;controlContext.onPointerUpHandler=null;controlContext.onPointerOutHandler=null;controlContext.onResizeHandler=null;controlContext.onSignatureConfirmed=null;controlContext.onSignatureCleared=null;controlContext.onImageChangedExternal=null;controlContext.onUserStrokeDetected=null;controlContext.userAgentContext=null;controlContext.penID=null;controlContext.size=null;controlContext.color=null;controlContext.image=null;controlContext.signatureConfirmed=null;controlContext.inkVisualizer=null;controlContext.container=null;controlContext.isControlBoundToContainer=null;controlContext.context=null;controlContext.canvasContainer=null;controlContext.canvas=null};InkControl.prototype.initView=function(container,controlContext){var _this=this;(MscrmCommon.ControlUtils.Object.isNullOrUndefined(container)||MscrmCommon.ControlUtils.Object.isNullOrUndefined(container.children)||MscrmCommon.ControlUtils.Object.isNullOrUndefined(container.children[0])||MscrmCommon.ControlUtils.Object.isNullOrUndefined(container.parentElement))&&ExceptionHandler.throwException("Invalid container");MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");controlContext.container=container;var inkControl=container.children[0],canvasContainers=inkControl.getElementsByClassName(InkControl.CanvasContainerClassName);controlContext.canvasContainer=canvasContainers[0];controlContext.canvasContainer.addEventListener(EventConstants.PointerDown,controlContext.onPointerDownHandler,true);window.addEventListener("resize",controlContext.onResizeHandler,true);var canvasElems=inkControl.getElementsByClassName(InkControl.DrawCanvasClassName);controlContext.canvas=canvasElems[0];controlContext.context=controlContext.canvas.getContext("2d");controlContext.inkVisualizer.setDrawingContextInfo(controlContext);controlContext.inkVisualizer.loadFromDataUrl(controlContext);controlContext.onImageChangedExternal=this.onImageChangedExternal.bind(this,controlContext);var clearButton=this.getClearButton(controlContext.container);clearButton.on("click",function(){_this.onClearButtonClicked(controlContext)});var confirmButton=this.getConfirmButton(controlContext.container);confirmButton.on("click",function(){_this.onConfirmButtonClicked(controlContext)})};InkControl.prototype.disposeView=function(container,controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(container)&&ExceptionHandler.throwException("Null or undefined container");MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");controlContext.isDisabled=true;var clearButton=this.getClearButton(controlContext.container);clearButton.off();var confirmButton=this.getConfirmButton(controlContext.container);confirmButton.off();var element=controlContext.canvasContainer;element.removeEventListener(EventConstants.PointerDown,controlContext.onPointerDownHandler,true);element.removeEventListener(EventConstants.PointerMove,controlContext.onPointerMoveHandler,true);element.removeEventListener(EventConstants.PointerUp,controlContext.onPointerUpHandler,true);element.removeEventListener(EventConstants.PointerOut,controlContext.onPointerOutHandler,true);window.removeEventListener("resize",controlContext.onResizeHandler,true)};InkControl.prototype.onImageChangedExternal=function(controlContext,newImage){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");if(controlContext.canvas.width<=0||controlContext.canvas.height<=0)return;this.clearAllStrokes(controlContext);controlContext.image=newImage;controlContext.inkVisualizer.loadFromDataUrl(controlContext)};InkControl.prototype.onPointerDown=function(controlContext,evt){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");controlContext.inkVisualizer.onPointerDown(controlContext,evt)};InkControl.prototype.onPointerMove=function(controlContext,evt){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");if(controlContext.isDisabled||controlContext.penID===InkControl.DefaultPenId)return;controlContext.userStrokeDetected=true;controlContext.onUserStrokeDetected();controlContext.inkVisualizer.onPointerMove(controlContext,evt)};InkControl.prototype.onPointerUp=function(controlContext,evt){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");if(controlContext.penID!==InkControl.DefaultPenId&&evt.pointerId===controlContext.penID){if(evt.type===EventConstants.PointerUp)controlContext.inkVisualizer.onPointerUp(controlContext,evt);else evt.type===EventConstants.PointerOut&&controlContext.inkVisualizer.onPointerOut(controlContext,evt);this.saveCanvasStrokes(controlContext)}};InkControl.prototype.onResize=function(controlContext,evt){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");this.saveCanvasStrokes(controlContext)};InkControl.prototype.onConfirmButtonClicked=function(controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");if(controlContext.isDisabled)return;if(controlContext.userStrokeDetected==false)return;controlContext.onSignatureConfirmed()};InkControl.prototype.onClearButtonClicked=function(controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");if(controlContext.isDisabled)return;this.clearAllStrokes(controlContext);controlContext.userStrokeDetected=false;controlContext.onUserStrokeDetected();controlContext.onSignatureCleared()};InkControl.prototype.clearAllStrokes=function(controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");controlContext.inkVisualizer.clearAllStrokes(controlContext);this.saveCanvasStrokes(controlContext)};InkControl.prototype.isControlBoundToContainer=function(controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");return controlContext.container!==null};InkControl.prototype.saveCanvasStrokes=function(controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");controlContext.inkVisualizer.saveCanvasToObjectURL(controlContext)};InkControl.prototype.getClearButton=function(container){return $(container).find("."+InkControl.ClearButtonClassName)};InkControl.prototype.getConfirmButton=function(container){return $(container).find("."+InkControl.ConfirmButtonClassName)};InkControl.DrawCanvasClassName="drawCanvas";InkControl.CanvasContainerClassName="canvasContainer";InkControl.ConfirmButtonClassName="confirmButton";InkControl.ClearButtonClassName="clearButton";InkControl.DefaultPenId=-1;return InkControl}();Ink.InkControl=InkControl})(Ink=Signature.Ink||(Signature.Ink={}))})(Signature=MscrmControls.Signature||(MscrmControls.Signature={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var Signature;(function(Signature){var Ink;(function(Ink){"use strict";var EventConstants=MscrmCommon.EventConstants,ExceptionHandler=MscrmCommon.ErrorHandling.ExceptionHandler,InkVisualizer=function(){function InkVisualizer(){}InkVisualizer.prototype.saveCanvasToObjectURL=function(controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");var canvas=controlContext.canvas;if(canvas.width<=0||canvas.height<=0)return;if(!controlContext.isLoaded||!controlContext.isControlBoundToContainer())return;var url=MscrmControls.CommonAppMagic.Utilities.CanvasUtility.saveCanvasToUrl(canvas);if(url)controlContext.image=url;else controlContext.image=Signature.SignatureControl.BlankSignature};InkVisualizer.prototype.onPointerDown=function(controlContext,evt){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");if(controlContext.isDisabled||controlContext.penID!==Ink.InkControl.DefaultPenId)return;evt.preventDefault();var element=controlContext.canvasContainer;MscrmCommon.ControlUtils.Object.isNullOrUndefined(element)&&ExceptionHandler.throwException("The element is null or undefined");element.addEventListener(EventConstants.PointerMove,controlContext.onPointerMoveHandler,true);element.addEventListener(EventConstants.PointerUp,controlContext.onPointerUpHandler,true);element.addEventListener(EventConstants.PointerOut,controlContext.onPointerOutHandler,true);var point=this.getCoordinates(controlContext,evt);this.setDrawingContextInfo(controlContext);controlContext.context.beginPath();controlContext.context.moveTo(point.x,point.y);controlContext.penID=evt.pointerId};InkVisualizer.prototype.onPointerMove=function(controlContext,evt){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");if(evt.pointerId!==controlContext.penID)return;var point=this.getCoordinates(controlContext,evt);controlContext.context.lineTo(point.x,point.y);controlContext.context.stroke();evt.stopPropagation()};InkVisualizer.prototype.onPointerUp=function(controlContext,evt){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");this.processPointerUp(controlContext,evt)};InkVisualizer.prototype.onPointerOut=function(controlContext,evt){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");this.processPointerUp(controlContext,evt)};InkVisualizer.prototype.loadFromDataUrl=function(controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");var url=controlContext.image;if(MscrmCommon.ControlUtils.Object.isNullOrUndefined(url)||url===Signature.SignatureControl.BlankSignature)return;MscrmControls.CommonAppMagic.Utilities.CanvasUtility.loadDataUrlToCanvas(url,controlContext.context,controlContext.userAgentContext)};InkVisualizer.prototype.clearAllStrokes=function(controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");controlContext.context.clearRect(0,0,controlContext.canvas.width,controlContext.canvas.height)};InkVisualizer.prototype.setDrawingContextInfo=function(controlContext){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");controlContext.context.globalCompositeOperation=Ink.Constants.SourceOverCompositeOperation;controlContext.context.lineWidth=controlContext.size;controlContext.context.lineCap=Ink.Constants.ContextRound;controlContext.context.strokeStyle=controlContext.context.fillStyle=controlContext.color};InkVisualizer.prototype.processPointerUp=function(controlContext,evt){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");var element=controlContext.canvasContainer;if(!controlContext.isDisabled&&controlContext.penID!==Ink.InkControl.DefaultPenId){element.removeEventListener(EventConstants.PointerMove,controlContext.onPointerMoveHandler,true);element.removeEventListener(EventConstants.PointerUp,controlContext.onPointerUpHandler,true);element.removeEventListener(EventConstants.PointerOut,controlContext.onPointerOutHandler,true);controlContext.context.closePath();controlContext.penID=Ink.InkControl.DefaultPenId}};InkVisualizer.prototype.getCoordinates=function(controlContext,evt){MscrmCommon.ControlUtils.Object.isNullOrUndefined(controlContext)&&ExceptionHandler.throwException("Null or undefined control context");var touchEvent;if(evt.targetTouches&&evt.targetTouches.length>0)touchEvent=evt.targetTouches[0];else touchEvent=evt;var canvas=controlContext.canvas,rect=canvas.getBoundingClientRect(),scaleX=rect.width/canvas.width,scaleY=rect.height/canvas.height;return {x:(touchEvent.clientX-rect.left)/scaleX,y:(touchEvent.clientY-rect.top)/scaleY}};return InkVisualizer}();Ink.InkVisualizer=InkVisualizer})(Ink=Signature.Ink||(Signature.Ink={}))})(Signature=MscrmControls.Signature||(MscrmControls.Signature={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var Signature;(function(Signature){var SignatureValidation;(function(SignatureValidation){"use strict"})(SignatureValidation=Signature.SignatureValidation||(Signature.SignatureValidation={}))})(Signature=MscrmControls.Signature||(MscrmControls.Signature={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var Signature;(function(Signature){var SignatureValidation;(function(SignatureValidation){"use strict";var ExceptionHandler=MscrmCommon.ErrorHandling.ExceptionHandler,SignatureValidator=function(){function SignatureValidator(){}SignatureValidator.prototype.sanitizeSignature=function(signature){return MscrmCommon.ControlUtils.Object.isNullOrUndefined(signature)||signature===Signature.SignatureControl.BlankSignature?Signature.SignatureControl.BlankSignature:signature};SignatureValidator.prototype.isSignatureValid=function(signature){MscrmCommon.ControlUtils.Object.isNullOrUndefined(signature)&&ExceptionHandler.throwException("Null or undefined signature");if(signature===Signature.SignatureControl.BlankSignature)return true;var minLength=SignatureValidator.DataScheme.length+SignatureValidator.PngMediaType.length+SignatureValidator.Base64.length+1;if(signature.length<minLength)return false;var token="",signatureRemainder=signature;token=signatureRemainder.substr(0,SignatureValidator.DataScheme.length);if(token.toLowerCase()!==SignatureValidator.DataScheme)return false;signatureRemainder=signatureRemainder.substr(token.length);token=signatureRemainder.substr(0,SignatureValidator.PngMediaType.length);if(token.toLowerCase()!==SignatureValidator.PngMediaType)return false;signatureRemainder=signatureRemainder.substr(token.length);token=signatureRemainder.substr(0,SignatureValidator.Base64.length);if(token.toLowerCase()!==SignatureValidator.Base64)return false;return true};SignatureValidator.DataScheme="data:";SignatureValidator.PngMediaType="image/png";SignatureValidator.Base64=";base64,";return SignatureValidator}();SignatureValidation.SignatureValidator=SignatureValidator})(SignatureValidation=Signature.SignatureValidation||(Signature.SignatureValidation={}))})(Signature=MscrmControls.Signature||(MscrmControls.Signature={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var Signature;(function(Signature){var ModalSignatureControl;(function(ModalSignatureControl){"use strict"})(ModalSignatureControl=Signature.ModalSignatureControl||(Signature.ModalSignatureControl={}))})(Signature=MscrmControls.Signature||(MscrmControls.Signature={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var Signature;(function(Signature){var ModalSignatureControl;(function(ModalSignatureControl_1){"use strict";var InkControl=MscrmControls.Signature.Ink.InkControl,ExceptionHandler=MscrmCommon.ErrorHandling.ExceptionHandler,ModalSignatureControl=function(){function ModalSignatureControl(stringResourceProvider,notifyConfirmedSignatureCallback){MscrmCommon.ControlUtils.Object.isNullOrUndefined(notifyConfirmedSignatureCallback)&&ExceptionHandler.throwException(ModalSignatureControl.InvalidCallbackerrorMessage);MscrmCommon.ControlUtils.Object.isNullOrUndefined(stringResourceProvider)&&ExceptionHandler.throwException(Signature.SignatureControl.InvalidStringResourceProviderErrorMessage);this.container=null;this.inkControl=null;this.inkControlContext=null;this.notificationHandler=null;this.maxSignatureLength=0;this.userAgentContext=null;this.notifyConfirmedSignature=notifyConfirmedSignatureCallback;this.stringResourceProvider=stringResourceProvider}ModalSignatureControl.prototype.init=function(container){var _this=this;this.validateSetup();this.container=container;this.inkControl=new InkControl;this.inkControlContext=this.inkControl.createControlContext();this.inkControlContext.userAgentContext=this.userAgentContext;this.inkControlContext.onSignatureConfirmed=function(){if(_this.inkControlContext.image.length>_this.maxSignatureLength){_this.notificationHandler.clear(ModalSignatureControl.MaxSignatureLengthExceededResourceId);var tooLongSignatureMessageTemplate=_this.stringResourceProvider(ModalSignatureControl.MaxSignatureLengthExceededResourceId),tooLongSignatureMessage=MscrmCommon.ControlUtils.String.Format(tooLongSignatureMessageTemplate,_this.inkControlContext.image.length);_this.notificationHandler.notify(tooLongSignatureMessage,ModalSignatureControl.MaxSignatureLengthExceededResourceId);return}_this.inkControlContext.isDisabled=true;_this.inkControlContext.signatureConfirmed=true;_this.SetCommandBarCssClass();_this.notifyConfirmedSignature()};this.inkControlContext.onSignatureCleared=function(){_this.notificationHandler.clear(ModalSignatureControl.MaxSignatureLengthExceededResourceId)};this.inkControlContext.onUserStrokeDetected=function(){_this.SetCommandBarCssClass()};this.createView();this.inkControl.initView(this.container,this.inkControlContext)};Object.defineProperty(ModalSignatureControl.prototype,"signatureControlWrapper",{"get":function(){return this.controlWrapper},enumerable:true,configurable:true});ModalSignatureControl.prototype.setValue=function(value){this.inkControlContext.signatureConfirmed=value!==Signature.SignatureControl.BlankSignature;this.inkControlContext.onImageChangedExternal(value)};ModalSignatureControl.prototype.getValue=function(){if(MscrmCommon.ControlUtils.Object.isNullOrUndefined(this.inkControlContext))return Signature.SignatureControl.BlankSignature;if(!this.inkControlContext.signatureConfirmed)return Signature.SignatureControl.BlankSignature;return this.inkControlContext.image};ModalSignatureControl.prototype.setEnabled=function(enabled){if(this.inkControlContext.signatureConfirmed)this.inkControlContext.isDisabled=true;else this.inkControlContext.isDisabled=!enabled;this.SetCommandBarCssClass()};ModalSignatureControl.prototype.setReadOrEditStyles=function(isReadMode){if(isReadMode){this.controlWrapper.addClass(MscrmCommon.ThemingHelper.ReadModeClassName);this.controlWrapper.removeClass(MscrmCommon.ThemingHelper.EditModeClassName)}else{this.controlWrapper.addClass(MscrmCommon.ThemingHelper.EditModeClassName);this.controlWrapper.removeClass(MscrmCommon.ThemingHelper.ReadModeClassName)}};ModalSignatureControl.prototype.isEnabled=function(){if(MscrmCommon.ControlUtils.Object.isNullOrUndefined(this.inkControlContext))return false;if(this.inkControlContext.signatureConfirmed)return false;return !this.inkControlContext.isDisabled};ModalSignatureControl.prototype.destroy=function(){this.inkControl.disposeView(this.inkControlContext.container,this.inkControlContext);this.inkControl.disposeControlContext(this.inkControlContext);this.inkControlContext=null;this.inkControl=null;$(this.container).off();$(this.container).empty();this.container=null;this.stringResourceProvider=null;this.notificationHandler=null;this.notifyConfirmedSignature=null};ModalSignatureControl.prototype.setStringResourceProvider=function(stringResourceProvider){this.stringResourceProvider=stringResourceProvider};ModalSignatureControl.prototype.setMaximumSignatureLength=function(maxLength){maxLength<=0&&ExceptionHandler.throwException(ModalSignatureControl.InvalidMaxLengthErrorMessage);this.maxSignatureLength=maxLength};ModalSignatureControl.prototype.setNotificationHandler=function(notificationHandler){MscrmCommon.ControlUtils.Object.isNullOrUndefined(notificationHandler)&&ExceptionHandler.throwException(ModalSignatureControl.InvalidNotificationHandlerErrorMessage);this.notificationHandler=notificationHandler};ModalSignatureControl.prototype.validateSetup=function(){this.maxSignatureLength<=0&&ExceptionHandler.throwException(ModalSignatureControl.InvalidMaxLengthErrorMessage);MscrmCommon.ControlUtils.Object.isNullOrUndefined(this.notificationHandler)&&ExceptionHandler.throwException(ModalSignatureControl.InvalidNotificationHandlerErrorMessage);MscrmCommon.ControlUtils.Object.isNullOrUndefined(this.userAgentContext)&&ExceptionHandler.throwException(ModalSignatureControl.UninitializedUserAgentContextErrorMessage)};ModalSignatureControl.prototype.setUserAgentContext=function(userAgentContext){this.userAgentContext=userAgentContext;if(!MscrmCommon.ControlUtils.Object.isNullOrUndefined(this.inkControlContext))this.inkControlContext.userAgentContext=userAgentContext};ModalSignatureControl.prototype.createView=function(){var inkControl=this.createInkControlWrapper().append(this.createSignatureCanvas()).append(this.createHorizontalDelimiter()).append(this.createCommandButtons());this.controlWrapper=this.createSignatureControlWrapper();this.controlWrapper.append(inkControl).appendTo(this.container)};ModalSignatureControl.prototype.createSignatureControlWrapper=function(){var classes=MscrmCommon.ControlUtils.String.Format("{0}",ModalSignatureControl.SignatureControlClassName);return $("<div></div>",{"class":classes})};ModalSignatureControl.prototype.createInkControlWrapper=function(){return $("<div></div>",{"class":ModalSignatureControl.InkControlClassName})};ModalSignatureControl.prototype.createHorizontalDelimiter=function(){return $("<div></div>",{"class":ModalSignatureControl.HorizontalDelimiterClassName})};ModalSignatureControl.prototype.createSignatureCanvas=function(){var signatureCanvas=$("<canvas></canvas>",{"class":InkControl.DrawCanvasClassName}),canvasContainer=$("<div></div>",{"class":InkControl.CanvasContainerClassName});canvasContainer.append(signatureCanvas);return canvasContainer};ModalSignatureControl.prototype.createCommandButtons=function(){return $("<div></div>",{"class":ModalSignatureControl.InkControlCommandBarClassName}).append(this.createClearButton()).append(this.createConfirmButton())};ModalSignatureControl.prototype.createClearButton=function(){var clearButtonContainer=$("<div></div>",{"class":InkControl.ClearButtonClassName}),clearCaption=this.stringResourceProvider(ModalSignatureControl.ClearStringResourceId),clearButton=$("<span></span>",{"class":ModalSignatureControl.ClearButtonCaptionClassName,text:clearCaption});clearButtonContainer.append(clearButton);return clearButtonContainer};ModalSignatureControl.prototype.createConfirmButton=function(){var confirmButtonContainer=$("<div></div>",{"class":InkControl.ConfirmButtonClassName}),confirmButtonTick=$("<span></span>",{"class":MscrmCommon.ControlUtils.String.Format("{0} {1}",ModalSignatureControl.ConfirmButtonTickClassName,ModalSignatureControl.CrmSymbolFontClassName)});confirmButtonContainer.append(confirmButtonTick);return confirmButtonContainer};ModalSignatureControl.prototype.SetCommandBarCssClass=function(){var commandBar=$(this.container).find("."+ModalSignatureControl.InkControlCommandBarClassName);if(this.inkControlContext.isDisabled||this.inkControlContext.userStrokeDetected==false)commandBar.addClass(ModalSignatureControl.DisabledInkControlCommandBarClassName);else commandBar.removeClass(ModalSignatureControl.DisabledInkControlCommandBarClassName)};ModalSignatureControl.SignatureControlClassName="signatureControl";ModalSignatureControl.InvalidCallbackerrorMessage="Please provide a callback to handle user confirmation of the signature";ModalSignatureControl.DisabledInkControlCommandBarClassName="disabledInkControlCommandBar";ModalSignatureControl.InvalidMaxLengthErrorMessage="The maximum allowed length for the signature must be a positive number";ModalSignatureControl.InvalidNotificationHandlerErrorMessage="Null or undefined notification handler";ModalSignatureControl.MaxSignatureLengthExceededResourceId="signatureControl_maxLengthExceeded";ModalSignatureControl.UninitializedUserAgentContextErrorMessage="The user agent context needs to be initialized";ModalSignatureControl.InkControlClassName="inkControl";ModalSignatureControl.InkControlCommandBarClassName="inkControlCommandBar";ModalSignatureControl.ClearButtonCaptionClassName="clearButtonCaption";ModalSignatureControl.HorizontalDelimiterClassName="inkControlHorizontalDelimiter";ModalSignatureControl.ConfirmButtonTickClassName="confirmButtonTick";ModalSignatureControl.CrmSymbolFontClassName="crmSymbolFont";ModalSignatureControl.ClearStringResourceId="signatureControl_Clear";return ModalSignatureControl}();ModalSignatureControl_1.ModalSignatureControl=ModalSignatureControl})(ModalSignatureControl=Signature.ModalSignatureControl||(Signature.ModalSignatureControl={}))})(Signature=MscrmControls.Signature||(MscrmControls.Signature={}))})(MscrmControls||(MscrmControls={}));var __extends=this&&this.__extends||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d}__.prototype=b.prototype;d.prototype=new __},MscrmControls;(function(MscrmControls){var Signature;(function(Signature){var ExceptionHandler=MscrmCommon.ErrorHandling.ExceptionHandler,FormFactor=Mscrm.FormFactor,SignatureControl=function(_super){__extends(SignatureControl,_super);function SignatureControl(){_super.call(this);this.signatureControl=null;this.signatureValidator=null;this.preventEditModePanoramaEvents=true}SignatureControl.prototype.initCore=function(context){if(this.signatureValidator===null)this.signatureValidator=new Signature.SignatureValidation.SignatureValidator;context.client.formFactor===FormFactor.Phone&&context.theming.disableUiTransitions();this.validatePropertyBagParameters(context);this.initializeModalSignatureControl(context);this.updateSignatureControlValue(context.parameters.value.raw);this.updateSignatureControlEnabledValue(context.mode.isControlDisabled)};SignatureControl.prototype.updateCore=function(context){this.validatePropertyBagParameters(context);this.notificationHandler.clear(Signature.ModalSignatureControl.ModalSignatureControl.MaxSignatureLengthExceededResourceId);this.updateSignatureControlValue(context.parameters.value.raw);this.updateSignatureControlEnabledValue(context.mode.isControlDisabled)};SignatureControl.prototype.setLayout=function(context){context.theming.inlineLayout(!this.isControlEnabled(context))};SignatureControl.prototype.getOutputsCore=function(){return {value:this.signatureControl.getValue()}};SignatureControl.prototype.destroyCore=function(){if(this.isControlInitialized){this.signatureControl.setEnabled(false);this.signatureControl.destroy();this.signatureControl=null;this.signatureValidator=null}};SignatureControl.prototype.showDefaultLabelCore=function(context){return MscrmCommon.ControlUtils.Property.isNullOrEmpty(context.parameters.value)};SignatureControl.prototype.renderReadMode=function(context){_super.prototype.renderReadMode.call(this,context);this.signatureControl.setEnabled(false);this.signatureControl.setReadOrEditStyles(true);this.setLayout(context)};SignatureControl.prototype.renderEditMode=function(context){_super.prototype.renderEditMode.call(this,context);this.signatureControl.setEnabled(true);this.signatureControl.setReadOrEditStyles(false);this.setLayout(context);this.shouldNotifyOutputChanged=true};SignatureControl.prototype.setSignatureValidator=function(validator){this.signatureValidator=validator};SignatureControl.prototype.createModalSignatureControl=function(stringResourceProvider,notifySignatureConfirmed){return new Signature.ModalSignatureControl.ModalSignatureControl(stringResourceProvider,notifySignatureConfirmed)};SignatureControl.prototype.initializeModalSignatureControl=function(context){var _this=this;this.signatureControl=this.createModalSignatureControl(context.resources.getString,function(){return _this.notifyOutputChanged()});this.signatureControl.setMaximumSignatureLength(context.parameters.value.attributes.maxLength);this.signatureControl.setNotificationHandler(this.notificationHandler);this.signatureControl.setUserAgentContext(context.client.userAgent);this.controlWrapperContainer=this.createWrapperContainer();this.signatureControl.init(this.controlWrapperContainer)};SignatureControl.prototype.updateSignatureControlValue=function(newValue){var validSignature=this.signatureValidator.sanitizeSignature(newValue);!this.signatureValidator.isSignatureValid(validSignature)&&ExceptionHandler.throwException(SignatureControl.InvalidSignatureFormatErrorMessage);this.signatureControl.setValue(validSignature)};SignatureControl.prototype.updateSignatureControlEnabledValue=function(isDisabled){if(isDisabled)this.signatureControl.signatureControlWrapper.addClass(SignatureControl.DisabledSignatureControlClassName);else this.signatureControl.signatureControlWrapper.removeClass(SignatureControl.DisabledSignatureControlClassName);this.signatureControl.setEnabled(!isDisabled)};SignatureControl.prototype.shouldEnableControl=function(context){return !context.mode.isControlDisabled};SignatureControl.prototype.validatePropertyBagParameters=function(propertyBag){(MscrmCommon.ControlUtils.Object.isNullOrUndefined(propertyBag.parameters)||MscrmCommon.ControlUtils.Object.isNullOrUndefined(propertyBag.parameters.value)||MscrmCommon.ControlUtils.Object.isNullOrUndefined(propertyBag.parameters.value.attributes)||MscrmCommon.ControlUtils.Object.isNullOrUndefined(propertyBag.parameters.value.attributes.maxLength))&&ExceptionHandler.throwException(MscrmCommon.ControlUtils.String.Format(MscrmCommon.CommonControl.InvalidDataBagKeyFormat,"propertyBag.parameters.value.attributes.maxLength"));propertyBag.parameters.value.attributes.maxLength<=0&&ExceptionHandler.throwException(MscrmCommon.ControlUtils.String.Format(MscrmCommon.CommonControl.NotGreaterThanZeroInputParamValue,"propertyBag.parameters.value.attributes.maxLength"))};SignatureControl.DisabledSignatureControlClassName="disabledSignatureControl";SignatureControl.BlankSignature="";SignatureControl.InvalidSignatureFormatErrorMessage="The signature is not encoded using the expected format";SignatureControl.InvalidStringResourceProviderErrorMessage="Please provide a method that can retrieve translated strings based on a string identifier";return SignatureControl}(MscrmCommon.FieldControlBase);Signature.SignatureControl=SignatureControl})(Signature=MscrmControls.Signature||(MscrmControls.Signature={}))})(MscrmControls||(MscrmControls={}))