import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import Cart from "./Cart";
import store from "../../redux/store";

const renderComponent = () =>
	render(
		<Provider store={store()}>
			<Router>
				<Cart />
			</Router>
		</Provider>
	);

test("Message is shown when cart its empty", async () => {
	renderComponent();
	await screen.findByText("Empty cart");
});

test("Procced button can be clicked", async () => {
	const { getByText } = renderComponent();
	const proccedButton = getByText("Procced");
	fireEvent.click(proccedButton);
});

test("Back to shopping button can be clicked", async () => {
	const { getByText } = renderComponent();
	const Button = getByText("Back to shopping");
	fireEvent.click(Button);
});

test("Cart history button can be clicked", async () => {
	const { getByText } = renderComponent();
	const Button = getByText("Cart History");
	fireEvent.click(Button);
});
