import $ from 'jquery';

// const changeHandler = event => {
//     const value = event.target.value;
//     const rowSize = value.split('\n').length;
//     const rowMax = event.target.dataset.max ? Number(event.target.dataset.max) : 10;

//     if (rowSize >= rowMax) return;

//     if (event.type === 'keydown' && event.keyCode === 13) {
//         $(event.target).attr('rows', rowSize + 1);
//     } else if (event.type === 'keyup') {
//         $(event.target).attr('rows', rowSize);
//     }
// }

const createClone = (element) => {
    const $clone = $(element).clone();

    $clone.attr('data-state', 'clone').insertAfter($(element));
}

const changeHandler = event => {
    const { target, data, type, keyCode } = event;
    const clone = $(target).siblings('[data-state="clone"]')[0];
    const { value } = target;

    // if (type === 'keydown' && keyCode === 13) {
    //     value += '\n\r';

    //     $(target).val(value);
    //     $(clone).val(value);
    //     // if (target.scrollTop !== 0) {
    //     //     target.style = `height: ${cssHeight}px`;
    //     // }

    //     // console.log(target.scrollHeight);
    //     if (target.height !== 0) {
    //         target.style = `height: ${target.scrollHeight}px`;
    //     }
    // }

    // update clone

    // if (type === 'keydown' && keyCode === 13) {
    //     value += '\n\r';
    // }

    $(clone).val(value);

    if (type === 'keyup') {

        // update height
        if (target.scrollTop !== 0 || target.scrollHeight > clone.scrollHeight) {
            let cssHeight = clone.scrollHeight;

            if (clone.scrollHeight < data.elementHeight) {
                cssHeight = data.elementHeight;
            };

            target.style = `height: ${cssHeight}px`;
        }
    }
}

const multiline = $selector => {
    $selector.each((index, element) => {
        if ($(element).data('isListening')) return;

        $(element).on('keydown keyup', {
            elementHeight: $(element).outerHeight()
        }, changeHandler).data('isListening', true);

        createClone(element);
    });
};

export default multiline;