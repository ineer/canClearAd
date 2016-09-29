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
filter = {
	urls: [
		'*://pos.baidu.com/*',
		'*://cpro.baidustatic.com/*',
		'*://dup.baidustatic.com/*',
		'*://eclick.baidu.com/*',
		'*://hm.baidu.com/*',
		'*://push.zhanzhang.baidu.com/*',
		'*://api.share.baidu.com/*',
		'*://wn.pos.baidu.com/*',
		'*://sp0.baidu.com/*',
		'*://sp1.baidu.com/*',
		'*://t12.baidu.com/*',
		'*://t10.baidu.com/*',
		'*://t11.baidu.com/*',
		'*://bzclk.baidu.com/*',
		'*://im-x.jd.com/*',
		'*://static.360buyimg.com/*',
		'*://img30.360buyimg.com/*',
		'*://wn.x.jd.com/*',
		'*://pagead2.googlesyndication.com/*',
		'*://files.jb51.net/*',
		'*://googleads.g.doubleclick.net/*',
		'*://s0.2mdn.net/*',
		'*://img.ads.csdn.net/*',
		'*://ads.csdn.net/*',
		'*://bj.bcebos.com/*',
		'*://player.letvcdn.com/1c02_p/*',
		'*://imgcache.qq.com/tencentvideo_v1/player/MediaPlugin.swf*',
		'*://imgcache.qq.com/tencentvideo_v1/player/partialup/MediaPlugin.swf*'
	]
}

chrome.webRequest.onBeforeRequest.addListener(function(request){
    return {cancel: true};
}, filter, ['blocking']);
