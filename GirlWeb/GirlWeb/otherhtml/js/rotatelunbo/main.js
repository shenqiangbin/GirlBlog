
// jQuery 让出 $ 符号的使用权限 (也就是说，从这一刻开始 $ 将不再是
// jQuery，只能用变量 jQuery)
jQuery.noConflict();
jQuery('.slide').zySlide({speed: 3000,delay: 2000}).css({
	//'backgroundColor': 'red'
})
jQuery('#slide').zySlide({speed: 1000}).css({
	'border': '1px solid #606060',
	//'backgroundColor': 'yellow'
});

