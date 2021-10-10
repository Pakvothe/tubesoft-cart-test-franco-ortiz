import axios from "axios";
import {
	GET_ALL_PRODUCTS,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	REMOVE_ONE_FROM_CART,
} from "./../constants";

export const getAllProduct = () => {
	return (dispatch) => {
		return axios
			.get(`http://localhost:3001/products/`)
			.then((product) => {
				dispatch({
					type: GET_ALL_PRODUCTS,
					payload: product.data,
				});
			})
			.catch((err) => {
				console.log("status 400");
			});
	};
};

export const addToCart = (itemID) => {
	return {
		type: ADD_TO_CART,
		payload: {
			id: itemID,
		},
	};
};

export const removeFromCart = (itemID) => {
	return {
		type: REMOVE_FROM_CART,
		payload: {
			id: itemID,
		},
	};
};

export const removeOneFromCart = (itemID) => {
	return {
		type: REMOVE_ONE_FROM_CART,
		payload: {
			id: itemID,
		},
	};
};
