import React, { FC } from "react";
import { useBabySitterContext } from "../BabySitterContext";
import { componentsAndTitles } from "../../data/componentsAndTitles";

export const Body: FC = () => {
	const { currentTab } = useBabySitterContext();
	const components = Object.values(componentsAndTitles);
	const bodyParts = components.map((Component, index) => {
		return (
			<div hidden={index !== currentTab} key={`body-component-${index}`}>
				<Component />
			</div>
		);
	});

	return <>{bodyParts}</>;
};
