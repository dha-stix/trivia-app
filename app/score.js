import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
	useFonts,
	Lato_400Regular,
	Lato_700Bold,
	Lato_900Black,
} from "@expo-google-fonts/lato";

const Score = () => {
	let [fontsLoaded] = useFonts({
		Lato_400Regular,
		Lato_700Bold,
		Lato_900Black,
	});

	const { score } = useLocalSearchParams();

	if (!fontsLoaded) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				<View style={styles.scoreContainer}>
					<Text
						style={{
							fontFamily: "Lato_900Black",
							fontSize: 40,
							color: "#fff",
						}}
					>
						{score}
					</Text>
				</View>
				<Text style={styles.score}>
					{score < 15 ? "Sorry, you scored!" : "Congratulations! You scored!"}
				</Text>
				<Pressable onPress={() => router.push("/tabs/home")}>
					<Text
						style={{
							fontFamily: "Lato_400Regular",
							fontSize: 18,
							color: "#a855f7",
						}}
					>
						Go Home
					</Text>
				</Pressable>
			</View>
		);
	}
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
	score: {
		fontFamily: "Lato_700Bold",
		fontSize: 24,
		textAlign: "center",
		marginBottom: 10,
	},
});
