import { shuffleArray } from './utils/shuffleArray.js';

export const TOTAL_PAIRS = 8;

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
