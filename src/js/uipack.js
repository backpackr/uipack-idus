import $ from 'jquery';
import { INIT_INPUTNUMBER, INIT_SELECTBOX, INIT_AUTORESIZE, INIT_RATING, INIT_TEXTAREA } from './modules/events';
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
    textarea
}

module.exports = ui;

// uipack global object
const defineUipack = () => {
    const uipack = window.uipack || {};
    uipack.events = {};

    // event emitter
    uipack.eventOn = (eventName, fn) => {
        uipack.events[eventName] = uipack.events[eventName] || [];
        uipack.events[eventName].push(fn);
    }

    uipack.eventOff = (eventName, fn) => {
        let i;

        if (uipack.events[eventName]) {
            for (i = 0; i < uipack.events[eventName].length; i += 1) {
                if (uipack.events[eventName][i] === fn) {
                    uipack.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }

    uipack.eventEmit = (eventName, data) => {
        if (uipack.events[eventName]) {
            uipack.events[eventName].forEach((fn) => {
                fn(data);
            });
        }
    }

    // add ui modules
    Object.keys(ui).map(key => { uipack[key] = ui[key]; return false });

    return uipack;
}

// browser usage
if (typeof (window.uipack) === 'undefined') {
    window.uipack = defineUipack();

    // auto ui init via element attribute
    $(document).ready(() => {
        // img - loader
        if ($('[data-uipack="imgloader"]').length) {
            uipack.imgloader($('[data-uipack="imgloader"]'));
        }

        // numberinput
        uipack.numberinput($('[data-uipack="numberinput"]'));
        uipack.eventOn(INIT_INPUTNUMBER, () => {
            uipack.numberinput($('[data-uipack="numberinput"]'));
        });

        // selectbox
        uipack.selectbox($('[data-uipack="selectbox"]'));
        uipack.eventOn(INIT_SELECTBOX, () => {
            uipack.selectbox($('[data-uipack="selectbox"]'));
        });

        // autoresize input
        uipack.autoresize($('[data-uipack="autoresize"]'));
        uipack.eventOn(INIT_AUTORESIZE, () => {
            uipack.autoresize($('[data-uipack="autoresize"]'));
        });

        // rating
        uipack.rating($('[data-uipack="rating"]'));
        uipack.eventOn(INIT_RATING, () => {
            uipack.rating($('[data-uipack="rating"]'));
        });

        uipack.textarea($('[data-uipack="textarea"]'));
        uipack.eventOn(INIT_TEXTAREA, () => {
            uipack.textarea($('[data-uipack="textarea"]'));
        });

        // uipack.alert({ title: 'Greetings 👋', message: 'How u doing?' });
    });
}
