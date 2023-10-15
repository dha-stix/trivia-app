import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	Alert,
} from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { isValidEmail, saveUserProfile } from "../utils/lib";
import {
	useFonts,
	Lato_100Thin,
	Lato_300Light,
	Lato_400Regular,
	Lato_700Bold,
	Lato_900Black,
} from "@expo-google-fonts/lato";

export default function Login() {
	const [email, onChangeEmail] = useState("");
	const [password, onChangePassword] = useState("");
	const [cpassword, onChangeCPassword] = useState("");

	let [fontsLoaded] = useFonts({
		Lato_100Thin,
		Lato_300Light,
		Lato_400Regular,
		Lato_700Bold,
		Lato_900Black,
	});

	const handleSubmit = () => {
		if (password === cpassword && password.length >= 6 && isValidEmail(email)) {
			createUserWithEmailAndPassword(auth, email.toLocaleLowerCase(), password)
				.then((userCredential) => {
					saveUserProfile(userCredential.user);
					router.push("/tabs/home");
				})
				.catch((error) => {
					Alert.alert("Error❌", "Please, try again!");
				});
		} else if (!isValidEmail(email)) {
			Alert.alert("Invalid email", "Please check your email address.");
		} else {
			Alert.alert(
				"Invalid Password",
				"Password must match and have at least 6 characters "
			);
		}
	};

	if (!fontsLoaded) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				<Text style={[styles.heading]}>Create account</Text>
				<Text style={styles.subHeading}>Please enter your details</Text>

				<Text style={styles.label}>Your email</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='Email address'
						value={email}
						onChangeText={onChangeEmail}
						autoCorrect={false}
						inputMode='email'
						autoCapitalize='none'
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
						inputMode='text'
					/>
					<Feather name='lock' size={24} color='black' style={styles.icon} />
				</View>
				<Text style={styles.label}>Confirm password</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='Confirm password'
						value={cpassword}
						secureTextEntry={true}
						onChangeText={onChangeCPassword}
						autoCorrect={false}
						inputMode='text'
					/>
					<Feather name='lock' size={24} color='black' style={styles.icon} />
				</View>
				<Pressable
					style={{ width: "100%", marginBottom: 7 }}
					onPress={handleSubmit}
				>
					<View style={styles.buttonContainer}>
						<Text style={styles.button}>Register</Text>
					</View>
				</Pressable>

				<Text style={styles.link}>
					Already have an account?{" "}
					<Link href={{ pathname: "/" }} style={{ color: "#9333ea" }}>
						Sign in
					</Link>
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: "#fff",
		justifyContent: "center",
		padding: 24,
		backgroundColor: "#FDFFFC",
	},
	heading: {
		fontSize: 36,
		fontWeight: "700",
		color: "#5b21b6",
		textAlign: "center",
		marginBottom: 5,
		fontFamily: "Lato_900Black",
	},
	subHeading: {
		marginBottom: 40,
		textAlign: "center",
		fontSize: 18,
		fontFamily: "Lato_400Regular",
	},
	label: {
		fontSize: 18,
		fontFamily: "Lato_300Light",
		marginBottom: 10,
	},
	inputContainer: {
		width: "100%",
		flexDirection: "row",
		position: "relative",
		height: 75,
	},
	icon: {
		top: 15,
		left: 10,
	},
	input: {
		padding: 18,
		paddingLeft: 50,
		fontSize: 17,
		width: "100%",
		fontFamily: "Lato_400Regular",
		position: "absolute",
		borderRadius: 7,
		backgroundColor: "#f5f5f5",
		top: 0,
		left: 0,
	},
	buttonContainer: {
		backgroundColor: "#7e22ce",
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 7,
		marginBottom: 15,
	},
	button: {
		fontSize: 24,
		color: "white",
		textAlign: "center",
		fontFamily: "Lato_700Bold",
	},
	link: {
		fontSize: 18,
		fontFamily: "Lato_300Light",
		textAlign: "center",
	},
});
