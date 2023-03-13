// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDqfzZyOB46FNe39tJBjvCgMfwnGukIkQM",
  authDomain: "fir-auth-b9a30.firebaseapp.com",
  projectId: "fir-auth-b9a30",
  storageBucket: "fir-auth-b9a30.appspot.com",
  messagingSenderId: "882289865658",
  appId: "1:882289865658:web:59d51d8b9eee80d8796383"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const fbAuth = getAuth(app);
export const fbApp = app;

export const googleProvider = new GoogleAuthProvider();
export const gitHubProvider = new GithubAuthProvider();
