(function ($){
    'use strict'

 /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

 

    $(function (){
     dynamicBackground()
     mainNav()
     stickyHeader()
     modalVideo()

     $.exists = function (selector) {
      return $(selector).length > 0;
    };

     $(window).on('scroll', function () {
      stickyHeader();
    });
 /*--------------------------------------------------------------
    1. main nav
  --------------------------------------------------------------*/
        function mainNav() {
          $('.cs_nav').append('<span class="cs_menu_toggle"><span></span></span>');
          $('.menu-item-has-children').append(
            '<span class="cs_munu_dropdown_toggle"><span></span></span>',
          );
          $('.cs_menu_toggle').on('click', function () {
            $(this)
              .toggleClass('cs_toggle_active')
              .siblings('.cs_nav_list_wrap')
              .toggleClass('cs_active');
          });
          $('.cs_munu_dropdown_toggle').on('click', function () {
            $(this).toggleClass('active').siblings('ul').slideToggle();
            $(this).parent().toggleClass('active');
          });
          // Search Toggle
          $('.cs_search_tobble_btn').on('click', function () {
            $('.cs_header_form_wrap').toggleClass('active');
          });
          $('.cs_header_form_overlay').on('click', function () {
            $('.cs_header_form_wrap').removeClass('active');
          });
        }
 /*--------------------------------------------------------------
    2. sticky header
  --------------------------------------------------------------*/
        function stickyHeader() {
          var scroll = $(window).scrollTop();
          if (scroll >= 10) {
            $('.cs_sticky_header').addClass('cs_sticky_active');
          } else {
            $('.cs_sticky_header').removeClass('cs_sticky_active');
          }
        }
 /*--------------------------------------------------------------
    3. dynamic background
  --------------------------------------------------------------*/
        function dynamicBackground() {
            $('[data-src]').each(function () {
              let src = $(this).attr('data-src');
             
              $(this).css({
                'background-image': 'url(' + src + ')',
              });
            });
          }
 /*--------------------------------------------------------------
    4. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    if ($.exists('.cs_video_open')) {
      $('body').append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup-content">
            <div class="cs_video_popup-layer"></div>
            <div class="cs_video_popup_container">
              <div class="cs_video_popup-align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup_close"></div>
            </div>
          </div>
        </div>
      `);
      $(document).on('click', '.cs_video_open', function (e) {
        e.preventDefault();
        var video = $(this).attr('href');

        $('.cs_video_popup_container iframe').attr('src', `${video}`);

        $('.cs_video_popup').addClass('active');
      });
      $('.cs_video_popup_close, .cs_video_popup-layer').on(
        'click',
        function (e) {
          $('.cs_video_popup').removeClass('active');
          $('html').removeClass('overflow-hidden');
          $('.cs_video_popup_container iframe').attr('src', 'about:blank');
          e.preventDefault();
        },
      );
    }
  }


    })

})(jQuery) // end of use strict