import imgLoader from './modules/ui-imgloader';
import numberinput from './modules/ui-numberinput';

// style
import '../style/uipack';

// uipack global object
function defineUipack() {
    const uipack = window.uipack || {};

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
    uipack.imgLoader = imgLoader;
    uipack.numberinput = numberinput;

    return uipack;
}

// globals
if (typeof (uipack) === 'undefined') window.uipack = defineUipack();