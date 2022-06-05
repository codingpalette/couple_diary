import React, { useEffect, useLayoutEffect } from 'react'
import SubHeader from '../../components/common/SubHeader'
import MenuList from '../../components/common/MenuList'
import MainContainer from '../../containers/MainContainer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import fetcher from '../../hooks/fetcher'
import { useQuery, useQueryClient } from 'react-query'
import { Helmet } from 'react-helmet'

const MenuPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    isLoading: userLoading,
    isError: userIsError,
    data: userData,
    error: userError,
  } = useQuery('user_check', () => fetcher('/api/user/check'), {
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const onClickLogOut = async (e: any) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/user/logout')
      if (res.data.result === 'success') {
        await queryClient.invalidateQueries('user_check')
        navigate('/')
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (userIsError) {
      navigate('/')
    }
  }, [navigate, userIsError])

  return (
    <>
      <Helmet>
        <title>냐모</title>
        <meta property="og:title" content="냐모" data-rh="true" />
        <meta
          name="description"
          content="지도기반 다이어리 서비스. 특별한 이벤트 고민하지 말고 냐모에서 시작하세요."
          data-rh="true"
        />
        <meta
          property="og:description"
          content="지도기반 다이어리 서비스. 특별한 이벤트 고민하지 말고 냐모에서 시작하세요."
          data-rh="true"
        />
      </Helmet>
      <SubHeader />
      <MainContainer>
        <MenuList href="/write" icon="📬">
          다이어리 만들기
        </MenuList>
        <MenuList href="/diary_list" icon="📚">
          다이어리 리스트
        </MenuList>
        <MenuList href="/saves" icon="💾">
          저장 리스트
        </MenuList>
        <MenuList href="/" icon="👋" onClick={onClickLogOut}>
          로그아웃
        </MenuList>
      </MainContainer>
    </>
  )
}

export default MenuPage
