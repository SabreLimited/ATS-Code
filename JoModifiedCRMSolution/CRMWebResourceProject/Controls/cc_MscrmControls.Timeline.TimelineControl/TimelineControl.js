/** @license Copyright (c) Microsoft Corporation. All rights reserved. */
var MscrmControls;(function(MscrmControls){var Timeline;(function(Timeline){var ItemsDataSetPropertyNames=function(){function ItemsDataSetPropertyNames(){}Object.defineProperty(ItemsDataSetPropertyNames,"groupName",{"get":function(){return "group"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"titleName",{"get":function(){return "title"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"urlName",{"get":function(){return "url"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"label1Name",{"get":function(){return "label1"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"label2Name",{"get":function(){return "label2"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"label3Name",{"get":function(){return "label3"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"label4Name",{"get":function(){return "label4"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"label5Name",{"get":function(){return "label5"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"filterName",{"get":function(){return "filter"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"timestampName",{"get":function(){return "timestamp"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"thumbnailUrlName",{"get":function(){return "thumbnailUrl"},enumerable:true,configurable:true});Object.defineProperty(ItemsDataSetPropertyNames,"groupOrderName",{"get":function(){return "groupOrder"},enumerable:true,configurable:true});return ItemsDataSetPropertyNames}();Timeline.ItemsDataSetPropertyNames=ItemsDataSetPropertyNames})(Timeline=MscrmControls.Timeline||(MscrmControls.Timeline={}))})(MscrmControls||(MscrmControls={}));var __extends=this&&this.__extends||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d}__.prototype=b.prototype;d.prototype=new __},MscrmControls;(function(MscrmControls){var Timeline;(function(Timeline){"use strict";var TimelineControl=function(_super){__extends(TimelineControl,_super);function TimelineControl(){_super.call(this);this.items=[];this.groups=[];this.groupItems={};this.filters=[];this.currentFilter="";this.loadNextPageCalled=false}TimelineControl.prototype.initCore=function(context){var _this=this;this.$container=$(this.container);this.$container.addClass("cc-timeline-container scrollRegion listView");this.showMoreLabel=context.resources.getString("TimeLineControl_ShowMore_Text");this.showLessLabel=context.resources.getString("TimeLineControl_ShowLess_Text");this.defaultTopicLabel=context.resources.getString("TimeLineControl_DefaultFilter_Text");this.$progressDiv=$("<div>",{"class":"cc-timeline-progress"}).appendTo(this.$container);this.$progressDiv.html('<div class="indeterminateProgressBar"><div class="progressDot"><div></div></div><div class="progressDot"><div></div></div><div class="progressDot"><div></div></div><div class="progressDot"><div></div></div><div class="progressDot"><div></div></div></div>');this.$header=$("<div>",{"class":"cc-timeline-header"}).appendTo(this.$container);this.$main=$("<div>",{"class":"cc-timeline-main"}).appendTo(this.$container);this.$noItems=$("<div>",{"class":"cc-timeline-no-items",text:"No data available."}).appendTo(this.$container);this.$footer=$("<div>",{"class":"cc-timeline-footer"}).appendTo(this.$container);context.parameters.footerUrl!=null&&context.parameters.footerUrl.raw!=null&&jQuery.get(context.parameters.footerUrl.raw,function(data){_this.$footer.append(data)})};TimelineControl.prototype.updateCore=function(dataBag){if(dataBag.parameters.items.hasError){this.$progressDiv.hide();this.$noItems.text(dataBag.parameters.items.errorMessage);this.$noItems.show();return}if(this.items.length>0&&!this.loadNextPageCalled)this.items=[];if(dataBag.parameters.items.paging.hasNextPage||dataBag.parameters.items.paging.totalResultCount<0){this.$progressDiv.show();this.$noItems.hide()}else{this.$progressDiv.hide();dataBag.parameters.items.paging.totalResultCount==0&&this.$noItems.show()}this.loadNextPageCalled=false;if(dataBag.parameters.items.paging.hasNextPage){this.loadNextPageCalled=true;dataBag.parameters.items.paging.loadNextPage()}else{this.setItems(dataBag.parameters.items);this.processItems();this.render()}};TimelineControl.prototype.setItems=function(dataSet){for(var i=0;i<dataSet.sortedRecordIds.length;i++){var id=dataSet.sortedRecordIds[i];this.items.push(dataSet.records[id])}};TimelineControl.prototype.processItems=function(){this.groups=[];this.groupItems={};this.filters=[];for(var groupOrders={},i=0;i<this.items.length;i++){var item=this.items[i],group=item.group||"",filter=item.filter||"";if($.inArray(group,this.groups)<=-1){this.groups.push(group);this.groupItems[group]=[];groupOrders[group]=item.groupOrder||0}(this.currentFilter==""||item.filter==this.currentFilter)&&this.groupItems[group].push(item);filter!=""&&$.inArray(filter,this.filters)<=-1&&this.filters.push(filter)}this.groups.sort(function(a,b){return groupOrders[a]-groupOrders[b]});this.sortGroupItems();this.filters.sort()};TimelineControl.prototype.filterItems=function(){for(var i=0;i<this.groups.length;i++)this.groupItems[this.groups[i]]=[];for(var i=0;i<this.items.length;i++){var item=this.items[i],group=item.group||"";(this.currentFilter==""||item.filter==this.currentFilter)&&this.groupItems[group].push(item)}this.sortGroupItems()};TimelineControl.prototype.sortGroupItems=function(){for(var i=0;i<this.groups.length;i++)this.groupItems[this.groups[i]].sort(function(a,b){if(a.timestamp==b.timestamp)return 0;if(a.timestamp<b.timestamp)return 1;else return -1})};TimelineControl.prototype.render=function(){this.$header.empty();this.$main.empty();if(this.items.length>0){this.buildFilters().appendTo(this.$header);for(var i=0;i<this.groups.length;i++){var group=this.groups[i];this.groupItems[group].length>0&&this.buildGroup(group).appendTo(this.$main)}this.$header.show();this.$main.show()}else{this.$header.hide();this.$main.hide()}};TimelineControl.prototype.buildGroup=function(group){var $group=$("<div>",{"class":"cc-timeline-group"});$("<div>",{"class":"cc-timeline-group-title",text:group}).appendTo($group);for(var $items=$("<div>",{"class":"cc-timeline-items"}).appendTo($group),$moreItems=$("<div>",{"class":"cc-timeline-items cc-timeline-more-items"}).appendTo($group).hide(),moreItemsCount=0,i=0;i<this.groupItems[group].length;i++){var item=this.groupItems[group][i];if(i<5)this.buildItem(item).appendTo($items);else{this.buildItem(item).appendTo($moreItems);moreItemsCount++}}var $actions=$("<div>",{"class":"cc-timeline-group-actions"}).appendTo($group),data=MscrmCommon.ControlUtils.String.Format(this.showMoreLabel,moreItemsCount),$showMore=$("<a>",{"class":"cc-timeline-show-more",href:"#",text:data}).appendTo($actions).hide(),$showLess=$("<a>",{"class":"cc-timeline-show-less",href:"#",text:this.showLessLabel}).appendTo($actions).hide();if(moreItemsCount>0){$showMore.show();$showMore.click(function(e){if(!e.isPropagationStopped()){$showMore.hide();$showLess.show();$moreItems.show();e.stopPropagation()}return false});$showLess.click(function(e){if(!e.isPropagationStopped()){$showMore.show();$showLess.hide();$moreItems.hide();e.stopPropagation()}return false})}return $group};TimelineControl.prototype.buildItem=function(item){var title=item.title||"",url=item.url||"",thumbnailUrl=item.thumbnailUrl||"",label1=item.label1||"",label2=item.label2||"",label3=item.label3||"",label4=item.label4||"",label5=item.label5||"",$item=$("<div>",{"class":"cc-timeline-item"}),$thumbnail=$("<div>",{"class":"cc-timeline-item-thumbnail"}).appendTo($item);$thumbnail.css("background-image","url('"+thumbnailUrl+"')");var $details=$("<div>",{"class":"cc-timeline-item-details"}).appendTo($item);$details.click(function(e){if(!e.isPropagationStopped()&&!MscrmCommon.ControlUtils.String.isNullOrWhitespace(url)){var _window=window;_window.Xrm.Internal.openUrl(url);e.stopPropagation()}});var $title=$("<div>",{"class":"cc-timeline-item-title",text:title}).appendTo($details);$("<div>",{"class":"cc-timeline-item-label",text:label1}).appendTo($details);$("<div>",{"class":"cc-timeline-item-label",text:label2}).appendTo($details);$("<div>",{"class":"cc-timeline-item-label",text:label3}).appendTo($details);$("<div>",{"class":"cc-timeline-item-label",text:label4}).appendTo($details);$("<div>",{"class":"cc-timeline-item-label",text:label5}).appendTo($details);return $item};TimelineControl.prototype.buildFilters=function(){var _this=this,$filters=$("<select>",{"class":"cc-timeline-filters"});$("<option>",{text:this.defaultTopicLabel,val:""}).appendTo($filters);for(var i=0;i<this.filters.length;i++){var $option=$("<option>",{text:this.filters[i],val:this.filters[i]}).appendTo($filters);this.filters[i]==this.currentFilter&&$option.prop("selected",true)}$filters.change(function(e){_this.currentFilter=$(e.target).find("option:selected").first().val();_this.filterItems();_this.render()});return $filters};TimelineControl.prototype.getOutputsCore=function(){return null};TimelineControl.prototype.destroyCore=function(){if(this.isControlInitialized){this.$main.find(".cc-timeline-show-more").off("click");this.$main.find(".cc-timeline-show-less").off("click");this.$main.find(".cc-timeline-item-title").off("click");$(this.container).empty()}};return TimelineControl}(MscrmCommon.CommonControl);Timeline.TimelineControl=TimelineControl})(Timeline=MscrmControls.Timeline||(MscrmControls.Timeline={}))})(MscrmControls||(MscrmControls={}))