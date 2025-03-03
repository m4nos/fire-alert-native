import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';

const USER_KEY = 'user';

export const useAsyncStorage = () => {
  const saveUser = async (user: User) => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

    const getStoredUser = async (): Promise<User | null> => {
      try {
        const user = await AsyncStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
      } catch (error) {
        console.error('Error getting user:', error);
        return null;
      }
    };

    const removeUser = async () => {
      try {
        await AsyncStorage.removeItem(USER_KEY);
      } catch (error) {
        console.error('Error removing user:', error);
      }
    };

    return { saveUser, getStoredUser, removeUser };
}
