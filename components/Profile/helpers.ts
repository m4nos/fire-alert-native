import { AppUser } from '@store/user/user.types';

export const mapUserDataToInitialValues = (userData: AppUser) => ({
  email: userData.email || '',
  userName: userData.userName || '',
  phoneNumber: userData.phoneNumber || '',
  location: userData.location || { latitude: 0, longitude: 0 },
  equipment: {
    car: userData.equipment?.car || '',
  },
});
