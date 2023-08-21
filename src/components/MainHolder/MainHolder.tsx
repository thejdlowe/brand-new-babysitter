import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useBabySitterContext } from "../BabySitterContext";
import { TabSection } from "../TabSection";
import { Body } from "../Body";
import { Status } from "../Body/components";
import { ShowPendingButton, ShowRunningButton } from "./components/Buttons";

export const MainHolder: FC = () => {
	const { hasShowStarted } = useBabySitterContext();
	return (
		<>
			{hasShowStarted ? (
				<Status />
			) : (
				<>
					<TabSection />
					<Body />
				</>
			)}
			{hasShowStarted ? <ShowRunningButton /> : <ShowPendingButton />}
		</>
	);
};
