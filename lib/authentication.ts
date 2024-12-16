import { auth } from "@/config/firebase-Config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const Register = async (email: string, password: string) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user.user;
};

export const Login = async (email: string, password: string) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user.user;
};

export const Logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const GetUser = () => {
  return auth.currentUser;
};
