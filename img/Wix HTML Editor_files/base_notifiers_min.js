(function(){this.setCookie=function(c_name,value,exdays){var c_value,exdate;return exdate=new Date,exdate.setDate(exdate.getDate()+exdays),c_value=encodeURIComponent(value)+(null==exdays?"":"; expires="+exdate.toUTCString()),document.cookie=c_name+"="+c_value},this.getCookie=function(c_name){var ARRcookies,i,x,y;for(i=void 0,x=void 0,y=void 0,ARRcookies=document.cookie.split(";"),i=0;i<ARRcookies.length;){if(x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("=")),y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1),x=x.replace(/^\s+|\s+$/g,""),x===c_name)return decodeURIComponent(y);i++}}}).call(this),function(){var getUserID,guid,visitsCount,_this=this;visitsCount=+(getCookie("visitsCount")||0),!visitsCount&&getCookie("isPageVisited")&&(visitsCount=1,setCookie("isPageVisited","",365)),setCookie("visitsCount",visitsCount+1,365),guid=function(){var s4;return s4=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4()},getUserID=function(){var info;return info=_this.getCookie("wixClient"),null==info?"":info.split("|")[6]||""},window.coolaDataSetup=function(){var _ref;return _this.sessionID=guid(),null!=(_ref=_this.CoolaDataTracker)?_ref.setup("04589457e7c6483b8ef04db218f34e69","https://ec01.cooladata.com",getUserID(),_this.sessionID||""):void 0},coolaDataSetup()}.call(this),function(){"use strict";var BIURL,canSendCoolaDataRequest,coolaDataEventsCount,coolaDataMapping,getCurrentTime,getOriginalCoolaDataEventName,isWixCompanyUser,jsLoadingStartedAt,_this=this;coolaDataMapping={jsLoadStarted:"MdMgrLoad1",appIsInitialized:"MdMgrLoad2",internalComponentsConfigured:"MdMgrLoad3",sentReadyToProtocol:"MdMgrLoad4",domLoadFinished:"MdMgrLoad5",settingsReceivedFromProtocol:"MdMgrLoad6",externalComponentsConfigured:"MdMgrLoad7",appIsRunning:"MdMgrLoad8",translationsLoaded:"MdMgrLoad9",tabsSelected:"MdMgrLoad10",itemsLoaded:"MdMgrLoad11",foldersLoaded:"MdMgrLoad12",CORSCheckCompleted:"MdMgrLoad13"},getOriginalCoolaDataEventName=function(frontEventName){return coolaDataMapping[frontEventName]||frontEventName},getCurrentTime=function(){return(new Date).getTime()},isWixCompanyUser=function(){var clientEmail,cookie;return(cookie=_this.getCookie("wixClient"))?(clientEmail=cookie.split("|")[1],clientEmail?-1!==clientEmail.indexOf("@wix.com"):!1):!1},canSendCoolaDataRequest=isWixCompanyUser()||10*Math.random()<1,jsLoadingStartedAt=getCurrentTime(),BIURL="http://frog.wix.com",/\.wixpress\.com/i.test(document.location.host)&&(BIURL="http://frog.wixpress.com"),this.MediaGallery||(this.MediaGallery={}),MediaGallery.sendBIRequest=function(eventId,params){var image;return null==params&&(params={}),params.evid=eventId,params.did=window.siteId,image=new Image,image.src=""+BIURL+"/mg?"+$.param(params)},this.MediaGallery||(this.MediaGallery={}),MediaGallery.sendBIErrorRequest=function(params){var image;return null==params&&(params={}),image=new Image,image.src=""+BIURL+"/trg?"+$.param(params)},coolaDataEventsCount=0,MediaGallery.sendCoolaDataRequest=function(eventName,params){var cooladataEventName,_ref,_ref1;return null==params&&(params={}),canSendCoolaDataRequest?(params.description||(params.description=eventName),params.event_time_ts||(params.event_time_ts=getCurrentTime()),params.event_timestamp_epoch||(params.event_timestamp_epoch=getCurrentTime()),params.first_time="1"===_this.getCookie("visitsCount")?1:0,params.site_id=0,params.site_name="unknown",params.session_id=_this.sessionID,params.ts_from_session_start=params.event_time_ts-jsLoadingStartedAt,params.rank=coolaDataEventsCount,cooladataEventName=getOriginalCoolaDataEventName(eventName),null!=(_ref=_this.cooladata)&&"function"==typeof _ref.trackEvent&&_ref.trackEvent(cooladataEventName,params),null!=(_ref1=_this.CoolaDataTracker)&&_ref1.trackEvent(cooladataEventName,params),coolaDataEventsCount++):void 0}}.call(this),function(){"use strict";var Checkpoint,checkpointsNames,firedCoolaDataCheckpoints,getCurrentTime,isFirstEnter,previousCheckpoint,sendRequests;getCurrentTime=function(){return(new Date).getTime()},firedCoolaDataCheckpoints=[],isFirstEnter="1"===getCookie("visitsCount"),sendRequests=function(currentCheckpoint,previousCheckpoint){var isFirstSending,lastSentCheckpoint;return isFirstSending=!_.find(firedCoolaDataCheckpoints,function(checkpoint){return checkpoint.name===currentCheckpoint.name}),null!=previousCheckpoint&&isFirstEnter&&MediaGallery.sendBIRequest(125,{name:""+previousCheckpoint.name+"-"+currentCheckpoint.name,time:currentCheckpoint.timestamp-previousCheckpoint.timestamp}),isFirstSending?(lastSentCheckpoint=_.last(firedCoolaDataCheckpoints),firedCoolaDataCheckpoints.push(currentCheckpoint),MediaGallery.sendCoolaDataRequest(currentCheckpoint.name,{event_time_ts:currentCheckpoint.timestamp,duration_ms:null!=lastSentCheckpoint?currentCheckpoint.timestamp-lastSentCheckpoint.timestamp:0})):void 0},Checkpoint=function(){function Checkpoint(name,previousCheckpoint){this.name=name,this.previousCheckpoint=previousCheckpoint,this.timestamp=null}return Checkpoint.prototype.hasPrevious=function(){return null!=this.previousCheckpoint},Checkpoint.prototype.isFiered=function(){return!!this.timestamp},Checkpoint.prototype.fire=function(){return this.timestamp=getCurrentTime(),console.log(this.name,this.timestamp),this.hasPrevious()&&!this.previousCheckpoint.isFiered()&&console.log("App load notifiers: checkpoint '"+this.name+"' is fiered without '"+this.previousCheckpoint.name+"'"),sendRequests(this,this.previousCheckpoint)},Checkpoint}(),checkpointsNames=["jsLoadStarted","appIsInitialized","internalComponentsConfigured","sentReadyToProtocol","domLoadFinished","settingsReceivedFromProtocol","externalComponentsConfigured","appIsRunning","translationsLoaded","tabsSelected","foldersLoaded","itemsLoaded","CORSCheckCompleted"],this.MediaGallery||(this.MediaGallery={}),MediaGallery.appLoadNotifiers={},previousCheckpoint=null,checkpointsNames.forEach(function(checkpointName){var checkpoint;return checkpoint=new Checkpoint(checkpointName,previousCheckpoint),previousCheckpoint=checkpoint,MediaGallery.appLoadNotifiers[checkpointName]=function(){return checkpoint.fire()}})}.call(this);