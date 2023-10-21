import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useLayoutEffect, useState, useCallback } from "react";
import { fetchLeaderboard } from "../../utils/lib";

const LeaderBoard = () => {
	const [leaderboard, setLeaderBoard] = useState([]);

	const fetchLeaders = useCallback(async () => {
		const leaders = await fetchLeaderboard();
		setLeaderBoard(leaders);
	}, [leaderboard]);

	useLayoutEffect(() => {
		fetchLeaders();
	}, [fetchLeaders]);

	return (
		<View style={{ backgroundColor: "#fff", flex: 1, padding: 15 }}>
			<Text style={styles.heading}>Leaderboard</Text>
			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
				{leaderboard?.map((t) => (
					<View style={styles.leaders} key={t.email}>
						<View style={{ flexDirection: "row" }}>
							<FontAwesome5 name='medal' size={28} color='#f59e0b' />
							<Text
								style={{
									fontSize: 18,
									marginLeft: 10,
									fontFamily: "normal",
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
							<Text style={{ fontSize: 18, fontFamily: "normal" }}>
								{t.t_score}
							</Text>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default LeaderBoard;

const styles = StyleSheet.create({
	heading: {
		fontSize: 30,
		textAlign: "center",
		fontWeight: "bold",
		color: "#6b21a8",
		marginBottom: 30,
		fontFamily: "bold",
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
