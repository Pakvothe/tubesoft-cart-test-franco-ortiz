import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const Footer = () => {
	const classes = useStyles();
	const [path] = useState(window.location.pathname);

	return (
		<footer className={classes.navbarContainer}>
			{path !== "/history" ? (
				<Link to="/history">
					<button>Cart Historial</button>
				</Link>
			) : (
				<Link to="/">
					<button>Back to shopping</button>
				</Link>
			)}
			<div>
				<p>
					Challenge by
					<a href="https://franco-ortiz.com/" target="_blank" rel="noopener noreferrer">
						Franco Ortiz
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;

const useStyles = makeStyles({
	navbarContainer: {
		height: "160px",
		width: "100%",
		background: "linear-gradient(90deg, rgba(59,69,116,1) 0%, rgba(113,114,166,1) 100%)",
		display: "flex",
		alignItems: "center",
		padding: "0 30px",
		"& button": {
			cursor: "pointer",
			textTransform: "uppercase",
			color: "#e67ad0",
			fontWeight: "600",
			boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
			padding: "10px",
			background: "transparent",
			border: "2px solid #e67ad0",
			marginRight: "14px",
			"& a": {
				textDecoration: "none",
				color: "inherit",
			},
		},
		"& div": {
			marginLeft: "auto",
			color: "#fafafa",

			"& a": {
				cursor: "pointer",
				color: "#e67ad0",
				marginLeft: "6px",
				textDecoration: "none",
				"&:hover": {
					color: "#e160c7",
				},
			},
		},
		"@media(max-width: 480px)": {
			height: "140px",
			padding: "0 20px",
			"& button": {
				padding: "8px 15px",
				marginRight: "20px",
			},
			"& div": {
				width: "100%",
			},
		},
		"@media(max-width: 320px)": {
			padding: "0 15px",
			"& button": {
				fontSize: "12px",
			},
			"& div": {
				fontSize: "14px",
			},
		},
	},
});
