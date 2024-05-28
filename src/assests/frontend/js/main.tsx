
import $ from "jquery";
import 'owl.carousel';

import 'magnific-popup'; // Import Magnific Popup

export function main(){
  const $headerStick = $('.Sticky');
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 80) {
      $headerStick.addClass("sticky_element");
    } else {
      $headerStick.removeClass("sticky_element");
    };
  });
  // Menu Categories
  $(window).resize(function () {
    if ($(window).width() >= 768) {
      $('a[href="#"]').on('click', function (e) {
        e.preventDefault();
      });
      $('.categories').addClass('menu');
      $('.menu ul > li').on('mouseover', function (e) {
        $(this).find("ul:first").show();
        $(this).find('> span a').addClass('active');
      }).on('mouseout', function (e) {
        $(this).find("ul:first").hide();
        $(this).find('> span a').removeClass('active');
      });
      $('.menu ul li li').on('mouseover', function (e) {
        if ($(this).has('ul').length) {
          $(this).parent().addClass('expanded');
        }
        $('.menu ul:first', this).parent().find('> span a').addClass('active');
        $('.menu ul:first', this).show();
      }).on('mouseout', function (e) {
        $(this).parent().removeClass('expanded');
        $('.menu ul:first', this).parent().find('> span a').removeClass('active');
        $('.menu ul:first', this).hide();
      });
    } else {
      $('.categories').removeClass('menu');
    }
  }).resize();


  // Menu
  $('a.open_close').on("click", function () {
    $('.main-menu').toggleClass('show');
    $('.layer').toggleClass('layer-is-visible');
  });
  $('a.show-submenu').on("click", function () {
    $(this).next().toggleClass("show_normal");
  });
  $('a.show-submenu-mega').on("click", function () {
    $(this).next().toggleClass("show_mega");
  });

  $('a.btn_search_mob').on("click", function () {
    $('.search_mob_wp').slideToggle("fast");
  });
  // Countdown offers
  $(".color").on('click', function () {
    $(".color").removeClass("active");
    $(this).addClass("active");
  });
  /* Input incrementer*/
  $(".numbers-row").append('<div class="inc button_inc">+</div><div class="dec button_inc">-</div>');
  $(".button_inc").on("click", function () {
    const $button = $(this);
    const oldValue = $button.parent().find("input").val();
    if ($button.text() == "+") {
      const newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 1) {
        const newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
  });
  /* Cart dropdown */
  $('.dropdown-cart, .dropdown-access').hover(function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(300);
  }, function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(300);
  });
  /* Cart Dropdown Hidden From tablet */
  $(window).bind('load resize', function () {
    const width = $(window).width();
    if (width <= 768) {
      $('a.cart_bt, a.access_link').removeAttr("data-toggle", "dropdown")
    } else {
      $('a.cart_bt,a.access_link').attr("data-toggle", "dropdown")
    }
  });

  // Opacity mask
  $('.opacity-mask').each(function(){
    $(this).css('background-color', $(this).attr('data-opacity-mask'));
  });
  /* Animation on scroll */

  // Forgot Password
  $("#forgot").on("click", function () {
    $("#forgot_pw").fadeToggle("fast");
  });

  // Top panel on click: add to cart, search header
  const $topPnl = $('.top_panel');
  const $pnlMsk = $('.layer');

  $('.btn_add_to_cart a').on('click', function(){
    $topPnl.addClass('show');
    $pnlMsk.addClass('layer-is-visible');
  });
  $('a.search_panel').on('click', function(){
    $topPnl.addClass('show');
    $pnlMsk.addClass('layer-is-visible');
  });
  $('a.btn_close_top_panel').on('click', function(){
    $topPnl.removeClass('show');
    $pnlMsk.removeClass('layer-is-visible');
  });
  //Footer collapse
  const $headingFooter = $('footer h3');
  $(window).resize(function() {
    if($(window).width() <= 768) {
      $headingFooter.attr("data-bs-toggle","collapse");
    } else {
      $headingFooter.removeAttr("data-bs-toggle","collapse");
    }
  }).resize();
  $headingFooter.on("click", function () {
    $(this).toggleClass('opened');
  });
  // Scroll to top
  const pxShow = 800; // height on which the button will show
  const scrollSpeed = 500; // how slow / fast you want the button to scroll to top.
  $(window).scroll(function(){
    if($(window).scrollTop() >= pxShow){
      $("#toTop").addClass('visible');
    } else {
      $("#toTop").removeClass('visible');
    }
  });
  $('#toTop').on('click', function(){
    $('html, body').animate({scrollTop:0}, scrollSpeed);
    return false;
  });
  // Tooltip
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

// Image popups
  $('.magnific-gallery').each(function () {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      preloader: true,
      gallery: {
        enabled: true
      },
      removalDelay: 500, //delay removal by X to allow out-animation
      callbacks: {
        beforeOpen: function () {
          // just a hack that adds mfp-anim class to markup
          this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
          this.st.mainClass = this.st.el.attr('data-effect');
        }
      },
      closeOnContentClick: true,
      midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
  });
  // Popup up
  setTimeout(function () {
    $('.popup_wrapper').css({
      "opacity": "1",
      "visibility": "visible"
    });
    $('.popup_close').on("click", function () {
      $(".popup_wrapper").fadeOut(300);
    })
  }, 1500);

}
