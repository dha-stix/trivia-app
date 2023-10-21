// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { EmailAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
	apiKey: "******",
	authDomain: "*****",
	projectId: "****",
	storageBucket: "techit-app-744f1.appspot.com",
	messagingSenderId: "912914838628",
	appId: "1:912914838628:web:912c987d0ff797e08c5b71",
	measurementId: "G-118YS2ST8K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new EmailAuthProvider();
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
export { provider, auth, db };
