(function($){
	$(function(){
		// 导航切换模块
		(function(){
			var oLis=$(".search-tab").find("li");
			var oInputs=[
				'例如：荷棠鱼坊烤鱼 或 樱花日本料理',
				'例如：老北京一尊皇牛',
				'例如：优惠券',
				'例如：樱花日本料理文章',
				'例如：街舞'
			];
			var searchExam=oInputs[oLis.filter('[class=active]').index()];
			$("#searchText").val(searchExam);
			oLis.on('click',function(){
				oLis.removeClass('active').addClass('gradient');
				$(this).addClass('active').removeClass('gradient');
				//输入框内容发生改变
				searchExam=oInputs[$(this).index()];
				$("#searchText").val(searchExam);
			});
			$("#searchText").on({
				'focus':function(){
					if($(this).val()==searchExam){
						$(this).val('');
					}
				},
				'blur':function(){
					if($(this).val()==''){
						$(this).val(searchExam);
					}
				}
			});
		})();

		//新闻滚动模块
		(function(){
			var data=[
				{
					"name":"萱萱",
					"time":"5分钟前",
					"content":"写了一篇文章，那些灿烂华美的瞬间",
					"url":"#"
				},
				{
					"name":"熊熊",
					"time":"15分钟前",
					"content":"写了一篇文章，我是一只酱油熊",
					"url":"#"
				},
				{
					"name":"熊熊109",
					"time":"25分钟前",
					"content":"写了一篇文章，hello world",
					"url":"#"
				},
				{
					"name":"小小酱油熊",
					"time":"35分钟前",
					"content":"写了一篇文章，你好",
					"url":"#"
				}
			];
			var str="";
			for(var i=0;i<data.length;i++){
				str+='<li><a href="'+data[i].url+'"><em>'+data[i].name+'</em><span>'+data[i].time+'</span>'+data[i].content+'</a></li>'
			}
			//获取数据后加载
			$("#updateUl").html(str);
			var oLis=$("#updateUl").find("li");
			var arr=[];
			//样式重写
			oLis.each(function(idx,el){
				arr.push($(this).position().top);
			});
			oLis.css('position','absolute');
			oLis.each(function(idx,el){
				$(this).css("top",arr[idx]);
			});
			$("#updateUl").css('height',oLis.length*oLis.height());
			//无缝滚动
			$("#arrowDown").on('click',function(){
				var top=$("#updateUl").position().top;
				if(Math.abs(top)>=arr[arr.length-1]){
					oLis.eq(0).css("top",oLis.length*oLis.height());
					$("#updateUl").stop().animate({"top":top-oLis.height()},function(){
						$("#updateUl").css("top",0);
						oLis.eq(0).css("top",arr[0]);
					});
				}else{
					$("#updateUl").stop().animate({"top":top-oLis.height()});
				}
			});
			$("#arrowUp").on('click',function(){
				var top=$("#updateUl").position().top;
				if(top>=0){
					oLis.eq(oLis.length-1).css("top",-oLis.height());
					$("#updateUl").stop().animate({"top":top+oLis.height()},function(){
						oLis.eq(oLis.length-1).css("top",arr[arr.length-1]);
						$("#updateUl").css("top",-arr[arr.length-1]);
					});
				}else{
					$("#updateUl").stop().animate({"top":top+oLis.height()});
				}
			});
			var timer=null;
			clearInterval(timer);
			timer=setInterval(function(){
				$("#arrowDown").trigger('click');
			},2000);
			$(".update").hover(function(){
				clearInterval(timer);
			},function(){
				timer=setInterval(function(){
					$("#arrowDown").trigger('click');
				},2000);
			});
		})();

		//tab切换模块
		(function(){
			$.tab($("#tab1 li"),'click',$("#tCon1 .tab-content"));
			$.tab($("#tab2 li"),'click',$("#tab2 .tab-content"));
			$.tab($("#knowTab li"),'mouseover',$("#knowWrap .i-know"));
			$.tab($("#sideTabUl li"),'mouseover',$(".sideTabUl"));
		})();

		//精彩推荐轮播图
		(function(){
			var oTriggers=$(".slider-wrap .tab-slider").find("li");
			var oShows=$(".slider-wrap .big-slider").find("li");
			var oTexts=$(".slider-wrap .slider-text").find('li');
			var iCur=oShows.filter('[class=active]').index();
			oTriggers.on('click',function(){
				oTriggers.removeClass('active');
				$(this).addClass('active');
				oShows.eq(iCur).stop().fadeOut();
				oTexts.eq(iCur).hide();
				oShows.eq($(this).index()).stop().fadeIn();
				oTexts.eq($(this).index()).show();
				iCur=$(this).index();
			});
			var timer=null;
			var delay=2000;
			clearInterval(timer);
			timer=setInterval(function(){
				autoSlider();
			},delay);
			$(".slider-wrap").hover(function(){
				clearInterval(timer);
			},function(){
				timer=setInterval(function(){
					autoSlider();
				},delay);
			});
			function autoSlider(){
				iCur++;
				if(iCur>=oTriggers.length){
					iCur=0;
				}
				oTriggers.removeClass('active');
				oTriggers.eq(iCur).addClass('active');
				if(iCur-1<0){
					oShows.eq(oTriggers.length-1).stop().fadeOut();
					oTexts.eq(oTriggers.length-1).hide();
				}else{
					oShows.eq(iCur-1).stop().fadeOut();
					oTexts.eq(iCur-1).hide();
				}
				oShows.eq(iCur).stop().fadeIn();
				oTexts.eq(iCur).show();
			}
		})();

		//bbs
		(function(){
			$(".bbs-list").find("li").hover(function(){
				$(this).find(".normal-list").hide();
				$(this).find('.hover-list').show();
			},function(){
				$(this).find(".normal-list").show();
				$(this).find('.hover-list').hide();
			});
		})();

		//红人烧客
		(function(){
			$(".hot-img-wrap").find(".box").hover(function(){
				$(this).find('.mark').stop().fadeIn();
			},function(){
				$(this).find('.mark').stop().fadeOut();
			});
		})();

		//日历部分
		(function(){
			var data=[
				{"url":"img/pizza.jpg"},
				{"url":"img/show.jpg"}
			]
			var oTodos=$(".clen .todo");
			var oHover=$(".hover-wrap");
			oTodos.on({
				'mouseenter':function(){
					//模拟ajax
					if($(this).html()=='17'){
						oHover.find(".big").attr('src',data[0].url);
					}else if($(this).html()=='21'){
						oHover.find(".big").attr('src',data[1].url);
					}
					oHover.show();
					oHover.css({
						"left":$(this).offset().left+$(this).width()+$(".hover-info .arrow").width(),
						"top":$(this).offset().top+$(this).height()/2-oHover.height()/2
					});
				},
				'mouseleave':function(){
					oHover.hide();
				}
			})
		})();
	});
//tab切换
$.extend({
	'tab':function(trig,ev,res){
		trig.on( ev,function(){
			var oArrow=trig.find('*').filter('[class*=arrow]');
			oArrow.removeClass('a-down-red').addClass('a-down-grey');
			trig.removeClass('active').addClass('gradient');
			res.hide();
			res.eq($(this).index()).show();
			$(this).removeClass('gradient').addClass('active');
			oArrow.eq($(this).index()).removeClass('a-down-grey').addClass('a-down-red');
		} );
	}
});
})(jQuery);