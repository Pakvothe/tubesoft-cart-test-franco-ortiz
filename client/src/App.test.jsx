import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";
import store from "./redux/store";

const renderComponent = () =>
	render(
		<Provider store={store()}>
			<Router>
				<App />
			</Router>
		</Provider>
	);

test("App renders succesfully", async () => {
	renderComponent();
	screen.getByTestId("application-renders");
});
