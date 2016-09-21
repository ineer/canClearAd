/*!
 * canClearAd v0.1.0
 * Copyright 2016 Ineer
 * Licensed under MIT (https://github.com/ineer/canclearad/blob/master/LICENSE)
 */

// 阻止弹窗
blockOpen();
// 记录清除广告数
var adClearNum = 0;
var oldURL = window.location.href;

setTimeout(function(){
	chrome.extension.sendRequest({url: window.location.href, clearNum: 0});
	chrome.extension.sendRequest({common: 'js/rules/common.js'});
}, 2500); //默认2500

// ******************************Function******************************
// 下面的函数将被相应的js文件调用
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
	chrome.extension.sendRequest({clearNum: adClearNum});
	adClearNum = 0;
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
	}
	setTimeout(checkPageChange, 4000);
}