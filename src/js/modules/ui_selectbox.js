import $ from 'jquery';

const customEvent = 'propChange';

function toggleActive(e) {
    const isDisabled = $(e.currentTarget).data('state') === 'disabled';
    const usePlaceholder = $(e.currentTarget).data('placeholder') !== undefined;
    let selectedIndex = $(e.currentTarget).data('selectedIndex') || 0;
    const $selected = $(e.currentTarget).find('.ui_selectbox__trigger__text');
    let selectedText;

    if (isDisabled) {
        return;
    }

    // 열려있는 다른 셀렉트박스 닫기
    $('[data-uipack="selectbox"][data-state="active"]')
        .not($(this))
        .removeAttr('data-state');

    // current selectbox toggle
    $(e.currentTarget).attr('data-state', 'active');

    if (e.target.className === 'ui_selectbox__dropdown__option') {
        selectedIndex = $(e.target).index();
        selectedText = $(e.target).text();

        // trigger change to hidden <select>
        $(this).find('select')
            .prop('selectedIndex', selectedIndex)
            .trigger(customEvent).change();

        // 플레이스 홀더 옵션
        if (usePlaceholder) {
            if (selectedIndex > 0) {
                $selected.text(selectedText);
                $selected.removeAttr('disabled');
            } else {
                $selected.attr('disabled', true);
            }
        }

        // remove tabindex in scrollbar: focus event interfearence;
        if ($(this).find('[data-scrollbar]').length) {
            $(this).find('[tabindex]').removeAttr('tabindex');
        };
    }
}

function handleCustomEvents(e) {
    const selectedIndex = e.target.selectedIndex;
    const disabled = e.target.disabled ? 'disabled' : '';
    const $currentSS = $(e.target).closest('[data-uipack="selectbox"]');
    const selectedOption = $currentSS.find('.ui_selectbox__dropdown').find('.ui_selectbox__dropdown__option').eq(selectedIndex).text();

    $(e.target).closest('[data-uipack="selectbox"]')
        .attr('data-state', disabled)
        .data('state', disabled);

    $(e.target).each((index, element) => {
        $(element).closest('[data-uipack="selectbox"]').find('.ui_selectbox__dropdown__option').eq(selectedIndex).text();
    });

    $currentSS.find('.ui_selectbox__trigger__text').text(selectedOption);
}

function init() {
    $('[data-uipack="selectbox"]').each((index, element) => {
        const $selectForm = $(element).find('select');
        const usePlaceholder = $(element).data('placeholder') !== undefined;
        const hasScrollBar = $(element).find('[data-scrollbar]');
        const selectedIndex = $(element).find('.ui_selectbox__dropdown__option[selected]').length > 0 ? $(element).find('.ui_selectbox__dropdown__option[selected]').index() : 0;
        const $option = $(element).find('.ui_selectbox__dropdown__option');
        // add placeholder to selectbox
        if (usePlaceholder) {
            const $target = hasScrollBar.length ? $(element).find('.mCSB_container') : $(element).find('.ui_selectbox__dropdown');

            $target.prepend(`<li class="selectbox__dropdown__option" hidden value="">${$(element).data('placeholder')}</li>`);
        }

        $option.each((i, item) => {
            const attributes = $(item).prop('attributes');

            const $data = $('<option>');

            $.each(attributes, () => {
                $data.attr(item.name, item.value);
            });

            $data.text($(item).text());
            $selectForm.append($data);
        });

        // set <select> properties
        $selectForm.prop({
            'selectedIndex': selectedIndex,
            'disabled': $(element).data('state') === 'disabled'
        });

        // initial placeholder
        if ($(element).find('.ui_selectbox__trigger__text').text().length === 0 || selectedIndex > 0) {
            $(element).find('.ui_selectbox__trigger__text').text($option.eq(selectedIndex).text());
        }

        if (selectedIndex === 0 && usePlaceholder) {
            $(element).find('.ui_selectbox__trigger__text').attr('disabled', true);
        }
    })
}

function selectbox($element) {
    init();

    $element.each((index, element) => {
        if ($(element).data('isListening')) return;

        $(element).on('click', toggleActive);
        $(element).find('select').on(customEvent, handleCustomEvents);
        $(element).data('isListening', true);
    });
}

export default selectbox;