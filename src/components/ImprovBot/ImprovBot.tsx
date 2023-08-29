import React, { FC, useState } from "react";
import { ImprovBotContextProvider } from "../ImprovBotContext";

import { MainHolder } from "../MainHolder";
export const ImprovBot: FC = () => {
	return (
		<ImprovBotContextProvider>
			<MainHolder />
		</ImprovBotContextProvider>
	);
};
