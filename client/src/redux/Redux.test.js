import {
	addToCart,
	removeFromCart,
	removeOneFromCart,
	emptyCart,
	setSavedCart,
	removeFromHistory,
} from "./actions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it("should dispatch action", () => {
	const initialState = {};
	const store = mockStore(initialState);

	store.dispatch(addToCart("itemID"));

	const actions = store.getActions();
	const expectedPayload = {
		type: "ADD_TO_CART",
		payload: {
			id: "itemID",
		},
	};
	expect(actions).toEqual([expectedPayload]);
});

it("getAllProducts action", () => {
	const store = mockStore();

	const fetchData = (dispatch) => {
		return (dispatch) => {
			return fetch(`http://localhost:3001/products/`).then((data) => {
				return data;
			});
		};
	};

	return store.dispatch(fetchData()).then((data) => {
		expect(data.status).toEqual(200);
	});
});

it("getHistoryList action", () => {
	const store = mockStore();

	const fetchData = (dispatch) => {
		return (dispatch) => {
			return fetch(`http://localhost:3001/carts/`).then((data) => {
				return data;
			});
		};
	};

	return store.dispatch(fetchData()).then((data) => {
		expect(data.status).toEqual(200);
	});
});

it("addToCart action", () => {
	const initialState = {};
	const store = mockStore(initialState);

	store.dispatch(addToCart("itemID"));

	const actions = store.getActions();
	const expectedPayload = {
		type: "ADD_TO_CART",
		payload: {
			id: "itemID",
		},
	};
	expect(actions).toEqual([expectedPayload]);
});

it("removeFromCart action", () => {
	const initialState = {};
	const store = mockStore(initialState);

	store.dispatch(removeFromCart("itemID"));

	const actions = store.getActions();
	const expectedPayload = {
		type: "REMOVE_FROM_CART",
		payload: {
			id: "itemID",
		},
	};
	expect(actions).toEqual([expectedPayload]);
});

it("removeOneFromCart action", () => {
	const initialState = {};
	const store = mockStore(initialState);

	store.dispatch(removeOneFromCart("itemID"));

	const actions = store.getActions();
	const expectedPayload = {
		type: "REMOVE_ONE_FROM_CART",
		payload: {
			id: "itemID",
		},
	};
	expect(actions).toEqual([expectedPayload]);
});

it("emptyCart action", () => {
	const initialState = {};
	const store = mockStore(initialState);

	store.dispatch(emptyCart());

	const actions = store.getActions();
	const expectedPayload = {
		type: "EMPTY_CART",
	};
	expect(actions).toEqual([expectedPayload]);
});

it("setSavedCart action", () => {
	const initialState = {};
	const store = mockStore(initialState);

	store.dispatch(setSavedCart("payload"));

	const actions = store.getActions();
	const expectedPayload = {
		type: "SET_SAVED_CART",
		payload: "payload",
	};
	expect(actions).toEqual([expectedPayload]);
});

it("removeFromHistory action", () => {
	const initialState = {};
	const store = mockStore(initialState);

	store.dispatch(removeFromHistory("itemID"));

	const actions = store.getActions();
	const expectedPayload = {
		type: "REMOVE_FROM_HISTORY",
		payload: {
			id: "itemID",
		},
	};
	expect(actions).toEqual([expectedPayload]);
});
