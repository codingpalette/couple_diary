import React, { Fragment, useEffect } from 'react'
import fetcher from '../../hooks/fetcher'
import { Link, useNavigate } from 'react-router-dom'
import SubHeader from '../../components/common/SubHeader'
import MainContainer from '../../containers/MainContainer'
import Button from '../../components/common/Button'
import { ContentBox } from '../SavesPage/styles'
import { useQuery, useInfiniteQuery } from 'react-query'

const PAGE_SIZE = 30
const DiaryListPage = () => {
  const { isError: userIsError, data: userData } = useQuery('user_check', () => fetcher('/api/user/check'), {
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const navigate = useNavigate()

  const diaryListFetch = async ({ pageParam = 0 }) => {
    return await fetcher(`/api/diary/list?user_id=${userData.data.id}&skip=${pageParam}&limit=${PAGE_SIZE}`)
  }

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
    '[diary_list]',
    diaryListFetch,
    {
      enabled: !!userData,
      getNextPageParam: (lastPage, pages) => {
        if (pages[pages.length - 1].length === PAGE_SIZE) {
          return pages.length
        } else {
          return undefined
        }
      },
      refetchOnWindowFocus: false,
      retry: 0,
    },
  )

  // 인피니티 스크롤 작업 코드
  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!isFetchingNextPage && hasNextPage) {
          fetchNextPage()
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [isFetchingNextPage, hasNextPage])

  useEffect(() => {
    if (userIsError) {
      navigate('/')
    }
  }, [navigate, userIsError])

  return (
    <>
      <SubHeader />
      <MainContainer>
        <ContentBox>
          {data?.pages.map((group, i) => {
            return (
              <Fragment key={i}>
                {group.map((v: any) => (
                  <div className="list" key={v.id}>
                    <div className="item_box">
                      <p>{v.title}</p>
                      <div className="btn_box">
                        <Link to={`/@${v.nickname}/${v.location}`}>
                          <Button>보기</Button>
                        </Link>
                        <Link to={`/write?id=${v.id}`}>
                          <Button>수정</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Fragment>
            )
          })}
        </ContentBox>
      </MainContainer>
    </>
  )
}

export default DiaryListPage
