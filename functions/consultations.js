const { db } = require("@/firebase-config");
const { getDoc, doc } = require("firebase/firestore");
const { updateDB } = require("./firebase");

export const seenConsultation = async (uid, consultationId, consultations) => {
  const timestamp = new Date();

  let data;
  const dataDoc = await getDoc(doc(db, "consultations", uid));
  data = dataDoc.exists() ? dataDoc.data() : null;
  let foundIndex;

  if (data) {
    let consultationsCopy = [...consultations]; // Make a copy of the array

    const consultation = foundIndex.find(
      (i) => i.consultationId == consultationId
    );
    foundIndex = foundIndex.indexOf(consultation);

    // Check if both bookings were found
    if (foundIndex !== -1) {
      consultationsCopy[foundIndex].messageStatus = "seen";
      consultationsCopy[foundIndex].seenAt = timestamp;
    }
    try {
      if (consultations?.length > 0) {
        updateDB("consultations", uid, {
          data: consultationsCopy,
        });
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }
};
