$.validator.addMethod(
  'regex',
  function (value, element, regexp) {
    if (regexp.constructor != RegExp) regexp = new RegExp(regexp);
    else if (regexp.global) regexp.lastIndex = 0;
    return this.optional(element) || regexp.test(value);
  },
  'Please check your input.'
);

$.validator.addMethod(
  'maxSize',
  function (val, element) {
    var size = element.files[0].size;
    console.log(size);
    if (size > 6291456) {
      // checks the file more than 6 MB
      // console.log("returning false");
      return false;
    } else {
      // console.log("returning true");
      return true;
    }
  },
  'File type error'
);

$.validator.addMethod(
  'acceptType',
  function (value, element, param) {
    return value.match(new RegExp('.' + param + '$'));
  },
  'File type error'
);

jQuery(document).ready(function () {
  setTimeout(function () {
    var msnry = new Masonry('.article-wrapper', {
      percentPosition: true,
    });
  }, 1000);
});
// fileupload
$.fn.fileUploader = function () {
  const $this = $(this);
  const $inputFile = $this.find('.files');
  // console.log($inputFile);
  $inputFile.on('keyup change', function (event) {
    const $readInput = $(this);
    const $thisText = $readInput.data('input');
    $('#' + $thisText).text(event.target.files[0].name);
  });
};

// didScroll = false;

$(function () {
  // var filesToUpload = [];
  $('.form-group').fileUploader();

  $('.scrollDown').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate(
      {
        scrollTop: $('#section-banner').height() - 70,
      },
      50
    );
  });

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 4;
  var nabarHeight = $('.sitechanged').outerHeight();
  var appLogo = $('.sitechanged').find('.navbar-brand');
  var appBars = $('.offcanvas-menus').find('.bars');
  var navLink = $('.sitechanged').find('.btn');
  // let appLogo = nabarHeight.find(".navbar-brand");
  // console.log(nabarHeight);

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 10);

  function hasScrolled() {
    var scrollTopnav = $(this).scrollTop();
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - scrollTopnav) <= delta) return;

    // If they scrolled down and are past the navbar, add class .dark.
    // This is necessary so you never see what is "behind" the navbar.
    if (scrollTopnav > lastScrollTop && scrollTopnav > nabarHeight) {
      // Scroll Down
      $('.sitechanged').removeClass('light').addClass('dark');
      navLink.removeClass('light').addClass('dark');
      appLogo.removeClass('light').addClass('dark');
      appBars.removeClass('light').addClass('dark');
    } else {
      // Scroll Up
      if (scrollTopnav + $(window).height() < $(document).height()) {
        $('.sitechanged').removeClass('dark').addClass('light');
        navLink.removeClass('dark').addClass('light');
        appLogo.removeClass('dark').addClass('light');
        appBars.removeClass('dark').addClass('light');
      }
    }

    if (scrollTopnav > nabarHeight * 2) {
      lastScrollTop = scrollTopnav;
      $('.sitechanged').removeClass('light').addClass('dark');
      navLink.removeClass('light').addClass('dark');
      appLogo.removeClass('light').addClass('dark');
      appBars.removeClass('light').addClass('dark');
    } else {
      // $('.sitechanged').addClass('navbar-default').removeClass('light');
      // navLink.addClass(".light").removeClass(".dark");
      // appLogo.addClass(".light").removeClass(".dark");
      lastScrollTop = scrollTopnav;
    }
    // console.log(lastScrollTop, scrollTopnav, nabarHeight);
  }

  $('.only-number').on('keypress', function (e) {
    $('.only-number').attr('min', '10');
    var valueLength = this.value.length;
    if (valueLength == 10) {
      return false;
    }
    var keyboard = e.which;
    if (keyboard < 48 || keyboard > 57) e.preventDefault();
  });

  var employmentFrm = $('#employmentFrm');
  var current = 0;

  employmentFrm.validate({
    errorElement: 'div',
    errorPlacement: function (error, element) {
      // Add the `invalid-feedback` class to the error element
      error.addClass('invalid-feedback');
      // $("html,body").animate({
      //           scrollTop: $('body').offset().top
      //       }, 600);

      // Add `has-feedback` class to the parent div.form-group
      // in order to add icons to inputs
      element.parents('.form-group').addClass('has-feedback');

      if (element.prop('type') === 'checkbox') {
        error.insertAfter(element.parent('label'));
      } else {
        error.insertAfter(element);
      }

      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if (!element.next('span')[0]) {
        $("<span class='fa fa-remove form-control-feedback'></span>").insertAfter(element);
      }
    },
    success: function (label, element) {
      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if (!$(element).next('span')[0]) {
        $("<span class='fa fa-check form-control-feedback'></span>").insertAfter($(element));
      }
    },
    highlight: function (element, errorClass, validClass) {
      $(element).parents('.form-group').addClass('has-error').removeClass('has-success');
      $(element).next('span').addClass('fa-remove').removeClass('fa-ok');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents('.form-group').addClass('has-success').removeClass('has-error');
      $(element).next('span').addClass('fa-check').removeClass('fa-remove');
    },
    // ignore: ":hidden",
    rules: {
      firstName: {
        required: true,
        minlength: 2,
        regex: "^[a-zA-Z'.\\s]{1,40}$",
      },
      lastName: {
        required: true,
        minlength: 2,
        regex: "^[a-zA-Z'.\\s]{1,40}$",
      },
      phone: {
        required: true,
        minlength: 10,
        maxlength: 10,
        regex: '[0-9]*',
        regex: '[0-9]{1}[0-9]{9}',
      },
      email: {
        required: true,
        email: true,
      },
      functionalRole: {
        required: true,
      },
      businessSector: {
        required: true,
      },

      jobTitle: {
        required: true,
        minlength: 2,
        regex: "^[a-zA-Z'.\\s]{1,40}$",
      },
      currentEmployer: {
        required: true,
        minlength: 2,
        regex: "^[a-zA-Z'.\\s]{1,40}$",
      },
      linkedInProfile: {
        required: true,
        minlength: 2,
        regex: '^(http(s)?://)?([w]+.)?linkedin.com/(pub|in|profile)/',
      },
      attachcvinput: {
        required: true,
        maxSize: true,
        acceptType: '(docx?|doc|pdf|docx)',
      },
    },
    messages: {
      firstName: {
        required: 'Please enter a first name',
        minlength: 'First name must be 2-10 characters long',
        regex: 'First name cannot have numeric values',
      },
      lastName: {
        required: 'Please enter a Last name',
        minlength: 'Last name must be 2-10 characters long',
        regex: 'Last name cannot have numeric values',
      },
      phone: {
        required: 'Please enter valid mobile no.',
        minlength: 'Mobile no. must be 10 characters long',
        maxlength: 'Mobile no. must be 10 characters long',
        // regex: "Please enter valid mobile no."
      },
      email: 'Please enter a valid email address',
      functionalRole: 'Select Your functional role',
      businessSector: 'Select working business sector',
      jobTitle: {
        required: 'Please enter a job title ',
        minlength: 'Job title name must be 2-10 characters long',
        regex: 'Job title name cannot have numeric values',
      },
      currentEmployer: {
        required: 'Please enter your current organization name',
        minlength: 'Current organization name must be 2-10 characters long',
        regex: 'Current organization name cannot have numeric values',
      },
      linkedInProfile: {
        required: 'Please enter like https://www.linkedin.com/in/yourid',
        minlength: 'Please enter like https://www.linkedin.com/in/yourid',
        regex: 'Please enter like https://www.linkedin.com/in/yourid',
      },
      attachcvinput: {
        required: 'Please upload your CV',
        maxSize: 'File size is greater than 6MB',
        acceptType: 'Accept only docx? | doc | pdf | docx',
      },
    },
    submitHandler: function (form, event) {
      // console.log(event);
      // $this = $(this);
      $('.page-href').prop('disabled', true);
      $('.btn-txt').text('Please Wait...');
      $('.page-href').attr('disabled', true).addClass('disabled');
      event.preventDefault();
      $.ajax({
        url: employmentFrm.attr('action'),
        type: 'POST',
        data: employmentFrm.serialize(),
        success: function (result) {
          // console.log(result);
          // employmentFrm[0].reset();
          $('.btn-txt').text('Continue');
          $('.page-href').attr('disabled', false).removeClass('disabled');
          setTimeout(function () {
            window.location.href = 'thanks.html';
          }, 600);
        },
      });
    },
  });

// $('.invited-form-submit').on('click', function (e) {
  //   e.preventDefault();

  //   employmentFrm.valid();
  //   $.ajax({
  //     url: employmentFrm.attr('action'),
  //     type: 'POST',
  //     data: employmentFrm.serialize(),
  //     success: function (result) {
  //       // console.log(result);
  //       // employmentFrm[0].reset();
  //       console.log(result);
  //       $('.btn-txt').text('Continue');
  //       $('.page-href').attr('disabled', false).removeClass('disabled');
  //       // setTimeout(function () {
  //       //   window.location.href = 'thanks.html';
  //       // }, 600);
  //     },
  //   });
  // });


  $('.get-invited-submit').on('click', function (e) {
    e.preventDefault();
    // $(this).prop("disabled", true);

    if (employmentFrm.valid() === true) {
      if ($('#get_information').is(':visible')) {
        current_fs = $('#get_information');
        next_fs = $('#get_employment');
      } else if ($('#get_employment').is(':visible')) {
        current_fs = $('#get_employment');
        next_fs = $('#get_information');
      }
      next_fs.removeClass('.no-display').show();
      current_fs.addClass('.no-display').hide();
    }

    // $("#get_information").hide("fade");
    // // $("#get_employment").addClass('.no-display');
    // $("#get_employment").removeClass(".no-display").show("fade");
  });

  $('#newsletterFrm').validate({
    errorElement: 'div',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.parents('.form-group').addClass('has-feedback');

      if (element.prop('type') === 'checkbox') {
        error.insertAfter(element.parent('label'));
      } else {
        error.insertAfter(element);
      }

      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if (!element.next('span')[0]) {
        $("<span class='fa fa-remove form-control-feedback'></span>").insertAfter(element);
      }
    },
    success: function (label, element) {
      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if (!$(element).next('span')[0]) {
        $("<span class='fa fa-check form-control-feedback'></span>").insertAfter($(element));
      }
    },
    highlight: function (element, errorClass, validClass) {
      $(element).parents('.form-group').addClass('has-error').removeClass('has-success');
      $(element).next('span').addClass('fa-remove').removeClass('fa-ok');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents('.form-group').addClass('has-success').removeClass('has-error');
      $(element).next('span').addClass('fa-check').removeClass('fa-remove');
    },
    // ignore: ":hidden",
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      email: 'Please enter a valid email address',
    },
    submitHandler: function (form) {
      return false;
    },
  });
  
  $(window).on('resize load scroll', function () {
    didScroll = true;
  });
  
  //
});
