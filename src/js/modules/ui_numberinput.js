import $ from 'jquery';

function handleBtnEvent(event) {
    const $currentUi = $(event.currentTarget).parents('[data-uipack="numberinput"]');
    const $input = $currentUi.find('input[type="number"]');
    const min = parseInt($input.attr('min'), 10);
    const max = parseInt($input.attr('max'), 10);
    const val = $input.val() === '' ? 0 : parseInt($input.val(), 10);
    const type = $(event.target).data('action');
    const isDisabled = $input.attr('disabled');
    let result;

    if (!isDisabled) {
        if (type === 'increment' && val < max) {
            result = val + 1;
        } else if (type === 'decrement' && val > min) {
            result = val - 1;
        } else {
            return;
        }

        $input.val(result).trigger('mouseup');
    }
}

function handleKeyupEvent(event) {
    const eventTarget = event.target;
    const val = parseInt(eventTarget.value, 10);

    if (isNaN(val)) {
        eventTarget.value = '';
    }

    if (val > eventTarget.max) {
        eventTarget.value = eventTarget.max;
    }
}

function numberinput($element) {
    // prevent multiple event binding
    if ($element.data('isListening')) return;

    $element.each((index, element) => {
        $(element).find('button').on('click', handleBtnEvent);
        $(element).find('input[type="number"]').on('keyup', handleKeyupEvent);
        $(element).data('isListening', true);
    });
}

export default numberinput;