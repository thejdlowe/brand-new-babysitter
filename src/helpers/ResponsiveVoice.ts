// @ts-ignore
const RV = window.responsiveVoice;
export const ResponsiveVoice = (msg: string) => {
	return new Promise((resolve, reject) => {
		RV.speak(msg, "UK English Female", { onend: resolve });
	});
};
