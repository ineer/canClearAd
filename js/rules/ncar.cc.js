// 移除规则
// 符合规则的元素直接移除
console.time('clearAdTime');
var removeRule = [
		['#toptb', 0],
		['#ad_ld', 0],
		['div[class*="a_cb"]', 0],
		['div[class*="a_h"]', 0],
		['div[class*="boardnav"]', 0],
		['script[src*="http://cpro.baidustatic.com/"]', 0]
	];
// 替换规则
// 符合规则的元素用透明元素替换
var replaceRule = [
// 		['', 0]
	];

// 特殊
var ncarAd1 = document.querySelectorAll('div[id*="post_"]');
if (ncarAd1) {
	for (var i = 0; i < ncarAd1.length; i++) {
		if (ncarAd1[i].querySelector('div[class*="showhide"]')) {
			ncarAd1[i].querySelector('div[class*="showhide"]').parentNode.removeChild(ncarAd1[i].querySelector('div[class*="showhide"]'));
		}
	}
}

clearAd(removeRule, replaceRule);
checkPageChange();
console.timeEnd('clearAdTime');