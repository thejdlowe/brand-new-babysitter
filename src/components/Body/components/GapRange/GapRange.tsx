import React, { FC } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { useImprovBotContext } from "../../../ImprovBotContext";

export const GapRange: FC = () => {
	const { gapRanges, handleGapRangeChange } = useImprovBotContext();
	return (
		<>
			<Typography variant="h6">Gap Range (in seconds): Between {gapRanges[0]} and {gapRanges[1]} seconds</Typography>

			<Slider
				onChange={handleGapRangeChange}
				min={15}
				max={180}
				step={1}
				value={gapRanges}
			/>
		</>
	);
};
