import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";
import { useHistory } from "react-router";
import StarSvg from "../../assets/star.svg";
import { toast } from "react-toastify";

const ProductCard = ({ props }) => {
	const { id, name, img, price, stock, totalStock, rating } = props;
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const starSetter = () => {
		let stars = [];
		for (let i = 0; i < rating; i++) {
			stars.push(<img src={StarSvg} alt="star" key={id + i} />);
		}
		return stars;
	};

	const addProductToCart = (id) => {
		dispatch(addToCart(id));
		toast.success("Product added to shopping cart successfully!", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};
	return (
		<div className={stock === 0 && classes.Opacity}>
			<div className={classes.Container}>
				<img src={img} alt={`${id} cardImage`} className={classes.CardImage} />
				<div className={classes.ProductInfo}>
					<h3>{name}</h3>
					<div className={classes.starContainer}>{starSetter()}</div>
					<div>
						<p className={classes.priceText}>$ {price}</p>
						{stock > 0 ? (
							<label className={classes.succedLabel}>
								<label />
								<p>stock</p>
							</label>
						) : (
							<label className={classes.errorLabel}>
								<label />
								<p>out of stock</p>
							</label>
						)}
					</div>
				</div>
				{stock === totalStock && stock > 0 ? (
					<button className={classes.buttonAdd} onClick={() => addProductToCart(id)}>
						Add to cart
					</button>
				) : (
					stock === totalStock && (
						<button className={classes.buttonNoStock}>Out of stock</button>
					)
				)}
				{totalStock > stock && (
					<button className={classes.buttonGoTo} onClick={() => history.push("/cart")}>
						In cart
					</button>
				)}
			</div>
		</div>
	);
};

export default ProductCard;

const useStyles = makeStyles({
	Opacity: {
		opacity: "0.7 !important",
	},
	Container: {
		height: "350px",
		width: "250px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		margin: "10px",
		boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
	},
	CardImage: {
		width: "100%",
		height: "50%",
		objectFit: "fill",
	},
	ProductInfo: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "100%",
		width: "100%",
		padding: "0 10px",
		color: "#7C7B7C",
		"& h3": {
			fontSize: "18px",
			margin: "12px 0px",
			marginRight: "auto",
		},
		"& div": {
			width: "100%",
			display: "flex",
			justifyContent: "space-between",
			margin: "auto 0 20px 0",
		},
	},
	priceText: {
		fontSize: "20px",
	},
	succedLabel: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: "auto",
		color: "#36d982",

		"& label": {
			width: "10px",
			height: "10px",
			backgroundColor: "#36d982",
			borderRadius: "50%",
			marginRight: "4px",
		},
	},
	errorLabel: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: "auto",
		color: "#df4759",

		"& label": {
			width: "10px",
			height: "10px",
			backgroundColor: "#df4759",
			borderRadius: "50%",
			marginRight: "4px",
		},
	},
	buttonAdd: {
		cursor: "pointer",
		color: "#fafafa",
		width: "100%",
		display: "flex",
		padding: "14px 0",
		background: "#e67ad0",
		alignItems: "center",
		justifyContent: "center",
		border: "none",
		fontSize: "14px",
		fontWeight: "600",
		textTransform: "uppercase",
	},
	buttonGoTo: {
		cursor: "pointer",
		color: "#e67ad0",
		width: "100%",
		display: "flex",
		padding: "14px 0",
		background: "transparent",
		alignItems: "center",
		justifyContent: "center",
		border: "none",
		outline: "2px solid #e67ad0",
		outlineOffset: "-2px",
		fontSize: "14px",
		fontWeight: "600",
		textTransform: "uppercase",
	},
	buttonNoStock: {
		cursor: "pointer",
		color: "#7C7B7C",
		width: "100%",
		display: "flex",
		padding: "14px 0",
		background: "transparent",
		alignItems: "center",
		justifyContent: "center",
		border: "none",
		outline: "2px solid #7C7B7C",
		outlineOffset: "-2px",
		fontSize: "14px",
		fontWeight: "600",
		textTransform: "uppercase",
	},
	starContainer: {
		display: "flex",
		justifyContent: "flex-start !important",
		"& img": {
			width: "16px",
			height: "16px",
			marginRight: "10px",
		},
	},
});
