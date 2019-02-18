import $ from 'jquery';
import { randomHash } from './util';

export default class Modal {
    constructor(options) {
        this.className = options.className || ''
        this.btnText = options.btnText || '확인';
        this.buttonMod = options.buttonMod || undefined;
        this.callback = options.callback || undefined;
        this.confirmed = false;
        this.href = options.href || undefined; // ok 버튼
        this.href0 = options.href0 || undefined; // 취소 버튼
        this.html = options.html || undefined;
        this.id = options.id || `alert_${randomHash()}`;
        this.message = options.message || undefined;
        this.title = options.title || undefined;
        this.cookie = options.cookie;
        this.markup = this.template();
    }

    template() {
        return `
        <div class="curtain"></div>
        <div id="${this.id}" class="ui_modal ${this.className}" data-ui="alert">
            ${this.title ? `<b class="ui_modal__title">${this.title}</b>` : ''}
            ${this.html ? `<div class="ui_modal__html">${this.html}</div>` : ''}
            ${this.message ? `<p class="ui_modal__message">${this.message}</p>` : ''}
            <div class="ui_modal__btngroup${this.buttonMod}">
                <a href="${this.href0}" class="ui_btn--redline" data-action="close">취소</a>
                <a href="${this.href}" class="ui_btn--red" data-action="confirm">${this.btnText}</a>
            </div>
            ${this.cookie && this.cookie.label ? `<label class="ui_field">
                <input class="ui_field__input" type="checkbox" name="modal_cookie">
                <span class="ui_field__label">${this.cookie.label}</span>
            </label>` : ''}
        </div>`
    }

    close() {
        $(`#${this.id}`).remove();
        $('.curtain').remove();
    }

    show() {
        $('body').prepend(this.markup);
        this.bindEvent();
    }

    bindEvent() {
        $(`#${this.id}`).find('[data-action]').on('click', (event) => {
            if (this.href === undefined) {
                event.preventDefault();
            }

            if ($(event.target).data('action') === 'confirm') {
                this.confirmed = true;

                if (this.callback) {
                    this.callback();
                    return;
                }

                // skip btn close() before redirect
                if (this.href !== undefined) {
                    return;
                }
            }

            if (!this.href0) {
                this.close();
            }
        });
    }
}
