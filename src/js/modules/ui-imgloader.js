function imgloader() {
    console.log(this);
    console.log(123)
    return this
}

export default imgloader;

// (function () {
//     var $ui = $('[data-ui="imgloader"]');

//     function extractBgSrc(element) {
//         var style = element.currentStyle || window.getComputedStyle(element, false);

//         return style.backgroundImage.slice(4, -1).replace(/"/g, '');
//     }

//     function getImgSrc($elem) {
//         var $thumbnail = $elem.find('.imgloader__thumbnail');
//         var src;

//         if ($thumbnail[0].nodeName === 'IMG') {
//             src = $thumbnail[0].src;
//         } else {
//             src = extractBgSrc($thumbnail[0]);
//         }

//         return src;
//     }

//     function loadImg($element) {
//         var img;
//         var imgLarge;

//         img = new Image();
//         img.src = getImgSrc($element);

//         imgLarge = new Image();
//         imgLarge.src = $ui.attr('data-img');

//         $(imgLarge).attr('data-state', 'loading');

//         if (imgLarge.complete) {
//             $(imgLarge).removeAttr('data-state');

//             $ui.append(imgLarge);

//             return;
//         }

//         img.onload = function () {
//             $element.find('.imgloader__thumbnail').attr('data-state', 'loaded');
//         }

//         imgLarge.onload = function () {
//             $(imgLarge).attr('data-state', 'loaded');
//         }

//         $element.append(imgLarge);
//     }

//     $ui.each(function () {
//         var $elem = $(this);
//         loadImg($elem);
//     });
// }());