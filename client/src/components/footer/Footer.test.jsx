import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Footer from "./index";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Footer />", () => {
	let component;
	beforeEach(() => {
		component = render(
			<Router>
				<Footer />
			</Router>
		);
	});

	test("Footer render content", () => {
		component.getByText("Cart History");
		component.getByText("Franco Ortiz");
	});

	test("Clicking name link must redirect to github profile", () => {
		const githubAnchor = component.getByText("Franco Ortiz");
		expect(githubAnchor).toHaveAttribute("href", "https://franco-ortiz.com/");
	});

	test("Clicking history button must work", () => {
		const button = component.getByLabelText("history-button");
		expect(button).toHaveAttribute("href", "/history");
	});

	// test("Clicking back button must work", () => {
	// 	const button = component.getByLabelText("back-button");
	// 	expect(button).toHaveAttribute("href", "/");
	// });
});
