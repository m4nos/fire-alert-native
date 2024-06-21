import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearUser, fetchAppUser } from "../store/slices/user.slice";
import { User, onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase";

const Index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { firebaseUser } = useAppSelector((state) => state.user);

  onAuthStateChanged(FirebaseAuth, () => {
    if (firebaseUser) {
      router.replace("/(tabs)/profile"); // Use replace to avoid adding to history stack
    } else {
      dispatch(clearUser());
      router.replace("/(auth)/login");
    }
  });

  return null;
};

export default Index;
