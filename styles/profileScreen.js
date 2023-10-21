import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	heading: {
		fontSize: 30,
		textAlign: "center",
		fontWeight: "bold",
		color: "#6b21a8",
		marginBottom: 30,
		fontFamily: "extrabold",
	},
	avatar: {
		backgroundColor: "#F1F1F1",
		paddingHorizontal: 25,
		paddingVertical: 15,
		borderRadius: 50,
		marginBottom: 5,
	},
	username: {
		fontWeight: "400",
		fontSize: 20,
		color: "#0a0a0a",
		marginBottom: 4,
		fontFamily: "normal",
	},
	attempts: {
		backgroundColor: "#e9d5ff",
		width: "100%",
		borderRadius: 7,
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
		justifyContent: "space-between",
	},
	scoreContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},
	score: {
		fontSize: 24,
		fontWeight: "600",
		marginLeft: 3,
		fontFamily: "bold",
	},
	attemptTitle: {
		fontSize: 18,
		marginBottom: 20,
		fontFamily: "light",
	},
	date: {
		fontSize: 20,
		marginLeft: 10,
		fontFamily: "normal",
	},
	dateScore: { backgroundColor: "white", padding: 10, borderRadius: 7 },
});
