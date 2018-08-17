import '../style/uipack';
import $ from 'jquery';
import imgLoader from './modules/ui-imgloader';

$.fn.imgLoader = imgLoader;

$('[data-ui="imgloader"]').loader();
