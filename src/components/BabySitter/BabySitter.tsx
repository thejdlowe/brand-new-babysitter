import React, { FC, useState } from "react";
import { BabySitterContextProvider } from "../BabySitterContext";

import { MainHolder } from "../MainHolder";
export const BabySitter: FC = () => {
	return (
		<BabySitterContextProvider>
				<MainHolder />
		</BabySitterContextProvider>
	);
};
