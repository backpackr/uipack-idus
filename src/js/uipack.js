import $ from 'jquery';
import { INIT_INPUTNUMBER, INIT_SELECTBOX } from './modules/events';
import imgloader from './modules/ui-imgloader';
import numberinput from './modules/ui-numberinput';
import selectbox from './modules/ui-selectbox';
import { alert, confirm } from './modules/ui-modal';

// style
import '../style/uipack';

// ui modules
const ui = {
    imgloader,
    selectbox,
    numberinput,
    confirm,
    alert
}

// uipack global object
const defineUipack = () => {
    const uipack = window.uipack || {};

    // event emitter
    uipack.events = {};
    uipack.on = function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    }
    uipack.off = function (eventName, fn) {
        let i;

        if (this.events[eventName]) {
            for (i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }
    uipack.emit = function (eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    }

    // add ui modules
    for (let x in ui) {
        uipack[x] = ui[x];
    }

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
    $(document).ready(function () {
        // img-loader
        uipack.imgloader($('[data-uipack="imgloader"]'));

        // numberinput
        uipack.numberinput($('[data-uipack="numberinput"]'));
        uipack.on(INIT_INPUTNUMBER, function () {
            uipack.numberinput($('[data-uipack="numberinput"]'));
        });

        // selectbox
        uipack.selectbox($('[data-uipack="selectbox"]'));
        uipack.on(INIT_SELECTBOX, function () {
            uipack.selectbox($('[data-uipack="selectbox"]'));
        });

        // uipack.alert({ title: 'Greetings 👋', message: 'How u doing?' });
    });
}

