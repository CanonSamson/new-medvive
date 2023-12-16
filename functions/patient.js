import { auth, db } from "@/firebase-config";
import { doc, getDoc } from "firebase/firestore";

export async function getPatient() {
  let uid = auth?.currentUser?.uid;
  if (!uid) return null; // Return null if the user is not authenticated

  try {
    const docRef = doc(db, "patients", uid);
    const data = await getDoc(docRef);
    const patient = data.data(); // Use data() to get the document data
    console.log(patient);
    return { patient }; // Return the patient data
  } catch (error) {
    console.error("Error occurred while fetching data", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}
