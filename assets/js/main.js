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
        function stickyHeader() {
          var scroll = $(window).scrollTop();
          if (scroll >= 10) {
            $('.cs_sticky_header').addClass('cs_sticky_active');
          } else {
            $('.cs_sticky_header').removeClass('cs_sticky_active');
          }
        }
      
       
        function dynamicBackground() {
            $('[data-src]').each(function () {
              let src = $(this).attr('data-src');
             
              $(this).css({
                'background-image': 'url(' + src + ')',
              });
            });
          }



    })

})(jQuery) // end of use strict