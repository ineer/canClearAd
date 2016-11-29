/*!
 * 
 * Copyright 2016 Ineer
 * Licensed under MIT (https://github.com/ineer/canclearad/blob/master/LICENSE)
 */

// 记录清除广告数
var adClearNum   = 0;
var webRuleUrl   = 'https://ineer.github.io/canClearAd-rules/webRule.json';
var clearRuleUrl = 'https://ineer.github.io/canClearAd-rules/rules/';
var oldURL       = window.location.href;
var storage      = chrome.storage.local;
var getRuleTimes = 0;
var MutationObserver = window.MutationObserver
	  || window.WebKitMutationObserver
	  || window.MozMutationObserver;

// 特定网站列表
var webRule           = [];
var removeRule        = [];
var replaceRule       = [];
var commonRemoveRule  = [];
var commonReplaceRule = [];

storage.get('lastUpdate', function(value) {
	
	var date = Date.parse(new Date());

	if (Object.keys(value).length !== 0) {
		if (Date.parse(new Date()) - value.lastUpdate > 1000*60*60*24) {
			storage.clear();
			storage.set({"lastUpdate": date});
		}
	} else {
		storage.set({"lastUpdate": date});
	}
	getRule();
});

chrome.extension.sendRequest({url: oldURL, clearNum: 0});
setMutationObserver();
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
							getCommonRule(function(err) {
								if (!err) {
									clearAd(commonRemoveRule, commonReplaceRule);
									chrome.extension.sendRequest({clearNum: adClearNum});
									adClearNum = 0;
									//setMutationObserver();
								}
							});
						}
					});
				} else {
					getCommonRule(function(err) {
						if (!err) {
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
	storage.get('webRule', function(value) {
		if (Object.keys(value).length === 0) {
			fetch(webRuleUrl).then(function(res) {
				if (res.status === 200) {
					res.json().then(function(json) {
						webRule = json.urls;
						storage.set({'webRule': json.urls});
						callback(false);
					})
				}
			});
		} else {
			webRule = value.webRule;
			callback(false);
		}
	});
	
}
function getClearRule(url, callback) {
	urlRemoveRule = url + ".removeRule";
	urlReplaceRule = url + ".replaceRule";
	storage.get(urlRemoveRule, function(value) {
		if (Object.keys(value).length === 0) {
			fetch(clearRuleUrl + url + '.json').then(function(res) {
				if (res.status === 200) {
					res.json().then(function(json) {
						removeRule = json.removeRule;
						storage.set({urlRemoveRule: json.removeRule});
					})
				}
			});
		} else {
			removeRule = value.urlRemoveRule;
		}
	});
	storage.get(urlReplaceRule, function(value) {
		if (Object.keys(value).length === 0) {
			fetch(clearRuleUrl + url + '.json').then(function(res) {
				if (res.status === 200) {
					res.json().then(function(json) {
						replaceRule = json.replaceRule;
						storage.set({urlReplaceRule: json.replaceRule});
						callback(false);
					})
				}
			});
		} else {
			replaceRule = value.urlReplaceRule;
			callback(false);
		}
	});
}
function getCommonRule(callback) {
	storage.get("commonRemoveRule", function(value) {
		if (Object.keys(value).length === 0) {
			fetch(clearRuleUrl + 'common.json').then(function(res) {
				if (res.status === 200) {
					res.json().then(function(json) {
						commonRemoveRule = json.removeRule;
						storage.set({"commonRemoveRule": json.removeRule});
					})
				}
			});
		} else {
			commonRemoveRule = value.commonRemoveRule;
		}
	});
	storage.get("commonReplaceRule", function(value) {
		if (Object.keys(value).length === 0) {
			fetch(clearRuleUrl + 'common.json').then(function(res) {
				if (res.status === 200) {
					res.json().then(function(json) {
						commonReplaceRule = json.replaceRule;
						storage.set({"commonReplaceRule": json.replaceRule});
						callback(false);
					})
				}
			});
		} else {
			commonReplaceRule = value.commonReplaceRule;
			callback(false);
		}
	});
}
function setMutationObserver() {
	var observer = new MutationObserver(function(records) {
		clearAd(removeRule, replaceRule);
		clearAd(commonRemoveRule, commonReplaceRule);
	});
	var options = {
	  'childList': true,
	  'characterData': true,
	  'subtree': true
	};

	observer.observe(document.body, options);
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

if (oldURL.indexOf('iqiyi') > -1) {
	setTimeout(jumpAds, 3000);
}
function jumpAds() {
    var temp_video = document.querySelector('video');
    if (temp_video) {
    	if (temp_video.src.indexOf('http://data.video.qiyi.com/videos/other/') > -1) {
			temp_video.playbackRate = 10;
			setTimeout(jumpAds, 800);
		}
    }
}