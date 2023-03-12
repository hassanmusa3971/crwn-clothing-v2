import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, 
    signInWithPopup, GoogleAuthProvider,
     createUserWithEmailAndPassword,
      signInWithEmailAndPassword, 
      signOut, onAuthStateChanged } from "firebase/auth";
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore(firebaseApp)

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    if(!userSnapshot.exists()){
        const{ displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email, 
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log("Error creating the user", error.message)
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback)
  