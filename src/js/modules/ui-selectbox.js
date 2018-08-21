import $ from 'jquery';

const customEvent = 'propChange';

function toggleActive(e) {
    var isDisabled = $(e.currentTarget).data('state') === 'disabled';
    var usePlaceholder = $(e.currentTarget).data('placeholder') !== undefined;
    var selectedIndex = $(e.currentTarget).data('selectedIndex') || 0;
    var $selected = $(e.currentTarget).find('.selectbox__trigger__text');
    var selectedText;

    if (isDisabled) {
        return;
    }

    // 열려있는 다른 셀렉트박스 닫기
    $('[data-ui="selectbox"][data-state="active"]')
        .not($(this))
        .removeAttr('data-state');

    // current selectbox toggle
    $(e.currentTarget).attr('data-state', 'active');

    if (e.target.className === 'selectbox__dropdown__option') {
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
    var selectedIndex = e.target.selectedIndex;
    var disabled = e.target.disabled ? 'disabled' : '';
    var $currentSS = $(e.target).closest('[data-ui="selectbox"]');
    var selectedOption = $currentSS.find('.selectbox__dropdown').find('.selectbox__dropdown__option').eq(selectedIndex).text();

    $(e.target).closest('[data-ui="selectbox"]')
        .attr('data-state', disabled)
        .data('state', disabled);

    $(e.target).each(function () {
        $(this).closest('[data-ui="selectbox"]').find('.selectbox__dropdown__option').eq(selectedIndex).text();
    });

    $currentSS.find('.selectbox__trigger__text').text(selectedOption);
}

function init($element) {
    var $selectForm = $element.find('select');
    var usePlaceholder = $element.data('placeholder') !== undefined;
    var hasScrollBar = $element.find('[data-scrollbar]');
    var $option;
    var selectedIndex;

    // add placeholder to selectbox
    if (usePlaceholder) {
        var $target = hasScrollBar.length ? $element.find('.mCSB_container') : $element.find('.selectbox__dropdown');

        $target.prepend('<li class="selectbox__dropdown__option" hidden value="">' + $element.data('placeholder') + '</li>');
    }

    selectedIndex = $element.find('.selectbox__dropdown__option[selected]').length > 0 ? $element.find('.selectbox__dropdown__option[selected]').index() : 0;
    $option = $element.find('.selectbox__dropdown__option');

    // create <option> for select form
    $option.each(function (i) {
        var attributes = $element.prop('attributes');

        var $data = $('<option>');

        $.each(attributes, function (i) {
            $data.attr(this.name, this.value);
        });

        $data.text($element.text());
        $selectForm.append($data);
    });

    // set <select> properties
    $selectForm.prop({
        'selectedIndex': selectedIndex,
        'disabled': $element.data('state') === 'disabled'
    });

    // initial placeholder
    if ($element.find('.selectbox__trigger__text').text().length === 0 || selectedIndex > 0) {
        $element.find('.selectbox__trigger__text').text($option.eq(selectedIndex).text());
    }

    if (selectedIndex === 0 && usePlaceholder) {
        $element.find('.selectbox__trigger__text').attr('disabled', true);
    }
}

export default function selectbox($element) {
    init($element);
    $element.on('click', toggleActive);
    // use custom event to avoid multiple change event on select;
    $element.find('select').on(customEvent, handleCustomEvents);
}
