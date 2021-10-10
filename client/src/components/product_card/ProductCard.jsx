import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeOneFromCart } from "../../redux/actions";

const ProductCard = ({ props }) => {
	const { id, name, img, price, stock, totalStock } = props;
	const classes = useStyles();
	const dispatch = useDispatch();

	return (
		<div className={classes.Container}>
			<img src={img} alt={`${id} cardImage`} className={classes.CardImage} />
			<div className={classes.ProductInfo}>
				<h3>{name}</h3>
				<p>Precio: {price}</p>
				<p>Stock: {stock}</p>
			</div>
			{stock > 0 && <button onClick={() => dispatch(addToCart(id))}>Add to cart</button>}

			{stock < totalStock && (
				<button onClick={() => dispatch(removeFromCart(id))}>remove</button>
			)}
			{stock < totalStock && (
				<button onClick={() => dispatch(removeOneFromCart(id))}>remove one</button>
			)}
		</div>
	);
};

export default ProductCard;

const useStyles = makeStyles({
	Container: {
		height: "350px",
		width: "220px",
		border: "1px solid blue",
		"&:hover": {
			border: "1px solid red",
		},
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		margin: "10px 0",
		"& button": {
			marginBottom: "8px",
		},
	},
	CardImage: {
		width: "100%",
		height: "50%",
	},
	ProductInfo: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "100%",
		"& h3": {
			fontSize: "14px",
			margin: "4px 0px",
		},
	},
});
