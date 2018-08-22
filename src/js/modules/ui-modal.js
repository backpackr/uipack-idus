import Modal from './Modal';

// confirmation modal - two buttons
export const modalConfirm = options => new Modal(options);

// alert modal with one button
export const modalAlert = options => new Modal(Object.assign({
    buttonMod: '--single'
}, options));
