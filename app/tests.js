import { Pressable, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebaseConfig";
import { setDoc, doc, getDoc, updateDoc } from "@firebase/firestore";
import { styles } from "../styles/testsScreen";
import { getCurrentDate } from "../utils/lib";

const tests = () => {
	const [questions, setQuestions] = useState([]);
	const [time, setTime] = useState(15);
	const [count, setCount] = useState(0);
	const [selectedBox, setSelectedBox] = useState(null);
	const [userAnswer, setUserAnswer] = useState("");
	const [userScore, setUserScore] = useState(0);
	const [user, setUser] = useState({});
	const [clicked, setClicked] = useState(false);
	const router = useRouter();

	const toggleColor = (index) => {
		setSelectedBox(index);
		setUserAnswer(questions[count].options[index]);
	};

	const saveData = async () => {
		try {
			const docRef = doc(db, "users", user?.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const prevData = docSnap.data();
				await updateDoc(docRef, {
					attempts: [
						...prevData.attempts,
						{ date: getCurrentDate(), score: userScore },
					],
					totalScore: prevData.totalScore + userScore,
				});
			} else {
				await setDoc(doc(db, "users", user?.uid), {
					attempts: [{ date: getCurrentDate(), score: userScore }],
					email: user?.email,
					totalScore: userScore,
				});
			}
			router.push({ pathname: "/score", params: { score: userScore } });
		} catch (err) {
			console.error(err);
		}
	};
	const nextFunction = () => {
		if (count < questions.length - 1) {
			if (questions[count].answer === userAnswer) {
				setUserScore(userScore + 1);
			}
			setCount(count + 1);
			setSelectedBox(null);
			setTime(15);
		} else {
			setClicked(true);
			saveData();
		}
	};

	useLayoutEffect(() => {
		if (time > 0) {
			const timerId = setInterval(() => {
				setTime((prevTime) => prevTime - 1);
			}, 1000);

			return () => clearInterval(timerId);
		} else if (time === 0) {
			nextFunction();
		}
	}, [time]);

	useLayoutEffect(() => {
		const getQuestions = async () => {
			try {
				const userData = await AsyncStorage.getItem("user");
				const userJSON = JSON.parse(userData);
				setUser(userJSON);

				const data = await AsyncStorage.getItem("questions");

				if (data) {
					const quesPack = JSON.parse(data);
					setQuestions(quesPack);
				} else {
					router.back();
				}
			} catch (e) {
				console.error(e);
			}
		};
		getQuestions();
	}, []);

	return (
		<View style={{ flex: 1, padding: 15 }}>
			<View style={styles.header}>
				<Pressable onPress={() => router.back()}>
					<MaterialIcons name='cancel' size={46} color='#723881' />
				</Pressable>

				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<AntDesign name='clockcircle' size={24} color='#7A57D1' />
					<Text style={styles.timer}>{time < 10 ? `0${time}` : time}</Text>
				</View>
				<Text style={{ fontSize: 20, fontFamily: "light" }}>
					{count + 1}/40
				</Text>
			</View>
			<View style={styles.questionContainer}>
				<Text style={styles.question}>{questions[count]?.question} </Text>
				<View style={{ position: "absolute", bottom: 15, right: 10 }}>
					<Text style={{ color: "#3b0764", fontFamily: "light" }}>
						{questions[count]?.category}
					</Text>
				</View>
			</View>

			{questions[count]?.options.map((item, index) => (
				<Pressable
					style={[
						styles.answerContainer,
						{
							backgroundColor: selectedBox === index ? "#581c87" : "#faf5ff",
						},
					]}
					onPress={() => toggleColor(index)}
					key={item}
				>
					<Text
						style={{
							fontSize: 20,
							color: selectedBox === index ? "#fff" : "#000",
							fontFamily: "light",
						}}
					>
						{item}
					</Text>
				</Pressable>
			))}

			<View style={{ width: "100%", alignItems: "center" }}>
				<Pressable
					style={[
						styles.button,
						{ backgroundColor: clicked ? "grey" : "green" },
					]}
					onPress={nextFunction}
				>
					<Text style={styles.buttonText}>
						{count === questions.length - 1 ? "Get Result" : "Save"}
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default tests;
