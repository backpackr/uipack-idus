import { Modal, Prompt } from './Modal';

// confirmation modal - two buttons
export const alert = options => new Prompt(options);

// alert modal with one button
export const modal = options => new Modal(options);
