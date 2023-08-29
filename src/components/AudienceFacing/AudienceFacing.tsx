import React, { FC } from "react";
import { Typography, Link } from "@mui/material";

export const AudienceFacing: FC = () => {
	return (
		<Typography variant="caption">
			Created by J.D. Lowe
			<br />
			Source code available at{" "}
			<Link
				rel="noopener noreferrer"
				target="_blank"
				href={`https://github.com/thejdlowe/improv-bot-2000`}
			>
				Github
			</Link>
		</Typography>
	);
};
