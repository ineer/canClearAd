/*!
 * canClearAd v0.1.0
 * Copyright 2016 Ineer
 * Licensed under MIT (https://github.com/ineer/canclearad/blob/master/LICENSE)
 */

var commonRule = [
		// pc6.com
		['iframe[src*="/js/jf/lm.html"]', 1],
		// xz7.com
		['iframe[src*="cngr"]', 2],
		// 2345.com
		['iframe[src*="2345.com"]', 3],
		// ali
		['iframe[src*="alicdn"]', 3],

		// 百度广告
		['[src*="http://cpro.baidustatic.com/cpro/ui/c.js"]', 1],
		['iframe[name*="aswift"]', 2],
		['div[id^="BAIDU"]', 0],
		['iframe[src*="entry.baidu"]', 1],
		['iframe[src*="pos.baidu"]', 1],

		// JD
		['iframe[src*="jd.com"]', 2],
		['a[href*="union.click.jd"', 1],

		// 飞天联盟
		['div[id^="ft_"]', 0],

		// tkg5
		['a[href*="tkg5"', 1],

		// yzzzn
		['a[href*="yzzzn"]', 1],

		// 50bang
		['a[href*="50bang"]', 1],

		// xiazaidc.com
		['a[href*="down.xiazaidc"]', 1],

		// xiazai.zol.com
		['a[href*="xiazai.zol.com"]', 1],

		// xiyoucdn
		['a[href*="xiyoucdn"]', 1],

		// vstart
		['a[href*="vstart"]', 1]
	];


clearAd(commonRule, []);
checkPageChange();