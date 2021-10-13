import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Navbar from "./index";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Navbar />", () => {
	let component;
	beforeEach(() => {
		component = render(
			<Router>
				<Navbar />
			</Router>
		);
	});

	test("Navbar render content", () => {
		component.getByText("Tubesoft Cart");
	});
	test("go to Cart button can be clicked", async () => {
		const Button = component.getByText("go to Cart");
		fireEvent.click(Button);
	});
});
