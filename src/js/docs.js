import $ from 'jquery';
import '../style/docs.scss';

const $template = $('[data-template]');

$(document).ready(function () {
    $template.each(function () {
        var id = $(this).data('template');

        if ($('[data-template="' + id + '"]').children().length > 0) {
            return;
        }

        $.get('./template/' + id + '.html').done(function (markup) {

            $('[data-template="' + id + '"]').append(markup);
            $('[data-template="' + id + '"]').find('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
        });
    });

    $('[data-show]').each(function () {
        var id = $(this).data('show');

        $(this).on('click', function () {
            $('[data-code="' + id + '"]').toggle();
        });
    });
});
