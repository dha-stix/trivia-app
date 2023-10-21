import {
	View,
	Image,
	Dimensions,
	Text,
	StyleSheet,
	Pressable,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { useLayoutEffect } from "react";
import { checkOnboardingStatus, updateOnboardingStatus } from "../utils/lib";

const { width } = Dimensions.get("window");

export default function Login() {
	const [fontsLoaded] = useFonts({
		extrabold: require("../assets/fonts/Ubuntu-Bold.ttf"),
		bold: require("../assets/fonts/Ubuntu-Medium.ttf"),
		normal: require("../assets/fonts/Ubuntu-Regular.ttf"),
		light: require("../assets/fonts/Ubuntu-Light.ttf"),
	});

	useLayoutEffect(() => {
		const checkStatus = async () => {
			const data = await checkOnboardingStatus();
			if (data !== null) router.replace("/login");
		};
		checkStatus();
	}, []);

	const handleSkip = () => {
		updateOnboardingStatus();
		router.replace("/login");
	};
	const handleDone = () => {
		updateOnboardingStatus();
		router.push("/login");
	};

	const doneButton = ({ ...props }) => {
		return (
			<Pressable {...props} style={styles.doneBtn}>
				<Text style={{ fontFamily: "normal" }}>Done</Text>
			</Pressable>
		);
	};

	if (!fontsLoaded) {
		return null;
	} else {
		return (
			<View style={{ flex: 1 }}>
				<Onboarding
					onDone={handleDone}
					onSkip={handleSkip}
					bottomBarHighlight={false}
					DoneButtonComponent={doneButton}
					containerStyles={{ padding: 15 }}
					titleStyles={{ fontFamily: "extrabold" }}
					subTitleStyles={{ fontFamily: "bold" }}
					pages={[
						{
							backgroundColor: "#F5F7F8",
							image: (
								<Image
									source={require("../assets/images/people.png")}
									alt='People'
									style={{ width: width * 0.9, height: width }}
								/>
							),
							title: "Test your skills",
							subtitle: "Show who you are",
						},
						{
							backgroundColor: "#E95793",
							image: (
								<Image
									source={require("../assets/images/time.png")}
									alt='Welcome'
									style={{ width: width * 0.9, height: width }}
								/>
							),
							title: "Take time tests",
							subtitle: "Answer 40 questions",
						},
						{
							backgroundColor: "#F9B572",
							image: (
								<Image
									source={require("../assets/images/ready.png")}
									alt='Ready'
									style={{ width: width * 0.9, height: width }}
								/>
							),
							title: "Rank Higher",
							subtitle: "Be your own boss",
						},
					]}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	doneBtn: {
		padding: 20,
		backgroundColor: "#fff",
		borderTopLeftRadius: 100,
		borderBottomLeftRadius: 100,
	},
});
