import React, { FC } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { useImprovBotContext } from "../../../ImprovBotContext";

export const AdvancedSettings: FC = () => {
	const { gapRanges, handleGapRangeChange } = useImprovBotContext();
	return (
		<>
			<Typography variant="h6">Advanced Settings</Typography>

			<Slider
				onChange={handleGapRangeChange}
				marks
				min={15}
				max={180}
				step={1}
				value={gapRanges}
				valueLabelDisplay="auto"
			/>
		</>
	);
};
