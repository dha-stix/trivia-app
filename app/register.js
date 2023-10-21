import { Text, TextInput, View, Pressable, Alert } from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { isValidEmail, saveUserProfile } from "../utils/lib";
import { styles } from "../styles/authScreen";

export default function Login() {
	const [email, onChangeEmail] = useState("");
	const [password, onChangePassword] = useState("");
	const [cpassword, onChangeCPassword] = useState("");

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
