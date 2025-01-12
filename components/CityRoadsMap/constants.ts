/**
 * 城市路线的默认样式
 */
export const ROAD_STYLE = {
  width: 0.3,
  color: 'rgba(26, 26, 26, 0.8)',
  opacity: 1,
}

/**
 * 骑行路线的样式
 */
export const ROUTE_STYLE = {
  width: 1,
  opacity: 0.9,
  color: 'rgb(255, 115, 17)', // 橙色
  blur: 0.99
}

export const ZOOM_SETTINGS = {
  min: 0.6,
  max: 20,
  translatePadding: 0.2, // 平移范围限制为视口的±20%,
  expandedPadding: 0.5, // 初始地图扩展所有路线外50%的范围
  initialZoom: 1,
  initialExtendPadding: 50
}

/**
 * 地图背景色
 */
export const MAP_BACKGROUND = '#F7F2E8'
