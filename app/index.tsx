import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { clearUser, setFirebaseUser } from "../store/slices/user.slice";
import { User, onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { firebaseUser } = useAppSelector((state) => state.user);

  onAuthStateChanged(FirebaseAuth, () => {
    if (firebaseUser) {
      dispatch(setFirebaseUser(firebaseUser.toJSON() as User));
      router.replace("/tabs/profile"); // Use replace to avoid adding to history stack
    } else {
      dispatch(clearUser());
      router.replace("/auth/login");
    }
  });

  return null;
};

export default Index;
