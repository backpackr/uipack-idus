import $ from 'jquery';
import imgloader from './modules/ui-imgloader';
import numberinput from './modules/ui-numberinput';
import selectbox from './modules/ui-selectbox';
import { INIT_INPUTNUMBER, INIT_SELECTBOX } from './modules/events';

// style
import '../style/uipack';

// uipack es6 module
const uipackIdus = {
    imgloader,
    selectbox,
    numberinput
}

export default uipackIdus;

// uipack global object
function defineUipack() {
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
    uipack.imgloader = imgloader;
    uipack.numberinput = numberinput;
    uipack.selectbox = selectbox;

    return uipack;
}

// define global object
if (typeof (uipack) === 'undefined') window.uipack = defineUipack();

// auto ui init via element attribute
$(document).ready(function () {
    // imgloader
    $('[data-ui="imgloader"]').each(function () {
        uipack.imgloader($(this));
    });

    // selectbox
    $('[data-ui="selectbox"]').each(function () {
        uipack.selectbox($(this));
    });
    uipack.on(INIT_SELECTBOX, function () {
        $('[data-ui="selectbox"]').each(function () {
            uipack.selectbox($(this));
        });
    });

    // numberinput
    $('[data-ui="numberinput"]').each(function () {
        uipack.numberinput($(this));
    });
    uipack.on(INIT_INPUTNUMBER, function () {
        $('[data-ui="numberinput"]').each(function () {
            uipack.numberinput($(this));
        });
    });
});
