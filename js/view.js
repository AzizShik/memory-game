import { TOTAL_PAIRS } from './data.js';
import { Modal } from './modal.js';
import { createElement, createButton } from './utils/DOM.js';
import { formatDate } from './utils/storage.js';

export class GameView {
	constructor(appEl) {
		this.appEl = appEl;
		this.movesEl = null;
		this.pairsEl = null;
		this.modal = new Modal();
		this.onNewGame = null;
		this.onLeaderboard = null;
	}

	setHandlers({ onNewGame, onLeaderboard }) {
		this.onNewGame = onNewGame;
		this.onLeaderboard = onLeaderboard;
	}

	renderApp(deck, onCardClick) {
		this.appEl.replaceChildren();

		const game = createElement('main', { classArr: ['game'] });

		game.append(
			this.createStats(),
			this.createBoard(deck, onCardClick),
			this.createGameHint(),
		);

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

		headerNewGameBtn.addEventListener('click', () => this.onNewGame?.());
		headerLeaderboardBtn.addEventListener('click', () =>
			this.onLeaderboard?.(),
		);

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
		});

		statMovesEl.append(statSpanLabelEl, statSpanValueEl);

		this.movesEl = statSpanValueEl;

		const statSpanPairEl = createElement('span', {
			classArr: ['stat__span-label'],
			text: 'Найдено пар:',
		});
		const statSpanPairValueEl = createElement('span', {
			classArr: ['stat__span-value'],
			text: `0 / ${TOTAL_PAIRS}`,
		});

		statPairAmountEl.append(statSpanPairEl, statSpanPairValueEl);

		this.pairsEl = statSpanPairValueEl;

		statsSection.append(statMovesEl, statPairAmountEl);

		return statsSection;
	}

	createBoard(deck, onCardClick) {
		const boardEl = createElement('div', { classArr: ['board'] });

		deck.forEach(item => {
			boardEl.append(this.createCard(item.icon, item.id));
		});

		boardEl.addEventListener('click', onCardClick);

		return boardEl;
	}

	updateStats({ moves, pairs }) {
		this.movesEl.textContent = `${moves}`;
		this.pairsEl.textContent = `${pairs} / ${TOTAL_PAIRS}`;
	}

	openCard(cardEl) {
		cardEl.classList.add('is-open');
	}

	closeCard(cardEl) {
		cardEl.classList.remove('is-open');
	}

	markMatched(cardEl) {
		cardEl.classList.add('is-matched');
	}

	closeAllCards() {
		this.appEl.querySelectorAll('.card').forEach(cardEl => {
			cardEl.classList.remove('is-open', 'is-matched');
		});
	}

	openLeaderboardModal(scores) {
		const title = createElement('h2', {
			classArr: ['modal__title'],
			text: 'Таблица лидеров',
		});

		const body = scores.length
			? this.createScoresTable(scores)
			: createElement('p', {
					classArr: ['modal__text'],
					text: 'Пока нет результатов',
				});

		const closeBtn = createButton({
			text: 'Закрыть',
			classArr: ['modal__action', 'button'],
		});

		closeBtn.addEventListener('click', () => this.modal.close());

		const actions = createElement('div', {
			classArr: ['modal__actions'],
			children: [closeBtn],
		});

		this.modal.open(
			createElement('div', {
				classArr: ['modal__content'],
				children: [title, body, actions],
			}),
		);
	}

	createScoresTable(scores) {
		const table = createElement('table', { classArr: ['scores'] });

		const head = createElement('tr', { classArr: ['scores__row'] });

		['Место', 'Ходы', 'Дата'].forEach(title => {
			head.append(
				createElement('th', {
					classArr: ['scores__cell', 'scores__cell--head'],
					text: title,
				}),
			);
		});

		table.append(head);

		scores.forEach((score, index) => {
			const row = createElement('tr', { classArr: ['scores__row'] });

			[
				`${index + 1}`,
				`${score.moves}`,
				formatDate(score.playedAt),
			].forEach(value => {
				row.append(
					createElement('td', {
						classArr: ['scores__cell'],
						text: value,
					}),
				);
			});

			table.append(row);
		});

		return createElement('div', { classArr: ['scores__wrapper'], children: [table] });
	}

	openWinModal({ moves }) {
		const title = createElement('h2', {
			classArr: ['modal__title'],
			text: 'Победа!',
		});

		const text = createElement('p', {
			classArr: ['modal__text'],
			text: `Число ходов: ${moves}`,
		});

		const newGameBtn = createButton({
			text: 'Новая игра',
			classArr: ['modal__action', 'button', 'button--primary'],
		});

		newGameBtn.addEventListener('click', () => {
			this.modal.close();
			this.onNewGame?.();
		});

		const closeBtn = createButton({
			text: 'Закрыть',
			classArr: ['modal__action', 'button'],
		});

		closeBtn.addEventListener('click', () => this.modal.close());

		const actions = createElement('div', {
			classArr: ['modal__actions'],
			children: [newGameBtn, closeBtn],
		});

		this.modal.open(
			createElement('div', {
				classArr: ['modal__content'],
				children: [title, text, actions],
			}),
		);
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
