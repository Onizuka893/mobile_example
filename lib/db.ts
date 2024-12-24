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
  getDoc,
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

// export const getListByEmail = async (email: string): Promise<List[]> => {
//   try {
//     const q = query(
//       collection(db, "lijsten"),
//       where("email", "==", email),
//       where("username", "==", email)
//     );
//     const querySnapshot = await getDocs(q);

//     // Map the results to your interface
//     const results: List[] = querySnapshot.docs.map((doc) => {
//       const data = doc.data();

//       return {
//         id: doc.id,
//         email: data.email,
//         username: data.username,
//         list: data.list,
//       } as List;
//     });

//     return results; // Return the array of MyInterface objects
//   } catch (error) {
//     console.error(error);
//     return []; // Return an empty array on error
//   }
// };

export const getListByEmailOrUsername = async (
  searchQuery: string
): Promise<List[]> => {
  try {
    // Query for email
    const emailQuery = query(
      collection(db, "lijsten"),
      where("email", "==", searchQuery)
    );

    // Query for username
    const usernameQuery = query(
      collection(db, "lijsten"),
      where("username", "==", searchQuery)
    );

    // Execute both queries
    const [emailSnapshot, usernameSnapshot] = await Promise.all([
      getDocs(emailQuery),
      getDocs(usernameQuery),
    ]);

    // Combine and deduplicate results
    const results: List[] = [
      ...(emailSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as List[]),
      ...(usernameSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as List[]),
    ];

    // Deduplicate results by document ID
    const uniqueResults = Array.from(
      new Map(results.map((item) => [item.id, item])).values()
    );

    return uniqueResults;
  } catch (error) {
    console.error("Error fetching lists:", error);
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

export const updateGetItemById = async (listId: string, itemId: number) => {
  try {
    // Reference to the Firestore document
    const docRef = doc(db, "lijsten", listId);

    // Fetch the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const listData = docSnap.data() as List;

      // Find and update the specific ListItem in the array
      const updatedList = listData.list.map((item) =>
        item.id === itemId ? { ...item, completed: true } : item
      );

      // Push the updated array back to Firestore
      await updateDoc(docRef, {
        list: updatedList,
      });

      console.log(`List item with id ${itemId} updated successfully!`);
    } else {
      console.error("No such document!");
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
};
