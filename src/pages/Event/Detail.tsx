import React from 'react'
import { useLocation, useParams } from 'umi'
import { useDispatch } from 'react-redux'
import BasicLayout from '../../layouts/Basic'
import Header from '../../components/Header'
import Description from './components/Description'

interface DetailPageProps {
  children?: React.ReactNode
}

const Detail: React.FC<DetailPageProps> = () => {
  const dispatch = useDispatch()
  const { query } = useLocation()
  const { target } = useParams()

  React.useEffect(() => {
    const { issue_id } = query

    if (target === 'latest' && issue_id) {
      dispatch({ type: 'event/getLatestEvent', payload: { issue_id } })
    } else {
      dispatch({
        type: 'event/get',
        payload: {
          event_id: target,
        },
      })
    }
  }, []) // eslint-disable-line

  return (
    <BasicLayout header={<Header title="Event Detail" />}>
      <Description />
    </BasicLayout>
  )
}

export default Detail
