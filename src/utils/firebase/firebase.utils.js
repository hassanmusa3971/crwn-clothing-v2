import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHWV9JnYRweadk3dg6h93lSzVQOmiYH04",
  authDomain: "crwn-clothing-db-2b53e.firebaseapp.com",
  projectId: "crwn-clothing-db-2b53e",
  storageBucket: "crwn-clothing-db-2b53e.appspot.com",
  messagingSenderId: "1083549921091",
  appId: "1:1083549921091:web:bd3d547eea9fedcdf789f6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore(firebaseApp)

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    if(!userSnapshot.exists()){
        const{ displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email, 
                createdAt
            })
        } catch (error) {
            console.log("Error creating the user", error.message)
        }
    }

    return userDocRef;
}