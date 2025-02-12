export const useReverseGeolocation = async ({
  latitude,
  longitude
}: {
  latitude: number
  longitude: number
}) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          'User-Agent': 'FireAlertApp/1.0 (ben.jonson61@yahoo.com)',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      }
    )
    if (response.ok) {
      const data = await response.json()
      const { address } = data
      return address
    }
    throw new Error('No results found')
  } catch (error) {
    console.error('Error during reverse geocoding:', error)
    throw error
  }
}
