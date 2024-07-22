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
    console.log('run');
    if (response.ok) {
      const data = await response.json();
      const { address } = data;
      const district: string = address.state_district || address.state;
      console.log('run');
      return district;
    }
    throw new Error('No results found');
  } catch (error) {
    console.error('Error during reverse geocoding:', error);
    throw error;
  }
};
