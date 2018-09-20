import $ from 'jquery';
import { INIT_INPUTNUMBER, INIT_SELECTBOX, INIT_AUTORESIZE, INIT_RATING } from './modules/events';
// import imgloader from './modules/ui-imgloader';
import numberinput from './modules/ui_numberinput';
import selectbox from './modules/ui_selectbox';
import autoresize from './modules/ui_autoresize';
import { alert, confirm } from './modules/ui_modal';
import rating from './modules/ui_rating';

// style
import '../style/uipack.scss';

// ui modules
const ui = {
    // event binders
    // imgloader,
    alert,
    autoresize,
    confirm,
    numberinput,
    rating,
    selectbox,
}

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

// check environment
if (typeof window === 'undefined') {
    // node envrironment
    module.exports = ui;
} else {
    // browser
    if (typeof (window.uipack) === 'undefined') {
        window.uipack = defineUipack();
    }

    // auto ui init via element attribute
    $(document).ready(() => {
        // img-loader
        // if ($('[data-uipack="imgloader"]').length) {
        //     uipack.imgloader($('[data-uipack="imgloader"]'));
        // }

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

        // uipack.alert({ title: 'Greetings 👋', message: 'How u doing?' });
    });
}

