import $ from 'jquery';

const setMaxHeight = element => {
    const lineHeight = $(element).height() / Number($(element).attr('rows'));
    const max = $(element).data('max') || 5; // 5 lines by default

    element.style.setProperty('max-height', `${lineHeight * max - 1}px`, 'important');
};

const eventHandler = event => {
    const { target } = event;
    const offset = target.offsetHeight - target.clientHeight;

    $(target).css('height', 'auto').css('height', target.scrollHeight + offset);
};

const autoresize = $selector => {
    $selector.each((index, element) => {
        // set max height;
        setMaxHeight(element);

        // TODO: IE test `input` event
        $(element).on('keyup input', eventHandler);
    });
};

export default autoresize;