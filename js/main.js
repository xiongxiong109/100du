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
			var iCur=0;
			var oTop;
			$("#arrowDown").on('click',function(){
				iCur++;
				oTop=$("#updateUl").position().top;
				if( Math.abs(oTop)==oLis.height()*(oLis.length-1) ){
					//顺序滚动到最后一个
					oLis.eq(0).css("top",oLis.length*oLis.height());
				}else if( Math.abs(oTop)==$("#updateUl" ).height()){
					oLis.eq(0).css("top",0);
					$("#updateUl").css("top",0);
					iCur=1;
				}
				$("#updateUl").stop().animate({"top" : -oLis.height()*iCur},400,'swing');
				//修复快速点击时ul消失的bug
				if( Math.abs(oTop) >=$("#updateUl").height() ){
					$("#updateUl").css("top",0);
					iCur=1;
				}
			});
			$("#arrowUp").on('click',function(){
				iCur--;
				oTop=$("#updateUl").position().top;
				if(oTop==0){
					//顺序滚动到第一个
					oLis.eq( oLis.length-1 ).css("top",-oLis.height() );
					$("#updateUl").stop().animate({"top" : -oLis.height()*iCur},400,'swing',function(){
						$("#updateUl").css("top",-(oLis.length-1)*oLis.height());
						oLis.eq( oLis.length-1 ).css("top",arr[oLis.length-1]);
						iCur=oLis.length-1;
					});
				}else{
					$("#updateUl").stop().animate({"top" : -oLis.height()*iCur},400,'swing');
				}
				// 修复BUG
				if(oTop>0){
					$("#updateUl").css("top",-(oLis.length-1)*oLis.height());
					oLis.eq( oLis.length-1 ).css("top",arr[oLis.length-1]);
					iCur=oLis.length-1;
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
	});
})(jQuery);