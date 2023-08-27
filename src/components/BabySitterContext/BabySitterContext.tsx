import React, { createContext, useContext, useState, useEffect } from "react";
import { playersList } from "../../data/players";
import { Credits } from "../Credits";
import { ShowTimeContextProvider } from "../ShowTimeContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

export interface BabySitterContextProviderProps {
	children?: React.ReactNode | React.ReactNode[];
	anyAdditionalFunctions?: () => void | undefined;
}
type BabySitterPlayer = Record<string, boolean>;
interface BabySitterContextValues {
	players: BabySitterPlayer;
	activePlayers: string[];
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
}

const BabySitterContext = createContext<BabySitterContextValues>({
	players: {},
	activePlayers: [],
	showLengthInMinutes: 20,
	hasShowStarted: false,
	currentTab: 0,
	gapRanges: [30, 120],
	updatePlayer: () => {},
	addPlayer: () => {},
	setShowLength: () => {},
	setShowStarted: () => {},
	handleTabChange: () => {},
	handleGapRangeChange: () => {},
	deletePlayer: () => {},
	confirm: () => {},
});
export const BabySitterContextProvider: React.FC<
	BabySitterContextProviderProps
> = ({ children, anyAdditionalFunctions }) => {
	const [playersAll, setActivePlayer] = useState({});
	const [activePlayers, setListOfPlayers] = useState<string[]>([]);
	const [showLengthInMinutes, setShowLength] = useState<number>(20);

	const [hasShowStarted, setShowStartedVariable] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState<number>(0);
	const [logs, setLogs] = useState<string[]>([]);
	const [gapRanges, setGapRanges] = useState<number[]>([30, 120]);

	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [alertMsg, setAlertMsg] = useState<string>("");
	const [alertFunc, setAlertFunc] = useState<() => void>(() => {});

	const [popupType, setPopupType] = useState<
		"confirm" | "prompt" | undefined
	>();

	const confirm = (msg: string, func: () => void) => {
		setPopupType("confirm");
		setAlertMsg(msg);
		setAlertFunc(() => func);
		setShowPopup(true);
	};

	const closeConfirm = () => {
		setPopupType(undefined);
		setAlertMsg("");
		setAlertFunc(() => () => {});
		setShowPopup(false);
	};

	const addPlayer = (player: string) => {
		setActivePlayer((prevState) => {
			const state: BabySitterPlayer = { ...prevState };
			state[`${player}`] = true;
			return state;
		});
	};

	const deletePlayer = (player?: string) => {
		if (player) {
			setActivePlayer((prevState) => {
				const state: BabySitterPlayer = { ...prevState };
				delete state[`${player}`];
				return state;
			});
		} else {
			setActivePlayer((prevState) => {
				const state: BabySitterPlayer = {};
				return state;
			});
		}
	};

	const addToLog = (str: string) => {
		const newLog = `: ${str}`;
		setLogs((prevLogs) => [...prevLogs, newLog]);
	};

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setCurrentTab(newValue);
	};

	const handleGapRangeChange = (event: Event, newValue: number | number[]) => {
		setGapRanges(newValue as number[]);
	};

	const setShowStarted = () => {
		console.log("Success?", hasShowStarted);
		setShowStartedVariable((prevValue) => !prevValue);
	};

	const updatePlayer = (playerName: string) => {
		const temp: BabySitterPlayer = playersAll;
		temp[playerName] = !temp[playerName];
		setActivePlayer((prevPlayers) => ({ ...prevPlayers, ...temp }));
	};

	const buildInitialPlayers = () => {
		let players: BabySitterPlayer = {};
		playersList.forEach((player) => {
			const key = `${player}`;
			players[key] = true;
		});
		setActivePlayer(players);
	};

	/*
	useEffect(() => {
		if (hasShowStarted === true) {
			console.log("Yes");
		}
	}, [hasShowStarted]);*/

	useEffect(() => {
		buildInitialPlayers();
	}, []);

	useEffect(() => {
		const allActivePlayers: string[] = [];
		for (const [key, value] of Object.entries(playersAll)) {
			if (value === true) allActivePlayers.push(key);
		}
		setListOfPlayers(allActivePlayers);
	}, [playersAll]);

	const everythingObject = {
		players: playersAll,
		activePlayers,
		showLengthInMinutes,
		hasShowStarted,
		currentTab,
		gapRanges,
		updatePlayer,
		addPlayer,
		setShowLength,
		setShowStarted,
		handleTabChange,
		handleGapRangeChange,
		deletePlayer,
		confirm,
	};

	const ShowTimeProps = {
		activePlayers,
		hasShowStarted,
	};

	return (
		<BabySitterContext.Provider value={everythingObject}>
			<ShowTimeContextProvider {...ShowTimeProps}>
				{children}
				<Credits />
				<Dialog
					open={showPopup}
					onClose={closeConfirm}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{alertMsg}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeConfirm}>Nope</Button>
						<Button
							variant="contained"
							onClick={() => {
								alertFunc();
								closeConfirm();
							}}
							autoFocus
						>
							Yep
						</Button>
					</DialogActions>
				</Dialog>
			</ShowTimeContextProvider>
		</BabySitterContext.Provider>
	);
};

export const useBabySitterContext = () => {
	const value = useContext(BabySitterContext);
	return value;
};
