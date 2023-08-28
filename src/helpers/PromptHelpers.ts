import { startItOff, prompts, emotions, styles } from "../data/prompts";
import { intros } from "../data/intros";

export const GetStartingPrompt = (): string => {
	return getRandomFromArrPrompts(startItOff);
};

export const GetStartingIntro = (): string => {
	return getRandomFromArrPrompts(intros);
};

export const GetRandomPrompt = (): string => {
	let prompt = getRandomFromArrPrompts(prompts);
	let emote = getRandomFromArrPrompts(emotions);
	let style = getRandomFromArrPrompts(styles);
	return prompt.split("$style").join(style).split("$emotion").join(emote);
};

export const getRandomFromArrPrompts = (arr: string[]) => {
	let ret = arr[Math.floor(Math.random() * arr.length)];

	return ret;
};
