const { db } = require("@/firebase-config");
const { getDoc, doc } = require("firebase/firestore");
const { updateDB } = require("./firebase");

export const seenConsultation = async ({ uid, consultationId, consultations }) => {
  const timestamp = new Date();

  let foundIndex;

  if (consultations) {
    let consultationsCopy = [...consultations]; // Make a copy of the array

    const consultation = consultationsCopy.find(
      (i) => i.consultationId == consultationId
    );
    foundIndex = consultationsCopy.indexOf(consultation);


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
