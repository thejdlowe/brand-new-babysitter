import React from "react";
import { ImprovBot, AudienceFacing } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./helpers/APIHelpers";
import { Provider } from "react-redux";

export default () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<AudienceFacing />} />
					<Route path="/improv-bot" element={<ImprovBot />} />
				</Routes>
			</Router>
		</Provider>
	);
};
