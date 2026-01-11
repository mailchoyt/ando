window.addEventListener('load', function(){

    /* Image Viewer */
    function imgViewer(imageUrl){
       window.open('scrollbars=yes, toolbar=no, menubar=no, location=no').document.write('<html><head><meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, width=device-width" /></head><body onclick="javascript:window.close(\'imgViewer\');"><img src="'+imageUrl+'"/></body></html>');
    }
    $('.imgv').on('click', function(){
        imgViewer($(this).attr('src'));
    });



    /* Scroll Top Button */
    $('footer').after('<div class="scroll-top"><button class="scroll-top-btn" type="button" data-state="true"></button></div>');

    function quickBTN(){
        if($(this).scrollTop() > $(window).height() - $(window).height() / 2){
            $('.scroll-top-btn').attr('data-state', 'true');
        } else {
            $('.scroll-top-btn').attr('data-state', 'false');
        }
    } quickBTN();

    function header(){
        if($(this).scrollTop() > 10){
            $('header').attr('data-fix', 'true');
        } else {
            $('header').attr('data-fix', 'false');
        }
    } header();

    $(window).scroll(function(){
        quickBTN();
        header();
    });

    $('.scroll-top-btn').click(function(){
        $('html, body').animate({scrollTop: '0px'}, 300);
    });


    $('.anchor a').click(function(){
        var linkTop = $(this).attr('href'),
            id = linkTop.replace('#', '');


        $('html, body').stop().animate({scrollTop:$('#'+id).offset().top - $('.header-wrap').height()}, 500, 'swing');
    });






    /* Mobile Burger Menu */
    var wrap = $('.wrap-inner'),
        footer = $('#footer .container'),
        burgerMenu = $('.burger-menu'),
        mobileGNB = $('.m_gnb');

    function bugerMaker(){
        $('body').removeAttr('data-scroll');
        burgerMenu.attr('aria-pressed', 'false');
        mobileGNB.removeClass('mo_gnb_on');
        $('.gnb-dimmed').remove();
        wrap.attr('data-side', 'false');
        footer.attr('data-side', 'false');
    }

    burgerMenu.click(function(){
        if($(this).attr('aria-pressed') === "false"){
            $('body').attr('data-scroll', 'false');
            $(this).attr('aria-pressed', 'true');
            mobileGNB.addClass('mo_gnb_on').after('<div class="gnb-dimmed"></div>');
            wrap.attr('data-side', 'true');
            footer.attr('data-side', 'true');
            $('#menu-container .accordion-toggle').removeClass('active-tab');
            $('#menu-container .menu-link').removeClass('active');
            $('#menu-container .menu-submenu').slideUp(0).removeClass('open');
        } else {
            bugerMaker();
        }
    });
    $('body').delegate(".gnb-dimmed", "click",function() { bugerMaker(); });


    $('.my-page li a').click(function(){
        bugerMaker();
    });



    function response(){

        $("iframe").each(function(){
            if( /^https?:\/\/www.youtube.com\/embed\//g.test($(this).attr("src")) ){
                $(this).css("width","100%");
                $(this).css("height",Math.ceil( parseInt($(this).css("width")) * 480 / 854 ) + "px");
            }
        });

        if($(this).width() > 1024){
            bugerMaker();
        }
    } response();

    $(window).resize(function(){
        response();
    });





    /* Quick Menu */
  	var quickMenu = $('#quickmenu-wrap'),
  		quickTop = 10,
  		scrollTopBtn = $('.page_top'); // margin-top: 10px

  		quickMenu.animate( { "top": $(document).scrollTop() + quickTop +"px" },  500 );

  	$(window).scroll(function(){
        quickBTN();
  		quickMenu.stop();
  		quickMenu.animate( { "top": $(document).scrollTop() + quickTop + "px" }, 500 );
    });
  	scrollTopBtn.click(function(){
  		$('html, body').animate({scrollTop: '0px'}, 300);
  	});



    /* Tab Menu */
    $('.tab_menu > ul > li').click(function(){

        var num = $(this).index();

        $('.tab_contents > ul > li').removeClass('active');
        $('.tab_menu > ul > li').removeClass('active');
        $(this).addClass('active');

        $('.tab_contents > ul > li').each(function(){
            if(num == $(this).index()){
                $('.tab_contents > ul > li').removeClass('active');
                $(this).addClass('active');
            }
        });
    });

    /* Tab Menu 2 Depth */
    $('.tab_menu_2depth > ul > li').click(function(){

    var num = $(this).index();

    $('.tab_contents_2depth > ul > li').removeClass('active');
    $('.tab_menu_2depth > ul > li').removeClass('active');
    $(this).addClass('active');

    $('.tab_contents_2depth > ul > li').each(function(){
    if(num == $(this).index()){
    $('.tab_contents_2depth > ul > li').removeClass('active');
    $(this).addClass('active');
    }
    });
    });


    /* QnA */
    var qna = $('#qna_form .q_title');
    qna.click(function(){
        $('#qna_form .q_content').css('display', 'none');
        $(this).next('.q_content').css('display', 'block');
    });



    /*
      Review
    */
    var reviewBtn = $('.review_toggle');
    reviewBtn.click(function(){
        if($(this).attr('data-toggle') === 'on'){
            $(this).attr('data-toggle', 'off');
            $(this).parents('.review').children('.review_contents').attr('data-review', 'off');
        } else {
            reviewBtn.attr('data-toggle', 'off');
            $('.review_contents').attr('data-review', 'off');

            $(this).attr('data-toggle', 'on');
            $(this).parents('.review').children('.review_contents').attr('data-review', 'on');
        }
    });

    /* Favorite Menu */
    $('#bookmark').on('click', function(e) {
        var bookmarkURL = window.location.href;
        var bookmarkTitle = document.title;
        var triggerDefault = false;

    if (window.sidebar && window.sidebar.addPanel) {
        // Firefox version &lt; 23
        window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
    } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') < -1)) || (window.opera && window.print)) {
        // Firefox version &gt;= 23 and Opera Hotlist
        var $this = $(this);
        $this.attr('href', bookmarkURL);
        $this.attr('title', bookmarkTitle);
        $this.attr('rel', 'sidebar');
        $this.off(e);
        triggerDefault = true;
    } else if (window.external && ('AddFavorite' in window.external)) {
        // IE Favorite
        window.external.AddFavorite(bookmarkURL, bookmarkTitle);
    } else {
        // WebKit - Safari/Chrome
        alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 를 누르시면 즐겨찾기에 추가할 수 있습니다.');
    }
    return triggerDefault;
    });



    /* Fade */

});


// Accordion menu
$(function() {
    function slideMenu() {
        var activeState = $("#menu-container .menu-list").hasClass("active");
        $("#menu-container .menu-list").animate({ left: activeState ? "0%" : "-100%" }, 400 );
    }
    $("#menu-wrapper").click(function(event) {
        event.stopPropagation();
        $("#hamburger-menu").toggleClass("open");
        $("#menu-container .menu-list").toggleClass("active");

        slideMenu();

        // $("body").toggleClass("overflow-hidden");
    });
    $(".menu-list").find(".accordion-toggle").click(function() {
        $(this).next().toggleClass("open").stop().slideToggle(350);
        $(this).toggleClass("active-tab").find(".menu-link").toggleClass("active");

        $(".menu-list .accordion-content")
        .not($(this).next())
        .stop().slideUp(350)
        .removeClass("open");

        $(".menu-list .accordion-toggle")
        .not(jQuery(this))
        .removeClass("active-tab")
        .find(".menu-link")
        .removeClass("active");
    });
}, false);


/* Custom input file */
(function($){
  var $fileBox = null;

  $(function() {
    init();
  })
  function init() {
    $fileBox = $('.input-file');
    fileLoad();
  }
  function fileLoad() {
    $.each($fileBox, function(idx){
      var $this = $fileBox.eq(idx),
          $btnUpload = $this.find('[type="file"]'),
          $label = $this.find('.file-label');

      $btnUpload.on('change', function() {
        var $target = $(this),
            fileName = $target.val(),
            $fileText = $target.siblings('.file-name');
        $fileText.val(fileName);
      })
      $btnUpload.on('focusin focusout', function(e) {
        e.type == 'focusin' ?
          $label.addClass('file-focus') : $label.removeClass('file-focus');
      })
    })
  }
})(jQuery);
