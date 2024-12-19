import { auth } from "@/config/firebase-Config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
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

export const UpdateUsername = async (username: string) => {
  try {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
  } catch (error) {
    console.error(error);
  }
};

export const GetUser = () => {
  return auth.currentUser;
};

export const GetUserEmail = () => {
  if (!auth.currentUser) return "";
  if (!auth.currentUser.email) return "";
  return auth.currentUser.email;
};

export const GetUserName = () => {
  if (!auth.currentUser) return "username";
  if (!auth.currentUser.displayName) return "username";
  return auth.currentUser.displayName;
};
