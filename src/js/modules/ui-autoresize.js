import $ from 'jquery';

const eventHandler = event => {
    const { target } = event;
    const offset = target.offsetHeight - target.clientHeight;

    $(target).css('height', 'auto').css('height', target.scrollHeight + offset);
};

const autoresize = $selector => {
    $selector.each((index, element) => {
        // TODO: IE test `input` event
        $(element).on('keyup input', eventHandler);
    });
};

export default autoresize;