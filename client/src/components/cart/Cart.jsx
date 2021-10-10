import React from "react";
import { makeStyles } from "@mui/styles";
import Navbar from "../navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, removeOneFromCart } from "../../redux/actions";

const Cart = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const cart = useSelector((state) => state.cart);
	const products = useSelector((state) => state.products);
	let total = 0;
	cart.forEach((prod) => (total = prod.price * prod.qty + total));

	return (
		<div className={classes.Container}>
			<Navbar />
			{cart.length ? (
				<div className={classes.cartContainer}>
					<div className={classes.titleContainer}>
						<p>Product</p>
						<div>
							<p>Quantity</p>
							<p>Price</p>
						</div>
					</div>
					{cart.map((product, index) => {
						const arrayIndex = cart.length - 1;
						return (
							<div key={product.id}>
								<div className={classes.infoContainer}>
									<p>
										{product.name}
										<span
											className={classes.deleteButton}
											onClick={() => dispatch(removeFromCart(product.id))}
										>
											ⓧ
										</span>
									</p>
									<div>
										<p>
											{product.qty > 1 && (
												<button onClick={() => dispatch(removeOneFromCart(product.id))}>
													－
												</button>
											)}
											{product.qty}
											{product.qty <
												products.find((item) => product.id === item.id).totalStock && (
												<button onClick={() => dispatch(addToCart(product.id))}>
													＋
												</button>
											)}
										</p>
										<p>$ {product.price}</p>
									</div>
								</div>
								{index !== arrayIndex && <div className={classes.divider} />}
							</div>
						);
					})}
					<div className={classes.totalPrice}>
						<div>
							<p>Total</p>
						</div>
						<div>
							<p>$ {total}</p>
						</div>
					</div>
				</div>
			) : (
				<h1 className={classes.emptyMessage}>Empty cart</h1>
			)}
			<div className={classes.cartFooter}>
				<Link to="/">
					<button>Back to shopping</button>
				</Link>
				<Link to="/history">
					<button>Cart Historial</button>
				</Link>
				<button>Procced</button>
			</div>
		</div>
	);
};

export default Cart;

const useStyles = makeStyles({
	Container: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		"& button": {
			marginBottom: "8px",
		},
	},
	emptyMessage: {
		margin: "auto",
		textTransform: "uppercase",
		color: "#7C7B7C",
	},
	cartContainer: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		padding: "30px",
	},
	titleContainer: {
		display: "flex",
		textTransform: "uppercase",
		fontWeight: "600",
		color: "#36d982",
		marginBottom: "30px",
		"& p": {
			width: "40%",
		},
		"& div": {
			width: "60%",
			display: "flex",
			justifyContent: "space-between",
			textAlign: "center",
		},
	},
	infoContainer: {
		display: "flex",
		fontWeight: "500",
		color: "#7C7B7C",
		padding: "15px 0",
		"& p": {
			width: "40%",
		},
		"& div": {
			width: "60%",
			display: "flex",
			justifyContent: "space-between",
			textAlign: "center",

			"& button": {
				cursor: "pointer",
				border: "none",
				margin: "auto 6px",
				borderRadius: "50%",
				backgroundColor: "transparent",
				color: "#e67ad0",
				fontWeight: "600",
				"&:hover": {
					color: "#36d982",
				},
			},
		},
	},
	deleteButton: {
		cursor: "pointer",
		padding: "0 6px",
		color: "red",
	},
	divider: {
		width: "100%",
		height: "2px",
		background: "linear-gradient(90deg, rgba(231,242,248,1) 0%, rgba(54,217,130,1) 100%)",
		margin: "15px 0",
	},
	totalPrice: {
		display: "flex",
		justifyContent: "center",
		marginTop: "auto",
		"& div": {
			width: "200px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			"&:first-child": {
				padding: "16px 10px",
				background: "transparent",
				border: "1px solid #e67ad0",
				color: "#7C7B7C",
			},
			padding: "8px 16px",
			background: "#e67ad0",
			color: "#fafafa",
		},
	},
	cartFooter: {
		height: "160px",
		width: "100%",
		background: "linear-gradient(90deg, rgba(59,69,116,1) 0%, rgba(113,114,166,1) 100%)",
		display: "flex",
		alignItems: "center",
		padding: "0 30px",
		"& button": {
			cursor: "pointer",
			textTransform: "uppercase",
			padding: "20px 100px",
			color: "#e67ad0",
			fontWeight: "600",
			boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
			"&:first-child": {
				padding: "10px",
				background: "transparent",
				border: "2px solid #e67ad0",
				marginRight: "14px",
			},
			"&:last-child": {
				marginLeft: "auto",
			},
			"& a": {
				textDecoration: "none",
				color: "inherit",
			},
		},
	},
});
