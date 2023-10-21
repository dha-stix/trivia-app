import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getCurrentDate = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0");
	const day = String(currentDate.getDate()).padStart(2, "0");
	return `${day}-${month}-${year}`;
};

export const isValidEmail = (text) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(text);
};

export const topics = [
	{
		id: "html",
		topic: "HTML",
		url: "https://raw.githubusercontent.com/dha-stix/trivia-app/main/questions/html.json",
	},
	{
		id: "css",
		topic: "CSS",
		url: "https://raw.githubusercontent.com/dha-stix/trivia-app/main/questions/css.json",
	},
	{
		id: "sql",
		topic: "SQL",
		url: "https://raw.githubusercontent.com/dha-stix/trivia-app/main/questions/sql.json",
	},
	{
		id: "javascript",
		topic: "JavaScript",
		url: "https://raw.githubusercontent.com/dha-stix/trivia-app/main/questions/javascript.json",
	},
	{
		id: "programming",
		topic: "Programming",
		url: "https://raw.githubusercontent.com/dha-stix/trivia-app/main/questions/prog.json",
	},
	{
		id: "dsa",
		topic: "Data Structures & Algorithms",
		url: "https://raw.githubusercontent.com/dha-stix/trivia-app/main/questions/dsa.json",
	},
	{
		id: "ui-design",
		topic: "UI Design",
		url: "https://raw.githubusercontent.com/dha-stix/trivia-app/main/questions/ui-design.json",
	},
];

export const saveUserProfile = (value) => {
	AsyncStorage.setItem("user", JSON.stringify(value)).catch((err) =>
		console.error(err)
	);
};

export const getUserProfile = async () => {
	try {
		const data = await AsyncStorage.getItem("user");
		return data;
	} catch (e) {
		console.error(err);
	}
};

export const storeSelectedTopics = async (selectedTopics) => {
	try {
		const questions = await getQuestions(selectedTopics);
		await AsyncStorage.setItem("questions", JSON.stringify(questions));
	} catch (e) {
		console.error(e);
	}
};

export const handleSignOut = async (router) => {
	await AsyncStorage.clear();
	router.push("/login");
};

export const updateOnboardingStatus = () => {
	AsyncStorage.setItem("onboarded", "true").catch((err) => console.error(err));
};

export const checkOnboardingStatus = async () => {
	try {
		const data = await AsyncStorage.getItem("onboarded");
		return data;
	} catch (e) {
		console.error(err);
	}
};

export const getQuestions = async (array) => {
	const selectedQuestions = topics.filter((obj) => array.includes(obj.topic));
	const endpoints = selectedQuestions.map((question) => question.url);

	try {
		const responses = await Promise.all(endpoints.map((url) => fetch(url)));

		const data = await Promise.all(
			responses.map(async (response) => {
				const jsonResponse = await response.json();
				const shuffledData = jsonResponse.questions
					.sort(() => Math.random() - 0.5)
					.slice(0, 10);
				return shuffledData;
			})
		);
		const questions = [].concat(...data);
		return questions;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

export const fetchLeaderboard = async () => {
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
	return leaderboard;
};
