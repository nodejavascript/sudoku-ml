import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Card, Typography } from 'antd'
const { Text } = Typography

const QUERY_ABOUT_APP = gql`
  query queryAboutApp {
    aboutApp {
      timestamp
      version
    }
  }
`

const AboutApp = () => {
  const { loading, error, data } = useQuery(QUERY_ABOUT_APP)
  const [aboutApp, setAboutApp] = useState()

  useEffect(() => {
    if (data?.aboutApp) return setAboutApp(JSON.stringify(data.aboutApp))
  }, [data, setAboutApp])

  useEffect(() => {
    if (error) console.error('PingResults', error)
  }, [error])

  return (
    <Card
      type='inner'
      title='PingResults'
      loading={loading}
    >
      <Text>Server:</Text>
      <Text code>{aboutApp && aboutApp}</Text>
    </Card>
  )
}

export default AboutApp
