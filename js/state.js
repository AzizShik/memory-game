import { createDeck, shuffleArray } from './data.js';

export class GameState {
	constructor() {
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
		clearTimeout(this.timerId);
		this.deck = createDeck();
		this.moves = 0;
		this.pairs = 0;
		this.firstCard = null;
		this.secondCard = null;
		this.isLocked = false;
		this.timerId = null;
		this.isGameOver = false;
	}

	// incrementMoves(), incrementPairs(), setPair(first, second), clearPair()
}
