import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Navbar from "../navbar";
import Footer from "../footer";
import { getAllProduct } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const CartList = () => {
	const classes = useStyles();
	const products = useSelector((state) => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		!products.length && dispatch(getAllProduct());
	}, [dispatch, products]);

	return (
		<div className={classes.container}>
			<Navbar />
			<div>la lista</div>
			<Footer />
		</div>
	);
};

export default CartList;

const useStyles = makeStyles({
	container: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		backgroundColor: "#fafafa",
	},
});
