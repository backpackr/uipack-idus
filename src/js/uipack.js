import * as events from './modules/eventEmitter';
import numberinput from './modules/ui_numberinput';
import selectbox from './modules/ui_selectbox';
import autoresize from './modules/ui_autoresize';
import { Modal, Prompt } from './modules/Modal';
import textarea from './modules/ui_textarea';
import { modal, alert } from './modules/ui_modal';
import rating from './modules/ui_rating';
import uiCookie from './modules/uiCookie';
// style
import '../style/uipack.scss';

// ui modules
const ui = {
    Modal,
    Prompt,
    alert,
    autoresize,
    events,
    modal,
    numberinput,
    rating,
    selectbox,
    textarea,
    uiCookie,
}

module.exports = ui;

// uipack global object
const defineUipack = () => {
    const uipack = window.uipack || {};

    // add ui modules
    Object.keys(ui).map(key => { uipack[key] = ui[key]; return false });

    return uipack;
}

// browser usage
if (typeof (window.uipack) === 'undefined') window.uipack = defineUipack();
