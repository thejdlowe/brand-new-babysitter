import React, { FC } from "react";
import { BabySitterContextProvider } from "../BabySitterContext";
import { TopSection } from "../TopSection";
export const BabySitter: FC = () => {
	return (
		<BabySitterContextProvider>
			<TopSection />
		</BabySitterContextProvider>
	);
};
