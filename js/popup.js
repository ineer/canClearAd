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
	
	webpage.value = bgObj.document.getElementById('webpage').value;
	adClearNum.innerText = bgObj.document.getElementById('adClearNum').innerText;
	adTotalNum.innerText = bgObj.document.getElementById('adTotalNum').innerText;
	if (times < 0) {
		return true;
	}
	getBgText(times);
}

getBgText(3);