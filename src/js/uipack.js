import * as events from './modules/eventEmitter';
import numberinput from './modules/ui_numberinput';
import selectbox from './modules/ui_selectbox';
import autoresize from './modules/ui_autoresize';
import textarea from './modules/ui_textarea';
import { alert, confirm } from './modules/ui_modal';
import rating from './modules/ui_rating';

// style
import '../style/uipack.scss';

// ui modules
const ui = {
    alert,
    autoresize,
    confirm,
    numberinput,
    rating,
    selectbox,
    textarea,
    events,
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
