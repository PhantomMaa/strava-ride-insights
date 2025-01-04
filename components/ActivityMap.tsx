import { CityRoadsMap } from './CityRoadsMap/CityRoadsMap'
import type { StravaActivity } from '../types/strava'

interface ActivityMapProps {
  activity: StravaActivity
}

export function ActivityMap({ activity }: ActivityMapProps) {
  // 检查是否有可用的路线数据
  if (!activity.map?.summary_polyline) {
    return (
      <div className="h-[400px] w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">暂无路线数据</p>
      </div>
    )
  }

  try {
    // 如果没有有效的位置数据，显示提示信息
    if (!activity.map.summary_polyline) {
      return (
        <div className="h-[400px] w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">无效的路线数据</p>
        </div>
      )
    }

    return (
      <div className="h-[400px] w-full rounded-lg overflow-hidden">
        <CityRoadsMap 
          summaryPolyline={activity.map.summary_polyline}
          startLatlng={activity.start_latlng}
          disableZoom={true}
        />
      </div>
    )
  } catch (error) {
    console.error('Error decoding polyline:', error)
    return (
      <div className="h-[400px] w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">路线数据解析错误</p>
      </div>
    )
  }
}
