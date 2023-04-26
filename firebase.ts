import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getErrorMessage } from "./src/utils/getErrorMessage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: "shopping-app-v2-af858.firebaseapp.com",
  projectId: "shopping-app-v2-af858",
  storageBucket: "shopping-app-v2-af858.appspot.com",
  messagingSenderId: "217018412128",
  appId: "1:217018412128:web:a2f4b82be5a1ac9554a705",
  measurementId: "G-CYRRTBGNSF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const goopleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, goopleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.empty) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        authProvider: "google",
        photoURL: user.photoURL,
      });
    }
  } catch (err) {
    reportError({ message: getErrorMessage(err) });
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await updateProfile(user, { displayName: name });
  await addDoc(collection(db, "users"), {
    uuid: user.uid,
    name: name,
    authProvider: "local",
    email,
  });
};

const sendPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    reportError({ message: getErrorMessage(err) });
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logOut,
};
