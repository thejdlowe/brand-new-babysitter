let overallShowTimer = -1;
let individualTimer = -1;
let timerHandle: any;

interface BabySitterLogicProps {
	activePlayers: string[];
	showLengthInMinutes: number;
	gapRanges: number[];
	setHasShowStarted: () => void;
}

//from https://stackoverflow.com/questions/31337370/how-to-convert-seconds-to-hhmmss-in-moment-js
const pad = (num: number) => {
	return ("0" + num).slice(-2);
};
const hhmmss = (secs: number) => {
	if (secs === Infinity) return `∞∞:∞∞`;
	var minutes = Math.floor(secs / 60);
	secs = secs % 60;
	var hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	return `${pad(minutes)}:${pad(secs)}`;
	// return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
};

//from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const randomIntFromInterval = (gapRanges: number[]) => {
	const gaps = gapRanges.sort((a, b) => a - b);
	const min = gaps[0];
	const max = gaps[1];
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFromArr = (arr: any[]) => {
	return arr[Math.floor(Math.random() * arr.length)];
};

export const BabySitterLogic = ({
	activePlayers,
	showLengthInMinutes,
	gapRanges,
	setHasShowStarted,
}: BabySitterLogicProps) => {
	const StartTheShow = () => {
		console.log("Fart", {
			activePlayers,
			showLengthInMinutes,
			gapRanges,
			setHasShowStarted,
		});
		setHasShowStarted();
		overallShowTimer = showLengthInMinutes * 60;
		individualTimer = randomIntFromInterval(gapRanges);
		timerHandle = setInterval(RunTheShow, 1000);
	};

	const RunTheShow = () => {
		overallShowTimer--;
		individualTimer--;
		if (overallShowTimer <= 0) {
			return EndTheShow();
		}
	};

	const EndTheShow = () => {
		clearInterval(timerHandle);
		overallShowTimer = -1;
		individualTimer = -1;
		setHasShowStarted();
	};

	return {
		StartTheShow,
		RunTheShow,
		EndTheShow,
		overallShowTimer,
		individualTimer,
	};
};
