import { auth } from "@/config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const Register = async (email: string, password: string) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user.user;
};

export const Login = async (email: string, password: string) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user.user;
};
