import { useState, useCallback } from 'react'

export default function useInput(defaultValue: string) {
  const [input, setInput] = useState(defaultValue)
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])
  const onReset = useCallback(() => setInput(''), [])
  const onSet = useCallback((value: string) => setInput(value), [])
  return [input, onChange, onReset, onSet] as [string, typeof onChange, typeof onReset, typeof onSet]
}
