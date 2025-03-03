import { Redirect, useRouter } from 'expo-router'
import { useAppDispatch } from 'features/hooks'
import { useAsyncStorage } from '@hooks/useAsyncStorage/useAsyncStorage'
import { useEffect } from 'react'
import { setStoredUser } from '@store/user/user.slice'

const Index = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { getStoredUser } = useAsyncStorage()

  useEffect(() => {
    const initializeUser = async () => {
      const storedUser = await getStoredUser()
      if (storedUser) {
        dispatch(setStoredUser(storedUser))
        router.replace('/(tabs)/profile')
      } else {
        router.replace('/(auth)/login')
      }
    }

    initializeUser()
  }, [])

  return <Redirect href={'/(tabs)'} />
}

export default Index
