const STORAGE_KEY = 'memory-game-scores';
const MAX_SCORES = 10;

export class ScoreStorage {
	getScores() {
		const scores = this.read();

		return scores
			.slice()
			.sort((a, b) => a.moves - b.moves || a.playedAt - b.playedAt)
			.slice(0, MAX_SCORES);
	}

	addScore(moves) {
		const scores = this.read();

		scores.push({ moves, playedAt: Date.now() });

		const top = scores
			.slice()
			.sort((a, b) => a.moves - b.moves || a.playedAt - b.playedAt)
			.slice(0, MAX_SCORES);

		this.write(top);

		return top;
	}

	read() {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);

			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	}

	write(scores) {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
		} catch {
			console.warn('Хранилище недоступно')
		}
	}
}

export function formatDate(timestamp) {
	const date = new Date(timestamp);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');

	return `${day}.${month}.${date.getFullYear()}`;
}