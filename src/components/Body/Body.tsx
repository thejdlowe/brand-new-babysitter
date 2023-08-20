import React, { FC } from "react";
import { Typography } from "@mui/material";
//import { useBabySitterContext } from "../../../BabySitterContext";
import { useBabySitterContext } from "../BabySitterContext";
import { componentsAndTitles } from "../../data/componentsAndTitles";

export const Body: FC = () => {
    const {currentTab} = useBabySitterContext();
	const components = Object.values(componentsAndTitles);
	const bodyParts = components.map((Component, index) => {
		return (
			<div
            hidden={index !== currentTab}
            >
				<Component />
			</div>
		);
	});

	return <>{bodyParts}</>;
};
