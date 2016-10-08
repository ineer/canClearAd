// 移除规则
// 符合规则的元素直接移除
var removeRule = [
		
	];
// 替换规则
// 符合规则的元素用透明元素替换
var replaceRule = [
		// ['', 0]
	];
jumpAds();

function jumpAds() {
    var temp_video = document.querySelector('video');
    if (temp_video.src.indexOf('http://data.video.qiyi.com/videos/other/') > -1) {
        temp_video.playbackRate = 10;
        setTimeout(jumpAds, 1000);
    }
}
