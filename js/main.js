import { createElement } from './utils/DOM.js';
import { GameView } from './view.js';

console.log('Start :)');
const bodyEl = document.body;

const appElement = createElement('div', { classArr: ['app'], id: 'app' });

bodyEl.append(appElement);

const gameView = new GameView(appElement);

gameView.renderApp();
