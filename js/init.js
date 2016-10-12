/*!
 * canClearAd v0.1.0
 * Copyright 2016 Ineer
 * Licensed under MIT (https://github.com/ineer/canclearad/blob/master/LICENSE)
 */

// 阻止弹窗
blockOpen();

// 记录清除广告数
var adClearNum = 0;
var webRuleUrl = 'https://ineer.github.io/canClearAd-rules/webRule.json';
var clearRuleUrl = 'https://ineer.github.io/canClearAd-rules/rules/';
var oldURL     = window.location.href;
var storage = chrome.storage.local;

// 特定网站列表
var webRule           = [];
var removeRule        = [];
var replaceRule       = [];
var commonRemoveRule  = [];
var commonReplaceRule = [];


storage.get('canClearAdTime', function(value) {
	if (Object.keys(value).length === 0) {
		getRule();
	} else {
		if (Date.parse(new Date()) - value.canClearAdTime > 1000*60*60*24) {
			getRule();
		} else {
			getFromStorage();
		}
	}
});

chrome.extension.sendRequest({url: oldURL, clearNum: 0});

// ******************************Function******************************
// 
function getRule() {
	getWebRule(function(err) {
		if (!err) {
			for (var i = 0; i < webRule.length; i++) {
				if (oldURL.indexOf(webRule[i]) > -1) {
					// 获取规则
					getClearRule(webRule[i], function(err) {
						if (!err) {
							clearAd(removeRule, replaceRule);
							clearAd(commonRemoveRule, commonReplaceRule);
							chrome.extension.sendRequest({clearNum: adClearNum});
							adClearNum = 0;
						}
					});
				}
			}
		}
	});
}
function getWebRule(callback) {
	fetch(webRuleUrl).then(function(res) {
		if (res.status === 200) {
			res.json().then(function(json) {
				webRule = json.urls;
				callback(false);
			})
		}
	});
}
function getClearRule(url, callback) {
	fetch(clearRuleUrl + url + '.json').then(function(res) {
		if (res.status === 200) {
			res.json().then(function(json) {
				removeRule = json.removeRule;
				storage.set({"removeRule": json.removeRule});
				replaceRule = json.replaceRule;
				storage.set({"replaceRule": json.replaceRule});
			})
		}
	});
	fetch(clearRuleUrl + 'common.json').then(function(res) {
		if (res.status === 200) {
			res.json().then(function(json) {
				commonRemoveRule = json.removeRule;
				storage.set({"commonRemoveRule": json.removeRule});
				commonReplaceRule = json.replaceRule;
				storage.set({"commonReplaceRule": json.removeRule});
				var date = Date.parse(new Date());
				storage.set({"canClearAdTime": date});
				callback(false);
			})
		}
	});
}
function getFromStorage() {
	storage.get('removeRule', function(value) {
		removeRule = value.removeRule;
		storage.get('replaceRule', function(value) {
			replaceRule = value.replaceRule;
			storage.get('commonRemoveRule', function(value) {
				commonRemoveRule = value.commonRemoveRule;
				storage.get('commonReplaceRule', function(value) {
					commonReplaceRule = value.commonReplaceRule;
					clearAd(removeRule, replaceRule);
					clearAd(commonRemoveRule, commonReplaceRule);
					chrome.extension.sendRequest({clearNum: adClearNum});
					adClearNum = 0;
				});
			});
		});
	});
}
/*
 * removeAd()，清除广告的函数。
 * 原理是根据广告规则匹配到相应的广告对象，并由父级移除自身。
**/
function removeAd(rule) {
	var rule = rule || [];
	for (var i = 0; i < rule.length; i++) {

		var ad = document.querySelectorAll(rule[i][0]);

		if (ad) {
			for (var j = 0; j < ad.length; j++) {
				ad[j] = getParent(ad[j], rule[i][1]);
				ad[j].parentNode.removeChild(ad[j]);
				adClearNum ++;
			}
		}

	}
}
/*
 * replaceAd()，替换广告的函数。
 * 遇到清除广告会导致位置错乱的可以将规则移至替换广告的规则中，
 * 原理是根据广告规则匹配到相应的广告对象，并创建一个透明的的div块级标签，
 * 替换原先的广告对象。
**/
function replaceAd(rule) {
	var rule = rule || [];
	for (var i = 0; i < rule.length; i++) {

		var ad = document.querySelectorAll(rule[i][0]);

		if (ad) {
			for (var j = 0; j < ad.length; j++) {
				ad[j] = getParent(ad[j], rule[i][1]);
				var div = document.createElement('div');
				div.style.width = ad[j].offsetWidth + 'px';
				div.style.height = ad[j].offsetHeight + 'px';
				div.style.float = 'left';
				ad[j].parentNode.replaceChild(div, ad[j]);
				adClearNum ++;

			}
		}

	}
}
function clearAd(rule1,rule2) {
	var rule1 = rule1 || [];
	var rule2 = rule2 || [];
	removeAd(rule1);
	replaceAd(rule2);
}
function getParent(obj, num) {
	if (obj) {
		if (num > 0) {
				getParent(obj.parentNode, num - 1);
		} else {
			return obj;
		}
	}
		
}
function blockOpen() {
	var script = document.createElement("script");
	var text = document.createTextNode("window.open = function(){};");
	script.appendChild(text);
	document.body.appendChild(script);
}
// 对于某些网站，比如百度搜索，不用刷新也会自动进行搜索，无法激活清除广告动作。
// 因此采用每4秒一次检测地址栏是否有变动来自动激活清除广告。
function checkPageChange() {
	if (oldURL !== window.location.href) {
		oldURL = window.location.href;
		clearAd(removeRule, replaceRule);
		clearAd(commonRemoveRule, commonReplaceRule);
		chrome.extension.sendRequest({clearNum: adClearNum});
		adClearNum = 0;
	}
	setTimeout(checkPageChange, 4000);
}
if (oldURL.indexOf('iqiyi') > -1) {jumpAds();}
function jumpAds() {
    var temp_video = document.querySelector('video');
    if (temp_video) {
    	if (temp_video.src.indexOf('http://data.video.qiyi.com/videos/other/') > -1) {
			temp_video.playbackRate = 10;
			setTimeout(jumpAds, 800);
		}
    }
}