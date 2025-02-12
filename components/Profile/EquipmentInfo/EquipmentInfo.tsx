import React from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useFormikContext } from 'formik'
import { UserProfileFields } from '../ProfileInfo/types'

const EquipmentInfo = () => {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<UserProfileFields>()

  return (
    <View>
      <TextInput
        label="Equipment"
        value={values.equipment.car}
        onChangeText={handleChange('equipment')}
        onBlur={handleBlur('equipment')}
        mode="outlined"
        error={touched.equipment && Boolean(errors.equipment)}
      />
      {touched.equipment && errors.equipment && (
        <Text>{errors.equipment.car}</Text>
      )}
    </View>
  )
}

export default EquipmentInfo
