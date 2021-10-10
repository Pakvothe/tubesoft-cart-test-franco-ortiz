import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Navbar from "../navbar";
import Footer from "../footer";
import ProductCard from "../product_card";
import { getAllProduct } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
	const classes = useStyles();
	const products = useSelector((state) => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		!products.length && dispatch(getAllProduct());
	}, [dispatch, products]);

	return (
		<div className={classes.container}>
			<Navbar />
			<div className={classes.cardList}>
				{products.map((product) => {
					return <ProductCard key={product.id} props={product} />;
				})}
			</div>
			<Footer />
		</div>
	);
};

export default HomePage;

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		backgroundColor: "#fafafa",
	},
	cardList: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		padding: "30px 0",
		margin: "auto 0",
		"@media(max-width: 480px)": {
			padding: "15px 0",
		},
	},
});
