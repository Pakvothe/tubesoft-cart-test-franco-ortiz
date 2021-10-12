import axios from "axios";
import {
	GET_ALL_PRODUCTS,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	REMOVE_ONE_FROM_CART,
	EMPTY_CART,
	GET_LIST,
	SET_SAVED_CART,
	REMOVE_FROM_HISTORY,
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

export const getList = () => {
	return (dispatch) => {
		return axios
			.get(`http://localhost:3001/carts/`)
			.then((list) => {
				dispatch({
					type: GET_LIST,
					payload: list.data,
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

export const emptyCart = () => {
	return {
		type: EMPTY_CART,
	};
};

export const setSavedCart = (payload) => {
	return {
		type: SET_SAVED_CART,
		payload,
	};
};

export const removeFromHistory = (itemID) => {
	return {
		type: REMOVE_FROM_HISTORY,
		payload: {
			id: itemID,
		},
	};
};
