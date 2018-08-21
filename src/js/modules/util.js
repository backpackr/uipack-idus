
/**
* extractBg
* extract background-img from style
*
* @param {Element} element
* @returns {url} string url
*/
export const extractBg = element => {
    const style = element.currentStyle || window.getComputedStyle(element, false);

    return style.backgroundImage.slice(4, -1).replace(/"/g, '');
};
