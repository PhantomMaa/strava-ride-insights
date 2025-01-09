import { CityRoadsMap } from './CityRoadsMap/CityRoadsMap'
import type { StravaActivity } from '../types/strava'

interface ActivityMapProps {
  activity: StravaActivity
}

export function ActivityMap({ activity }: ActivityMapProps) {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <CityRoadsMap
        summaryPolyline={activity.map.summary_polyline}
        startLatlng={activity.start_latlng}
        disableZoom={true}
      />
    </div>
  )
}
