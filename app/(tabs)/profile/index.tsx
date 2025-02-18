import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { fetchAppUser, logout, updateAppUser } from '@store/user/user.thunk'
import {
  Button,
  SegmentedButtons,
  ActivityIndicator,
  Portal
} from 'react-native-paper'
import { Formik } from 'formik'
import ProfileInfo from '@components/Profile/ProfileInfo'
import EquipmentInfo from '@components/Profile/EquipmentInfo'
import { UserProfileFields } from '@components/Profile/ProfileInfo/types'
import { profileValidationSchema } from '@components/Profile/user.schema'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { mapUserDataToInitialValues } from '@components/Profile/helpers'
import { AppUser } from '@store/user/user.types'
import LoadingSpinner from '@components/LoadingSpinner'

const Profile = () => {
  const storeDispatch = useAppDispatch()
  const { firebaseUser, appUser, loading } = useAppSelector(
    (state) => state.userSlice
  )

  const [segmentation, setSegmentation] = useState('profile')
  const [initialValues, setInitialValues] = useState<UserProfileFields>({
    email: '',
    userName: '',
    phoneNumber: '',
    location: {
      latitude: 0,
      longitude: 0
    },
    equipment: {
      car: ''
    }
  })

  useEffect(() => {
    if (!appUser && firebaseUser) {
      storeDispatch(fetchAppUser(firebaseUser.uid)).then((user) =>
        setInitialValues(mapUserDataToInitialValues(user.payload as AppUser))
      )
    }
  }, [firebaseUser, appUser])

  const handleSubmit = async (values: UserProfileFields) => {
    await storeDispatch(updateAppUser(values))
      .unwrap()
      .then(() => {
        Alert.alert('User data updated successfully!')
      })
      .catch((err) => {
        Alert.alert(`Error: ${err}`)
      })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(profileValidationSchema)}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ handleSubmit, isValid }) => (
        <View style={styles.container}>
          <LoadingSpinner loading={loading.fetchAppUser} />
          <Text>welcome {initialValues.email}</Text>
          <SegmentedButtons
            value={segmentation}
            onValueChange={setSegmentation}
            buttons={[
              { value: 'profile', label: 'Profile info' },
              { value: 'equipment', label: 'Equipment' }
            ]}
          />
          {segmentation === 'profile' ? <ProfileInfo /> : <EquipmentInfo />}
          <TouchableOpacity>
            <Button
              onPress={() => handleSubmit()}
              loading={loading.updateAppUser}
              mode="contained"
              disabled={!isValid}
            >
              Save
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              onPress={() => storeDispatch(logout())}
              loading={loading.logout}
              disabled={loading.logout}
              mode="outlined"
            >
              Logout
            </Button>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20
  }
})
