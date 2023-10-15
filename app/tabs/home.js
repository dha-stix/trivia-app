import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { getQuestions, topics } from "../../utils/lib";
import { router } from "expo-router";
import {
	useFonts,
	Lato_100Thin,
	Lato_300Light,
	Lato_400Regular,
	Lato_700Bold,
	Lato_900Black,
} from "@expo-google-fonts/lato";

const Home = () => {
	const [selectedTopics, setSelectedTopics] = useState([]);
	const [user, setUser] = useState({});
	const [username, setUsername] = useState("");
	let [fontsLoaded] = useFonts({
		Lato_100Thin,
		Lato_300Light,
		Lato_400Regular,
		Lato_700Bold,
		Lato_900Black,
	});

	const handleSelection = (topic) => {
		if (selectedTopics.includes(topic)) {
			const newSelection = selectedTopics.filter((item) => item !== topic);
			setSelectedTopics(newSelection);
		} else {
			if (selectedTopics.length < 4) {
				const newSelection = [...selectedTopics, topic];
				setSelectedTopics(newSelection);
			}
		}
	};

	const handleStartTest = () => {
		const storeSelectedTopics = async () => {
			try {
				const questions = await getQuestions(selectedTopics);
				await AsyncStorage.setItem("questions", JSON.stringify(questions));
			} catch (e) {
				console.error(e);
			}
		};
		storeSelectedTopics();
		Alert.alert("Start Test", "Are you sure?", [
			{
				text: "Cancel",
				style: "cancel",
				onPress: () => console.log("Cancelled"),
			},
			{ text: "Yes", onPress: () => router.push("/tests") },
		]);
	};

	const checkAuthStatus = async () => {
		try {
			const value = await AsyncStorage.getItem("user");
			if (value !== null) {
				const { email } = JSON.parse(value);
				setUsername(email.substring(0, 6));
			}
		} catch (e) {
			console.log(e);
		}
	};
	const handleSignOut = async () => {
		await AsyncStorage.clear();
		router.push("/");
	};

	useLayoutEffect(() => {
		checkAuthStatus();
	}, [user]);

	if (!fontsLoaded) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View>
						<Text style={styles.username}>Hi {username}</Text>
						<Text style={styles.greeting}>Welcome back</Text>
					</View>
					<Pressable style={styles.avatar} onPress={() => handleSignOut()}>
						<FontAwesome name='user' size={30} color='#723881' />
					</Pressable>
				</View>

				<View style={styles.section}>
					{selectedTopics.length !== 4 && (
						<View
							style={{
								marginBottom: 25,
							}}
						>
							<Text style={styles.headline}>Test yourself</Text>
							<Text
								style={{
									fontFamily: "Lato_300Light",
									fontSize: 16,
								}}
							>
								Select {selectedTopics.length} of 4 topics
							</Text>
						</View>
					)}

					{selectedTopics.length === 4 && (
						<Pressable style={styles.startSection} onPress={handleStartTest}>
							<View style={styles.startContainer}>
								<Text style={styles.startText}>START</Text>
								<Ionicons
									name='arrow-forward-circle'
									size={45}
									color='#E0E0E0'
								/>
							</View>

							<Text style={styles.startSubText}>Answer 40 questions</Text>
							<Text style={{ color: "#facc15", fontFamily: "Lato_300Light" }}>
								{selectedTopics.join(", ")}
							</Text>
						</Pressable>
					)}

					<ScrollView style={{ height: 400 }}>
						{topics.map((t) => {
							if (selectedTopics.includes(t.topic)) {
								return (
									<Pressable
										key={t.id}
										style={[
											styles.banner,
											{
												backgroundColor: "#581c87",
											},
										]}
										onPress={() => handleSelection(t.topic)}
									>
										<Text style={[styles.topic, { color: "#f5f5f5" }]}>
											{t.topic}
										</Text>
									</Pressable>
								);
							}
							return (
								<Pressable
									key={t.id}
									style={styles.banner}
									onPress={() => handleSelection(t.topic)}
								>
									<Text style={styles.topic}>{t.topic}</Text>
								</Pressable>
							);
						})}
					</ScrollView>
				</View>
			</View>
		);
	}
};

export default Home;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
	},
	username: {
		fontSize: 18,
		color: "#333",
		marginBottom: 3,
		fontFamily: "Lato_400Regular",
	},
	greeting: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#6b21a8",
		fontFamily: "Lato_700Bold",
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
		fontFamily: "Lato_700Bold",
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
		fontFamily: "Lato_700Bold",
	},
	startSubText: {
		fontSize: 19,
		color: "#f4f4f4",
		marginBottom: 7,
		fontFamily: "Lato_400Regular",
	},
	topic: {
		fontSize: 24,
		fontWeight: "bold",
		fontFamily: "Lato_700Bold",
	},
	section: {
		width: "100%",
		paddingHorizontal: 17,
		paddingVertical: 10,
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
