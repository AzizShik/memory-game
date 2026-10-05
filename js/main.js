import { GameController } from './controller.js';
import { GameState } from './state.js';
import { createElement } from './utils/DOM.js';
import { ScoreStorage } from './utils/storage.js';
import { GameView } from './view.js';

const bodyEl = document.body;

const appElement = createElement('div', { classArr: ['app'], id: 'app' });

bodyEl.append(appElement);

const gameState = new GameState();
const gameView = new GameView(appElement);

const gameStorage = new ScoreStorage();
const gameController = new GameController(gameState, gameView, gameStorage);

gameView.setHandlers({
	onNewGame: gameController.onNewGame.bind(gameController),
	onLeaderboard: gameController.onLeaderboard.bind(gameController),
});

gameView.renderApp(
	gameState.deck,
	gameController.onCardClick.bind(gameController),
);
