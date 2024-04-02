/* global ajaxurl, pagenow */
jQuery(function ($) {

    $('.fggc-toggle').on('click', function () {
        var closed, hidden;

        $(this).parent('.fggc-group-label, .fggc-field-label,.fggc-option-label').toggleClass('closed');

        closed = $('.fggc-group-label, .fggc-field-label, .fggc-option-label').filter('.closed').parent().map(function () {
            return this.id;
        }).get().join(',');

        $.post(ajaxurl, {
            action: 'closed-postboxes',
            closed: closed,
            closedpostboxesnonce: jQuery('#closedpostboxesnonce').val(),
            page: pagenow
        });
    })

})