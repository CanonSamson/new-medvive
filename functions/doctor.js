import { auth, db } from "@/firebase-config";
import { doc, getDoc } from "firebase/firestore";

export async function getDoctor() {
  let uid = auth?.currentUser?.uid;
  if (!uid) return null; // Return null if the user is not authenticated

  try {
    const docRef = doc(db, "doctors", uid);
    const data = await getDoc(docRef);
    const doctor = data.data(); // Use data() to get the document data
    return { doctor }; // Return the patient data
  } catch (error) {
    console.error("Error occurred while fetching data", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}
