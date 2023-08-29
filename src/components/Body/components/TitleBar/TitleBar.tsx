import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useImprovBotContext } from "../../../ImprovBotContext";

export const TitleBar: FC = () => {
	const { setShowStarted } = useImprovBotContext();
	return (
		<Typography variant="h4">
			<div onClick={setShowStarted}>Improv Bot 2000</div>
		</Typography>
	);
};
