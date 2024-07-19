import { Redirect, useRouter } from "expo-router";
import { useAppSelector } from "../store/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase";

const Index = () => {
  const router = useRouter();
  const { firebaseUser } = useAppSelector((state) => state.user);

  onAuthStateChanged(FirebaseAuth, () => {
    if (firebaseUser) {
      router.replace("/(tabs)/profile"); // Use replace to delete history stack
    } else {
      router.replace("/(auth)/login");
    }
  });

  return <Redirect href={"/(tabs)"} />;
};

export default Index;
