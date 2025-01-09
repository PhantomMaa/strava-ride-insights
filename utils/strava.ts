const STRAVA_CLIENT_ID = process.env.AUTH_STRAVA_ID
const STRAVA_CLIENT_SECRET = process.env.AUTH_STRAVA_SECRET
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/strava/callback`

export const getStravaAuthUrl = async (callbackUrl?: string | null) => {
  const params = new URLSearchParams()
  if (callbackUrl) {
    params.set('callbackUrl', callbackUrl)
  }
  const response = await fetch(`/api/strava/auth-url?${params.toString()}`)
  const data = await response.json()
  return data.url
}

export interface StravaTokens {
  access_token: string
  refresh_token: string
  expires_at: number
}

export const exchangeToken = async (code: string): Promise<StravaTokens> => {
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to exchange token')
  }

  return response.json()
}

export const refreshStravaToken = async (refresh_token: string): Promise<StravaTokens> => {
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  return response.json()
}

interface StravaActivitiesParams {
  before?: number
  after?: number
  page?: number
  per_page?: number
}

export const getStravaActivities = async (
  access_token: string,
  params?: StravaActivitiesParams
) => {
  const searchParams = new URLSearchParams()
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })
  }

  const url = `https://www.strava.com/api/v3/athlete/activities?${searchParams.toString()}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch activities')
  }

  return response.json()
}

export const getStravaAthlete = async (access_token: string) => {
  const response = await fetch('https://www.strava.com/api/v3/athlete', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch athlete')
  }

  const data = await response.json()
  return {
    id: data.id,
    name: `${data.firstname} ${data.lastname}`,
    image: data.profile,
  }
}

export const getStravaStats = async (access_token: string, athleteId: number) => {
  const response = await fetch(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch stats')
  }

  return response.json()
}
