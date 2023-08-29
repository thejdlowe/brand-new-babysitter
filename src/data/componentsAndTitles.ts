import { FC } from "react";
import {
	PlayerList,
	ShowLength,
	GapRange,
	Status,
	AdvancedSettings,
	AudienceParticipation,
} from "../components/Body/components";

export const componentsAndTitles: Record<string, FC> = {
	Players: PlayerList,
	"Show Length": ShowLength,
	"Gap Between Gets": GapRange,
	"Audience Participation": AudienceParticipation,
	"Advanced Settings": AdvancedSettings,
	Status: Status,
};
