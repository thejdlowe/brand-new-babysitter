import React, { FC } from "react";
import {
	Typography,
	Grid,
	FormControlLabel,
	Switch,
	Tabs,
	Tab,
} from "@mui/material";
import { useBabySitterContext } from "../BabySitterContext";
import { componentsAndTitles } from "../../data/componentsAndTitles";

export const TabSection: FC = () => {
	const { currentTab, handleTabChange, setShowStarted } =
		useBabySitterContext();
	return (
		<>
			<Typography variant="h4">
				<div onClick={setShowStarted}>Babysitter 2.0</div>
			</Typography>
			<Tabs value={currentTab} onChange={handleTabChange}>
				{Object.keys(componentsAndTitles).map((title) => {
					return <Tab label={title} />;
				})}
			</Tabs>
		</>
	);
};
