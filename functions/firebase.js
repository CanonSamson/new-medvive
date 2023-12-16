import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

export const createDB = async (collectionName, Id, Data) => {
  try {
    await setDoc(doc(db, collectionName, Id), Data);
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateDB = async (collectionName, Id, Data) => {
  try {
    await updateDoc(doc(db, collectionName, Id), Data);
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getCollectionDB = async (collectionName) => {
  try {
    const data = await getDocs(collection(db, collectionName));
    const Data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { Data };
  } catch (err) {
    console.error(err);
    return err;
  }
};

const deleteDB = async (db, collectionName, documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getDB = async (collectionName, documentId) => {
  try {
    const dataDoc = await getDoc(doc(db, collectionName, documentId));
    const data = dataDoc.data();
    return { data };
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const createOrUpdateDB = async (
  collectionName,
  documentId,
  Data,
  dataPropertyName
) => {
  try {
    const dataDoc = await getDoc(doc(db, collectionName, documentId));

    if (!dataDoc.exists()) {
      // Create the document
      await setDoc(doc(db, collectionName, documentId), Data);
    } else {
      // Update user's chat information
      const data = dataDoc.data();

      // Check if the dataPropertyName exists and is an array
      if (!Array.isArray(data[dataPropertyName])) {
        data[dataPropertyName] = [];
      }

      await updateDoc(doc(db, collectionName, documentId), {
        [dataPropertyName]: [
          ...data[dataPropertyName],
          ...Data[dataPropertyName],
        ],
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const UpdateFunction = async (
  collectionName,
  user,
  newData,
  data,
  dataPropertyName
) => {
  let Data;
  if (data) {
    Data = [...data, newData];
  } else {
    Data = [newData];
  }

  await updateDB(collectionName, user.id, {
    [dataPropertyName]: Data,
  });
};
