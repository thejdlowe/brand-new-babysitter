import {
	startItOff,
	prompts,
	emotions,
	styles,
	timeWarps,
	timeWarpsPastOrFuture,
} from "../data/prompts";
import { intros } from "../data/intros";

export const GetStartingPrompt = (): string => {
	let prompt = getRandomFromArrPrompts(startItOff);
	return FormatPrompt(prompt);
};

export const GetStartingIntro = (): string => {
	return getRandomFromArrPrompts(intros);
};

const FormatPrompt = (prompt: string): string => {
	const emote = getRandomFromArrPrompts(emotions);
	const style = getRandomFromArrPrompts(styles);
	const timeWarp = getRandomFromArrPrompts(timeWarps);
	const timeWarpPOF = getRandomFromArrPrompts(timeWarpsPastOrFuture);
	const alph = getRandomFromArrPrompts("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
	return prompt
		.split("$alph")
		.join(alph)
		.split("$style")
		.join(style)
		.split("$emotion")
		.join(emote)
		.split("$timeWarp")
		.join(timeWarp)
		.split("$pastOrFuture")
		.join(timeWarpPOF);
};

export const GetRandomPrompt = (): string => {
	let prompt = getRandomFromArrPrompts(prompts);
	return FormatPrompt(prompt);
};

export const getRandomFromArrPrompts = (arr: string[]) => {
	let ret = arr[Math.floor(Math.random() * arr.length)];

	return ret;
};
