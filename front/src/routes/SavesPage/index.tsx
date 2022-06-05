import React, { Fragment, useEffect, useState } from 'react'
import fetcher from '../../hooks/fetcher'
import { useNavigate, Link } from 'react-router-dom'
import SubHeader from '../../components/common/SubHeader'
import MainContainer from '../../containers/MainContainer'
import { ContentBox } from './styles'
import Button from '../../components/common/Button'
import ModalContainer from '../../containers/ModalContainer'
import Card from '../../components/common/Card'
import SelectContainerBox from '../../components/common/SelectContainerBox'
import BackLoading from '../../components/common/BackLoading'
import { ErrorMessageOpen, SuccessMessageOpen } from '../../hooks/useToast'
import axios from 'axios'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import CardList from '../../components/common/CardList'

const PAGE_SIZE = 30
const SavesPage = () => {
  const queryClient = useQueryClient()
  const { isError: userIsError, data: userData } = useQuery('user_check', () => fetcher('/api/user/check'))
  const navigate = useNavigate()

  // 임시 저장 리스트 가져오기
  const diaryListFetch = async ({ pageParam = 0 }) => {
    return await fetcher(`/api/diary_save/list?user_id=${userData.data.id}&skip=${pageParam}&limit=${PAGE_SIZE}`)
  }

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
    'diary_save_list',
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

  // 백그라운드 로딩 상태값
  const [backLoadingActive, setBackLoadingActive] = useState(false)
  // 선택된 다이어리 아이디
  const [selectDiary, setSelectDiary] = useState<number | null>(null)
  // 다이어리 삭제 모달 온, 오프 상태값
  const [diaryDeleteModalActive, setDiaryDeleteModalActive] = useState(false)
  // 다이어리 삭제 모달 오픈 함수
  const onClickDiaryDeleteModalOpen = (id: any) => {
    setSelectDiary(id)
    setDiaryDeleteModalActive(true)
  }
  // 다이어리 삭제 모달 오프 함수
  const onClickDiaryDeleteModalClose = () => {
    setSelectDiary(null)
    setDiaryDeleteModalActive(false)
  }
  // 다이어리 삭제 이벤트
  const onClickDiaryDelete = async () => {
    setBackLoadingActive(true)
    try {
      await axios.delete(`/api/diary_save?id=${selectDiary}`)
      setBackLoadingActive(false)
      SuccessMessageOpen('삭제에 성공 했습니다.')
      onClickDiaryDeleteModalClose()
      await queryClient.invalidateQueries('[diary_save_list]')
    } catch (e) {
      setBackLoadingActive(false)
      ErrorMessageOpen('삭제에 실패 했습니다.')
    }
  }

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
                  <CardList
                    key={v.id}
                    title={v.title}
                    location={v.location}
                    nickname={v.nickname}
                    id={v.id}
                    created_at={v.created_at}
                    description={v.description}
                    deleteEvent={onClickDiaryDeleteModalOpen}
                    mode="save"
                  />
                ))}
              </Fragment>
            )
          })}
        </ContentBox>
      </MainContainer>
      <ModalContainer isActive={diaryDeleteModalActive} closeEvent={onClickDiaryDeleteModalClose} maxWidth="500px">
        <Card title="다이어리 삭제">
          <SelectContainerBox
            title="다이어리를 삭제 하시겠습니까?"
            okTextType="secondary"
            okText="삭제"
            okEvent={onClickDiaryDelete}
            closeText="닫기"
            closeEvent={onClickDiaryDeleteModalClose}
          />
        </Card>
      </ModalContainer>
      <BackLoading isActive={backLoadingActive} />
    </>
  )
}

export default SavesPage
