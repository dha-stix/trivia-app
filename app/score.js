import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";

const Score = () => {
	const { score } = useLocalSearchParams();

	return (
		<View style={styles.container}>
			<View style={styles.scoreContainer}>
				<Text style={styles.score}>{score}</Text>
			</View>
			<Text style={styles.text}>
				{score < 15 ? "Sorry, you scored!" : "Congratulations! You scored!"}
			</Text>
			<Pressable onPress={() => router.push("/tabs/home")}>
				<Text
					style={{
						fontFamily: "normal",
						fontSize: 18,
						color: "#a855f7",
					}}
				>
					Go Home
				</Text>
			</Pressable>
		</View>
	);
};

export default Score;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#faf5ff",
	},
	scoreContainer: {
		backgroundColor: "#6b21a8",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontFamily: "normal",
		fontSize: 24,
		textAlign: "center",
		marginBottom: 10,
	},
	score: {
		fontFamily: "extrabold",
		fontSize: 40,
		color: "#fff",
	},
});
