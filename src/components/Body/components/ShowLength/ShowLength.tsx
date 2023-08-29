import React, { FC } from "react";
import { FormControlLabel, Checkbox, Slider, Typography } from "@mui/material";
import { useImprovBotContext } from "../../../ImprovBotContext";

export const ShowLength: FC = () => {
	const { showLengthInMinutes, setShowLength, hasShowStarted } =
		useImprovBotContext();
	const handleChange = (event: Event, newValue: number | number[]) => {
		setShowLength(newValue as number);
	};
	return (
		<>
			<Typography variant="h6">
				Show Length (in minutes): {showLengthInMinutes}
			</Typography>
			<FormControlLabel
				control={
					<Checkbox
						checked={showLengthInMinutes === Infinity}
						onChange={() => {
							if (showLengthInMinutes === Infinity) setShowLength(20);
							else setShowLength(Infinity);
						}}
					/>
				}
				label="Infinite Show"
			/>
			<Slider
				onChange={handleChange}
				min={1}
				max={60}
				step={1}
				value={showLengthInMinutes}
				disabled={hasShowStarted}
			/>
		</>
	);
};
