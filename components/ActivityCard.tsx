import React from 'react'
import { MapPin, Clock, TrendingUp, Calendar, Heart, Bike } from 'lucide-react'
import type { StravaActivity } from '@/types/strava'
import { useTranslations } from 'next-intl'
import { ActivityMap } from './ActivityMap'

interface ActivityCardProps {
  activity: StravaActivity
  onClick?: () => void
}

export function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const t = useTranslations()

  if (activity.trainer) {
    return null // Skip indoor rides
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}${t('activities.card.hoursShort')} ${minutes}${t('activities.card.minutesShort')}`
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString()
  }

  const formatDistance = (distance: number) => {
    return `${(distance / 1000).toFixed(2)} ${t('activities.card.kilometers')}`
  }

  const formatElevation = (elevation: number) => {
    return `${elevation} ${t('activities.card.metersShort')}`
  }

  const formatSpeed = (speed: number) => {
    return `${(speed * 3.6).toFixed(1)} ${t('activities.card.kmPerHour')}`
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:shadow-md transition-all"
      onClick={onClick}
    >
      {activity.map?.summary_polyline && (
        <div className="h-[400px] relative">
          <ActivityMap activity={activity} />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {activity.name}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-4">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-1 text-orange-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('activities.card.distance')}
              </p>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatDistance(activity.distance)}
            </p>
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-1 text-indigo-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('activities.card.duration')}
              </p>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatDuration(activity.moving_time)}
            </p>
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('activities.card.elevation')}
              </p>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatElevation(activity.total_elevation_gain)}
            </p>
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Bike className="h-4 w-4 mr-1 text-blue-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('activities.card.speed')}
              </p>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatSpeed(activity.average_speed)}
            </p>
          </div>

          {activity.average_heartrate && (
            <div className="flex flex-col space-y-1">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Heart className="h-4 w-4 mr-1 text-red-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('activities.card.heartRate')}
                </p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {Math.round(activity.average_heartrate)} bpm
              </p>
            </div>
          )}

          <div className="flex flex-col space-y-1">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1 text-purple-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('activities.card.date')}
              </p>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatDate(activity.start_date_local)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
