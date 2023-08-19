import React, { FC } from "react";

import {
	PlayerList,
	TitleBar,
	ShowLength,
	GapRange,
	AudienceParticipation,
} from "./components";

export const TopSection: FC = () => {
	return (
		<>
			<TitleBar />
			<PlayerList />
			<ShowLength />
			<GapRange />
			<AudienceParticipation />
		</>
	);
};
