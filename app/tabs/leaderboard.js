import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import {
	useFonts,
	Lato_400Regular,
	Lato_700Bold,
} from "@expo-google-fonts/lato";

const LeaderBoard = () => {
	const [leaderboard, setLeaderBoard] = useState([]);
	let [fontsLoaded] = useFonts({
		Lato_400Regular,
		Lato_700Bold,
	});

	useLayoutEffect(() => {
		const getLeaderboard = async () => {
			const q1 = query(
				collection(db, "users"),
				orderBy("totalScore", "desc"),
				limit(10)
			);
			const querySnapshot = await getDocs(q1);
			const leaderboard = [];
			querySnapshot.forEach((doc) => {
				leaderboard.push({
					email: doc.data().email,
					t_score: doc.data().totalScore,
				});
			});
			setLeaderBoard(leaderboard);
		};
		getLeaderboard();
	}, [leaderboard]);

	if (!fontsLoaded) {
		return null;
	} else {
		return (
			<View style={{ backgroundColor: "#fff", flex: 1, padding: 15 }}>
				<Text style={styles.heading}>Leaderboard</Text>
				<ScrollView style={{ height: 700 }}>
					{leaderboard.map((t) => (
						<View style={styles.leaders} key={t.email}>
							<View style={{ flexDirection: "row" }}>
								<FontAwesome5 name='medal' size={28} color='#f59e0b' />
								<Text
									style={{
										fontSize: 18,
										marginLeft: 10,
										fontFamily: "Lato_400Regular",
									}}
								>
									{t.email}
								</Text>
							</View>
							<View
								style={{
									backgroundColor: "white",
									padding: 10,
									borderRadius: 7,
								}}
							>
								<Text style={{ fontSize: 18, fontFamily: "Lato_400Regular" }}>
									{t.t_score}
								</Text>
							</View>
						</View>
					))}
				</ScrollView>
			</View>
		);
	}
};

export default LeaderBoard;

const styles = StyleSheet.create({
	heading: {
		fontSize: 30,
		textAlign: "center",
		fontWeight: "bold",
		color: "#6b21a8",
		marginBottom: 30,
		fontFamily: "Lato_700Bold",
	},
	leaders: {
		backgroundColor: "#e9d5ff",
		width: "100%",
		borderRadius: 7,
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
		justifyContent: "space-between",
	},
});
