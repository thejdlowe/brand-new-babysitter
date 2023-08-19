import React, { FC } from "react";
import { Slider, Typography } from "@mui/material";
import { useBabySitterContext } from "../../../BabySitterContext";

export const ShowLength: FC = () => {
	const { showLengthInMinutes, setShowLength, hasShowStarted } = useBabySitterContext();
	const handleChange = (event: Event, newValue: number | number[]) => {
		setShowLength(newValue as number);
	};
	return (
		<>
			<Typography variant="h6">Show Length</Typography>
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
