import $ from 'jquery';

const init = (element) => {
    const score = $(element).data('value');
    const starIcon = $(element).find('i');
    const starFull = Math.floor(score);
    let i;

    for (i = 0; i < starFull; i += 1) {
        starIcon.eq(i).attr('data-state', 'active');
    }

    if (score % 1 !== 0) {
        starIcon.eq(starFull).attr('data-state', 'half');
    }
}

function rating($element) {
    $element.each((index, element) => {
        init(element);
    });
}

export default rating;