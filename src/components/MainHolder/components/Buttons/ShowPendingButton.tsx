import React, { FC } from "react";
import { Button } from "@mui/material";
import { useShowTimeContext } from "../../../ShowTimeContext";

export const ShowPendingButton: FC = () => {
	const { StartTheShow } = useShowTimeContext();
	return (
		<Button onClick={StartTheShow} variant="contained">
			Start Show
		</Button>
	);
};
