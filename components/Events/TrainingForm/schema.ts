import { Event, EventType } from '@store/events/events.types'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export type NewTrainingFormFields = {
  description: string
  location: Event['location']
  date: Date
  time: Date
}

export const newTrainingInitialValues = {
  description: '',
  date: NaN,
  time: NaN,
  location: {
    latitude: NaN,
    longitude: NaN,
    province: '',
    municipality: ''
  },
  type: EventType.TRAINING
}

export const newTrainingFormValidationSchema = toFormikValidationSchema(
  z.object({
    description: z
      .string()
      .min(1, 'Description must be more than 10 characters'),
    // .minLength(10),
    location: z.object({
      latitude: z.number(),
      longitude: z.number()
    }),
    date: z.number({
      required_error: 'Date is required'
    }),
    time: z.number({
      required_error: 'Time is required'
    })
  })
)
