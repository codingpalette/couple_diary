import useSWR from 'swr'

let isActive = false

const useLoginModalSWR = () => {
  const { data, mutate } = useSWR('state', () => {
    return isActive
  })
  return {
    data,
    mutate: (value: boolean) => {
      isActive = value
      return mutate()
    },
  }
}
export default useLoginModalSWR
