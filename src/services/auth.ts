import { auth } from "@/firebase/firebase";
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { logErrorToFirestore } from "./errorLog";

const provider = new GoogleAuthProvider();

export const handleGoogleSignIn = async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error(error);
    logErrorToFirestore(error);
    return signInWithPopup(auth, provider);
  }
};
