import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	header: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	timer: {
		fontSize: 30,
		fontWeight: "bold",
		marginLeft: 4,
		fontFamily: "extrabold",
	},
	question: {
		fontSize: 26,
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: "bold",
	},
	questionContainer: {
		width: "100%",
		backgroundColor: "#d8b4fe",
		minHeight: 200,
		padding: 13,
		borderRadius: 7,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 30,
		position: "relative",
	},
	answerContainer: {
		width: "100%",
		borderRadius: 10,
		justifyContent: "center",
		padding: 20,
		marginBottom: 20,
	},
	button: {
		padding: 15,
		marginTop: 30,
		maxWidth: 150,
		alignItems: "center",
		borderRadius: 4,
	},
	buttonText: {
		fontFamily: "normal",
		color: "#fff",
		fontSize: 18,
	},
});
