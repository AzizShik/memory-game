import { createElement, createButton } from './utils/DOM.js';

export class GameView {
	constructor(appEl) {
		this.appEl = appEl;
	}

	renderApp() {
		this.appEl.replaceChildren();

		const game = createElement('main', { classArr: ['game'] });

		game.append(this.createStats());

		this.appEl.append(this.createHeader(), game);
	}

	createHeader() {
		const headerEl = createElement('header', { classArr: ['header'] });

		const headerTitle = createElement('h1', {
			classArr: ['header__title'],
			text: 'Memory Game',
		});
		const headerSubtitle = createElement('p', {
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

	createStats() {
		const statsSection = createElement('section', { classArr: ['stats'] });

		const statMovesEl = createElement('div', { classArr: ['stat'] });
		const statPairAmountEl = createElement('div', { classArr: ['stat'] });

		const statSpanLabelEl = createElement('span', {
			classArr: ['stat__span-label'],
			text: 'Ходы:',
		});
		const statSpanValueEl = createElement('span', {
			classArr: ['stat__span-value'],
			text: '0',
			id: 'total-moves-amount',
		});

		statMovesEl.append(statSpanLabelEl, statSpanValueEl);

		const statSpanPairEl = createElement('span', {
			classArr: ['stat__span-label'],
			text: 'Найдено пар:',
		});
		const statSpanPairValueEl = createElement('span', {
			classArr: ['stat__span-value'],
			text: '0 / 8',
			id: 'pairs-amount',
		});

		statPairAmountEl.append(statSpanPairEl, statSpanPairValueEl);

		statsSection.append(statMovesEl, statPairAmountEl);

		return statsSection;
	}
}
