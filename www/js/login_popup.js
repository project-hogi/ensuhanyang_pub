//팝업 노출
$(function(){
	$('#header').on('click',function(){
		$('#popup').css('display','block')
	})
})

//팝업 안에서의 이미지 변경
$(function(){
	var num = 0;
	$('#login_popup>ul>li>a').on('click',function(){
		num = $(this).parent().index()
		$('#login_popup ul li a').removeClass('on').next('ul').css('display','none')
		$(this).addClass('on').next('ul').css('display','block')
		$('#login_popup span img').attr('src','images/login_popup/join_'+num+'.jpg')
	})
	$('.close').on('click',function(){
			$('#popup').css('display','none')
	})
})
