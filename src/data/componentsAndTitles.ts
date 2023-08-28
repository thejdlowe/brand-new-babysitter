import { FC } from "react";
import {
	PlayerList,
	ShowLength,
	GapRange,
	Status,
	AdvancedSettings,
	//AudienceParticipation,
} from "../components/Body/components";

export const componentsAndTitles: Record<string, FC> = {
	Players: PlayerList,
	"Show Length": ShowLength,
	"Gap Between Gets": GapRange,
	"Advanced Settings": AdvancedSettings,
	Status: Status,
	//"Audience Participation": AudienceParticipation,
};
