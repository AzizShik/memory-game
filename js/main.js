import { GameState } from './state.js';
import { createElement } from './utils/DOM.js';
import { GameView } from './view.js';

const bodyEl = document.body;

const appElement = createElement('div', { classArr: ['app'], id: 'app' });

bodyEl.append(appElement);

const gameState = new GameState();
const gameView = new GameView(appElement);

gameView.renderApp(gameState.deck);
