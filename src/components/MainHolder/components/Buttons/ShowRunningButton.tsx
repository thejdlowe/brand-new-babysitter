import React, { FC } from "react";
import { Button } from "@mui/material";
import { useBabySitterContext } from "../../../BabySitterContext";

export const ShowRunningButton: FC = () => {
	const { setShowStarted } = useBabySitterContext();
	return (
		<Button onClick={setShowStarted} variant="contained">
			End Show Early
		</Button>
	);
	//return (<Typography variant="h4"><div onClick={setShowStarted}>Babysitter 2.0</div></Typography>)
};
