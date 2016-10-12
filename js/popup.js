/*!
 * canClearAd v0.1.0
 * Copyright 2016 Ineer
 * Licensed under MIT (https://github.com/ineer/canclearad/blob/master/LICENSE)
 */

var webpage = document.getElementById('webpage');
var adClearNum = document.getElementById('adClearNum');
var adTotalNum = document.getElementById('adTotalNum');

var bgObj = chrome.extension.getBackgroundPage();

function getBgText(times) {
	--times;
	
	webpage.value = String(bgObj.webpage);
	adClearNum.innerText = Number(bgObj.clearNum);
	adTotalNum.innerText = Number(bgObj.totalNum);
	if (times < 0) {
		return true;
	}
	getBgText(times);
}

getBgText(3);