import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveBackgroundColor: "#EEEDED",
				tabBarActiveTintColor: "#581c87",
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name='home' size={24} color={color} />
					),
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name='profile'
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name='user-alt' size={24} color={color} />
					),
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name='leaderboard'
				options={{
					title: "Leader board",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name='leaderboard' size={24} color={color} />
					),
				}}
			></Tabs.Screen>
		</Tabs>
	);
};
