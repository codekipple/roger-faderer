/*! v1.0.0 https://github.com/codekipple/roger-faderer. */

/*
    Supports CommonJS, AMD or browser globals.
    see: https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    $.fn.rogerFaderer = function (options) {

        /*
            fadeStart is relative to the top of the element, e.g:-
                0 = the top of the element
                -100 = 100px above the top of the element
                100 = 100px below the top of the element

            fadeEnd is relative to the bottom of the element, e.g:-
                0 = the bottom of the element
                -100 = 100px above the bottom of the element
                100 = 100px below the bottom of the element
        */
        var opt = {
            fadeStart: 0,
            fadeEnd: 0
        };

        var elements = $(this);

        if (options) {
            $.extend(opt, options);
        }

        return elements.each(function() {

            var $el = $(this),
                elHeight = $el.outerHeight(),
                elTop = $el.offset().top,
                trackStart = elTop + opt.fadeStart,
                trackEnd = elTop + elHeight + opt.fadeEnd,
                trackLength = trackEnd - trackStart;

            $(document).bind('scroll', function(e) {
                var position = { top: $(this).scrollTop() },
                    opacity,
                    trackPos;

                // bail if scroll position at top
                if (position.top <= 0 ) {
                    return;
                }

                console.log('tick', position.top);

                if (position.top < trackStart) {
                    /*
                        scroll position is above the start of the track, element should be fully visible
                    */
                    $el.css('opacity', 100);
                } else if (position.top > trackEnd) {
                    /*
                        scroll position is below the end of the track, element should be fully hidden
                    */
                    $el.css('opacity', 0);
                } else {
                    /*
                        scroll position is within the track, fade the element based on it's position within the track
                    */
                    trackPos = position.top - trackStart;
                    opacity = 1 - (trackPos / trackLength);
                    $el.css('opacity', opacity);
                }
            });

        });

    };

}));