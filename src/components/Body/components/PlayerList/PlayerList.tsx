import React, { FC } from "react";
import { Grid, FormControlLabel, Switch } from "@mui/material";
import { useBabySitterContext } from "../../../BabySitterContext";

export const PlayerList: FC = () => {
	const { players, updatePlayer, hasShowStarted } = useBabySitterContext();
	const playerNames = Object.keys(players);
	const buildPlayer = (name: string, active: boolean) => {
		const switcher = (
			<Switch
				checked={active}
				onChange={() => {
					updatePlayer(name);
				}}
				disabled={hasShowStarted}
			/>
		);
		return <Grid item xs={2}><FormControlLabel control={switcher} label={name} /></Grid>;
	};
	return (
		<Grid container>
			{playerNames.map((playerName) => {
				return <>{buildPlayer(playerName, players[playerName])}</>;
			})}
		</Grid>
	);
};
