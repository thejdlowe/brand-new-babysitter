import React, { FC } from "react";

import { PlayerList } from "./components/PlayerList";
import { TitleBar } from "./components/TitleBar";

export const TopSection: FC = () => {
	return (
		<>
			<TitleBar />
			<PlayerList />
		</>
	);
};
