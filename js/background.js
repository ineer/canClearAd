/*!
 * canClearAd v0.1.0
 * Copyright (c) 2016 Ineer
 * Licensed under MIT (https://github.com/ineer/canclearad/blob/master/LICENSE)
 */

var filter1 = {};
var filter2 = {};

var webpage = '';
var clearNum = 0;
var totalNum = 0;

chrome.extension.onRequest.addListener(function(request, sender, sendRequest) {

	// 计算清除广告数目
	if (request.clearNum || request.clearNum === 0) {
		clearNum = Number(request.clearNum);
		totalNum = totalNum + Number(request.clearNum);
	}

	// 地址规则
	if (request.url){
		webpage = request.url;
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {                
	
	chrome.pageAction.show(tabId);

});

getFilter(function(err) {
	if (!err) {
		chrome.webRequest.onBeforeRequest.addListener(function(request) {
			return {cancel: true};
		}, filter1, ['blocking']);
		chrome.webRequest.onBeforeSendHeaders.addListener(function(request) {
		  for (var i = 0; i < request.requestHeaders.length; ++i) {
			if (request.requestHeaders[i].name === 'User-Agent') {
			  request.requestHeaders[i].value = 'Mozilla/5.0 (Linux; Android 4.4.4; Nexus 5 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Mobile Safari/537.36';
			  break;
			}
		  }
		  return {requestHeaders: request.requestHeaders};
		}, filter2, ['blocking', 'requestHeaders']);
	}
});


function getFilter(callback) {
	fetch('https://ineer.github.io/canClearAd-rules/filter.json').then(function(res) {
		if (res.status === 200) {
			res.json().then(function(json) {
				filter1.urls = json.filter1;
				filter2.urls = json.filter2;
				callback(false);
			});
		}
	});
}