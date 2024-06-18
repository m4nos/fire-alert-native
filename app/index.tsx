import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { checkAuthStatus } from "../store/slices/user.slice";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const checkUserStatus = async () => {
      await dispatch(checkAuthStatus());
      if (user) {
        router.replace("/tabs/profile"); // Use replace to avoid adding to history stack
      } else {
        router.replace("/auth/login");
      }
    };

    checkUserStatus();
  }, [dispatch, user, router]);

  return null;
};

export default Index;
