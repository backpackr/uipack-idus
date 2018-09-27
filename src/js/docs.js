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
                    return `<button type="button" class="ui_btn">ui_btn</button>`;

                case 'markup_card':
                    return `
<div class="ui_card">
    <button type="button" class="ui_card__overlay">i</button>
    <div class="ui_card__imgarea">
        <a href="#link1" class="ui_card__image" style="background-image: url();"></a>
    </div>
    <div class="ui_card__info">
        <a href="#link2" class="ui_card__label">label</a>
        <a href="#link3" class="ui_card__title">title</a>
        <span class="ui_card__cost">
            <b>RED</b>
            <em>crossout</em>
        </span>
    </div>
    <div class="ui_card__rating">
        <div class="ui_card__vcenter">
            <div class="ui_rating" data-uipack="rating" data-value="3">
                <i class="ui_rating__icon"></i>
                <i class="ui_rating__icon"></i>
                <i class="ui_rating__icon"></i>
                <i class="ui_rating__icon"></i>
                <i class="ui_rating__icon"></i>
            </div>
        </div>
        <span class="ui_card__comment">ellipsis</span>
    </div>
</div>
                `

                case 'markup_rating':
                    return `
<div class="ui_rating" data-uipack="rating" data-value="2.5">
    <i class="ui_rating__icon"></i>
    <i class="ui_rating__icon"></i>
    <i class="ui_rating__icon"></i>
    <i class="ui_rating__icon"></i>
    <i class="ui_rating__icon"></i>
</div>
                `

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
