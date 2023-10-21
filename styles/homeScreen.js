import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
	},
	username: {
		fontSize: 18,
		color: "#333",
		marginBottom: 3,
		fontFamily: "normal",
	},
	greeting: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#6b21a8",
		fontFamily: "extrabold",
	},
	avatar: {
		backgroundColor: "#F1F1F1",
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 50,
	},
	header: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},
	headline: {
		fontWeight: "bold",
		fontSize: 24,
		fontFamily: "bold",
		marginBottom: 7,
	},
	startContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	startSection: {
		backgroundColor: "#723881",
		padding: 15,
		height: 200,
		justifyContent: "center",
		borderRadius: 7,
		marginBottom: 15,
	},
	startText: {
		fontSize: 34,
		color: "#f1f1f1",
		fontWeight: "bold",
		fontFamily: "bold",
	},
	startSubText: {
		fontSize: 19,
		color: "#f4f4f4",
		marginBottom: 7,
		fontFamily: "normal",
	},
	topic: {
		fontSize: 24,
		fontWeight: "bold",
		fontFamily: "bold",
	},
	section: {
		width: "100%",
		paddingHorizontal: 17,
		paddingVertical: 10,
		flex: 1,
	},
	banner: {
		backgroundColor: "#F5F5F5",
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 25,
		justifyContent: "center",
		marginBottom: 15,
	},
});
