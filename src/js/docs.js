import $ from 'jquery';
import template from './modules/template';
import { INIT_INPUTNUMBER, INIT_SELECTBOX, INIT_AUTORESIZE, INIT_RATING, INIT_TEXTAREA } from './modules/eventNames';
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

                case 'markup_cardloading':
                    return template.cardloading;

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

    // auto ui init via element attribute
    // numberinput
    uipack.numberinput($('[data-uipack="numberinput"]'));
    uipack.events.listen(INIT_INPUTNUMBER, () => {
        uipack.numberinput($('[data-uipack="numberinput"]'));
    });

    // selectbox
    uipack.selectbox($('[data-uipack="selectbox"]'));
    uipack.events.listen(INIT_SELECTBOX, () => {
        uipack.selectbox($('[data-uipack="selectbox"]'));
    });

    // autoresize input
    uipack.autoresize($('[data-uipack="autoresize"]'));
    uipack.events.listen(INIT_AUTORESIZE, () => {
        uipack.autoresize($('[data-uipack="autoresize"]'));
    });

    // rating
    uipack.rating($('[data-uipack="rating"]'));
    uipack.events.listen(INIT_RATING, () => {
        uipack.rating($('[data-uipack="rating"]'));
    });

    uipack.textarea($('[data-uipack="textarea"]'));
    uipack.events.listen(INIT_TEXTAREA, () => {
        uipack.textarea($('[data-uipack="textarea"]'));
    });
});
