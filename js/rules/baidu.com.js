// 移除规则
// 符合规则的元素直接移除
var removeRule = [
		//[pan.baidu.com/s/*]
		// ['#web-single-bottom', 0], //[pan.baidu.com/s/*]底部广告
		['#web-right-view', 0], //[pan.baidu.com/s/*]右侧广告
		['dl[node-type]', 0], //[pan.baidu.com/s/*]推荐广告
		['li[node-type*="ad"]', 0],
		['div[id="platform-non-found"]', 0],//[pan.baidu.com/s/*]
		['div[id="share_nofound_rec"]', 0],//[pan.baidu.com/s/*]
		['#web-multi-bottom', 0],
		//[tieba.baidu.com]
		['div[id*="pagelet_encourage"]', 0],
		['div[class="diamond-mall-aside"]', 0],
		['div[id="pagelet_frs-aside/pagelet/ad"]', 0],//[tieba.baidu.com]
		['div[id="pagelet_frs-aside/pagelet/hottopic"]', 0],//[tieba.baidu.com]
		['div[id="encourage_entry"]', 0],
		['div[class="topic_list_box"]', 1],
		['div[id="celebrity"]', 0],
		['div[class="firework-wrap"]', 0],
		['div[class="p_content p_content_nameplate"]', 0],//贴吧游戏推广
		['div[class="d_post_content"]', 0],
		['div[data-daid]', 0],
		['a[class*="j_click_stats"]', 0],
		['div[data-isautoreply]', 0],//贴吧触点推广
		['div[title="广告"]', 3],
		['img[data-locate="点击关闭"]', 0],
		['a[data-locate="点击跳转"]', 0],
		['a[data-locate="图片"]', 0],

		//百度知道[zhidao.baidu.com]
		['#wgt-ads', 0],
		['a[class="adTopImg"]', 0],
		['div[class="widget-new-graphic"]', 0],
		['div[class*="mod-noshadow"]', 0],
		['div[class="left-top-ads"]', 0],

		//music.baidu.com
		['#adMainTopLeft', 0],
		['div[class="async-module async-module-sidebar"]', 0],
		['#adBottom', 0],
		['div[class="ad-banner"]', 0],
		['div[monkey="search-index-right-ad"]', 0],

		//百度音乐[play.baidu.com]
		['#toptip', 0],
		['#m-client-product', 0],
		['#uptown', 0],
		['#adWrap', 0],
		['#pauseAd', 0],
		['#right-ads', 0],

		//[www.baidu.com/s?wd=]百度商业推广
		['div[id^="300"]', 0],
		['div[id^="400"]', 0],
		['div[style*="important"]', 0]
	];
// 替换规则
// 符合规则的元素用透明元素替换
var replaceRule = [
		['div[class*="video_outer_wrap"]', 0]//[tieba.baidu.com]
	];

clearAd(removeRule, replaceRule);
checkPageChange();