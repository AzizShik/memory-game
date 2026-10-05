import { createDeck } from './data.js';
import { createElement, createButton } from './utils/DOM.js';

export class GameView {
	constructor(appEl) {
		this.appEl = appEl;
		this.deck = null;
	}

	renderApp() {
		this.appEl.replaceChildren();

		this.deck = createDeck();

		const game = createElement('main', { classArr: ['game'] });

		game.append(this.createStats(), this.createBoard(), this.createGameHint());

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

	createBoard() {
		const boardEl = createElement('div', { classArr: ['board'] });

		console.log(this.deck);

		this.deck.forEach(item => {
			console.log(item.icon);
			boardEl.append(this.createCard(item.icon, item.id));
		});

		return boardEl;
	}

	createCard(icon, dataId) {
		const cardEl = createButton({
			classArr: ['card'],
			attrs: { 'data-id': dataId },
		});

		const cardInner = createElement('div', { classArr: ['card__inner'] });

		const cardSideFront = createElement('div', {
			classArr: ['card__side', 'card__side--front'],
		});

		const cardSideFrontCover = createElement('span', {
			classArr: ['card__side-cover'],
			parent: cardSideFront,
		});

		const cardSideBack = createElement('div', {
			classArr: ['card__side', 'card__side--back'],
			text: icon,
		});

		cardInner.append(cardSideFront, cardSideBack);

		cardEl.append(cardInner);

		return cardEl;
	}

	createGameHint() {
		const gameHint = createElement('p', {
			classArr: ['game__hint'],
			text: 'Открывайте по две карточки и ищите одинаковые изображения. Несовпавшая пара остаётся открытой около секунды.',
		});

		return gameHint;
	}
}
