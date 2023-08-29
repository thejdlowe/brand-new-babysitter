import React, { FC, useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { useImprovBotContext } from "../../../ImprovBotContext";

export const Alert: FC = () => {
	const { showLengthInMinutes, setShowLength, hasShowStarted } =
		useImprovBotContext();
	const handleChange = (event: Event, newValue: number | number[]) => {
		setShowLength(newValue as number);
	};
	return (
		<>
			<Typography variant="h6">Show Length (in minutes)</Typography>

			<Slider
				onChange={handleChange}
				marks
				min={1}
				max={60}
				step={1}
				value={showLengthInMinutes}
				valueLabelDisplay="auto"
				disabled={hasShowStarted}
			/>
		</>
	);
};
