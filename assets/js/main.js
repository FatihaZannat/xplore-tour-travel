(function ($) {
  "use strict";

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(function () {
    dynamicBackground();
    mainNav();
    stickyHeader();
    modalVideo();
    hoverTab();
    slickInit();
    accordian()
    isotopInit()
    heartToggle()
    tabs()
    datePicker ()
    quantityInit()

    $.exists = function (selector) {
      return $(selector).length > 0;
    };

    $(window).on("scroll", function () {
      stickyHeader();
    });
    /*--------------------------------------------------------------
    1. main nav
  --------------------------------------------------------------*/
    function mainNav() {
      $(".cs_nav").append('<span class="cs_menu_toggle"><span></span></span>');
      $(".menu-item-has-children").append(
        '<span class="cs_munu_dropdown_toggle"><span></span></span>'
      );
      $(".cs_menu_toggle").on("click", function () {
        $(this)
          .toggleClass("cs_toggle_active")
          .siblings(".cs_nav_list_wrap")
          .toggleClass("cs_active");
      });
      $(".cs_munu_dropdown_toggle").on("click", function () {
        $(this).toggleClass("active").siblings("ul").slideToggle();
        $(this).parent().toggleClass("active");
      });
      // Search Toggle
      $(".cs_search_tobble_btn").on("click", function () {
        $(".cs_header_form_wrap").toggleClass("active");
      });
      $(".cs_header_form_overlay").on("click", function () {
        $(".cs_header_form_wrap").removeClass("active");
      });
    }
    /*--------------------------------------------------------------
    2. sticky header
  --------------------------------------------------------------*/
    function stickyHeader() {
      var scroll = $(window).scrollTop();
      if (scroll >= 10) {
        $(".cs_sticky_header").addClass("cs_sticky_active");
      } else {
        $(".cs_sticky_header").removeClass("cs_sticky_active");
      }
    }
    /*--------------------------------------------------------------
    3. dynamic background
  --------------------------------------------------------------*/
    function dynamicBackground() {
      $("[data-src]").each(function () {
        let src = $(this).attr("data-src");

        $(this).css({
          "background-image": "url(" + src + ")",
        });
      });
    }
    /*--------------------------------------------------------------
    4. Modal Video
  --------------------------------------------------------------*/
    function modalVideo() {
      if ($.exists(".cs_video_open")) {
        $("body").append(`
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
        $(document).on("click", ".cs_video_open", function (e) {
          e.preventDefault();
          var video = $(this).attr("href");

          $(".cs_video_popup_container iframe").attr("src", `${video}`);

          $(".cs_video_popup").addClass("active");
        });
        $(".cs_video_popup_close, .cs_video_popup-layer").on(
          "click",
          function (e) {
            $(".cs_video_popup").removeClass("active");
            $("html").removeClass("overflow-hidden");
            $(".cs_video_popup_container iframe").attr("src", "about:blank");
            e.preventDefault();
          }
        );
      }
    }
    /*--------------------------------------------------------------
    5. Modal Video
  --------------------------------------------------------------*/
    function hoverTab() {
      $(".cs_iconbox").hover(function () {
        $(this).addClass("active").siblings().removeClass("active");
      });
    }
    /*--------------------------------------------------------------
    5. Slick Slider
  --------------------------------------------------------------*/
    function slickInit() {
      if ($.exists(".cs_slider")) {
        $(".cs_slider").each(function () {
          // Slick Variable
          var $ts = $(this).find(".cs_slider_container");
          var $slickActive = $(this).find(".cs_slider_wrapper");
          var $status = $(this).find(".cs_slider_number");
          // Auto Play
          var autoPlayVar = parseInt($ts.attr("data-autoplay"), 10);
          // Auto Play Time Out
          var autoplaySpdVar = 3000;
          if (autoPlayVar > 1) {
            autoplaySpdVar = autoPlayVar;
            autoPlayVar = 1;
          }
          // Slide Change Speed
          var speedVar = parseInt($ts.attr("data-speed"), 10);
          // Slider Loop
          var loopVar = Boolean(parseInt($ts.attr("data-loop"), 10));
          // Slider Center
          var centerVar = Boolean(parseInt($ts.attr("data-center"), 10));
          // Variable Width
          var variableWidthVar = Boolean(
            parseInt($ts.attr("data-variable-width"), 10)
          );
          // Pagination
          var paginaiton = $(this)
            .find(".cs_pagination")
            .hasClass("cs_pagination");
          // Slide Per View
          var slidesPerView = $ts.attr("data-slides-per-view");
          if (slidesPerView == 1) {
            slidesPerView = 1;
          }
          if (slidesPerView == "responsive") {
            var slidesPerView = parseInt($ts.attr("data-add-slides"), 10);
            var lgPoint = parseInt($ts.attr("data-lg-slides"), 10);
            var mdPoint = parseInt($ts.attr("data-md-slides"), 10);
            var smPoint = parseInt($ts.attr("data-sm-slides"), 10);
            var xsPoing = parseInt($ts.attr("data-xs-slides"), 10);
          }
          // Fade Slider
          var fadeVar = parseInt($($ts).attr("data-fade-slide"));
          fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);
          /* Start Count Slide Number */
          $slickActive.on(
            "init reInit afterChange",
            function (event, slick, currentSlide, nextSlide) {
              var i = (currentSlide ? currentSlide : 0) + 1;
              $status.html(
                `<span class="cs_current_number" data-number="${i}"><span>${i}</span></span> <span class="cs_slider_number_seperator"></span> <span class="cs_total_numbers"  data-number="${slick.slideCount}"><span>${slick.slideCount}</span></span>`
              );
            }
          );
          /* End Count Slide Number */
          // Slick Active Code
          $slickActive.slick({
            autoplay: autoPlayVar,
            dots: paginaiton,
            centerPadding: "28%",
            speed: speedVar,
            infinite: loopVar,
            autoplaySpeed: autoplaySpdVar,
            centerMode: centerVar,
            fade: fadeVar,
            prevArrow: $(this).find(".cs_left_arrow"),
            nextArrow: $(this).find(".cs_right_arrow"),
            appendDots: $(this).find(".cs_pagination"),
            slidesToShow: slidesPerView,
            variableWidth: variableWidthVar,
            swipeToSlide: true,
            responsive: [
              {
                breakpoint: 1400,
                settings: {
                  slidesToShow: lgPoint,
                },
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: mdPoint,
                },
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: smPoint,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: xsPoing,
                },
              },
            ],
          });
        });
      }
    }

     /*--------------------------------------------------------------
    6. Accordian
  --------------------------------------------------------------*/
  function accordian() {
    $('.cs_accordian').children('.cs_accordian_body').hide();
    $('.cs_accordian.active').children('.cs_accordian_body').show();
    $('.cs_accordian_head').on('click', function () {
      $(this)
        .parent('.cs_accordian')
        .siblings()
        .children('.cs_accordian_body')
        .slideUp(250);
      $(this).siblings().slideDown(250);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find('.cs_accordian_body')
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents('.cs_accordian').addClass('active');
      $(this).parent('.cs_accordian').siblings().removeClass('active');
    });
  }
   /*--------------------------------------------------------------
    8. heart toggle
  --------------------------------------------------------------*/
  function heartToggle(){
    $(".cs_icon").on("click", function(){
       $(this).toggleClass("active");
    })
  }
   /*--------------------------------------------------------------
    9. tabs
  --------------------------------------------------------------*/
 function tabs() {
    $('.cs_tabs .cs_tab_links a').on('click', function (e) {
      var currentAttrValue = $(this).attr('href');
      $('.cs_tabs ' + currentAttrValue)
        .fadeIn(400)
        .siblings()
        .hide();
      $(this).parents('li').addClass('active').siblings().removeClass('active');
      e.preventDefault();
    });
  }
   /*--------------------------------------------------------------
    10. Isotop
  --------------------------------------------------------------*/
  // function isotopInit() {
  //   if ($.exists('.cs_isotop')) {
  //     $('.cs_isotop').isotope({
  //       itemSelector: '.cs_isotop_item',
  //       transitionDuration: '0.60s',
  //       percentPosition: true,
  //       masonry: {
  //         columnWidth: '.cs_grid_sizer',
  //       },
  //     });
  //     /* Active Class of Portfolio*/
  //     $('.cs_isotop_filter ul li').on('click', function (event) {
  //       $(this).siblings('.active').removeClass('active');
  //       $(this).addClass('active');
  //       event.preventDefault();
  //     });
  //     /*=== Portfolio filtering ===*/
  //     $('.cs_isotop_filter ul').on('click', 'a', function () {
  //       var filterElement = $(this).attr('data-filter');
  //       $('.cs_isotop').isotope({
  //         filter: filterElement,
  //       });
  //     });
  //   }
  // }
  function isotopInit() {
      if ($.exists(".cs_isotop")) {
        $(".cs_isotop").isotope({
          itemSelector: ".cs_isotop_item",
          transitionDuration: "0.60s",
          masonry: {
            columnWidth: ".cs_isotop_item",
          },
        });
        /* Active Class of Portfolio*/
        $(".cs_isotop_filter ul li").on("click", function (event) {
          $(this).siblings(".active").removeClass("active");
          $(this).addClass("active");
          event.preventDefault();
        });
        /=== Portfolio filtering ===/
        $(".cs_isotop_filter ul").on("click", "a", function () {
          var filterElement = $(this).attr("data-filter");
          $(".cs_isotop").isotope({
            filter: filterElement,
          });
        });
      }
    }
    /*--------------------------------------------------------------
    11. Date  Picker
  --------------------------------------------------------------*/
  function datePicker (){
     $("#myDatePicker").datepicker({
      dateFormat: 'dd-mm-yy', 
      onSelect: function (dateText, inst) {
        const date = $(this).datepicker('getDate');

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        $(this).val(formattedDate);
      }
    });
  }
   /*--------------------------------------------------------------
    12. Quantity
  --------------------------------------------------------------*/
  function quantityInit() {
  // Close dropdown on outside click
  $(document).on('click', function (event) {
    if (!$(event.target).closest('.cs_quantity_wrap').length) {
      $('.cs_quantity_wrap').removeClass('active');
    }
  });

  // Toggle dropdown open/close
  $('.cs_quantity_btn').on('click', function () {
    $('.cs_quantity_wrap').removeClass('active');
    $(this).closest('.cs_quantity_wrap').toggleClass('active');
  });

  // Set initial values
  $('.cs_quantity_btn').each(function () {
    var initialNumber = parseInt($(this).data('initial-number'), 10);
    const label = formatGuestLabel(initialNumber);
    $(this).text(label);
    $(this)
      .siblings('.cs_quantity_dropdown')
      .find('.cs_quantity_number')
      .text(pad(initialNumber));
  });

  // Increment
  $('.cs_quantity_increment').on('click', function () {
    const $wrap = $(this).closest('.cs_quantity_wrap');
    const $number = $wrap.find('.cs_quantity_number');
    const max = parseInt($number.data('max-value'), 10);
    const current = parseInt($number.text(), 10);

    if (current < max) {
      const updated = current + 1;
      $number.text(pad(updated));
      $wrap.find('.cs_quantity_btn').text(formatGuestLabel(updated));
    }
  });

  // Decrement
  $('.cs_quantity_decrement').on('click', function () {
    const $wrap = $(this).closest('.cs_quantity_wrap');
    const $number = $wrap.find('.cs_quantity_number');
    const min = parseInt($number.data('min-value'), 10);
    const current = parseInt($number.text(), 10);

    if (current > min) {
      const updated = current - 1;
      $number.text(pad(updated));
      $wrap.find('.cs_quantity_btn').text(formatGuestLabel(updated));
    }
  });

  // Pad number (e.g., 1 => 01)
  function pad(num) {
    return ('0' + num).slice(-2);
  }

  // Format label (e.g., 1 => "1 Adult", 2 => "2 Adults")
  function formatGuestLabel(num) {
    return num + ' Adult' + (num > 1 ? '(s)' : '');
  }
}




  });
})(jQuery); // end of use strict
