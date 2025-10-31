
  (function ($) {
  
  "use strict";

    $('.hero-slide').backstretch([
      "images/slideshow/positive-woman-with-curly-hair-laughs-bites-her-finger-portrait-woman-with-white-hairpins-pearl-necklace.jpg",
      "images/slideshow/saeed-anahid--GhLgB-oXNw-unsplash.jpg",
      "images/slideshow/segal-jewelry-NsH-CvU0deg-unsplash.jpg"

    ],  {duration: 2000, fade: 750});

    $('.reviews-carousel').owlCarousel({
    items:3,
    loop:true,
    dots: false,
    nav: true,
    autoplay: true,
    margin:30,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:2
        },
        1000:{
          items:3
        }
      }
    })

    $('.smoothscroll').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
    }
});
    
  })(window.jQuery);


