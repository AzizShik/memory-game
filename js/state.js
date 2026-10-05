import { TOTAL_PAIRS, createDeck } from './data.js';

export class GameState {
	constructor() {
		this.totalPairs = TOTAL_PAIRS;
		this.deck = createDeck();
		this.moves = 0;
		this.pairs = 0;
		this.firstCard = null;
		this.secondCard = null;
		this.isLocked = false;
		this.timerId = null;
		this.isGameOver = false;
	}

	reset() {
		this.clearTimer();
		this.deck = createDeck();
		this.moves = 0;
		this.pairs = 0;
		this.firstCard = null;
		this.secondCard = null;
		this.isLocked = false;
		this.isGameOver = false;
	}

	incrementMoves() {
		this.moves++;
	}

	incrementPairs() {
		this.pairs++;
	}

	setFirstCard(first) {
		this.firstCard = first;
	}

	setSecondCard(second) {
		this.secondCard = second;
	}

	clearPair() {
		this.firstCard = null;
		this.secondCard = null;
	}

	lock() {
		this.isLocked = true;
	}

	unlock() {
		this.isLocked = false;
	}

	setTimer(timerId) {
		this.timerId = timerId;
	}

	clearTimer() {
		clearTimeout(this.timerId);
		this.timerId = null;
	}

	isMatch(firstCard, secondCard) {
		return firstCard.dataset.id === secondCard.dataset.id;
	}

	isPairFound() {
		return this.pairs === this.totalPairs;
	}
}
