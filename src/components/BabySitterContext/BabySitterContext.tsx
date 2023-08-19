import React, { createContext, useContext, useState, useEffect } from "react";
import { playersList } from "../../data/players";
export interface BabySitterContextProviderProps {
	children?: React.ReactChild;
	anyAdditionalFunctions?: () => void | undefined;
}
type BabySitterPlayer = Record<string, boolean>;
interface BabySitterContextValues {
	players: BabySitterPlayer;
	updatePlayer: (player: string) => void;
}

const BabySitterContext = createContext<BabySitterContextValues>({
	players: {},
	updatePlayer: () => {},
});
export const BabySitterContextProvider: React.FC<
	BabySitterContextProviderProps
> = ({ children, anyAdditionalFunctions }) => {
	const [playersAll, setActivePlayer] = useState({});
	const [activePlayers, setListOfPlayers] = useState<string[]>([]);

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

	useEffect(() => {
		console.log(activePlayers);
	}, [activePlayers]);

	return (
		<BabySitterContext.Provider value={{ players: playersAll, updatePlayer }}>
			{children}
		</BabySitterContext.Provider>
	);
};

export const useBabySitterContext = () => {
	const value = useContext(BabySitterContext);
	return value;
};
