/*global console ,$ */
$(function () {
	'use strict';
    //active link at minu
    $('.view-profile ul li').click(function () {
        console.log("hi");
        $(this).removeClass('active').settings('li').addClass('active');
    });
    // popup
    $('.show-popup').click(function (e) {
        e.preventDefault();
        $($(this).data('popup')).css(
            "display","block"
        ).fadeIn();
    });
    $('.popup .close').click(function (e) {
        e.preventDefault();
        $('.popup').fadeOut();
    });
    $('.popup').click(function () {
        $(this).fadeOut();
    });
    $('.popup .inner').click(function (e) {
        e.stopPropagation();
        $(this).parentsUntil('.popup').parent().fadeOut();
    });
    
    $('.popup .inner .ui-slider-handle ui-corner-all ui-state-default').append('<i class="fas fa-long-arrow-alt-right"></i>');
    
    //our partiner
    $('select').on('change', function (e) {
        if(e.currentTarget.value == 'all'){  
            $('.icons-mixup').show()
        } else {           
        $('.icons-mixup').hide()
        $(`.${e.currentTarget.value}`).show()}
       console.log(e.currentTarget.value == 'all');
    });
    
    // show massage form

    $('[required]').blur(function () {
        if ($(this).val() == '') {
            $(this).next('span').fadeIn();
        }else{
            $(this).next('span').fadeOut();
        }
    });
    //select Language

    $('.accordion .accordion-body ul.language li').click(function () {
        console.log($(this).text());
        $('.choose-language').html($(this).text());
    });
    //select Current Currency
    $('.accordion .accordion-body ul.current-currency li').click(function () {
        console.log($(this).text());
        $('.choose-current-currency').html($(this).text());
    });
    //select Payment Process
    $('.accordion .accordion-body ul.payment-process li').click(function () {
        console.log($(this).text());
        $('.choose-payment-process').html($(this).html());
    });


    
   
   
   //block the account
   $('.show-popup-block').click(function (e) {
    e.preventDefault();
    $($(this).data('popup')).css(
        "display","block"
    ).fadeIn();
    });
    $('.block-popup .close').click(function (e) {
        e.preventDefault();
        $('.block-popup').fadeOut();
    });
    $('.block-popup').click(function () {
        $(this).fadeOut();
    });
    $('.block-popup .inner').click(function (e) {
        e.stopPropagation();
        $(this).parentsUntil('.block-popup').parent().fadeOut();
    });

    $('.block-popup .inner .ui-slider-handle ui-corner-all ui-state-default').append('<i class="fas fa-long-arrow-alt-right"></i>');
    

    //
    let  pw = document.getElementById("validationCustom05");
    let  confirmPw = document.getElementById("validationCustom06");
    let userName = document.getElementById("validationCustom07");
    let firstName = document.getElementById("validationCustom01");
    let lastName = document.getElementById("validationCustom02");
    let phoneNumber = document.getElementById("validationCustom04");
    let email = document.getElementById("validationCustom03");
    let  signUp = document.getElementById("sign-up");
    let inputSingUp = document.querySelectorAll('.form-control');
    let inputValidatorUp = {
        fristname: false,
        lastname: false,
        username: false,
        email: false,
        phone: false,
        password: false,
        confirmpassword: false,
    }


    signUp.disabled = true;
    inputSingUp.forEach((input) => {
        input.addEventListener('change', (event)=>{
            let name = event.target.getAttribute('name');
            if(event.target.value.length > 0){
                inputValidatorUp[name] = true;
            }else{
                inputValidatorUp[name] = false;
            };
            let allTrue = Object.keys(inputValidatorUp).every((item) => 
            {
                return inputValidatorUp[item] === true
            });
            if (allTrue) {
                if(confirmPw.value && confirmPw.value === pw.value){
                    signUp.disabled = false;
                }
            }else{
                signUp.disabled = true;
                }
        })
        
        
    })
    
    confirmPw.onchange= function(){
        'use strict';
        confirmPw.style.border = '2px solid red';
        
    
    if(pw.value == confirmPw.value){
        confirmPw.style.border = '2px solid green'
    }else{
        confirmPw.style.border = '2px solid red'
    } 
}
    //
    var captcha = sliderCaptcha({
        id:'captcha',
        onSuccess:function () {
        // do something
        
    localStorage.setItem("email", email.value);
    



    

        fetch("http://fpaycoin-001-site1.btempurl.com/graphql/",
    {
        method : "POST",
        headers : {
            'content-type': 'application/json',
        },
        body : JSON.stringify({
            query: `
            mutation{
                register(registerModel: {
            
                  userName:"${userName.value}",
                  passwordHash:"${pw.value}",
                  fullName:"${firstName.value} ${lastName.value}",
                  firstName:"${firstName.value}",
                  lastName:"${lastName.value}"
                  phoneNumber:"${phoneNumber.value}",
                  email:"${email.value}"})
                  {
                    token
                    userId
                  result {
              
                    statusCode
                    statusMessage
                  }
                }
              }
            `,
        }),
    }).then(res=>res.json()).then(res=>

        {
            console.log(res)
            localStorage.setItem ('userId', res.data.register.userId);
            localStorage.setItem ('token', res.data.register.token);
            if (res.data.register.result.statusCode == "1"){
                window.location = './confirm-email.html';
              }else{
                document.querySelector(".massage-error").style.display = "block";
                  document.querySelector(".massage-error").innerHTML = res.data.register.result.statusMessage;
              }
        });
 
    
    

    
        },
        
            setSrc:function () {
            return 'https://yourimageshare.com/ib/G7SJllFr65';
            },
            // or use local images instead
            localImages:function () {
            return '../image/Group 313.png';
            }  
              
    });
    
    

    
});

//change the image 
// window.addEventListener('load',()=>{
//     uploadImg()
// })
//  function uploadImg() {
//     const image_input = document.querySelector("#image-input");
//     image_input.addEventListener("change", function() {
//       const reader = new FileReader();
//       reader.addEventListener("load", () => {
//         const uploaded_image = reader.result;
//         console.log(uploaded_image);
//         document.querySelector(".display-image").style.backgroundImage = `url(${uploaded_image})`;
//       });
//       reader.readAsDataURL(this.files[0]);
//     });
//  }


$(function() {
    $('#form-tags-1').tagsInput();
});


(function($) {
    var delimiter = [];
    var inputSettings = [];
    var callbacks = [];

    $.fn.addTag = function(value, options) {
        options = jQuery.extend({
            focus: false,
            callback: true
        }, options);

        this.each(function() {
            var id = $(this).attr('id');

            var tagslist = $(this).val().split(_getDelimiter(delimiter[id]));
            if (tagslist[0] === '') tagslist = [];

            value = jQuery.trim(value);

            if ((inputSettings[id].unique && $(this).tagExist(value)) || !_validateTag(value, inputSettings[id], tagslist, delimiter[id])) {
                $('#' + id + '_tag').addClass('error');
                return false;
            }

            $('<span>', {class: 'tag'}).append(
                $('<span>', {class: 'tag-text'}).text(value),
                $('<button>', {class: 'tag-remove'}).click(function() {
                    return $('#' + id).removeTag(encodeURI(value));
                })
            ).insertBefore('#' + id + '_addTag');

            tagslist.push(value);

            $('#' + id + '_tag').val('');
            if (options.focus) {
                $('#' + id + '_tag').focus();
            } else {
                $('#' + id + '_tag').blur();
            }

            $.fn.tagsInput.updateTagsField(this, tagslist);

            if (options.callback && callbacks[id] && callbacks[id]['onAddTag']) {
                var f = callbacks[id]['onAddTag'];
                f.call(this, this, value);
            }

            if (callbacks[id] && callbacks[id]['onChange']) {
                var i = tagslist.length;
                var f = callbacks[id]['onChange'];
                f.call(this, this, value);
            }
        });

        return false;
    };

    $.fn.removeTag = function(value) {
        value = decodeURI(value);

        this.each(function() {
            var id = $(this).attr('id');

            var old = $(this).val().split(_getDelimiter(delimiter[id]));

            $('#' + id + '_tagsinput .tag').remove();

            var str = '';
            for (i = 0; i < old.length; ++i) {
                if (old[i] != value) {
                    str = str + _getDelimiter(delimiter[id]) + old[i];
                }
            }

            $.fn.tagsInput.importTags(this, str);

        });

        return false;
    };

    $.fn.tagExist = function(val) {
        var id = $(this).attr('id');
        var tagslist = $(this).val().split(_getDelimiter(delimiter[id]));
        return (jQuery.inArray(val, tagslist) >= 0);
    };

    $.fn.importTags = function(str) {
        var id = $(this).attr('id');
        $('#' + id + '_tagsinput .tag').remove();
        $.fn.tagsInput.importTags(this, str);
    };

    $.fn.tagsInput = function(options) {
        var settings = jQuery.extend({
            interactive: true,
            placeholder: 'Add a tag',
            minChars: 0,
            maxChars: null,
            limit: null,
            validationPattern: null,
            width: 'auto',
            height: 'auto',
            autocomplete: null,
            hide: true,
            delimiter: ',',
            unique: true,
            removeWithBackspace: true
        }, options);

        var uniqueIdCounter = 0;

        this.each(function() {
            if (typeof $(this).data('tagsinput-init') !== 'undefined') return;

            $(this).data('tagsinput-init', true);

            if (settings.hide) $(this).hide();

            var id = $(this).attr('id');
            if (!id || _getDelimiter(delimiter[$(this).attr('id')])) {
                id = $(this).attr('id', 'tags' + new Date().getTime() + (++uniqueIdCounter)).attr('id');
            }

            var data = jQuery.extend({
                pid: id,
                real_input: '#' + id,
                holder: '#' + id + '_tagsinput',
                input_wrapper: '#' + id + '_addTag',
                fake_input: '#' + id + '_tag'
            }, settings);

            delimiter[id] = data.delimiter;
            inputSettings[id] = {
                minChars: settings.minChars,
                maxChars: settings.maxChars,
                limit: settings.limit,
                validationPattern: settings.validationPattern,
                unique: settings.unique
            };

            if (settings.onAddTag || settings.onRemoveTag || settings.onChange) {
                callbacks[id] = [];
                callbacks[id]['onAddTag'] = settings.onAddTag;
                callbacks[id]['onRemoveTag'] = settings.onRemoveTag;
                callbacks[id]['onChange'] = settings.onChange;
            }

            var markup = $('<div>', {id: id + '_tagsinput', class: 'tagsinput'}).append(
                $('<div>', {id: id + '_addTag'}).append(
                    settings.interactive ? $('<input>', {id: id + '_tag', class: 'tag-input', value: '', placeholder: settings.placeholder}) : null
                )
            );

            $(markup).insertAfter(this);

            $(data.holder).css('width', settings.width);
            $(data.holder).css('min-height', settings.height);
            $(data.holder).css('height', settings.height);

            if ($(data.real_input).val() !== '') {
                $.fn.tagsInput.importTags($(data.real_input), $(data.real_input).val());
            }
            
            // If a user types a delimiter create a new tag
            $(data.fake_input).on('keypress', data, function(event) {
                if (_checkDelimiter(event)) {
                    event.preventDefault();

                    $(event.data.real_input).addTag($(event.data.fake_input).val(), {
                        focus: true,
                        unique: settings.unique
                    });

                    return false;
                }
            });

            $(data.fake_input).on('paste', function () {
                $(this).data('pasted', true);
            });

            // Deletes last tag on backspace
            data.removeWithBackspace && $(data.fake_input).on('keydown', function(event) {
                if (event.keyCode == 8 && $(this).val() === '') {
                    event.preventDefault();
                    var lastTag = $(this).closest('.tagsinput').find('.tag:last > span').text();
                    var id = $(this).attr('id').replace(/_tag$/, '');
                    $('#' + id).removeTag(encodeURI(lastTag));
                    $(this).trigger('focus');
                }
            });

            // Removes the error class when user changes the value of the fake input
            $(data.fake_input).keydown(function(event) {
                // enter, alt, shift, esc, ctrl and arrows keys are ignored
                if (jQuery.inArray(event.keyCode, [13, 37, 38, 39, 40, 27, 16, 17, 18, 225]) === -1) {
                    $(this).removeClass('error');
                }
            });
        });

        return this;
    };

    $.fn.tagsInput.updateTagsField = function(obj, tagslist) {
        var id = $(obj).attr('id');
        $(obj).val(tagslist.join(_getDelimiter(delimiter[id])));
    };

    $.fn.tagsInput.importTags = function(obj, val) {
        $(obj).val('');

        var id = $(obj).attr('id');
        var tags = _splitIntoTags(delimiter[id], val);

        for (i = 0; i < tags.length; ++i) {
            $(obj).addTag(tags[i], {
                focus: false,
                callback: false
            });
        }

        if (callbacks[id] && callbacks[id]['onChange']) {
            var f = callbacks[id]['onChange'];
            f.call(obj, obj, tags);
        }
    };

    var _getDelimiter = function(delimiter) {
        if (typeof delimiter === 'undefined') {
            return delimiter;
        } else if (typeof delimiter === 'string') {
            return delimiter;
        } else {
            return delimiter[0];
        }
    };

    var _validateTag = function(value, inputSettings, tagslist, delimiter) {
        var result = true;

        if (value === '') result = false;
        if (value.length < inputSettings.minChars) result = false;
        if (inputSettings.maxChars !== null && value.length > inputSettings.maxChars) result = false;
        if (inputSettings.limit !== null && tagslist.length >= inputSettings.limit) result = false;
        if (inputSettings.validationPattern !== null && !inputSettings.validationPattern.test(value)) result = false;

        if (typeof delimiter === 'string') {
            if (value.indexOf(delimiter) > -1) result = false;
        } else {
            $.each(delimiter, function(index, _delimiter) {
                if (value.indexOf(_delimiter) > -1) result = false;
                return false;
            });
        }

        return result;
    };

    var _checkDelimiter = function(event) {
        var found = false;

        if (event.which === 13) {
            return true;
        }

        if (typeof event.data.delimiter === 'string') {
            if (event.which === event.data.delimiter.charCodeAt(0)) {
                found = true;
            }
        } else {
            $.each(event.data.delimiter, function(index, delimiter) {
                if (event.which === delimiter.charCodeAt(0)) {
                    found = true;
                }
            });
        }

        return found;
    };

    var _splitIntoTags = function(delimiter, value) {
        // if (value === '') return [];
        
        // if (typeof delimiter === 'string') {
        //     return value.split(delimiter);
        // } else {
        //     var tmpDelimiter = '?';
        //     var text = value;

        //     $.each(delimiter, function(index, _delimiter) {
        //         text = text.split(_delimiter).join(tmpDelimiter);
        //     });

        //     return text.split(tmpDelimiter);
        // }

        return [];
    };
})(jQuery);




