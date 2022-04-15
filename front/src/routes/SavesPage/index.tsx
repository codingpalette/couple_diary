import React, { useEffect } from 'react'
import useSWR from 'swr'
import fetcher from '../../hooks/fetcher'
import { useNavigate } from 'react-router-dom'
import SubHeader from '../../components/common/SubHeader'

const SavesPage = () => {
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)
  const navigate = useNavigate()

  const {
    data: listData,
    error,
    mutate,
  } = useSWR(userData ? `/api/diary_save/list?user_id=${userData.data.id}&skip=0&limit=10` : null, fetcher)

  useEffect(() => {
    console.log(listData)
  }, [listData])

  useEffect(() => {
    if (userError) {
      navigate('/')
    }
  }, [navigate, userError])

  return (
    <>
      <SubHeader />
      <div>sdfs</div>
    </>
  )
}

export default SavesPage
