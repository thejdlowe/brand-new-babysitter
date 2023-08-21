import React, { FC } from "react";
import {
	PlayerList,
	ShowLength,
	GapRange,
	AudienceParticipation,
} from "../components/Body/components";

export const componentsAndTitles: Record<string, FC> = {
	Players: PlayerList,
	"Show Length": ShowLength,
	"Gap Between Gets": GapRange,
	//"Audience Participation": AudienceParticipation,
};
