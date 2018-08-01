(function ($, uiPack) {
    var $ui = $('[data-ui="numberinput"]');

    function handleBtnEvent(event) {
        var $currentUi = $(event.currentTarget).parents('[data-ui="numberinput"]');
        var $input = $currentUi.find('input[type="number"]');
        var min = parseInt($input.attr('min'));
        var max = parseInt($input.attr('max'));
        var val = $input.val() === '' ? 0 : parseInt($input.val());
        var type = $(event.target).data('action');
        var isDisabled = $input.attr('disabled');
        var result;

        if (!isDisabled) {
            if (type === 'increment' && val < max) {
                result = val += 1;
            } else if (type === 'decrement' && val > min) {
                result = val -= 1;
            } else {
                return;
            }

            $input.val(result).trigger('mouseup');
        }
    }

    function handleKeyupEvent(event) {
        var val = parseInt(event.target.value);

        if (isNaN(val)) {
            event.target.value = '';
        }

        if (val > event.target.max) {
            event.target.value = event.target.max;
        }
    }

    function bindEvent() {
        $('[data-ui="numberinput"]').each(function () {
            $(this).find('button').on('click', handleBtnEvent);
            $(this).find('input[type="number"]').on('keyup', handleKeyupEvent);
        });
    }

    if ($ui.length) bindEvent();
    uiPack.events.on('INIT_INPUTNUMBER', bindEvent);
}(jQuery, uiPack));
