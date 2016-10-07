# canClearAd
一款全自动清除网站广告的Chrome扩展,支持通用广告,如百度推广或淘宝天猫等广告；也支持特定网站的广告清除。

暂时发现了一种屏蔽视频广告的方法，但只适用于腾讯，乐视，新浪，酷6，风行，暴风等6家网站，正在寻求更多方法。

## 如何安装chrome扩展

1. 从[github](https://github.com/ineer/canClearAd)下载本项目zip到本地；
2. 解压zip到当前目录或选择一个合适的目录；
3. 在Chrome的地址栏输入`chrome://extenstions`；
4. 勾选 `开发者模式`
4. 点击`加载已解压的扩展程序`，选择解压后的目录，即可完成安装。

## 使用前的一些申明

canClearAd项目仅用于学习chrome extension开发使用，请勿将其用于商业用途。

## 广告清除原理

- 屏蔽广告网址请求，这些请求会搜集用户信息，并返回特定的广告内容
- 清除或替换html代码中的广告代码，让广告彻底消失

## 目标视频网站

| Site | URL | 支持情况 |
| :--: | :-- | :-----: |
| 腾讯视频 | <http://v.qq.com/> |✓|
| 乐视视频 | <http://www.le.com/> |✓|
| 新浪视频 | <http://video.sina.com.cn/> |✓|
| 风行视频 | <http://www.fun.tv/> |✓|
| 暴风视频 | <http://www.baofeng.com/> |✓|
| 酷6视频 | <http://www.ku6.com/> |✓|

## 作者

github: [ineer](https://github.com/ineer)  
知乎: [@叶砜](http://www.zhihu.com/people/ineer)

## License

canClearAd is licensed under the [MIT license](http://opensource.org/licenses/MIT).
