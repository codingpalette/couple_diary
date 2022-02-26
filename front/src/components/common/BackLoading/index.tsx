import React from 'react'
import { BackLoadingContainer } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export type BackLoading = {
  isActive: boolean | undefined
}

const BackLoading = ({ isActive }: BackLoading) => {
  if (!isActive) return null
  return (
    <>
      <BackLoadingContainer>
        <div className="content">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      </BackLoadingContainer>
    </>
  )
}

export default BackLoading
