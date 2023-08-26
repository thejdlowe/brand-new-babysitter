import React, { FC } from "react";
import { Typography, Link } from "@mui/material";
import { useBabySitterContext } from "../BabySitterContext";

export const Credits: FC = () => {
	const { setShowStarted } = useBabySitterContext();
	return (
		<Typography variant="caption">
			Created by J.D. Lowe
			<br />
			Source code available at{" "}
			<Link
				rel="noopener noreferrer"
				target="_blank"
				href={`https://github.com/thejdlowe/brand-new-babysitter`}
			>
				Github
			</Link>
		</Typography>
	);
};
