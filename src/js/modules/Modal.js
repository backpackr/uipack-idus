import $ from 'jquery';
import uiCookie from './uiCookie';
import { randomHash } from './util';

export class Prompt {
    constructor(options) {
        this.cookies = options.cookies;
        this.hideCurtain = options.hideCurtain;
        this.className = options.className || '';
        this.modifier = options.modifier || '';
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
        this.markup = this.template();
    }

    template() {
        return `
        <div class="curtain"></div>
        <div id="${this.id}" class="ui_prompt${this.modifier} ${this.className}">
            ${this.title ? `<b class="ui_prompt__title">${this.title}</b>` : ''}
            ${this.html ? `<div class="ui_prompt__html">${this.html}</div>` : ''}
            ${this.message ? `<p class="ui_prompt__message">${this.message}</p>` : ''}
            <div class="ui_prompt__btngroup${this.buttonMod}">
                <a href="${this.href0}" class="ui_btn--redline" data-action="close">취소</a>
                <a href="${this.href}" class="ui_btn--red" data-action="confirm">${this.btnText}</a>
            </div>
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
                    this.close();
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

export class Modal extends Prompt {
    close() {
        this.cookies.forEach(cookie => {
            const checked = $(`input[name="${cookie.name}"]`).is(':checked');
            if (checked) {
                uiCookie.set(cookie.name, cookie.value || 'hide_alert', cookie.days)
            }
        });

        $(`#${this.id}`).remove();
        $('.curtain').remove();
    }

    show() {
        if (this.cookies) {
            let exit = false;

            this.cookies.forEach(cookie => {
                if (uiCookie.get(cookie.name).length) exit = true;
            });

            if (exit) return;
        }

        $('body').prepend(this.markup);
        this.bindEvent();
    }

    inputTemplate() {
        let template = '';

        this.cookies.forEach(cookie => {
            template +=
                `<label class="ui_field">
                    <input class="ui_field__input" type="checkbox" name="${cookie.name}">
                    <span class="ui_field__label">${cookie.label}</span>
                </label>`
        });

        return template;
    }

    template() {
        return `
        <div class="curtain"></div>
        <div id="${this.id}" class="ui_modal${this.modifier} ${this.className}">
            <button class="ui_modal__crossbtn" type="button" data-action="close">&times;</button>
            ${this.title ? `<b class="ui_modal__title">${this.title}</b>` : ''}
            ${this.html ? `<div class="ui_modal__html">${this.html}</div>` : ''}
            ${this.message ? `<p class="ui_modal__message">${this.message}</p>` : ''}
            ${this.cookies ? `<fieldset class="ui_modal__fieldset">${this.inputTemplate()}</fieldset>` : ''}
        </div>`
    }
};