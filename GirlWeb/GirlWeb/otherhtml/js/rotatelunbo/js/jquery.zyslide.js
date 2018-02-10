// 自运行的匿名函数
//(function(){
//	alert('自运行的匿名函数');
//})()

//$(function(){
//	alert('这是一句优美的句子');	
//})

(function($){
	
	// 本函数每次调用只负责一个轮播图的功能
	// 也就是说只会产生一个轮播图，这个函数的作用域只能分配一个轮播图
	// 所以要求在调用本函数的时候务必要将当前轮播图的根标签传过来。
	// 这个参数 ele 就是某个轮播图的根标签
	var slide = function(ele,options){
		// 转换成 jquery 对象
		var $ele = $(ele);
		// 设置默认选项
		var setting = {
			// 控制刚炸开的时间
			delay: 1000,
			// 控制轮播图轮播的时间(轮播的速度)
			speed: 2000
		}
		
		// 对象合并
		$.extend(true, setting, options);
		
		var states = [
		{ZIndex: 1,width: 120,height: 150,top: 69,left: 66,ZOpacity: 0.2},
		{ZIndex: 2,width: 130,height: 170,top: 59,left: 0,ZOpacity: 0.5},
		{ZIndex: 3,width: 170,height: 218,top: 35,left: 110,ZOpacity: 0.7},
		{ZIndex: 4,width: 224,height: 288,top: 0,left: 265,ZOpacity: 1},
		{ZIndex: 3,width: 170,height: 218,top: 35,left: 474,ZOpacity: 0.7},
		{ZIndex: 2,width: 130,height: 170,top: 59,left: 624,ZOpacity: 0.5},
		{ZIndex: 1,width: 120,height: 150,top: 69,left: 568,ZOpacity: 0.2},
	]
	
	// 找到所有的 li
	var lis = $ele.find('li');
	// 让每个 li 对应上面 states 的每个状态
	function move(){
		lis.each(function(index,ele){
			var state = states[index];
			$(ele).css('z-index',state.ZIndex).finish().animate(state,setting.delay).find('img').css('opacity',state.ZOpacity);
		});
	}
	move();
	
	// 下一张，让轮播图发生偏移
	function next(){
		// 原理： 将数组最后一个元素移到数组的第一位
		states.unshift(states.pop());
		move();
	}
	
	// 上一张的方法，让轮播图发生偏移
	function prev(){
		// 将第一个移动到最后一位去
		states.push(states.shift());
		move();
	}
	
	// 点击下一张
	$ele.find('.zy-next').click(function(){
		next();
	})
	
	// 点击上一张
	$ele.find('.zy-prev').click(function(){
		prev();
	})
	
	// 自动轮播
//	var interval = null;
//	function autoPlay(){
//		interval = setInterval(function(){
//			next()
//		},setting.speed);
//	}
//	autoPlay();
	
	var interval = null ;
	function autoPlay(){
		interval = setInterval(function(){
			next()
		},setting.speed);
	}
	autoPlay();
	
	$ele.find('section').hover(function(){
		clearInterval(interval);
	},function(){
		autoPlay();
	 })
	}
	
	// 找到要轮播 的轮播图的根标签，调用 slide 方法
	$.fn.zySlide = function(options){
		// this 执行的是我们 main.js 中查询到的轮播图
		// 根标签
//		console.log(this);
		
		// 因为考虑到页面可能不止一个轮播图，所以我们要遍历出
		// 所有的轮播图跟标签，然后执行轮播
		$(this).each(function(i,ele){
			slide(ele,options);
		})
		// 支持链式调用
		return this;
	}
	
})(jQuery)




/*
 *  用 jQuery 封装插件的几种写法：
 *  
 *  插件类写法：
 *  $.fn.customFun = function(){
 * 	    // 自定义插件的代码
 *  }
 *  
 *  用法：
 *  $('selector').customFun();
 * 
 *  工具类写法：
 *  $.customFun = function(){
 * 		// 自定义工具类的代码
 *  }
 * 
 *  用法：
 *  $.customFun()
 * 
 */

