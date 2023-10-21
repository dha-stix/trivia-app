import { Text, TextInput, View, Pressable, Alert } from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getUserProfile, saveUserProfile } from "../utils/lib";
import { styles } from "../styles/authScreen";
import { useFonts } from "expo-font";

export default function Login() {
	const [email, onChangeEmail] = useState("");
	const [password, onChangePassword] = useState("");

	const [fontsLoaded] = useFonts({
		extrabold: require("../assets/fonts/Ubuntu-Bold.ttf"),
		bold: require("../assets/fonts/Ubuntu-Medium.ttf"),
		normal: require("../assets/fonts/Ubuntu-Regular.ttf"),
		light: require("../assets/fonts/Ubuntu-Light.ttf"),
	});

	useLayoutEffect(() => {
		const checkAuthStatus = async () => {
			const userData = await getUserProfile();
			if (userData) return router.replace("/tabs/home");
		};
		checkAuthStatus();
	}, []);

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, email.toLowerCase(), password)
			.then((userCredential) => {
				router.push("/tabs/home");
				saveUserProfile(userCredential.user);
			})
			.catch((error) => {
				Alert.alert("Invalid Credentials", "Please kindly try again!");
			});
	};

	if (!fontsLoaded) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				<Text style={styles.heading}>Welcome Back</Text>
				<Text style={styles.subHeading}>
					Hello there 👋🏻, sign in to continue
				</Text>

				<Text style={styles.label}>Your email</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='Email address'
						value={email}
						onChangeText={onChangeEmail}
						autoCorrect={false}
					/>
					<SimpleLineIcons
						name='envelope'
						size={24}
						color='#000'
						style={styles.icon}
					/>
				</View>
				<Text style={styles.label}>Your password</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='Password'
						value={password}
						secureTextEntry={true}
						onChangeText={onChangePassword}
						autoCorrect={false}
					/>
					<Feather name='lock' size={24} color='black' style={styles.icon} />
				</View>
				<Pressable
					style={{ width: "100%", marginBottom: 7 }}
					onPress={handleLogin}
				>
					<View style={styles.buttonContainer}>
						<Text style={styles.button}>Log in</Text>
					</View>
				</Pressable>

				<Text style={styles.link}>
					Don't have an account?{" "}
					<Link href={{ pathname: "/register" }} style={{ color: "#9333ea" }}>
						Register
					</Link>
				</Text>
			</View>
		);
	}
}
