import React from "react";
import { Provider } from "react-redux";
import { render, cleanup, screen } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";
import store from "../../redux/store";

jest.mock("axios");

const products = {
	data: [
		{
			id: 1,
			name: "Final Fantasy VII",
			img: "https://images.goodgam.es/WKE-gd3lr40/enlarge:1/plain/covers/17-final-fantasy-vii-remake-cover.jpg",
			price: 6035,
			stock: 200,
			totalStock: 200,
			rating: 5,
			createdAt: "2021-10-12T00:24:02.296Z",
			updatedAt: "2021-10-12T00:24:02.296Z",
			deletedAt: null,
		},
		{
			id: 2,
			name: "FIFA 21",
			img: "https://i.imgur.com/RKCvcWJ.jpg",
			price: 2879,
			stock: 2300,
			totalStock: 2300,
			rating: 4,
			createdAt: "2021-10-12T00:24:02.296Z",
			updatedAt: "2021-10-12T00:24:02.296Z",
			deletedAt: null,
		},
	],
};

afterEach(cleanup);

const renderComponent = () =>
	render(
		<Provider store={store()}>
			<Router>
				<HomePage />
			</Router>
		</Provider>
	);

test("HomePage get products succesfully", async () => {
	axios.get.mockReturnValue(new Promise((resolve) => resolve(products)));
	renderComponent();
	await screen.findByText("Final Fantasy VII");
	await screen.findByText("FIFA 21");
});
