import { StyleSheet } from "react-native";
import { fontSize } from "../utils/font";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: "#fff",
		justifyContent: "center",
		padding: 24,
		backgroundColor: "#FDFFFC",
	},
	heading: {
		fontSize: fontSize.xlg,
		fontWeight: "700",
		color: "#5b21b6",
		textAlign: "center",
		marginBottom: 5,
		fontFamily: "extrabold",
	},
	subHeading: {
		marginBottom: 40,
		textAlign: "center",
		fontSize: 18,
		fontFamily: "normal",
	},
	label: {
		fontSize: 18,
		marginBottom: 10,
		fontFamily: "light",
	},
	inputContainer: {
		width: "100%",
		flexDirection: "row",
		position: "relative",
		height: 70,
	},
	icon: {
		top: 15,
		left: 10,
	},
	input: {
		padding: 18,
		paddingLeft: 50,
		fontSize: 17,
		width: "100%",
		fontFamily: "light",
		position: "absolute",
		borderRadius: 7,
		backgroundColor: "#f5f5f5",
		top: 0,
		left: 0,
	},
	buttonContainer: {
		backgroundColor: "#7e22ce",
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 7,
		marginBottom: 15,
	},
	button: {
		fontSize: 24,
		color: "white",
		textAlign: "center",
		fontFamily: "extrabold",
	},
	link: {
		fontSize: 18,
		fontFamily: "light",
		textAlign: "center",
	},
});
