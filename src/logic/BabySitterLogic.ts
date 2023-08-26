import React, { useState, useCallback } from "react";
import { useBabySitterContext } from "../components";

let timerHandle: any;

interface BabySitterLogicProps {
	activePlayers: string[];
	showLengthInMinutes: number;
	gapRanges: number[];
	setHasShowStarted: () => void;
}

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

/*
activePlayers,
			showLengthInMinutes,
			gapRanges,
			setHasShowStarted,
*/

export const BabySitterLogic = ({
	activePlayers,
	showLengthInMinutes,
	gapRanges,
	setHasShowStarted,
}: BabySitterLogicProps) => {
	const [overallShowTimer, setOverallShowTimer] = useState<number>(-1);
	const [individualTimer, setIndividualTimer] = useState<number>(-1);
	const StartTheShow = useCallback(() => {
		setHasShowStarted();
		setOverallShowTimer(showLengthInMinutes * 60);
		setIndividualTimer(randomIntFromInterval(gapRanges));
		timerHandle = setInterval(RunTheShow, 1000);
	}, []);

	const RunTheShow = useCallback(() => {
		console.log(overallShowTimer);
		setOverallShowTimer((prev) => --prev);
		setIndividualTimer((prev) => --prev);
		/*console.log({ overallShowTimer: getOverallShowTimer() });
		if (getOverallShowTimer() <= 0) {
			return EndTheShow();
		}
        */
		if (overallShowTimer <= 0) {
			return EndTheShow();
		}
	}, []);

	const EndTheShow = useCallback(() => {
		clearInterval(timerHandle);
		setOverallShowTimer(-1);
		setIndividualTimer(-1);
		setHasShowStarted();
	}, []);

	return {
		StartTheShow,
		RunTheShow,
		EndTheShow,
	};
};
