import $ from 'jquery';

function handleBtnEvent(event) {
    var $currentUi = $(event.currentTarget).parents('[data-uipack="numberinput"]');
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

function numberinput($element) {
    // prevent multiple event binding
    if ($element.data('isListening')) return;

    $element.each(function () {
        $(this).find('button').on('click', handleBtnEvent);
        $(this).find('input[type="number"]').on('keyup', handleKeyupEvent);
        $(this).data('isListening', true);
    });
}

export default numberinput;