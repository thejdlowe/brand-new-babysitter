import React, { FC, useState } from "react";
import { BabySitterContextProvider } from "../BabySitterContext";
import { TabSection } from "../TabSection";
import { Body } from "../Body";
export const BabySitter: FC = () => {
	return (
		<BabySitterContextProvider>
			<TabSection />
			<Body />
		</BabySitterContextProvider>
	);
};
