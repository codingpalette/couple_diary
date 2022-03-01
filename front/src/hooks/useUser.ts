import useSWR from 'swr'
import fetcher from './fetcher'
import React from 'react'

function useUser() {
  const random = React.useRef(Date.now())
  const { data, error, mutate } = useSWR(['/api/user/check', random], fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  }
}

export default useUser
