import { createElement } from './utils/DOM.js';

console.log('Start :)');
const bodyEl = document.body;

const appElement = createElement('div', { classArr: ['app'], id: 'app' });

bodyEl.append(appElement);
