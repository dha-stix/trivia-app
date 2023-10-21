import { Text, View, ScrollView } from "react-native";
import {
	FontAwesome,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import React, { useState, useLayoutEffect, useCallback } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
import { styles } from "../../styles/profileScreen";
import { getUserProfile } from "../../utils/lib";

const Profile = () => {
	const [user, setUser] = useState({});
	const [totalScore, setTotalScore] = useState(0);
	const [loading, setLoading] = useState(true);
	const [attempts, setAttempts] = useState([]);

	const updateUIData = useCallback(async () => {
		try {
			const value = await getUserProfile();
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
	}, [user]);

	useLayoutEffect(() => {
		updateUIData();
	}, [updateUIData]);

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

			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
								<Text style={{ fontSize: 20, fontFamily: "bold" }}>
									{t.score < 10 ? `0${t.score}` : t.score}
								</Text>
							</View>
						</View>
					))}
			</ScrollView>
		</View>
	);
};

export default Profile;
