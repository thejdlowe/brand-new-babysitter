import React, { FC } from "react";
import { Typography, Tabs, Tab } from "@mui/material";
import { useBabySitterContext } from "../BabySitterContext";
import { componentsAndTitles } from "../../data/componentsAndTitles";

export const TabSection: FC = () => {
	const { currentTab, handleTabChange } = useBabySitterContext();
	return (
		<>
			<Typography variant="h4">
				<div>Improv Bot 2000</div>
			</Typography>
			<Tabs value={currentTab} onChange={handleTabChange}>
				{Object.keys(componentsAndTitles).map((title) => {
					return <Tab key={`tab-${title}`} label={title} />;
				})}
			</Tabs>
		</>
	);
};
