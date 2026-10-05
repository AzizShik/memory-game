import { createElement, createButton } from './utils/DOM.js';

export class GameView {
	constructor(appEl) {
		this.appEl = appEl;
	}

	renderApp() {
		const gameDiv = createElement('div', { classArr: ['game'] });

		this.appEl.replaceChildren();

		this.appEl.append(this.createHeader(), gameDiv);
	}

	createHeader() {
		const headerEl = createElement('header', { classArr: ['header'] });

		const headerTitle = createElement('h1', {
			classArr: ['header__title'],
			text: 'Memory Game',
		});
		const headerSubtitle = createElement('h2', {
			classArr: ['header__subtitle'],
			text: 'Найдите все пары за минимальное число ходов',
		});

		const headerInfo = createElement('div', {
			classArr: ['header__info'],
			children: [headerTitle, headerSubtitle],
		});

		const headerNewGameBtn = createButton({
			text: 'Новая Игра',
			classArr: ['header__actions-btn', 'button', 'button--primary'],
		});
		const headerLeaderboardBtn = createButton({
			text: 'Таблица лидеров',
			classArr: ['header__actions-btn', 'button'],
		});

		const headerActions = createElement('div', {
			classArr: ['header__actions'],
			children: [headerNewGameBtn, headerLeaderboardBtn],
		});

		headerEl.append(headerInfo, headerActions);

		return headerEl;
	}
}
