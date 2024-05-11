import { db } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

export const logErrorToFirestore = async (error: any) => {
  try {
    await addDoc(collection(db, "errors"), {
      error,
      time: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
