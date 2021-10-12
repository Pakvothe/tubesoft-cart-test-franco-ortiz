import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Navbar from "../navbar";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import {
	addToCart,
	removeFromCart,
	removeOneFromCart,
	emptyCart,
	getAllProduct,
} from "../../redux/actions";

const Cart = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();
	const MySwal = withReactContent(Swal);
	const cart = useSelector((state) => state.cart);
	const products = useSelector((state) => state.products);
	const [date, setDate] = useState("");

	let total = 0;
	cart.forEach((prod) => (total = prod.price * prod.qty + total));

	useEffect(() => {
		let today = new Date();
		let todayDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
		let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		setDate(todayDate + " " + time);
	}, []);

	const saveHistory = (createDate) => {
		axios
			.post("http://localhost:3001/carts", { cartProducts: cart, createDate })
			.then((data) => {
				dispatch(emptyCart());
				dispatch(getAllProduct());
				toast.success("The cart was saved successfully!", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				history.push("/history");
			})
			.catch((err) =>
				toast.error("Error, try again!", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			);
	};

	const handleDelete = (id) => {
		MySwal.fire({
			title: "Are you sure?",
			text: "The product will be removed from the cart!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#36d982",
			iconColor: "#e67ad0",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, remove it!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(removeFromCart(id));
				toast.success("The product was removed from the cart!", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		});
	};
	const handleProcced = () => {
		if (cart.length > 0) {
			MySwal.fire({
				title: "Are you sure?",
				text: "The shopping cart will be saved in the history.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#36d982",
				iconColor: "#e67ad0",
				cancelButtonColor: "#d33",
				confirmButtonText: "Procced",
			}).then((result) => {
				if (result.isConfirmed) {
					saveHistory(date);
				}
			});
		} else {
			toast.error("Error, the cart is empty!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

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
									<p className={classes.productName}>
										{product.name}
										<span
											className={classes.deleteButton}
											onClick={() => handleDelete(product.id)}
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
					<button>Cart History</button>
				</Link>
				<button onClick={() => handleProcced()}>Procced</button>
			</div>
		</div>
	);
};

export default Cart;

const useStyles = makeStyles({
	Container: {
		minHeight: "100vh",
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
		flex: "1",
		display: "flex",
		flexDirection: "column",
		padding: "30px",
		"@media(max-width: 480px)": {
			padding: "15px",
		},
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
		"@media(max-width: 480px)": {
			padding: "5px 0",
			margin: "0px 0 10px 0",
			display: "flex",
			alignItems: "center",
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
		"@media(max-width: 480px)": {
			height: "auto",
			flexDirection: "column-reverse",
			justifyContent: "center",
			width: "100%",
			padding: "0 15px",
			"& button": {
				padding: "20px 80px",
				width: "100%",
				"&:first-child": {
					padding: "10px",
					background: "transparent",
					border: "2px solid #e67ad0",
				},
				"&:last-child": {
					margin: "10px  0 !important",
				},
				"& a": {
					width: "100%",
					textDecoration: "none",
					color: "inherit",
				},
			},
			"& a": {
				width: "100%",
				"& button": {
					width: "100%",
				},
			},
		},
	},
	productName: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "flex-end",
		alignItems: "center",
		"@media(max-width: 480px)": {
			fontSize: "14px",
			"& span": {
				paddingLeft: "0px",
			},
		},
	},
});
