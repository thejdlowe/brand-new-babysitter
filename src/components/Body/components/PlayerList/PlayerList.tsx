import React, { FC, useState } from "react";
import { Grid, FormControlLabel, Switch, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useBabySitterContext } from "../../../BabySitterContext";

export const PlayerList: FC = () => {
	const {
		players,
		updatePlayer,
		hasShowStarted,
		addPlayer,
		deletePlayer,
		confirm,
	} = useBabySitterContext();
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
				<IconButton
					onClick={() => {
						confirm(`Are you sure you want to delete ${name}?`, () => {
							deletePlayer(name);
						});
					}}
				>
					<DeleteIcon />
				</IconButton>
			</Grid>
		);
	};
	return (
		<>
			<Grid container>
				{playerNames.map((playerName) => {
					return <>{buildPlayer(playerName, players[playerName])}</>;
				})}
			</Grid>

			<Grid item xs={3}>
				Delete All Players
				<IconButton
					onClick={() => {
						confirm(`Are you sure you want to delete all players?`, () => {
							deletePlayer();
						});
					}}
				>
					<DeleteIcon />
				</IconButton>
			</Grid>
			<Grid item xs={3}>
				Add New Player
				<IconButton
					onClick={() => {
						const player = window.prompt("Please add a player") as string;
						addPlayer(player);
					}}
				>
					<AddCircleIcon />
				</IconButton>
			</Grid>
		</>
	);
};
