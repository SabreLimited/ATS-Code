/** @license Copyright (c) Microsoft Corporation. All rights reserved. */
var MscrmControls;(function(MscrmControls){var WebsitePreview;(function(WebsitePreview){"use strict";var PreviewDataModel=function(){function PreviewDataModel(){}return PreviewDataModel}();WebsitePreview.PreviewDataModel=PreviewDataModel})(WebsitePreview=MscrmControls.WebsitePreview||(MscrmControls.WebsitePreview={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var WebsitePreview;(function(WebsitePreview){"use strict";var ExceptionHandler=MscrmCommon.ErrorHandling.ExceptionHandler,PreviewServiceClient=function(){function PreviewServiceClient(serviceUrl){this.serviceUrl=serviceUrl;MscrmCommon.ControlUtils.Object.isNullOrUndefined(serviceUrl)&&ExceptionHandler.throwException(PreviewServiceClient.ServiceUrlNullException)}PreviewServiceClient.prototype.getResult=function(url,resultHandler,resultHandlerContext,stopwatch){!MscrmCommon.ControlUtils.Object.isNullOrUndefined(stopwatch)&&stopwatch.start();$.getJSON(this.getServiceRequestUrl(url)).done(function(data){resultHandler.apply(resultHandlerContext,[data]);!MscrmCommon.ControlUtils.Object.isNullOrUndefined(stopwatch)&&stopwatch.stop()})};PreviewServiceClient.prototype.destroy=function(){this.serviceUrl=null};PreviewServiceClient.prototype.getServiceRequestUrl=function(url){return MscrmCommon.ControlUtils.String.Format("{0}?url={1}",this.serviceUrl,encodeURIComponent(url))};PreviewServiceClient.ServiceUrlNullException="serviceUrl is required";return PreviewServiceClient}();WebsitePreview.PreviewServiceClient=PreviewServiceClient})(WebsitePreview=MscrmControls.WebsitePreview||(MscrmControls.WebsitePreview={}))})(MscrmControls||(MscrmControls={}));var MscrmControls;(function(MscrmControls){var WebsitePreview;(function(WebsitePreview){"use strict";var OutputComponent=function(){function OutputComponent(parentContainer,valueContainer,openInBrowser){this.parentContainer=parentContainer;this.valueContainer=valueContainer;this.openInBrowser=openInBrowser;this.rootContainer=$(document.createElement("div")).addClass(WebsitePreview.PreviewControl.classNamespace).addClass(OutputComponent.rootContainerClassName);this.contentContainer=$(document.createElement("div")).addClass(OutputComponent.contentContainerClassName);this.rootContainer.append(this.contentContainer);$(parentContainer).append(this.rootContainer);this.linkValueContainer=$(valueContainer);this.isObjectDestroyed=false}Object.defineProperty(OutputComponent.prototype,"isDestroyed",{"get":function(){return this.isObjectDestroyed},enumerable:true,configurable:true});OutputComponent.prototype.setLoadingLabel=function(url){this.url=url;this.contentContainer.empty();this.contentContainer.hide();this.updateLinkValueContainer()};OutputComponent.prototype.update=function(data){if(this.isObjectDestroyed)return;if(MscrmCommon.ControlUtils.Object.isNullOrUndefined(data)||MscrmCommon.ControlUtils.String.isNullOrWhitespace(data.Url)||MscrmCommon.ControlUtils.String.isNullOrWhitespace(data.Title)||MscrmCommon.ControlUtils.String.isNullOrWhitespace(data.Description))return;$(this.contentContainer).empty();var imageAndTextDiv=$(document.createElement("div")).addClass(OutputComponent.imageAndTextClassName);this.url=data.Url;this.updateLinkValueContainer();!MscrmCommon.ControlUtils.String.isNullOrWhitespace(data.BestImageUrl)&&imageAndTextDiv.append(this.getImageContainer(data.BestImageUrl));var textDiv=$(document.createElement("div")).addClass(OutputComponent.titleAndDescriptionClassName);imageAndTextDiv.append(textDiv);textDiv.append(this.getTitleContainer(data.Title));textDiv.append(this.getDescriptionContainer(data.Description));this.contentContainer.append(imageAndTextDiv);$(this.contentContainer).show()};OutputComponent.prototype.setDisabled=function(isControlDisabled){if(this.isObjectDestroyed)return;this.isEnabledReadMode=!isControlDisabled;this.removeEventHandler();if(this.isEnabledReadMode){var linkElement=this.linkValueContainer.find("a");this.addEventHandler(linkElement)}};OutputComponent.prototype.renderPreviewMode=function(){if(this.isObjectDestroyed)return;this.isEnabledReadMode=false;this.removeEventHandler()};OutputComponent.prototype.destroy=function(){if(!MscrmCommon.ControlUtils.Object.isNullOrUndefined(this.rootContainer)){this.rootContainer.remove();this.rootContainer=null;this.contentContainer=null}this.removeEventHandler();if(!MscrmCommon.ControlUtils.Object.isNullOrUndefined(this.linkValueContainer)){this.linkValueContainer.empty();this.linkValueContainer=null}this.isObjectDestroyed=true};OutputComponent.prototype.addEventHandler=function(linkElement){var _this=this;if(linkElement.length!==0){linkElement.off(MscrmCommon.EventConstants.PointerUp);var clickHandler=function(event){_this.openInBrowser(_this.url);event.stopPropagation();event.preventDefault();return false};linkElement.on(MscrmCommon.EventConstants.PointerUp,clickHandler)}};OutputComponent.prototype.removeEventHandler=function(){if(MscrmCommon.ControlUtils.Object.isNullOrUndefined(this.linkValueContainer))return;var linkElement=this.linkValueContainer.find("a");linkElement.length!==0&&linkElement.off(MscrmCommon.EventConstants.PointerUp)};OutputComponent.prototype.getLinkElement=function(url){var linkElement=$(document.createElement("a")).addClass(OutputComponent.linkElementClassName).attr("href","#");this.isEnabledReadMode&&this.addEventHandler(linkElement);var link=$(document.createElement("span")).addClass(OutputComponent.linkClassName).text(url).on("click",function(e){return true});linkElement.append(link);return linkElement};OutputComponent.prototype.getImageContainer=function(imageUrl){var thumbnailImage=$(document.createElement("img")).addClass(OutputComponent.thumbnailImageClassName).attr("src",imageUrl),thumbnailImageContainer=$(document.createElement("div")).addClass(OutputComponent.thumbnailContainerClassName);thumbnailImageContainer.append(thumbnailImage);return thumbnailImageContainer};OutputComponent.prototype.getTitleContainer=function(title){var titleContainer=$(document.createElement("div")).addClass(OutputComponent.titleContainerClassName),link=$(document.createElement("div")).addClass(OutputComponent.titleClassName).text(title);titleContainer.append(link);return titleContainer};OutputComponent.prototype.getDescriptionContainer=function(description){return $(document.createElement("div")).addClass(OutputComponent.descriptionClassName).text(description)};OutputComponent.prototype.updateLinkValueContainer=function(){this.linkValueContainer.empty();this.linkValueContainer.append(this.getLinkElement(this.url));this.linkValueContainer.show()};OutputComponent.rootContainerClassName="root-container";OutputComponent.contentContainerClassName="content-container";OutputComponent.linkElementClassName="link-container";OutputComponent.linkClassName="link";OutputComponent.titleContainerClassName="title-container";OutputComponent.titleClassName="title";OutputComponent.thumbnailContainerClassName="thumbnail-container";OutputComponent.thumbnailImageClassName="thumbnail";OutputComponent.descriptionClassName="description";OutputComponent.titleAndDescriptionClassName="text-container";OutputComponent.imageAndTextClassName="image-text-container";return OutputComponent}();WebsitePreview.OutputComponent=OutputComponent})(WebsitePreview=MscrmControls.WebsitePreview||(MscrmControls.WebsitePreview={}))})(MscrmControls||(MscrmControls={}));var __extends=this&&this.__extends||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d}__.prototype=b.prototype;d.prototype=new __},MscrmControls;(function(MscrmControls){var WebsitePreview;(function(WebsitePreview){"use strict";var ExceptionHandler=MscrmCommon.ErrorHandling.ExceptionHandler,PreviewControl=function(_super){__extends(PreviewControl,_super);function PreviewControl(){_super.call(this)}PreviewControl.prototype.initCore=function(context){this.previewServiceUri=context.utils.getServiceUri(PreviewControl.previewServiceIdentifier);this.serviceClient=new WebsitePreview.PreviewServiceClient(this.previewServiceUri);this.outputComponent=new WebsitePreview.OutputComponent(this.container,this.valueContainer,context.utils.openInBrowser)};PreviewControl.prototype.updateCore=function(context){this.throwIfPropertyBagParametersNotValid(context);this.updateValue(context)};PreviewControl.prototype.renderReadMode=function(context){if(!context.mode.isPreview&&context.mode.isRead)this.outputComponent.setDisabled(context.mode.isControlDisabled);else context.mode.isPreview&&this.outputComponent.renderPreviewMode()};PreviewControl.prototype.getOutputsCore=function(){return null};PreviewControl.prototype.destroyCore=function(){if(this.isControlInitialized){this.serviceClient.destroy();this.outputComponent.destroy()}};PreviewControl.prototype.showDefaultLabelCore=function(context){return MscrmCommon.ControlUtils.Property.isNullOrEmpty(context.parameters.value)||MscrmCommon.ControlUtils.String.isNullOrWhitespace(context.parameters.value.raw)};PreviewControl.prototype.updateValue=function(context){var url=context.parameters.value.raw;this.outputComponent.setLoadingLabel(url);if(MscrmCommon.ControlUtils.Object.isNullOrUndefined(url))return;var stopwatch=null;if(!MscrmCommon.ControlUtils.Object.isNullOrUndefined(context.utils.createPerformanceStopwatch))stopwatch=context.utils.createPerformanceStopwatch(PreviewControl.previewAsyncStopwatch);this.serviceClient.getResult(url,this.outputComponent.update,this.outputComponent,stopwatch)};PreviewControl.prototype.throwIfPropertyBagParametersNotValid=function(context){MscrmCommon.ControlUtils.Object.isNullOrUndefined(context.parameters.value)&&ExceptionHandler.throwException(MscrmCommon.ControlUtils.String.Format(MscrmCommon.CommonControl.InvalidDataBagKeyFormat,"context.parameters.value"))};PreviewControl.classNamespace="website-preview";PreviewControl.previewServiceIdentifier="websitepreview";PreviewControl.previewAsyncStopwatch="CustomControl.WebsitePreview.AsyncGetResult";return PreviewControl}(MscrmCommon.FieldControlBase);WebsitePreview.PreviewControl=PreviewControl})(WebsitePreview=MscrmControls.WebsitePreview||(MscrmControls.WebsitePreview={}))})(MscrmControls||(MscrmControls={}))