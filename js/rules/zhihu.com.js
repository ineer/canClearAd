// 移除规则
// 符合规则的元素直接移除
var removeRule = [
		['div[class*="shameimaru-section"]', 0]
	];
// 替换规则
// 符合规则的元素用透明元素替换
var replaceRule = [
		// ['', 0]
	];

clearAd(removeRule, replaceRule);
checkPageChange();