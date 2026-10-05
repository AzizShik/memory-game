export const CARD_SET = [
	{ id: 'grin', icon: '😀' },
	{ id: 'cool', icon: '😎' },
	{ id: 'star', icon: '🤩' },
	{ id: 'heart', icon: '😍' },
	{ id: 'party', icon: '🥳' },
	{ id: 'think', icon: '🤔' },
	{ id: 'sleep', icon: '😴' },
	{ id: 'explode', icon: '🤯' },
];

export function createDeck() {
	const deck = [...CARD_SET, ...CARD_SET];

	return shuffleArray(deck);
}

export function shuffleArray(array) {
	const arr = [...array];

	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}
