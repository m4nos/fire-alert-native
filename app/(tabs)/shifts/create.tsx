import { StyleSheet, View, ScrollView } from 'react-native'
import { Formik } from 'formik'
import { useAppDispatch } from '@store/hooks'
import { Button, TextInput, Text, IconButton } from 'react-native-paper'
import { createShift } from '@store/shifts/shifts.thunk'
import { router } from 'expo-router'
import * as z from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useState } from 'react'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import MapView, { Marker } from 'react-native-maps'
import { Portal, Modal } from 'react-native-paper'
import useReverseGeolocation from '@hooks/useReverseGeolocation'

const timeSlotSchema = z.object({
  startTime: z.string(),
  endTime: z.string()
})

const createShiftSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  startDate: z.date(),
  timeSlots: z.array(timeSlotSchema),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    stateDistrict: z.string()
  })
})

type TimeSlot = {
  startTime: string
  endTime: string
}

const CreateShiftScreen = () => {
  const dispatch = useAppDispatch()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  }>({
    latitude: 0,
    longitude: 0
  })

  const formatTimeInput = (value: string) => {
    // Remove any non-digit characters
    const numbers = value.replace(/\D/g, '')

    // Handle backspacing
    if (value.length < 3 && numbers.length === 2 && value.includes(':')) {
      return numbers[0]
    }

    // Add leading zero for single digit hour
    if (numbers.length === 1) {
      const num = parseInt(numbers)
      if (num > 2) {
        return `0${num}:`
      }
      return numbers
    }

    // Add colon after hours
    if (numbers.length === 2) {
      const hours = parseInt(numbers)
      if (hours > 23) {
        return '23:'
      }
      return `${numbers}:`
    }

    // Handle minutes input
    if (numbers.length === 3) {
      const minutes = parseInt(numbers[2])
      if (minutes > 5) {
        return `${numbers.slice(0, 2)}:0`
      }
      return `${numbers.slice(0, 2)}:${numbers[2]}`
    }

    if (numbers.length === 4) {
      const minutes = parseInt(numbers.slice(2))
      if (minutes > 59) {
        return `${numbers.slice(0, 2)}:59`
      }
      return `${numbers.slice(0, 2)}:${numbers.slice(2)}`
    }

    return numbers
  }

  const initialValues = {
    title: '',
    description: '',
    startDate: new Date(),
    timeSlots: [] as TimeSlot[],
    location: {
      latitude: 0,
      longitude: 0,
      stateDistrict: ''
    }
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await dispatch(createShift(values)).unwrap()
      alert('Shift created successfully')
      router.back()
    } catch (error) {
      console.error('Failed to create shift:', error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(createShiftSchema)}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, values, errors }) => (
          <View style={styles.formContainer}>
            <Text variant="titleLarge" style={styles.title}>
              Create New Shift
            </Text>

            <TextInput
              label="Title"
              value={values.title}
              mode="outlined"
              onChangeText={(text) => setFieldValue('title', text)}
              style={styles.input}
              placeholder="Enter shift title"
              error={Boolean(errors.title)}
            />
            {errors.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}

            <TextInput
              label="Description"
              value={values.description}
              mode="outlined"
              onChangeText={(text) => setFieldValue('description', text)}
              style={styles.input}
              placeholder="Enter shift description"
            />

            <Text variant="bodyLarge">Start Date</Text>
            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
              {values.startDate.toLocaleDateString('el-GR')}
            </Button>
            {showDatePicker && (
              <RNDateTimePicker
                value={values.startDate}
                mode="date"
                onChange={(event, date) => {
                  setShowDatePicker(false)
                  if (date) setFieldValue('startDate', date)
                }}
              />
            )}

            <Text variant="bodyLarge" style={styles.subtitle}>
              Time Slots
            </Text>
            {values.timeSlots.map((slot, index) => (
              <View key={index} style={styles.timeSlotContainer}>
                <TextInput
                  label="Start Time"
                  value={slot.startTime}
                  mode="outlined"
                  onChangeText={(text) => {
                    const formatted = formatTimeInput(text)
                    setFieldValue(`timeSlots.${index}.startTime`, formatted)
                  }}
                  style={styles.timeInput}
                  placeholder="00:00"
                  maxLength={5}
                  keyboardType="numeric"
                />
                <TextInput
                  label="End Time"
                  value={slot.endTime}
                  mode="outlined"
                  onChangeText={(text) => {
                    const formatted = formatTimeInput(text)
                    setFieldValue(`timeSlots.${index}.endTime`, formatted)
                  }}
                  style={styles.timeInput}
                  placeholder="00:00"
                  maxLength={5}
                  keyboardType="numeric"
                />
                <IconButton
                  icon="delete"
                  onPress={() =>
                    setFieldValue(
                      'timeSlots',
                      values.timeSlots.filter((_, i) => i !== index)
                    )
                  }
                />
              </View>
            ))}

            <Button
              mode="outlined"
              onPress={() =>
                setFieldValue('timeSlots', [
                  ...values.timeSlots,
                  { startTime: '', endTime: '' }
                ])
              }
              style={styles.addButton}
            >
              Add Time Slot
            </Button>

            <Button
              mode="contained"
              onPress={() => setShowMap(true)}
              style={styles.input}
            >
              Select Location on Map
            </Button>

            <Portal>
              <Modal
                visible={showMap}
                onDismiss={() => setShowMap(false)}
                contentContainerStyle={styles.modalContainer}
              >
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: values.location.latitude || 37.9838,
                      longitude: values.location.longitude || 23.7275,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
                    onPress={(e) => {
                      const { latitude, longitude } = e.nativeEvent.coordinate
                      setLocation({ latitude, longitude })
                    }}
                    onPoiClick={(e) => {
                      const { latitude, longitude } = e.nativeEvent.coordinate
                      setLocation({ latitude, longitude })
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: location.latitude || values.location.latitude,
                        longitude:
                          location.longitude || values.location.longitude
                      }}
                    />
                  </MapView>
                </View>
                <View style={styles.modalButtons}>
                  <Button
                    mode="contained"
                    onPress={async () => {
                      const { state_district = '' } =
                        await useReverseGeolocation({
                          latitude: location.latitude,
                          longitude: location.longitude
                        })
                      setFieldValue('location', {
                        ...location,
                        stateDistrict: state_district
                      })
                      setShowMap(false)
                    }}
                    style={styles.confirmButton}
                  >
                    Confirm Location
                  </Button>
                  <Button mode="outlined" onPress={() => setShowMap(false)}>
                    Cancel
                  </Button>
                </View>
              </Modal>
            </Portal>
            <Text variant="bodyLarge" style={styles.locationDetails}>
              State district: {values.location.stateDistrict || 'N/A'}
            </Text>

            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.button}
            >
              Create Shift
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formContainer: {
    padding: 16
  },
  title: {
    marginBottom: 24
  },
  subtitle: {
    marginTop: 16,
    marginBottom: 8
  },
  input: {
    marginBottom: 16
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    top: -8
  },
  timeSlotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8
  },
  timeInput: {
    flex: 1,
    minWidth: 120
  },
  addButton: {
    marginBottom: 24
  },
  button: {
    marginTop: 24
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    height: '80%'
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 8
  },
  map: {
    width: '100%',
    height: '100%'
  },
  modalButtons: {
    marginTop: 16,
    gap: 8
  },
  confirmButton: {
    marginBottom: 8
  },
  locationDetails: {
    marginVertical: 8
  }
})

export default CreateShiftScreen
