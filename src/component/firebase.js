import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword,
GoogleAuthProvider, signInWithEmailAndPassword ,
signInWithRedirect, signOut, onAuthStateChanged, sendPasswordResetEmail} from "firebase/auth";
import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore"






const firebaseConfig = {
  apiKey: "AIzaSyCje8CznhGXApB1t6HjnBt54hcYTFJn430",
  authDomain: "taskly-a6c51.firebaseapp.com",
  projectId: "taskly-a6c51",
  storageBucket: "taskly-a6c51.appspot.com",
  messagingSenderId: "1053608259988",
  appId: "1:1053608259988:web:c59956eb2070d60a361f81"
};


const app = initializeApp(firebaseConfig);
const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth();
export const createGoogleUserAuth = () => signInWithPopup(auth, GoogleProvider);
export const createGoogleUserAuthEandP = () => signInWithRedirect(auth, GoogleProvider);
export const resetPassWord = (email) => sendPasswordResetEmail(auth, email);

const db = getFirestore();


export const createUserDocRef = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInfo
            })
        } catch (error) {
            console.log("catching error creating user", error.message)
        }
    }

    return userDocRef

}

export const createUserwithEandP = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email, password)
}

export const signInUserwithEandP = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth,email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)