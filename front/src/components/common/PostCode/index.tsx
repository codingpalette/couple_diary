import React from 'react'
import DaumPostcode from 'react-daum-postcode'
import ModalContainer from '../../../containers/ModalContainer'
import Card from '../Card'
import Button from '../Button'
import { Content } from './styles'

export type PostCodeProps = {
  addressSearchOpen: boolean | undefined
  onCompletePost: any
  addressSearchClose: any
}

const PostCode = ({ addressSearchOpen, onCompletePost, addressSearchClose }: PostCodeProps) => {
  return (
    <>
      <ModalContainer isActive={addressSearchOpen} closeEvent={addressSearchClose} maxWidth="500px">
        <Card title="주소검색">
          <Content>
            <DaumPostcode autoClose={true} onComplete={onCompletePost} />
            <Button onClick={addressSearchClose} width="100%">
              닫기
            </Button>
          </Content>
        </Card>
      </ModalContainer>
    </>
  )
}

export default PostCode
