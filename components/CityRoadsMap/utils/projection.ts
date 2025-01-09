import type { Bounds, Transform } from '../types'

export function getBounds(points: [number, number][]): Bounds {
  return points.reduce(
    (bounds, [lat, lng]) => ({
      minLat: Math.min(bounds.minLat, lat),
      maxLat: Math.max(bounds.maxLat, lat),
      minLng: Math.min(bounds.minLng, lng),
      maxLng: Math.max(bounds.maxLng, lng),
    }),
    {
      minLat: Infinity,
      maxLat: -Infinity,
      minLng: Infinity,
      maxLng: -Infinity,
    }
  )
}

export function getExpandedBounds(bounds: Bounds, padding: number = 0.02, ratio: number = 16/9): Bounds {
  // 计算当前的宽度和高度
  const width = bounds.maxLng - bounds.minLng
  const height = bounds.maxLat - bounds.minLat

  // 计算需要的宽高
  const currentRatio = width / height
  let newWidth = width
  let newHeight = height

  if (currentRatio > ratio) {
    // 当前比例过宽，需要增加高度
    newHeight = width / ratio
  } else {
    // 当前比例过高，需要增加宽度
    newWidth = height * ratio
  }

  // 计算需要的padding
  const latPadding = (newHeight - height) / 2
  const lngPadding = (newWidth - width) / 2

  // 应用padding
  const expandedBounds = {
    minLat: bounds.minLat - latPadding,
    maxLat: bounds.maxLat + latPadding,
    minLng: bounds.minLng - lngPadding,
    maxLng: bounds.maxLng + lngPadding,
  }

  // 再应用统一的padding
  return {
    minLat: expandedBounds.minLat - padding,
    maxLat: expandedBounds.maxLat + padding,
    minLng: expandedBounds.minLng - padding,
    maxLng: expandedBounds.maxLng + padding,
  }
}

export function calculateScale(bounds: Bounds, width: number, height: number) {
  return (
    Math.min(width / (bounds.maxLng - bounds.minLng), height / (bounds.maxLat - bounds.minLat)) *
    0.9
  )
}

export function projectPoint(
  lat: number,
  lng: number,
  bounds: Bounds,
  scale: number,
  width: number,
  height: number
) {
  const x = (lng - bounds.minLng) * scale + (width - (bounds.maxLng - bounds.minLng) * scale) / 2
  const y = (bounds.maxLat - lat) * scale + (height - (bounds.maxLat - bounds.minLat) * scale) / 2
  return { x, y }
}

export function getVisibleBounds(
  originalBounds: Bounds,
  transform: Transform,
  width: number,
  height: number,
  scale: number
): Bounds {
  // 计算变换后的可视区域范围
  const topLeft = inverseProjectPoint(
    -transform.translateX / transform.scale,
    -transform.translateY / transform.scale,
    originalBounds,
    scale,
    width,
    height
  )

  const bottomRight = inverseProjectPoint(
    (width - transform.translateX) / transform.scale,
    (height - transform.translateY) / transform.scale,
    originalBounds,
    scale,
    width,
    height
  )

  return {
    minLat: Math.min(topLeft.lat, bottomRight.lat),
    maxLat: Math.max(topLeft.lat, bottomRight.lat),
    minLng: Math.min(topLeft.lng, bottomRight.lng),
    maxLng: Math.max(topLeft.lng, bottomRight.lng),
  }
}

function inverseProjectPoint(
  x: number,
  y: number,
  bounds: Bounds,
  scale: number,
  width: number,
  height: number
) {
  const centerOffsetX = (width - (bounds.maxLng - bounds.minLng) * scale) / 2
  const centerOffsetY = (height - (bounds.maxLat - bounds.minLat) * scale) / 2

  const lng = (x - centerOffsetX) / scale + bounds.minLng
  const lat = bounds.maxLat - (y - centerOffsetY) / scale

  return { lat, lng }
}
