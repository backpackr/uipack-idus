import $ from 'jquery';
import '../style/docs.scss';

const $template = $('[data-template]');

$(document).ready(() => {
    $template.each((index, element) => {
        const id = $(element).data('template');
        if ($(`[data-template="${id}"]`).children().length > 0) {
            return;
        }

        $.get(`./template/${id}.html`).done((markup) => {
            $(`[data-template="${id}"]`).append(markup);
            $(`[data-template="${id}"]`).find('pre code').each((i, block) => {
                /* eslint-disable */
                hljs.highlightBlock(block);
            });
        });
    });

    $('[data-show]').each(function () {
        const id = $(this).data('show');

        $(this).on('click', function () {
            $('[data-code="' + id + '"]').toggle();
        });
    });
});
