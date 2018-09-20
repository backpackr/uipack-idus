import $ from 'jquery';

const init = (element, option) => {
    const score = $(element).data('value');
    const starIcon = $(element).find('i');
    const starFull = Math.floor(score);
    const iconDefault = option.iconDefault || undefined;
    const iconHalf = option.iconHalf || undefined;
    let i;

    for (i = 0; i < starFull; i += 1) {
        starIcon.eq(i).attr('data-state', 'active');
    }

    if (score % 1 !== 0) {
        starIcon.eq(starFull).removeClass(iconDefault).addClass(iconHalf).attr('data-state', 'active');
    }
}

function rating($element, option) {
    const opt = option || {};

    $element.each((index, element) => {
        init(element, opt);
    });
}

export default rating;