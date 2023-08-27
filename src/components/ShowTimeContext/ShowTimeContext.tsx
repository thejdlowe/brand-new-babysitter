import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
} from "react";
import { useBabySitterContext } from "../BabySitterContext";
import { ResponsiveVoice } from "../../helpers";

export interface ShowTimeContextProviderProps {
	children?: React.ReactNode | React.ReactNode[];
	activePlayers: string[];
	hasShowStarted: boolean;
}

interface ShowTimeContextValues {
	/*overallShowTimer: number;
	individualTimer: number;
	setOverallShowTimer: React.Dispatch<React.SetStateAction<number>>;
	setIndividualTimer: React.Dispatch<React.SetStateAction<number>>;*/
	StartTheShow: () => void;
	EndTheShow: () => void;
	overallShowTimer: number;
	/*
	showLengthInMinutes: number;
	hasShowStarted: boolean;
	currentTab: number;
	gapRanges: number[];
	updatePlayer: (player: string) => void;
	addPlayer: (player: string) => void;
	setShowLength: (length: number) => void;
	setShowStarted: () => void;
	handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
	handleGapRangeChange: (event: Event, newValue: number | number[]) => void;
	deletePlayer: (player?: string) => void;
	confirm: (msg: string, func: () => void) => void;
	StartTheShow: () => void;
	EndTheShow: () => void;*/
}

const ShowTimeContext = createContext<ShowTimeContextValues>({
	StartTheShow: () => {},
	EndTheShow: () => {},
	overallShowTimer: -1,
});

export const ShowTimeContextProvider: React.FC<
	ShowTimeContextProviderProps
> = ({
	children,
	activePlayers,

	hasShowStarted,
}) => {
	const { setShowStarted, showLengthInMinutes } = useBabySitterContext();
	const [overallShowTimer, setOverallShowTimer] = useState<number>(-1);
	const [individualTimer, setIndividualTimer] = useState<number>(-1);
	const [localHasShowStart, setLocalHasShowStart] = useState<boolean>(false);
	const timerHandle = useRef<number>(0);

	useEffect(() => {
		if (!localHasShowStart) setShowStarted();
	}, [localHasShowStart]);

	useEffect(() => {
		if (hasShowStarted === true) {
			const id = window.setInterval(async () => {
				setOverallShowTimer((prev) => {
					//console.log(prev - 1);
					if (prev - 1 <= 0) {
						EndTheShow();
					} else {
						RunTheShow();
					}
					return prev - 1;
				});
			}, 1000);
			timerHandle.current = id;
		}
		return () => {
			clearInterval(timerHandle.current);
		};
	}, [hasShowStarted, timerHandle]);

	//console.log({ activePlayers });

	const StartTheShow = useCallback(async () => {
		await ResponsiveVoice("Whoa what");
		await ResponsiveVoice("Does this work?");
		setShowStarted();
		setLocalHasShowStart(true);
		setOverallShowTimer(showLengthInMinutes * 60);
	}, []);

	const RunTheShow = useCallback(() => {}, []);

	const EndTheShow = useCallback(() => {
		clearInterval(timerHandle.current);
		setLocalHasShowStart(false);
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
