import { startupSounds } from "../data/sounds";
import { getRandomFromArrPrompts } from "./PromptHelpers";

//may need to use something akin to https://github.com/MikeyParton/react-speech-kit/tree/master

export const Helpers = (logger: (str: string) => void) => {
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
	const ResponsiveVoice = (msg: string) => {
		return new Promise((resolve) => {
			logger(`RV: ${msg}`);
			//RV.speak(msg, "UK English Female", { rate: 0.9, onend: resolve });
			const utterance = new window.SpeechSynthesisUtterance();
			utterance.text = msg;
			utterance.onend = resolve;
			window.speechSynthesis.speak(utterance);
		});
	};

	const PlayAudio = (filename: string) => {
		return new Promise((resolve) => {
			let audio = new Audio(filename);
			logger(`Audio: ${filename}`);
			audio.onended = resolve;
			audio.play();
		});
	};

	const GetStartingAudio = () => {
		const audio = getRandomFromArrPrompts(startupSounds);
		return audio;
	};

	return {
		sleep,
		ResponsiveVoice,
		PlayAudio,
		GetStartingAudio,
	};
};
