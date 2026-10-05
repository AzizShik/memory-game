const CARD_TIMEOUT = 1000;

export class GameController {
	constructor(state, view, storage) {
		this.state = state;
		this.view = view;
		this.storage = storage;
	}

	onCardClick(event) {
		const card = event.target.closest('.card');

		if (!card) return;

		if (this.state.isLocked || this.state.isGameOver) return;

		if (card.classList.contains('is-open') || card.classList.contains('is-matched')) {
			return;
		}

		if (card === this.state.firstCard) return;

		this.view.openCard(card);

		if (!this.state.firstCard) {
			this.state.setFirstCard(card);

			return;
		}

		this.state.setSecondCard(card);
		this.state.incrementMoves();
		this.view.updateStats(this.state);

		if (this.state.isMatch(this.state.firstCard, this.state.secondCard)) {
			this.handleMatch();
		} else {
			this.handleMismatch();
		}
	}

	handleMatch() {
		this.state.incrementPairs();

		this.view.markMatched(this.state.firstCard);
		this.view.markMatched(this.state.secondCard);
		this.view.updateStats(this.state);
		this.state.clearPair();

		if (this.state.isPairFound()) {
			this.state.isGameOver = true;
			this.storage.addScore(this.state.moves);
			this.view.openWinModal({ moves: this.state.moves });
		}
	}

	onNewGame() {
		this.state.reset();
		this.view.renderApp(this.state.deck, this.onCardClick.bind(this));
	}

	onLeaderboard() {
		this.view.openLeaderboardModal(this.storage.getScores());
	}

	handleMismatch() {
		this.state.lock();

		const firstCard = this.state.firstCard;
		const secondCard = this.state.secondCard;

		this.state.setTimer(
			setTimeout(() => {
				this.view.closeCard(firstCard);
				this.view.closeCard(secondCard);
				this.state.clearPair();
				this.state.clearTimer();
				this.state.unlock();
			}, CARD_TIMEOUT),
		);
	}
}