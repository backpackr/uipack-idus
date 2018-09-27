import $ from 'jquery';
import template from './modules/template';
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

    // show code block
    $('[data-show]').each(function () {
        const id = $(this).data('show');

        $(this).on('click', function () {
            $('[data-code="' + id + '"]').toggle();
        });
    });

    // markup clipboard
    const clipboard = new ClipboardJS('[data-clipboard]', {
        text: function (trigger) {
            const selector = $(trigger).data('clipboard');

            switch (selector) {
                case 'markup_btn':
                    return template.btn;

                case 'markup_card':
                    return template.card;

                case 'markup_card_side':
                    return template.cardSide;

                case 'markup_rating':
                    return template.rating;

                case 'markup_grid':
                    return template.grid;

                case 'markup_title':
                    return template.title;

                default:
                    break;
            }
        }
    });

    clipboard.on('success', function (e) {
        uipack.alert({
            title: 'Copied Markup'
        });
    });
});
