import { Pressable, ScrollView, Text, View, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState, useCallback } from "react";
import {
	getUserProfile,
	handleSignOut,
	storeSelectedTopics,
	topics,
} from "../../utils/lib";
import { router } from "expo-router";
import { styles } from "../../styles/homeScreen";
import { useFonts } from "expo-font";

const Home = () => {
	const [selectedTopics, setSelectedTopics] = useState([]);
	const [user, setUser] = useState({});
	const [username, setUsername] = useState("");

	const [fontsLoaded] = useFonts({
		extrabold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
		bold: require("../../assets/fonts/Ubuntu-Medium.ttf"),
		normal: require("../../assets/fonts/Ubuntu-Regular.ttf"),
		light: require("../../assets/fonts/Ubuntu-Light.ttf"),
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

	const handleStartTest = async () => {
		await storeSelectedTopics(selectedTopics);
		Alert.alert("Start Test", "Are you sure?", [
			{
				text: "Cancel",
				style: "cancel",
				onPress: () => console.log("Cancelled"),
			},
			{ text: "Yes", onPress: () => router.push("/tests") },
		]);
	};

	const checkAuthStatus = useCallback(async () => {
		try {
			const value = await getUserProfile();
			if (value !== null) {
				const { email } = JSON.parse(value);
				setUsername(email.substring(0, 6));
			}
		} catch (e) {
			console.log(e);
		}
	}, [user]);

	useLayoutEffect(() => {
		checkAuthStatus();
	}, [checkAuthStatus]);

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
					<Pressable
						style={styles.avatar}
						onPress={() => handleSignOut(router)}
					>
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
									fontFamily: "light",
									fontSize: 16,
								}}
							>
								Select {selectedTopics.length} of 4 topics
							</Text>
						</View>
					)}

					{selectedTopics.length === 4 && (
						<Pressable
							style={styles.startSection}
							onPress={() => handleStartTest()}
						>
							<View style={styles.startContainer}>
								<Text style={styles.startText}>START</Text>
								<Ionicons
									name='arrow-forward-circle'
									size={45}
									color='#E0E0E0'
								/>
							</View>

							<Text style={styles.startSubText}>Answer 40 questions</Text>
							<Text style={{ color: "#facc15", fontFamily: "light" }}>
								{selectedTopics.join(", ")}
							</Text>
						</Pressable>
					)}

					<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
