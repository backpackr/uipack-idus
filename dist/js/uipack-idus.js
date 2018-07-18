(function (win) {
    function defineBPackr() {
        var uiPack = win.uiPack || {};

        uiPack.events = {
            events: {},
            on: function (eventName, fn) {
                this.events[eventName] = this.events[eventName] || [];
                this.events[eventName].push(fn);
            },
            off: function (eventName, fn) {
                var i;

                if (this.events[eventName]) {
                    for (i = 0; i < this.events[eventName].length; i++) {
                        if (this.events[eventName][i] === fn) {
                            this.events[eventName].splice(i, 1);
                            break;
                        }
                    }
                }
            },
            emit: function (eventName, data) {
                if (this.events[eventName]) {
                    this.events[eventName].forEach(function (fn) {
                        fn(data);
                    });
                }
            }
        };

        return uiPack;
    }

    // instanciate
    if (typeof (uiPack) === 'undefined') {
        win.uiPack = defineBPackr();
    }
}(window));
/*
* [data-ui="selectbox"] attributes
*
* data-state="disabled"
* data-select-placeholder="placeholder text"
*/

(function ($, uiPack) {
    var $ui = $('[data-ui="selectbox"]');
    var customEvent = 'propChange';

    function toggleActive(e) {
        var isDisabled = $(e.currentTarget).data('disabled') || $(e.currentTarget).data('state') === 'disabled';
        var usePlaceholder = $(e.currentTarget).data('selectPlaceholder') !== undefined;
        var selectedIndex = $(e.currentTarget).data('selectedIndex') || 0;
        var $selected = $(e.currentTarget).find('.ui-selected');
        var selectedText;

        if (isDisabled) {
            return;
        }

        // 열려있는 다른 셀렉트박스 닫기
        $('[data-ui="selectbox"]').not($(this)).removeClass('active');

        // current selectbox toggle
        $(e.currentTarget).toggleClass('active');

        if (e.target.className === 'ui-option') {
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
                    $selected.removeClass('placeholder');
                } else {
                    $selected.addClass('placeholder');
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
        var selectedOption = $currentSS.find('.ui-select').find('.ui-option').eq(selectedIndex).text();

        $(e.target).closest('[data-ui="selectbox"]')
            .attr('data-state', disabled)
            .data('state', disabled);

        $(e.target).each(function () {
            $(this).closest('[data-ui="selectbox"]').find('.ui-option').eq(selectedIndex).text();
        });

        $currentSS.find('.ui-selected').text(selectedOption);
    }

    function init() {
        $('[data-ui="selectbox"]').each(function (i) {
            var $selectForm = $(this).find('select');
            var usePlaceholder = $(this).data('selectPlaceholder') !== undefined;
            var hasScrollBar = $(this).find('[data-scrollbar]');
            var $option;
            var selectedIndex;

            // add placeholder to selectbox
            if (usePlaceholder) {
                var $target = hasScrollBar.length ? $(this).find('.mCSB_container') : $(this).find('.ui-select');

                $target.prepend('<li class="ui-option hide" value="">' + $(this).data('selectPlaceholder') + '</li>');
            }

            selectedIndex = $(this).find('.ui-option[selected]').length > 0 ? $(this).find('.ui-option[selected]').index() : 0;
            $option = $(this).find('.ui-option');

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
            if ($(this).find('.ui-selected').text().length === 0 || selectedIndex > 0) {
                $(this).find('.ui-selected').text($option.eq(selectedIndex).text());
            }

            if (selectedIndex === 0 && usePlaceholder) {
                $(this).find('.ui-selected').addClass('placeholder');
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
    uiPack.events.on('INIT_SELECTBOX', function () {
        init();
        $('[data-ui="selectbox"]').on('click', toggleActive);
        $('[data-ui="selectbox"]').find('select').on(customEvent, handleCustomEvents);
    });
}(jQuery, uiPack));

//# sourceMappingURL=uipack-idus.js.map
