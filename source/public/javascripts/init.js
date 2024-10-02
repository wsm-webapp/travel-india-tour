$(function () {
  // Move to top button appand in web layout
  $.icodetutsfrminput.init();

  [...document.querySelectorAll('[data-bs-toggle="tooltip"]')]
  .forEach(el => new bootstrap.Tooltip(el));

  [...document.querySelectorAll('[data-bs-toggle="modal"]')]
  .forEach(el => new bootstrap.Modal(el));

  $('body').prepend("<div id='move-top' class='btn btn-theme hoverable move-top'><i class='fa fa-arrow-up'></i></div>");
  var scrollTopBtn = 'html,body';
  /*Opera does a strange thing if we use 'html' and 'body' together*/
  if (navigator.userAgent.match(/opera/i)) {
    scrollTopBtn = 'html';
  }
  // show ,hide move top button button
  $('#move-top').hide();
  jQuery(window).on('scroll', function () {
    if ($(this).scrollTop() > 180) {
      $('#move-top').fadeIn();
    } else { 
      $('#move-top').fadeOut();
    } 
  });  
  // scroll to top when click
  jQuery('#move-top').on('click', function (e) {
    jQuery(scrollTopBtn).animate({ scrollTop: 0 }, { duration: 600 });
    e.preventDefault();
  });

  var modalUniqueClass = '.modalLoop';
  $('.modalLoop').on('show.bs.modal', function (e) {
    var $element = $(this);
    var $uniques = $(modalUniqueClass + ':visible').not($(this));
    if ($uniques.length) {
      $uniques.modal('hide');
      $uniques.one('hidden.bs.modal', function (e) {
        $element.modal('show');
      });
      return false;
    }
  });
  $('.modalLoop').on('shown.bs.modal', function () {
    $(this).find('[autofocus]').focus();
    $.icodetutsfrminput.init();
  });

  //
});

// JQuery UI Datepicker Config

// JQuery UI Datepicker Config
$(function () {
	
	$('.pickDate').datepicker({
    autoclose: true,
	}); 

	$('.pickDate').attr('autocomplete', 'off');
});

// AOS starts
function aosAnimate() {
  AOS.init({
    // offset: 0,
    // duration: 800,
    // easing: 'ease-in-out-cubic',
    // once: true,
    offset: 0,
    duration: 1000,
    easing: 'ease-out-back',
    delay: 100,
  });
} 
// AOS ends

// window load functions
$(window).on('load', function () {
  aosAnimate();
  //	signaturePad();

  // data-aos-delay remove on mobile

  if ($(window).width() < 768) {
    $('div').each(function () {
      $(this).attr('data-aos-delay', '0');
    });
  }

  // Replace all SVG images with inline SVG
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(
      imgURL,
      function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      'xml'
    );
  });
});
