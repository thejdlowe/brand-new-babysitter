import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
} from "react";
import { useImprovBotContext } from "../ImprovBotContext";
import {
	Helpers,
	GetStartingIntro,
	GetStartingPrompt,
	GetRandomPrompt,
} from "../../helpers";
import { startupSounds } from "../../data/sounds";

export interface ShowTimeContextProviderProps {
	children?: React.ReactNode | React.ReactNode[];
	activePlayers: string[];
	hasShowStarted: boolean;
}

interface ShowTimeContextValues {
	StartTheShow: () => void;
	EndTheShow: () => void;
	overallShowTimer: number;
	individualTimer: number;
}

const ShowTimeContext = createContext<ShowTimeContextValues>({
	StartTheShow: () => {},
	EndTheShow: () => {},
	overallShowTimer: -1,
	individualTimer: -1,
});

const randomIntFromInterval = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const ShowTimeContextProvider: React.FC<
	ShowTimeContextProviderProps
> = ({ children, activePlayers, hasShowStarted }) => {
	const { setShowStarted, showLengthInMinutes, gapRanges, addToLog } =
		useImprovBotContext();
	const [overallShowTimer, setOverallShowTimer] = useState<number>(-1);
	const [individualTimer, setIndividualTimer] = useState<number>(-1);
	const [localHasShowStart, setLocalHasShowStart] = useState<boolean>(false);
	const [canImprov, setCanImprov] = useState<boolean>(false);
	const timerHandle = useRef<number>(0);
	const { ResponsiveVoice, PlayAudio, sleep, GetStartingAudio } =
		Helpers(addToLog);
	const [runRunTheShow, setRunRunTheShow] = useState<boolean>(false);

	useEffect(() => {
		if (!localHasShowStart) setShowStarted();
	}, [localHasShowStart]);

	useEffect(() => {
		if (runRunTheShow === true) {
			RunTheShow();
		}
	}, [runRunTheShow]);

	useEffect(() => {
		if (hasShowStarted === true) {
			const id = window.setInterval(async () => {
				setOverallShowTimer((prev) => {
					if (prev - 1 <= 0) {
						EndTheShow();
					}
					return prev - 1;
				});
				if (canImprov) {
					setIndividualTimer((prev) => {
						if (prev - 1 == 0) {
							setRunRunTheShow(true);
						}
						return prev - 1;
					});
				}
			}, 1000);
			timerHandle.current = id;
		}
		return () => {
			clearInterval(timerHandle.current);
		};
	}, [hasShowStarted, timerHandle, canImprov]);

	//console.log({ activePlayers });

	const StartTheShow = useCallback(async () => {
		setShowStarted();
		setLocalHasShowStart(true);
		setOverallShowTimer(showLengthInMinutes * 60);

		setIndividualTimer(randomIntFromInterval(gapRanges[0], gapRanges[1]));

		await PlayAudio(GetStartingAudio());
		await ResponsiveVoice(GetStartingIntro());
		await ResponsiveVoice(
			"This is a program designed to interrupt improv scenes randomly and make changes. None of this is pre-written."
		);
		await ResponsiveVoice(`Let's start this off: ${GetStartingPrompt()}`);

		setCanImprov(true);
	}, [showLengthInMinutes, gapRanges]);

	const RunTheShow = useCallback(async () => {
		setIndividualTimer(randomIntFromInterval(gapRanges[0], gapRanges[1]));
		setCanImprov(false);

		//await ResponsiveVoice("Butt fart");

		await ResponsiveVoice(GetRandomPrompt());

		setCanImprov(true);
		setRunRunTheShow(false);
	}, [gapRanges, setIndividualTimer, setCanImprov]);

	const EndTheShow = useCallback(async () => {
		setCanImprov(false);
		clearInterval(timerHandle.current);
		setLocalHasShowStart(false);
		await ResponsiveVoice(
			"Show's over folks; you don't have to go home, but you can't stay here."
		);
		setOverallShowTimer(-1);
		setIndividualTimer(-1);
	}, [setShowStarted]);

	const everythingObject = {
		overallShowTimer,
		setOverallShowTimer,
		individualTimer,
		setIndividualTimer,
		StartTheShow,
		EndTheShow,
	};
	return (
		<ShowTimeContext.Provider value={everythingObject}>
			{children}
		</ShowTimeContext.Provider>
	);
};

export const useShowTimeContext = () => {
	const value = useContext(ShowTimeContext);
	return value;
};
