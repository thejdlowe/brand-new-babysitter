import { startItOff } from "../data/prompts";
import { intros } from "../data/intros";

export const GetStartingPrompt = (): string => {
	return getRandomFromArrPrompts(startItOff);
};

export const GetStartingIntro = (): string => {
	return getRandomFromArrPrompts(intros);
};

export const getRandomFromArrPrompts = (arr: string[]) => {
	let ret = arr[Math.floor(Math.random() * arr.length)];

	return ret;
};
