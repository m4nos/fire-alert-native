export type Coordinates = {
  latitude: number
  longitude: number
}

export type Marker = Coordinates & {
  id: string
  timestamp: number
}

export type MapState = {
  markers: Marker[]
  loading: boolean
  error?: Error
}
