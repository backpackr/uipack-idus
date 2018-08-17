import $ from 'jquery';

$(document).ready(function () {
    $('[data-template]').each(function () {
        var id = $(this).data('template');

        $.get('./template/' + id + '.html').done(function (markup) {
            $('[data-template="' + id + '"]').append(markup);
            $('[data-template="' + id + '"]').find('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
        })
    });

    $('[data-show]').each(function () {
        var id = $(this).data('show');

        $(this).on('click', function () {
            $('[data-code="' + id + '"]').toggle();
        });
    });
});

$('.img-loader').imgLoader().fadeIn();
