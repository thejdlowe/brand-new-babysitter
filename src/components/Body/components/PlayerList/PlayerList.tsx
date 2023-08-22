import React, { FC, useState } from "react";
import { Grid, FormControlLabel, Switch, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useBabySitterContext } from "../../../BabySitterContext";

export const PlayerList: FC = () => {
	const { players, updatePlayer, hasShowStarted, deletePlayer } =
		useBabySitterContext();
	const [showAlert, setShowAlert] = useState(false);
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
		return (
			<Grid
				item
				xs={3}
				sx={{
					"& .hidden-button": {
						display: "none",
					},
					"&:hover .hidden-button": {
						display: "flex",
						float: "right",
					},
					display: "inline-block",
				}}
			>
				<FormControlLabel
					control={switcher}
					label={
						<>
							<span>{name}</span>{" "}
						</>
					}
				/>
				<IconButton className="hidden-button">
					<DeleteIcon />
				</IconButton>
			</Grid>
		);
	};
	return (
		<Grid container>
			{playerNames.map((playerName) => {
				return <>{buildPlayer(playerName, players[playerName])}</>;
			})}
			<Grid item xs={3}>
				Delete All Players
				<IconButton className="hidden-button">
					<DeleteIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};
