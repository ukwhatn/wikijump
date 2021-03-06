

Wikijump.modules.ParentPageModule = {};

Wikijump.modules.ParentPageModule.listeners = {
	setParent: function(e){
		var p = new Object();
		p.action = 'WikiPageAction';
		p.event = 'setParentPage';
		p.parentName = $("parent-page-name").value;
		p.pageId = WIKIREQUEST.info.pageId;

		OZONE.ajax.requestModule(null, p, Wikijump.modules.ParentPageModule.callbacks.setParent);
		YAHOO.util.Event.stopEvent(e);
	}

}

Wikijump.modules.ParentPageModule.callbacks = {
	setParent: function(r){
		if(r.status == 'ok'){
			var w = new OZONE.dialogs.SuccessBox();
			w.content = "The parent page has been set";
			w.show();
			setTimeout('window.location.href="/'+WIKIREQUEST.info.requestPageName+'"',1500);
		}else if(r.status == "no_change" || r.status == "no_parent_page" || r.status == "not_allowed" || r.status =="loop_error"){
			$("parent-set-error").style.display = "block";
			$("parent-set-error").innerHTML = r.message;
		} else{
			if(!Wikijump.utils.handleError(r)) {return;}
		}
	}

}

Wikijump.modules.ParentPageModule.init = function(){
	// attach the autocomplete thing
	var myDataSource = new YAHOO.widget.DS_XHR("/quickmodule.php", ['pages', 'unix_name', 'title']);
	myDataSource.scriptQueryParam="q";
	myDataSource.scriptQueryAppend = "s="+WIKIREQUEST.info.siteId+"&module=PageLookupQModule";

	var myAutoComp = new YAHOO.widget.AutoComplete("parent-page-name","parent-page-name-list", myDataSource);
	myAutoComp.formatResult = function(aResultItem, sQuery) {
		var title = aResultItem[1];
		var unixName = aResultItem[0];
		if(unixName!= null){
			return '<div style="font-size: 100%">'+unixName+'</div><div style="font-size: 85%;">('+title+')</div>';
		} else {
			return "";
		}
	}
	myAutoComp.minQueryLength = 2;
	myAutoComp.queryDelay = 0.5;

}

Wikijump.modules.ParentPageModule.init();
