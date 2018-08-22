
/**
* extract background-img from style
*
* @param {Element} element
* @returns {url} string url
*/
export const extractBg = element => {
    const style = element.currentStyle || window.getComputedStyle(element, false);

    return style.backgroundImage.slice(4, -1).replace(/"/g, '');
};

/**
 * returns random hash (5chars)
 *
 * @returns string
 */
export const randomHash = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}