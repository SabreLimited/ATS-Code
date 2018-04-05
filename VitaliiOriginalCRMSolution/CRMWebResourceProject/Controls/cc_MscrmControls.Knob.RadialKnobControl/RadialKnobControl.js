/** @license Copyright (c) Microsoft Corporation. All rights reserved. */
var __extends=this&&this.__extends||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d}__.prototype=b.prototype;d.prototype=new __},MscrmControls;(function(MscrmControls){var Knob;(function(Knob){"use strict";var RadialKnobControl=function(_super){__extends(RadialKnobControl,_super);function RadialKnobControl(){_super.call(this);this.preventEditModePanoramaEvents=true}RadialKnobControl.prototype.getBaseKnobOption=function(context){var _this=this,option={release:function(value){if(isNaN(value))return false;_this.notifyEnabledControlOutputChanged.apply(_this)},width:"167",height:"167",fgColor:MscrmCommon.ThemingHelper.getProcessControlColor(context.theming),bgColor:"#DADADA",min:context.parameters.min.raw,max:context.parameters.max.raw,step:context.parameters.step.raw};if(context.mode.isRead||context.mode.isPreview||context.mode.isControlDisabled){option.width="80";option.height="80"}return option};RadialKnobControl.prototype.initCore=function(context,state){this.buildKnobInputElement();this.knobInputElement.knob()};RadialKnobControl.prototype.updateCore=function(context){MscrmCommon.ControlUtils.NumericInterval.throwIfNullDataBagParameters(context);$(this.valueContainer).hide()};RadialKnobControl.prototype.showDefaultLabelCore=function(context){this.eventGuard.stopPreventingFocus();return MscrmCommon.ControlUtils.Property.isNullOrEmpty(context.parameters.value)};RadialKnobControl.prototype.renderReadMode=function(context){_super.prototype.renderReadMode.call(this,context);context.theming.inlineLayout(true);this.eventGuard.stopPreventingFocus();this.renderReadOnlyKnob(context);if(!context.mode.isControlDisabled)this.setReadOnlyClass();else this.setDisabledClass();this.eventGuard.stopPreventingFocus()};RadialKnobControl.prototype.renderEditMode=function(context){_super.prototype.renderEditMode.call(this,context);this.renderEditKnob(context);this.setEnabledClass();context.theming.rightAlignEdit();this.shouldNotifyOutputChanged=true;this.eventGuard.preventEditModeTransitionFocus()};RadialKnobControl.prototype.getOutputsCore=function(){var rawValue=parseFloat(this.knobInputElement.val());return {value:Math.round(rawValue)}};RadialKnobControl.prototype.setClass=function(customClass){this.knobInputElement.parent().removeClass().addClass(customClass)};RadialKnobControl.prototype.destroyCore=function(){this.isControlInitialized&&$(this.container).empty();this.knobInputElement=null};RadialKnobControl.prototype.setDisabledClass=function(){this.setClass(RadialKnobControl.customWrapperDisabledClass)};RadialKnobControl.prototype.setEnabledClass=function(){this.setClass(RadialKnobControl.customWrapperClass)};RadialKnobControl.prototype.setReadOnlyClass=function(){this.setClass(RadialKnobControl.customWrapperReadOnlyClass)};RadialKnobControl.prototype.updateParameters=function(context){MscrmCommon.ControlUtils.NumericInterval.processPropertyBagValues(context,this.notificationHandler);var option=this.getBaseKnobOption(context);this.knobInputElement.knob(option);this.knobInputElement.trigger(MscrmCommon.EventConstants.JQueryKnobConfigure,option);this.knobInputElement.val(context.parameters.value.raw.toString());this.knobInputElement.trigger(MscrmCommon.EventConstants.Change)};RadialKnobControl.prototype.isControlDisabled=function(){return this.knobInputElement.attr(RadialKnobControl.readonlyDataAttribute)==="true"};RadialKnobControl.prototype.buildKnobInputElement=function(){this.controlWrapperContainer=this.createWrapperContainer();this.knobInputElement=$("<input />");$(this.controlWrapperContainer).append(this.knobInputElement)};RadialKnobControl.prototype.renderReadOnlyKnob=function(context){this.knobInputElement.siblings("canvas").remove();this.knobInputElement=this.knobInputElement.unwrap().attr(RadialKnobControl.readonlyDataAttribute,"true").data(RadialKnobControl.kontroledDataAttribute,"").data(RadialKnobControl.readonlyAttribute,true);this.updateParameters(context)};RadialKnobControl.prototype.renderEditKnob=function(context){this.knobInputElement.siblings("canvas").remove();this.knobInputElement=this.knobInputElement.unwrap().removeAttr(RadialKnobControl.readonlyDataAttribute).removeAttr(RadialKnobControl.readonlyAttribute).data(RadialKnobControl.kontroledDataAttribute,"").data(RadialKnobControl.readonlyAttribute,false);this.updateParameters(context)};RadialKnobControl.readonlyDataAttribute="data-readOnly";RadialKnobControl.readonlyAttribute="readonly";RadialKnobControl.kontroledDataAttribute="kontroled";RadialKnobControl.customWrapperClass="crm-jq-knob";RadialKnobControl.customWrapperReadOnlyClass="crm-jq-knob-readonly";RadialKnobControl.customWrapperDisabledClass="crm-jq-knob-disabled";return RadialKnobControl}(MscrmCommon.FieldControlBase);Knob.RadialKnobControl=RadialKnobControl})(Knob=MscrmControls.Knob||(MscrmControls.Knob={}))})(MscrmControls||(MscrmControls={}))