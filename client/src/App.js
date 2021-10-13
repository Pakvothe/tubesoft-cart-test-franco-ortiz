import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";

//components ==>
import HomePage from "./components/homepage";
import Cart from "./components/cart";
import CartList from "./components/cart_list";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<div data-testid="application-renders">
			<ToastContainer limit={3} />
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/cart">
					<Cart />
				</Route>
				<Route exact path="/history">
					<CartList />
				</Route>
				<Route render={() => <Redirect to="/" />} />
			</Switch>
		</div>
	);
};

export default App;
