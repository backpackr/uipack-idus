import $ from 'jquery';
import { extractBg } from './util';

const getImgSrc = $element => {
    const $thumbnail = $element.find('.imgloader__thumbnail');
    let src;

    if ($thumbnail[0].nodeName === 'IMG') {
        src = $thumbnail[0].src;
    } else {
        src = extractBg($thumbnail[0]);
    }

    return src;
}

function imgloader($element) {
    const img = new Image();
    const imgLarge = new Image();

    img.src = getImgSrc($element);
    imgLarge.src = $element.attr('data-img');

    $(imgLarge).attr('data-state', 'loading');

    if (imgLarge.complete) {
        $(imgLarge).removeAttr('data-state');

        $element.append(imgLarge);

        return;
    }

    img.onload = () => {
        $element.find('.imgloader__thumbnail').attr('data-state', 'loaded');
    }

    imgLarge.onload = () => {
        $(imgLarge).attr('data-state', 'loaded');
    }

    $element.append(imgLarge);
};

export default imgloader;
