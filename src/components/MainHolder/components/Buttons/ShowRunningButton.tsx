import React, { FC } from "react";
import { Button } from "@mui/material";
import { useBabySitterContext } from "../../../BabySitterContext";

export const ShowRunningButton: FC = () => {
	const { EndTheShow } = useBabySitterContext();
	return (
		<Button onClick={EndTheShow} variant="contained">
			End Show Early
		</Button>
	);
};
