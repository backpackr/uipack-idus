import $ from 'jquery';

const charsLeft = element => {
    const saved = $(element).data();
    const $textarea = $(element).find('textarea');
    const $charCount = $(element).find('.ui_field__chars');

    let charsleft;

    if (!isNaN(saved.max)) {
        charsleft = saved.max - $textarea.val().length;
    }

    $charCount.html(charsleft);
}

const handleChange = event => {
    const target = event.currentTarget;
    const $textarea = $(target).find('textarea');
    const saved = $(target).data();

    if ($textarea.val().length > saved.max) {
        $textarea.val($textarea.val().slice(0, saved.max));
        return;
    };

    // characters left
    if (!isNaN(saved.max)) charsLeft(target);

    // toggle active
    if (saved.value !== $textarea.val()) {
        $(target).attr('data-state', 'active');
        $(target).find('button').prop('disabled', false).change();
    } else {
        $(target).removeAttr('data-state').find('button').prop('disabled', true);
    }
};


const init = element => {
    $(element).each((i, item) => {
        const value = $(item).find('textarea').val() || '';
        const max = parseInt($(item).find('textarea').attr('maxlength'), 0);
        const state = $(item).data('state');

        // save initial data
        $(item).data({ value, max, state });

        if (!isNaN(max)) charsLeft(item);

        if (state === 'disabled' || state === 'readonly') {
            $(item).find('textarea').prop(state, true).change();
        } else {
            $(item).on('keyup', handleChange);
        };
    });
};

function textarea($element) {
    $element.each((index, element) => {
        init(element);
    });


}

export default textarea;