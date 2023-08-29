import React, { FC } from "react";
import { FormControlLabel, Checkbox, Slider, Typography } from "@mui/material";
import { useImprovBotContext } from "../../../ImprovBotContext";

export const AudienceParticipation: FC = () => {
	const {
		audienceParticipationPercentage,
		setAudienceParticipationPercentage,
		hasShowStarted,
	} = useImprovBotContext();
	const handleChange = (event: Event, newValue: number | number[]) => {
		setAudienceParticipationPercentage(newValue as number);
	};
	return (
		<>
			<Typography variant="h6">
				Audience Participation Percentage: {audienceParticipationPercentage}%
			</Typography>
			<Typography>
				This represents the chance that the next prompt that comes is directed
				at the audience, instead of something on the bot's lists.
			</Typography>
			<Slider
				onChange={handleChange}
				min={0}
				max={100}
				step={1}
				value={audienceParticipationPercentage}
				disabled={hasShowStarted}
			/>
		</>
	);
};
