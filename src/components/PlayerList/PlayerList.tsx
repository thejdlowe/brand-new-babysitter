import React, { FC } from "react";
import { useBabySitterContext } from "../BabySitterContext";

export const PlayerList: FC = () => {
	const { players, updatePlayer } = useBabySitterContext();
	const playerNames = Object.keys(players);
	const buildPlayer = (name: string, active: boolean) => {
		return (
			<>
				<label key={name}>
					{name}{" "}
					<input
						type="checkbox"
						checked={active}
						onChange={() => {
							updatePlayer(name);
						}}
					/>
				</label>
			</>
		);
	};
	return (
		<>
			{playerNames.map((playerName) => {
				return <>{buildPlayer(playerName, players[playerName])}</>;
			})}
		</>
	);
};
