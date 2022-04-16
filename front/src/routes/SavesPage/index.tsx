import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from '../../hooks/fetcher'
import { useNavigate, Link } from 'react-router-dom'
import SubHeader from '../../components/common/SubHeader'
import MainContainer from '../../containers/MainContainer'
import { ContentBox } from './styles'
import useSWRInfinite from 'swr/infinite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const PAGE_SIZE = 10
const SavesPage = () => {
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)
  const navigate = useNavigate()

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    index => (userData ? `/api/diary_save/list?user_id=${userData.data.id}&skip=${index}&limit=${PAGE_SIZE}` : null),
    fetcher,
  )

  const posts = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

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
                <Link to={`/write?id=${v.id}`}>
                  <p>{v.title}</p>
                  <span className="icon">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </Link>
              </div>
            ))}
        </ContentBox>
      </MainContainer>
    </>
  )
}

export default SavesPage
