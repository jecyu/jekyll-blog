---
author: jecyu
layout: post
title: "使用HTML5 localStorage实现本地存储"
date: 2017-12-10
comments: true
categories:
---

在用户计算机上本地存储信息对于网站开发人与来说是一个强大的策略。在本文中，我们将可以学到了localStorage在计算机上存储信息是多么地容易，并解释了它的应用。

## 一、使用LocalStorage 的目的：为了添加状态到Web应用中

HTTP协议作为网络的主要传输层的最大问题是无状态的，即服务器不知道用户上一次做了什么，这样意味着你使用浏览器访问一个网站如辛苦的填了一个表单，由于不可描述的原因，网站被关闭。然后你再次重新打开它时，空空如也，what！！？？？？这是因为你关闭桌面上的应用程序时并重新打开它，它会恢复到最新的状态，不会记录你所填的东西。

这就是为什么作为开发人员，有时候你需要将你的接口状态存储到某个地方。通常，这是在服务端完成的，通过检测用户名来知道要恢复到哪个状态。但是如果你不想强迫别人进行注册呢？（旁白：有时候我们只是蹭蹭不进去😄）

这时候就需要local storage出场了，你可以在用户的计算机上保存一个钥匙key，在用户重新访问时获取它来记录蹭过的痕迹。

## 二、使用cookie对我们来说足够好了吗？ 

双十一零点零分，花森赶快打开某宝，不用输入帐号密码就登录了（其实是Cookie在起作用，记录了上次的登录信息）。真好！花森速速浏览了几个网页，买了一套cosplay女装。在结账时由于http的无状态性，服务器并不知道用户（花森）到底买了什么。经典做法是使用cookie，服务器通过设置或读取Cookies中的信息，来维护用户（花森）跟服务器的会话状态。在花森选购一项商品时，服务器在向花森发送网页的同时还发送一段Cookie，记录着cosplay女装的信息。当花森去访问另一个页面时，浏览器会把Cookie发送给服务器，于是服务器就知道花森之前买了什么啦。花森继续购买鞋子，这时候服务器只需要在那段Cookie中追加新的商品信息就行了。结账时，服务器读取发送来的Cookie就行了。

但是使用Cookie有几个缺陷：

1. Cookie会被附加到每个HTTP请求中，无形中增加了流量。
2. 由于HTTP请求中的Cookie是明文传递的，所有存在安全性问题，一些有安全意识的人或公司会手动关闭Cookie设置。
3. Cookie大小限制在4KB左右，无法应对比较复杂的存储需求。

为了解决本地存储问题，使用Cookie是相对过时的方案，如今我们可以通过localStorage来实现。

## 三、在支持 HTML5 的浏览器中开始localStorage

在现代浏览器中使用本地localStorage是相当容易的，你只需要在JavaScript脚本中修改localStorage对象，它是key/value形式，与传统的对象类似。可以通过`setItem()`和`getItem()`方法来访问存储和读取的功能。

	localStorage.setItem('girlfriend', 'huasen');
	var hername = localStorage('girlfriend');  
	// -> "huasen"

要删除这个key项，你可以使用-你能猜到？——the `removeItem()`

	localStorage.removeItem('girlfriend);
	var hername = localStorage.getItem('girlfriend);
	// -> null

很简单有木有？！如果你希望关闭浏览器就自动清除数据，那你可以使用sessionStorage来代替localStorage，它们用法相同，只是生命周期不同。（localStorage除非被清除，否则会永久保存）

## 四、 仅“字符串”问题

localStorage中有一个令人讨厌😒的缺点是只能在不同的键key中存储字符串，这意味着当你开开心心new出来一个对象，（终于有对象了。）却不能把它存储起来，(づ╥﹏╥)づ。

	var girl = {};
	girl.name = 'huasen';
	girl.hobby = ['singing', 'photography'];
	girl.sound = 'pleasant';
	console.log(girl);
	localStorage.setItem('girl', girl);
	console.log(localStorage.getItem('girl'));

在控制台中输出，可以看到这个数据是以[object Object]的形式存储的，而不是真实的对象信息。
	
你可以通过使用原生`JSON.stringfy()`和`JSON.parse()`方法来解决这个问题

	localStorage.setItem('girl', JSON.stringify(girl));
	console.log(JSON.parse(localStorage.getItem('girl')));

译自：[Local Storage And How To Use It On Websites](https://www.smashingmagazine.com/2010/10/local-storage-and-how-to-use-it/#where-to-find-local-storage-data-and-how-to-remove-it)

## 进一步阅读

- [What is the difference between localStorage, sessionStorage, session and cookies?](https://stackoverflow.com/questions/19867599/what-is-the-difference-between-localstorage-sessionstorage-session-and-cookies)
- [MDN Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [维基百科Cookie](https://zh.wikipedia.org/wiki/Cookie#Cookies的替代品)
- [详说 Cookie, LocalStorage 与 SessionStorage](http://jerryzou.com/posts/cookie-and-web-storage/)
