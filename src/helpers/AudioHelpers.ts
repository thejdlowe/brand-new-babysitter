// @ts-ignore
const RV = window.responsiveVoice;
export const Helpers = (logger: (str: string) => void) => {
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
	const ResponsiveVoice = (msg: string) => {
		return new Promise((resolve) => {
			logger(`RV: ${msg}`);
			RV.speak(msg, "UK English Female", { rate: 0.9, onend: resolve });
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

	return {
		sleep,
		ResponsiveVoice,
		PlayAudio,
	};
};
