import { useRouter } from "expo-router";
import { useAppSelector } from "../store/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase";

const Index = () => {
  const router = useRouter();
  const { firebaseUser } = useAppSelector((state) => state.user);

  onAuthStateChanged(FirebaseAuth, () => {
    if (firebaseUser) {
      router.replace("/(tabs)/profile"); // Use replace to avoid adding to history stack
    } else {
      router.replace("/(auth)/login");
    }
  });

  return null;
};

export default Index;
