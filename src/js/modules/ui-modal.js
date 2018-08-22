import Modal from './Modal';

// confirmation modal - two buttons
export const confirm = options => new Modal(options).show();

// alert modal with one button
export const alert = options => new Modal(Object.assign({
    buttonMod: '--single'
}, options)).show();
