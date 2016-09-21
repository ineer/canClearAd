/*!
 * canClearAd v0.1.0
 * Copyright 2016 Ineer
 * Licensed under MIT (https://github.com/ineer/canclearad/blob/master/LICENSE)
 */

// 特定网站列表
// 如果你新建了一个新的js规则，请把相应的文件名改为网站域名，
// 写入webRule中，重启插件才能生效。
var webRule = ['baidu.com'
		,'163.com'
		,'jb51.net'
		,'zhihu.com'
		,'csdn.net'
		,'ncar.cc'
		,'icoolxue.com'
	];

var webpage = document.getElementById('webpage'),
	clearNum = document.getElementById('adClearNum'),
	totalNum = document.getElementById('adTotalNum');

chrome.extension.onRequest.addListener(function(request, sender, sendRequest) {

	// Calculate number of cleared.
	if (request.clearNum || request.clearNum === 0) {
		clearNum.innerText = Number(request.clearNum);
		totalNum.innerText = Number(totalNum.innerText) + Number(request.clearNum);	
	}

	// 地址规则
	if (request.url){
		webpage.value = request.url;
		for (var i = 0; i < webRule.length; i++) {
			if (request.url.indexOf(webRule[i]) > -1) {
				// 导入JS
				chrome.tabs.executeScript(null, {file: 'js/rules/' + webRule[i] + '.js'});
			}
		}
	}
	if (request.common) {
		chrome.tabs.executeScript(null, {file: request.common});
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {                
	
	chrome.pageAction.show(tabId);

});