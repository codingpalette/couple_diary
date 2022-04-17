import React, { useEffect } from 'react'
import useSWR from 'swr'
import fetcher from '../../hooks/fetcher'
import { Link, useNavigate } from 'react-router-dom'
import SubHeader from '../../components/common/SubHeader'
import useSWRInfinite from 'swr/infinite'
import MainContainer from '../../containers/MainContainer'
import Button from '../../components/common/Button'
import { ContentBox } from '../SavesPage/styles'

const PAGE_SIZE = 30
const DiaryListPage = () => {
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)
  const navigate = useNavigate()

  // 다이어리 리스트 가져오기
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    index => (userData ? `/api/diary/list?user_id=${userData.data.id}&skip=${index}&limit=${PAGE_SIZE}` : null),
    fetcher,
  )
  const posts = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  // 인피니티 스크롤 작업 코드
  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!isLoadingMore && !isReachingEnd) {
          setSize(size + 1)
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [isLoadingMore, isReachingEnd, size])

  useEffect(() => {
    if (userError) {
      navigate('/')
    }
  }, [navigate, userError])

  return (
    <>
      <SubHeader />
      <MainContainer>
        <ContentBox>
          {posts &&
            posts.map((v: any) => (
              <div className="list" key={v.id}>
                <div className="item_box">
                  <p>{v.title}</p>
                  <div className="btn_box">
                    <Link to={`/@${v.nickname}/${v.location}`}>
                      <Button>보기</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </ContentBox>
      </MainContainer>
    </>
  )
}

export default DiaryListPage
