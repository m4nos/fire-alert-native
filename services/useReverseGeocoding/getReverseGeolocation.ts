export const getReverseGeolocation = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    if (response.ok) {
      const data = await response.json();
      const { address } = data;
      return address;
    }
    throw new Error('No results found');
  } catch (error) {
    console.error('Error during reverse geocoding:', error);
    throw error;
  }
};
