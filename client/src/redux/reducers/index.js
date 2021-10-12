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

const initialState = {
	products: [], // {id, title, descr, price ,stock, img, totalStock, rating}
	cart: [], // {id, title, descr, price ,stock, img , qty, totalStock, rating}
	history: [], // array de arrays cart [ [ {productos} ] ]
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};
		case GET_LIST:
			return {
				...state,
				history: [...action.payload],
			};
		case ADD_TO_CART: {
			const item = state.products.find((product) => product.id === action.payload.id);
			const inCart = state.cart.find((item) => (item.id === action.payload.id ? true : false));
			return {
				...state,
				cart: inCart
					? state.cart.map((item) =>
							item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
					  )
					: [...state.cart, { ...item, qty: 1 }],
				products: state.products.map((item) =>
					item.id === action.payload.id
						? {
								...item,
								stock: item.stock - 1,
						  }
						: item
				),
			};
		}
		case REMOVE_FROM_CART: {
			const myItemQty = state.cart.find((product) => product.id === action.payload.id);
			return {
				...state,
				products: state.products.map((item) =>
					item.id === action.payload.id
						? {
								...item,
								stock: item.stock + myItemQty.qty,
						  }
						: item
				),
				cart: state.cart.filter((item) => item.id !== action.payload.id),
			};
		}
		case EMPTY_CART: {
			return {
				...state,
				cart: [],
			};
		}
		case REMOVE_ONE_FROM_CART: {
			return {
				...state,
				products: state.products.map((item) =>
					item.id === action.payload.id
						? {
								...item,
								stock: item.stock + 1,
						  }
						: item
				),
				cart: state.cart.map((item) =>
					item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
				),
			};
		}
		case SET_SAVED_CART: {
			const modProductArray = [];
			state.products.forEach((element) => {
				const temp = element;
				action.payload.forEach((item) => {
					if (element.id === item.id) {
						temp.stock = temp.stock - 1;
					}
				});
				modProductArray.push(temp);
			});
			return {
				...state,
				cart: [...action.payload],
				products: modProductArray,
			};
		}
		case REMOVE_FROM_HISTORY: {
			return {
				...state,
				history: state.history.filter((item) => item.id !== action.payload.id),
			};
		}
		default:
			return state;
	}
};

export default Reducer;
