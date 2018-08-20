/*
* [data-ui="selectbox"] attributes
*
* data-state="disabled"
* data-select-placeholder="placeholder text"
*/

(function ($) {
    var $ui = $('[data-ui="selectbox"]');
    var customEvent = 'propChange';

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

    function init() {
        $('[data-ui="selectbox"]').each(function (i) {
            var $selectForm = $(this).find('select');
            var usePlaceholder = $(this).data('placeholder') !== undefined;
            var hasScrollBar = $(this).find('[data-scrollbar]');
            var $option;
            var selectedIndex;

            // add placeholder to selectbox
            if (usePlaceholder) {
                var $target = hasScrollBar.length ? $(this).find('.mCSB_container') : $(this).find('.selectbox__dropdown');

                $target.prepend('<li class="selectbox__dropdown__option" hidden value="">' + $(this).data('placeholder') + '</li>');
            }

            selectedIndex = $(this).find('.selectbox__dropdown__option[selected]').length > 0 ? $(this).find('.selectbox__dropdown__option[selected]').index() : 0;
            $option = $(this).find('.selectbox__dropdown__option');

            // create <option> for select form
            $option.each(function (i) {
                var attributes = $(this).prop('attributes');

                var $data = $('<option>');

                $.each(attributes, function (i) {
                    $data.attr(this.name, this.value);
                });

                $data.text($(this).text());
                $selectForm.append($data);
            });

            // set <select> properties
            $selectForm.prop({
                'selectedIndex': selectedIndex,
                'disabled': $(this).data('state') === 'disabled'
            });

            // initial placeholder
            if ($(this).find('.selectbox__trigger__text').text().length === 0 || selectedIndex > 0) {
                $(this).find('.selectbox__trigger__text').text($option.eq(selectedIndex).text());
            }

            if (selectedIndex === 0 && usePlaceholder) {
                $(this).find('.selectbox__trigger__text').attr('disabled', true);
            }
        });
    }

    if ($ui.length) {
        init();
        $ui.on('click', toggleActive);
        // use custom event to avoid multiple change event on select;
        $ui.find('select').on(customEvent, handleCustomEvents);
    }

    // init from other modules
    // uiPack.events.on('INIT_SELECTBOX', function () {
    //     init();
    //     $('[data-ui="selectbox"]').on('click', toggleActive);
    //     $('[data-ui="selectbox"]').find('select').on(customEvent, handleCustomEvents);
    // });
}(jQuery));
