import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Navbar from "../navbar";
import Footer from "../footer";
import { useSelector, useDispatch } from "react-redux";
import { getList, setSavedCart, removeFromHistory, getAllProduct } from "../../redux/actions";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const CartList = () => {
	const classes = useStyles();
	const history = useSelector((state) => state.history);
	const products = useSelector((state) => state.products);
	const dispatch = useDispatch();
	const goTo = useHistory();
	const MySwal = withReactContent(Swal);
	useEffect(() => {
		dispatch(getList());
		!products.length && dispatch(getAllProduct());
		// eslint-disable-next-line
	}, []);

	const setCart = (prod) => {
		dispatch(setSavedCart(prod));
		toast.success("The shopping cart was restored!", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		goTo.push("/cart");
	};

	const deleteCart = (itemID) => {
		MySwal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#36d982",
			iconColor: "#e67ad0",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`http://localhost:3001/carts/${itemID}`)
					.then((data) => {
						console.log("status:", data.status, data.data);
						dispatch(removeFromHistory(itemID));
					})
					.catch((err) =>
						toast.error("The shopping cart was not deleted!", {
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						})
					);
				toast.success("The Shopping cart was removed from history!", {
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

	return (
		<div className={classes.container}>
			<Navbar />
			<div className={classes.listContainer}>
				<h2>Cart history</h2>
				{history.length > 0 ? (
					history.map((item, index) => {
						const arrayIndex = history.length - 1;
						return (
							<div key={item.id}>
								<div>
									<span
										className={classes.deleteButton}
										onClick={() => deleteCart(item.id)}
									>
										ⓧ
									</span>
									<label>{item.createDate}</label>{" "}
									<button onClick={() => setCart(item.cartProducts)}>set cart</button>
								</div>

								{index !== arrayIndex && <div className={classes.divider} />}
							</div>
						);
					})
				) : (
					<h1 className={classes.emptyMessage}>Empty history</h1>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default CartList;

const useStyles = makeStyles({
	container: {
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		color: "#7C7B7C",
	},
	listContainer: {
		flex: "1",
		minHeight: "100%",
		display: "flex",
		flexDirection: "column",
		padding: "30px",
		"@media(max-width: 480px)": {
			padding: "15px",
		},
		"& h2": {
			padding: "15px 0",
			textTransform: "uppercase",
			color: "#36d982",
		},
		"& div": {
			"& div": {
				display: "flex",
				alignItems: "center",
				marginBottom: "25px",
				"& span": {
					color: "red",
					marginRight: "20px",
					fontSize: "20px",
					cursor: "pointer",
				},
				"& label": {
					margin: "0 20px 0 0",
				},
				"& button": {
					cursor: "pointer",
					color: "#e67ad0",
					width: "100px",
					padding: "10px 0",
					background: "transparent",
					alignItems: "center",
					justifyContent: "center",
					border: "2px solid #e67ad0",
					fontSize: "12px",
					fontWeight: "600",
					textTransform: "uppercase",
				},
			},
		},
	},
	divider: {
		width: "100%",
		height: "2px",
		background: "linear-gradient(90deg, rgba(231,242,248,1) 0%, rgba(54,217,130,1) 100%)",
		margin: "15px 0",
	},
	emptyMessage: {
		height: "100%",
		margin: "auto",
		textTransform: "uppercase",
		color: "#7C7B7C",
	},
});
