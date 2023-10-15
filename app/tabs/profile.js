import { StyleSheet, Text, View, ScrollView } from "react-native";
import {
	FontAwesome,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import React, { useState, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
import {
	useFonts,
	Lato_100Thin,
	Lato_300Light,
	Lato_400Regular,
	Lato_700Bold,
	Lato_900Black,
} from "@expo-google-fonts/lato";

const Profile = () => {
	const [user, setUser] = useState({});
	const [totalScore, setTotalScore] = useState(0);
	const [loading, setLoading] = useState(true);
	const [attempts, setAttempts] = useState([]);
	let [fontsLoaded] = useFonts({
		Lato_100Thin,
		Lato_300Light,
		Lato_400Regular,
		Lato_700Bold,
		Lato_900Black,
	});

	const runBeforeMount = async () => {
		try {
			const value = await AsyncStorage.getItem("user");
			if (value !== null) {
				const userDetails = JSON.parse(value);
				setUser(userDetails);
				const docRef = doc(db, "users", userDetails.uid);
				getDoc(docRef)
					.then((data) => {
						const userDB = data.data();
						if (userDB !== undefined) {
							setTotalScore(userDB.totalScore);
							setAttempts(userDB.attempts);
							setLoading(false);
						}
					})
					.catch((err) => console.error(err));
			}
		} catch (e) {
			console.error(e);
		}
	};

	useLayoutEffect(() => {
		runBeforeMount();
	}, [user]);

	if (!fontsLoaded) {
		return null;
	} else {
		return (
			<View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
				<Text style={styles.heading}>Your Profile</Text>

				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<View style={styles.avatar}>
						<FontAwesome name='user' size={68} color='#723881' />
					</View>
					<Text style={styles.username}>{user.email}</Text>
					<View style={styles.scoreContainer}>
						<MaterialIcons name='stars' size={30} color='#6b21a8' />
						<Text style={styles.score}>{totalScore}</Text>
					</View>
					<Text style={styles.attemptTitle}>Recent attempts</Text>
				</View>

				<ScrollView style={{ height: 500 }}>
					{!loading &&
						attempts.map((t, index) => (
							<View style={styles.attempts} key={index}>
								<View style={{ flexDirection: "row" }}>
									<MaterialCommunityIcons
										name='shield-star'
										size={28}
										color='#f59e0b'
									/>
									<Text style={styles.date}>{t.date}</Text>
								</View>
								<View style={styles.dateScore}>
									<Text style={{ fontSize: 20, fontFamily: "Lato_700Bold" }}>
										{t.score < 10 ? `0${t.score}` : t.score}
									</Text>
								</View>
							</View>
						))}
				</ScrollView>
			</View>
		);
	}
};

export default Profile;

const styles = StyleSheet.create({
	heading: {
		fontSize: 30,
		textAlign: "center",
		fontWeight: "bold",
		color: "#6b21a8",
		marginBottom: 30,
		fontFamily: "Lato_700Bold",
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
		fontFamily: "Lato_400Regular",
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
		fontFamily: "Lato_700Bold",
	},
	attemptTitle: {
		fontSize: 18,
		marginBottom: 20,
		fontFamily: "Lato_300Light",
	},
	date: {
		fontSize: 20,
		marginLeft: 10,
		fontFamily: "Lato_400Regular",
	},
	dateScore: { backgroundColor: "white", padding: 10, borderRadius: 7 },
});
