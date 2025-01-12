export interface CityRoadsMapProps {
  summaryPolylines?: string[] // 支持多条路线
  summaryPolyline?: string // 保持向后兼容
}

export interface Transform {
  scale: number
  translateX: number
  translateY: number
}

export interface Point {
  x: number
  y: number
}

export interface Bounds {
  minLat: number
  maxLat: number
  minLng: number
  maxLng: number
}

export interface DecodedRoute {
  points: [number, number][]
  frequency: number
  intensity: number
}
