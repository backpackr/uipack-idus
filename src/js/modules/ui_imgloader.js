// import $ from 'jquery';
// import { extractBg } from './util';

// const getImgSrc = $element => {
//     const $thumbnail = $element.find('.imgloader__thumbnail');
//     let src;

//     if ($thumbnail[0].nodeName === 'IMG') {
//         src = $thumbnail[0].src;
//     } else {
//         src = extractBg($thumbnail[0]);
//     }

//     return src;
// }

// function imgloader($element) {
//     const img = new Image();
//     const bigImg = new Image();

//     img.src = $element.find('img').attr('src');
//     bigImg.src = $element.data('src');

//     img.onload = () => {
//         if (bigImg.complete) {
//             $element.attr('data-state', 'cached');
//             return;
//         }
//         $element.attr('data-state', 'loaded');
//     };

//     bigImg.onload = () => {
//         $element.append(bigImg);
//     }
// };

// export default imgloader;
