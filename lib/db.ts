import { db } from "@/config/firebase-Config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export interface ListItem {
  id: number;
  name: string;
  description: string;
  url: string;
  completed: boolean;
}

export interface List {
  id?: string;
  email: string;
  username: string;
  list: ListItem[];
}

export const getListByEmail = async (email: string): Promise<List[]> => {
  try {
    const q = query(collection(db, "lijsten"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    // Map the results to your interface
    const results: List[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        email: data.email,
        list: data.list,
      } as List;
    });

    return results; // Return the array of MyInterface objects
  } catch (error) {
    console.error(error);
    return []; // Return an empty array on error
  }
};

export const addList = async (list: Omit<List, "id">) => {
  try {
    const listRef = collection(db, "lijsten");

    const docRef = await addDoc(listRef, {
      email: list.email,
      username: list.username,
      list: list.list,
    });

    console.log("List added successfully! ", docRef.id);
  } catch (error) {
    console.error("Error adding list to Firestore: ", error);
  }
};

export const updateListById = async (
  listId: string, // The ID of the document to update
  updatedFields: Partial<{ email: string; username: string; list: any[] }>
) => {
  try {
    const docRef = doc(db, "lijsten", listId);

    await updateDoc(docRef, updatedFields);

    console.log(`Document with ID ${listId} updated successfully!`);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const deleteListById = async (listId: string) => {
  try {
    const docRef = doc(db, "lijsten", listId);

    await deleteDoc(docRef);

    console.log(`Document with ID ${listId} has been deleted successfully!`);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
