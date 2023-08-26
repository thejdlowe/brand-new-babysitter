import React, { FC } from "react";
import { Button } from "@mui/material";
import { useShowTimeContext } from "../../../ShowTimeContext";

export const ShowRunningButton: FC = () => {
	const { EndTheShow } = useShowTimeContext();
	return (
		<Button onClick={EndTheShow} variant="contained">
			End Show Early
		</Button>
	);
};
