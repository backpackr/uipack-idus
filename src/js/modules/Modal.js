import $ from 'jquery';
import { randomHash } from './util';

class Modal {
    constructor(options) {
        this.btnText = options.btnText || '확인';
        this.buttonMod = options.buttonMod || undefined;
        this.callback = options.callback || undefined;
        this.confirmed = false;
        this.href = options.href || undefined; // ok 버튼
        this.href0 = options.href0 || undefined; // 취소 버튼
        this.html = options.html || undefined;
        this.id = options.id || 'alert_' + randomHash();
        this.message = options.message || undefined;
        this.title = options.title || undefined;
        this.template = `
        <div class="curtain"></div>
        <div id="${this.id}" class="modal" data-ui="alert">
            ${this.title ? `<b class="modal__title">${this.title}</b>` : ''}
            ${this.html ? `<div class="modal__html">${this.html}</div>` : ''}
            ${this.message ? `<p class="modal__message">${this.message}</p>` : ''}
            <div class="modal__btngroup${this.buttonMod}">
                <a href="${this.href0}" class="nbtn-redline--large" data-action="close">취소</a>
                <a href="${this.href}" class="nbtn-red--large" data-action="confirm">${this.btnText}</a>
            </div>
        </div>`
    }

    close() {
        $('#' + this.id).remove();
        $('.curtain').remove();
    }

    show() {
        $('body').prepend(this.template);
        this.bindEvent();
    }

    bindEvent() {
        const _this = this;

        $('#' + _this.id).find('[data-action]').on('click', function (event) {
            if (_this.href === undefined) {
                event.preventDefault();
            }

            if ($(this).data('action') === 'confirm') {
                _this.confirmed = true;

                if (_this.callback) {
                    _this.callback();
                    return;
                }

                // skip btn close() before redirect
                if (_this.href !== undefined) {
                    return;
                }
            }

            if (!_this.href0) {
                _this.close();
            }
        });
    }
}

export default Modal;