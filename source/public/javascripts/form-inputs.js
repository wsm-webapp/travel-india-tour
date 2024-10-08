(function ($) {
  // Selector to select only not already processed elements
  $.expr[':'].notmdproc = function (obj) {
    if ($(obj).data('mdproc')) {
      return false;
    } else {
      return true;
    }
  };

  function _isChar(evt) {
    if (typeof evt.which == 'undefined') {
      return true;
    } else if (typeof evt.which == 'number' && evt.which > 0) {
      return (
        !evt.ctrlKey &&
        !evt.metaKey &&
        !evt.altKey &&
        evt.which != 8 && // backspace
        evt.which != 9 && // tab
        evt.which != 13 && // enter
        evt.which != 16 && // shift
        evt.which != 17 && // ctrl
        evt.which != 20 && // caps lock
        evt.which != 27 // escape
      );
    }
    return false;
  }

  function _addFormGroupFocus(element) {
    var $element = $(element);
    if (!$element.prop('disabled')) {
      // this is showing as undefined on chrome but works fine on firefox??
      $element.closest('.form-group').addClass('is-focused');
      $element.parent().parent('.input-group').addClass('prefix'); /// By arun
    }
  }

  function _toggleTypeFocus($input) {
    $input.closest('label').hover(
      function () {
        var $i = $(this).find('input');
        if (!$i.prop('disabled')) {
          // hack because the _addFormGroupFocus() wasn't identifying the property on chrome
          _addFormGroupFocus($i); // need to find the input so we can check disablement
        }
      },
      function () {
        _removeFormGroupFocus($(this).find('input'));
      }
    );
  }

  function _removeFormGroupFocus(element) {
    $(element).parent().parent('.input-group').removeClass('prefix'); /// By arun
    $(element).closest('.form-group').removeClass('is-focused'); // remove class from form-group
  }

  $.icodetutsfrminput = {
    options: {
      // These options set what will be started by $.icodetutsfrminput.init()
      validate: true,
      input: true,
      ripples: true,
      checkbox: true,
      div: true,
      togglebutton: true,
      radio: true,
      arrive: true,
      autofill: false,
      withRipples: ['.btn:not(.btn-link)', '.card-image', '.navbar a:not(.withoutripple)', '.dropdown-menu a', '.nav-tabs a:not(.withoutripple)', '.withripple', '.pagination li:not(.active):not(.disabled) a:not(.withoutripple)'].join(','),
      inputElements: 'input.form-control, textarea.form-control, select.form-control',
      checkboxElements: '.checkbox > label > input[type=checkbox]',
      togglebuttonElements: '.togglebutton > label > input[type=checkbox]',
      radioElements: '.radio > label > input[type=radio]',
      divElements: 'div.form-control,div.text-control,div.with-control',
    },
    checkbox: function (selector) {
      // Add fake-checkbox to icodetutsfrminput checkboxes
      var $input = $(selector ? selector : this.options.checkboxElements)
        .filter(':notmdproc')
        .data('mdproc', true)
        .after("<span class='checkbox-icodetutsfrminput'><span class='check'></span></span>");

      _toggleTypeFocus($input);
    },
    togglebutton: function (selector) {
      // Add fake-checkbox to icodetutsfrminput checkboxes
      var $input = $(selector ? selector : this.options.togglebuttonElements)
        .filter(':notmdproc')
        .data('mdproc', true)
        .after("<span class='toggle'></span>");
      _toggleTypeFocus($input);
    },
    radio: function (selector) {
      // Add fake-radio to icodetutsfrminput radios
      var $input = $(selector ? selector : this.options.radioElements)
        .filter(':notmdproc')
        .data('mdproc', true)
        .after("<span class='circle'></span><span class='check'></span>");

      _toggleTypeFocus($input);
    },
    input: function (selector) {
      $(selector ? selector : this.options.inputElements)
        .filter(':notmdproc')
        .data('mdproc', true)
        .each(function () {
          var $input = $(this);

          // Requires form-group standard markup (will add it if necessary)
          var $formGroup = $input.closest('.form-group'); // note that form-group may be grandparent in the case of an input-group
          if ($formGroup.length === 0 && $input.attr('type') !== 'hidden' && !$input.attr('hidden')) {
            $input.addClass('form-group');
            //$input.wrap("<div class='form-group'></div>");
            $formGroup = $input.closest('.form-group'); // find node after attached (otherwise additional attachments don't work)
          }

          // Legacy - Add hint label if using the old shorthand data-hint attribute on the input
          if ($input.attr('data-hint')) {
            $input.after("<p class='help-block'>" + $input.attr('data-hint') + '</p>');
            $input.removeAttr('data-hint');
          }

          // Legacy - Change input-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
          var legacySizes = {
            'input-lg': 'form-group-lg',
            'input-sm': 'form-group-sm',
          };
          $.each(legacySizes, function (legacySize, standardSize) {
            if ($input.hasClass(legacySize)) {
              $input.removeClass(legacySize);
              $formGroup.addClass(standardSize);
            }
          });

          // Legacy - Add label-floating if using old shorthand <input class="floating-label" placeholder="foo">
          if ($input.hasClass('floating-label')) {
            var placeholder = $input.attr('placeholder');
            $input.attr('placeholder', null).removeClass('floating-label');
            var id = $input.attr('id');
            var forAttribute = '';
            if (id) {
              forAttribute = "for='" + id + "'";
            }
            $formGroup.addClass('label-floating');
            $input.after('<label ' + forAttribute + "class='control-label'>" + placeholder + '</label>');

            if ($input.val() === null || $input.val() == 'undefined' || $input.val() === '') {
              $formGroup.removeClass('is-value');
              $formGroup.addClass('is-empty');
            } else {
              $formGroup.addClass('is-value');
              $formGroup.removeClass('is-filled');
            }
            console.log($input);
          }

          // Set as empty if is empty (damn I must improve this...)

          if ($input.val() === null || $input.val() == 'undefined' || $input.val() === '') {
            $formGroup.removeClass('is-value');
            $formGroup.addClass('is-empty');
          } else {
            $formGroup.addClass('is-value');
            $formGroup.removeClass('is-filled');
          }

          // Add at the end of the form-group
          //  $formGroup.append("<span class='icodetutsfrminput-input'></span>");

          // Support for file input
          if ($formGroup.find('input[type=file]').length > 0) {
            $formGroup.addClass('is-fileinput');
          }
        });
    },
    div: function (selector) {
      $(selector ? selector : this.options.divElements)
        .filter(':notmdproc')
        .data('mdproc', true)
        .each(function () {
          var $input = $(this);

          // Requires form-group standard markup (will add it if necessary)
          var $formGroup = $input.closest('.form-group'); // note that form-group may be grandparent in the case of an input-group
          if ($formGroup.length === 0 && $input.attr('type') !== 'hidden' && !$input.attr('hidden')) {
            $input.addClass('form-group');
            //$input.wrap("<div class='form-group'></div>");
            $formGroup = $input.closest('.form-group'); // find node after attached (otherwise additional attachments don't work)
          }

          // Legacy - Change input-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
          var legacySizes = {
            'input-lg': 'form-group-lg',
            'input-sm': 'form-group-sm',
          };
          $.each(legacySizes, function (legacySize, standardSize) {
            if ($input.hasClass(legacySize)) {
              $input.removeClass(legacySize);
              $formGroup.addClass(standardSize);
            }
          });

          // Legacy - Add label-floating if using old shorthand <input class="floating-label" placeholder="foo">
          if ($input.hasClass('floating-text')) {
            var placeholder = $input.attr('placeholder');
            var dataText = $input.attr('datatext');
            $input.attr('placeholder', null).removeClass('floating-text');
            var id = $input.attr('id');
            var forAttribute = '';
            if (id) {
              forAttribute = "for='" + id + "'";
            }
            $formGroup.addClass('text-floating');
            $input.text(dataText);
            $input.after('<label ' + forAttribute + "class='control-label'>" + placeholder + '</label>');
          }

          // $input.removeAttr('data-verified');

          // Legacy - Add hint label if using the old shorthand data-hint attribute on the input
          if ($input.attr('data-verified') == 'true') {
            $formGroup.addClass('text-verified');
            var $inputIcon = $input.attr('data-icon');
            $input.after("<p class='text-success help-text'><i class='" + $inputIcon + "'></i> <span class='text'>Verified</span></p>");
          }

          if ($input.attr('data-verified') == 'false') {
            $formGroup.addClass('text-verified');
           var $dataInputIcon = $input.attr('data-icon');
            $input.after("<p class='text-danger help-text'><i class='" + $dataInputIcon + "'></i> <span class='text'>Not Verified</span></p>");
          }
        });
    },
    attachInputEventHandlers: function () {
      var validate = this.options.validate;

      $(document)
        .on('change', '.checkbox input[type=checkbox]', function () {
          $(this).blur();
        })
        .on('keydown paste', '.form-control', function (e) {
          if (_isChar(e)) {
            $(this).closest('.form-group').removeClass('is-empty');
          } else {
            $(this).closest('.form-group').removeClass('is-filled');
          }
        })
        .on('keyup change', '.form-control', function () {
          var $input = $(this);
          var $formGroup = $input.closest('.form-group');
          var isValid = typeof $input[0].checkValidity === 'undefined' || $input[0].checkValidity();

          if ($input.val() === '') {
            $formGroup.addClass('is-empty');
            $formGroup.removeClass('is-value');
          } else {
            $formGroup.addClass('is-filled');
            $formGroup.removeClass('is-empty');
          }

          // Validation events do not bubble, so they must be attached directly to the input: http://jsfiddle.net/PEpRM/1/
          //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
          //  the form-group on change.
          //
          // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
          //        BUT, I've left it here for backwards compatibility.
          if (validate) {
            if (isValid) {
              $formGroup.removeClass('has-error');
            } else {
              $formGroup.addClass('has-error');
            }
          }
        })
        .on('focus', '.form-control, .form-group.is-fileinput', function () {
          _addFormGroupFocus(this);
        })
        .on('blur', '.form-control, .form-group.is-fileinput', function () {
          _removeFormGroupFocus(this);
        })
        // make sure empty is added back when there is a programmatic value change.
        //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
        .on('change', '.form-group input', function () {
          var $input = $(this);
          if ($input.attr('type') == 'file') {
            return;
          }

          var $formGroup = $input.closest('.form-group');
          var value = $input.val();
          if (value) {
            $formGroup.addClass('is-filled');
            $formGroup.removeClass('is-empty');
          } else {
            $formGroup.addClass('is-empty');
          }
        })
        // set the fileinput readonly field with the name of the file
        .on('change', ".form-group.is-fileinput input[type='file']", function () {
          var $input = $(this);
          var $formGroup = $input.closest('.form-group');
          var value = '';
          $.each(this.files, function (i, file) {
            value += file.name + ', ';
          });
          value = value.substring(0, value.length - 2);
          if (value) {
            $formGroup.addClass('is-filled');
            $formGroup.removeClass('is-empty');
          } else {
            $formGroup.addClass('is-empty');
          }
          $formGroup.find('input.form-control[readonly]').val(value);
        });
    },
    ripples: function (selector) {
      $(selector ? selector : this.options.withRipples).ripples();
    },
    autofill: function () {
      // This part of code will detect autofill when the page is loading (username and password inputs for example)
      var loading = setInterval(function () {
        $('input[type!=checkbox]').each(function () {
          var $this = $(this);
          if ($this.val() && $this.val() !== $this.attr('value')) {
            $this.trigger('change');
          }
        });
      }, 100);

      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
      setTimeout(function () {
        clearInterval(loading);
      }, 10000);
    },
    attachAutofillEventHandlers: function () {
      // Listen on inputs of the focused form (because user can select from the autofill dropdown only when the input has focus)
      var focused;
      $(document)
        .on('focus', 'input', function () {
          var $inputs = $(this).parents('form').find('input').not('[type=file]');
          focused = setInterval(function () {
            $inputs.each(function () {
              var $this = $(this);
              if ($this.val() !== $this.attr('value')) {
                $this.trigger('change');
              }
            });
          }, 100);
        })
        .on('blur', '.form-group input', function () {
          clearInterval(focused);
        });
    },
    init: function (options) {
      this.options = $.extend({}, this.options, options);
      var $document = $(document);

      if ($.fn.ripples && this.options.ripples) {
        this.ripples();
      }
      if (this.options.input) {
        this.input();
        this.attachInputEventHandlers();
      }
      if (this.options.div) {
        this.div();
      }
      if (this.options.checkbox) {
        this.checkbox();
      }
      if (this.options.togglebutton) {
        this.togglebutton();
      }
      if (this.options.radio) {
        this.radio();
      }
      if (this.options.autofill) {
        this.autofill();
        this.attachAutofillEventHandlers();
      }

      if (document.arrive && this.options.arrive) {
        if ($.fn.ripples && this.options.ripples) {
          $document.arrive(this.options.withRipples, function () {
            $.icodetutsfrminput.ripples($(this));
          });
        }
        if (this.options.input) {
          $document.arrive(this.options.inputElements, function () {
            $.icodetutsfrminput.input($(this));
          });
        }
        if (this.options.div) {
          $document.arrive(this.options.divElements, function () {
            $.icodetutsfrminput.div($(this));
          });
        }
        if (this.options.checkbox) {
          $document.arrive(this.options.checkboxElements, function () {
            $.icodetutsfrminput.checkbox($(this));
          });
        }
        if (this.options.radio) {
          $document.arrive(this.options.radioElements, function () {
            $.icodetutsfrminput.radio($(this));
          });
        }
        if (this.options.togglebutton) {
          $document.arrive(this.options.togglebuttonElements, function () {
            $.icodetutsfrminput.togglebutton($(this));
          });
        }
      }
    },
  };
})(jQuery);
