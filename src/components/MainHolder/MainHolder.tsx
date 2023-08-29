import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useImprovBotContext } from "../ImprovBotContext";
import { TabSection } from "../TabSection";
import { Body } from "../Body";
import { Status } from "../Body/components";
import { ShowPendingButton, ShowRunningButton } from "./components/Buttons";
import { Box } from "@mui/material";

export const MainHolder: FC = () => {
	const { hasShowStarted } = useImprovBotContext();
	return (
		<>
			<Box sx={{ width: "80%", margin: "auto" }}>
				{hasShowStarted ? (
					<Status />
				) : (
					<>
						<TabSection />
						<Body />
					</>
				)}
				{hasShowStarted ? <ShowRunningButton /> : <ShowPendingButton />}
			</Box>
		</>
	);
};
