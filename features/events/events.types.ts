import { Coordinates } from '@store/map/map.types'

export const EventType = {
  TRAINING: 'TRAINING',
  EMERGENCY: 'EMERGENCY'
} as const

export type Event = {
  id: string
  type: keyof typeof EventType
  timestamp: number
  location: Coordinates & { municipality?: string; province: string }
  description: string
  organizer?: string
}

export type EventsState = {
  events: Event[]
  loading: {
    fetchingEvents: boolean
    addingEvent: boolean
    editingEvent: boolean
    deletingEvent: boolean
  }
  error?: Error
}
