/*doctor*/
$(function(){
  var swiper = new Swiper('.doctor .swiper-container', {
    pagination: '.doctor .swiper-pagination',
    paginationClickable: true,
    centeredSlides: true,
    autoplay: 5000,
    loop:true,
    autoplayDisableOnInteraction: false
  });
})

/*tech*/
$(function(){
  var swiper = new Swiper('.tech .swiper-container', {
    pagination: '.tech .swiper-pagination',
    paginationClickable: true,
    centeredSlides: true,
    autoplay: 5000,
    loop:true,
    autoplayDisableOnInteraction: false
  });
})

/*news*/
$(".news_t").eq(0).show();
$(".news_c li").click(function(){
  var nindex = $(this).index();
  $(".news_c li").eq(nindex).addClass("cur").siblings().removeClass("cur");
  $(".news_t").eq(nindex).show().siblings().hide();
})

/*keshi*/
$(".keshi").eq(0).find(".keshi_list").show();
$(".keshi").eq(0).find("b").css("background-image","url(/templets/default/images/index_ks_icon2.png)");
$(".keshi h2").click(function(){
  if($(this).siblings(".keshi_list").css("display") == "none"){
    $(this).parent(".keshi").siblings().find(".keshi_list").slideUp(300);
    $(this).parent(".keshi").siblings().find("b").css("background-image","url(/templets/default/images/index_ks_icon1.png)");
    $(this).siblings(".keshi_list").slideDown(300);
    $(this).find("b").css("background-image","url(/templets/default/images/index_ks_icon2.png)");
  }else{
    $(this).siblings(".keshi_list").slideUp(300);
    $(this).find("b").css("background-image","url(/templets/default/images/index_ks_icon1.png)");
  }
})