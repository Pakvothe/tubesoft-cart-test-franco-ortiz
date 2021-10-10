import React, { useCallback, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link, useHistory } from "react-router-dom";
import Cart from "../../assets/cart.svg";

const Navbar = () => {
	const classes = useStyles();
	const [path] = useState(window.location.pathname);
	const history = useHistory();
	const handleOnClick = useCallback(() => history.push("/"), [history]);

	return (
		<nav className={classes.navbarContainer}>
			<img src={Cart} alt="cart" onClick={handleOnClick} />
			<h1 onClick={handleOnClick}>Tubesoft Cart </h1>
			{path !== "/cart" && <Link to="/cart">go to Cart</Link>}
		</nav>
	);
};

export default Navbar;

const useStyles = makeStyles({
	navbarContainer: {
		height: "80px",
		width: "100%",
		background: "linear-gradient(90deg, rgba(59,69,116,1) 0%, rgba(113,114,166,1) 100%)",
		display: "flex",
		alignItems: "center",
		padding: "0 30px",
		"& img": {
			width: "40px",
			height: "40px",
			marginRight: "10px",
			cursor: "pointer",
		},
		"& h1": {
			color: "#fafafa",
			cursor: "pointer",
		},
		"& a": {
			marginLeft: "auto",
			display: "flex",
			alignItems: "center",
			textDecoration: "none",
			cursor: "pointer",
			textTransform: "uppercase",
			padding: "10px 20px",
			backgroundColor: "#fafafa",
			color: "#e67ad0",
			fontWeight: "600",
			fontSize: "14px",
			boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
		},
		"@media(max-width: 480px)": {
			padding: "25px 20px",
			"@media(max-width: 320px)": {
				padding: "25px 15px",
			},
			"& img": {
				width: "30px",
				height: "30px",
				marginRight: "10px",
			},
			"& h1": {
				fontSize: "20px",
			},
			"& a": {
				padding: "10px 15px",
				fontSize: "12px",
			},
		},
	},
});
