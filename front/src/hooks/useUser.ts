import useSWR from 'swr'
import fetcher from './fetcher'

function useUser() {
  const { data, error, mutate } = useSWR('/api/user/check', fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  }
}

export default useUser
