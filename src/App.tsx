import React from "react";
import { ImprovBot, AudienceFacing } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<AudienceFacing />} />
				<Route path="/improv-bot" element={<ImprovBot />} />
			</Routes>
		</Router>
	);
};
