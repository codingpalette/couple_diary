import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from '../../hooks/fetcher'
import { useNavigate, Link } from 'react-router-dom'
import SubHeader from '../../components/common/SubHeader'
import MainContainer from '../../containers/MainContainer'
import { ContentBox } from './styles'
import useSWRInfinite from 'swr/infinite'
import Button from '../../components/common/Button'
import ModalContainer from '../../containers/ModalContainer'
import Card from '../../components/common/Card'
import SelectContainerBox from '../../components/common/SelectContainerBox'
import BackLoading from '../../components/common/BackLoading'
import { ErrorMessageOpen, SuccessMessageOpen } from '../../hooks/useToast'
import axios from 'axios'

const PAGE_SIZE = 30
const SavesPage = () => {
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)
  const navigate = useNavigate()

  // 임시 저장 리스트 가져오기
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
      await mutate()
    } catch (e) {
      setBackLoadingActive(false)
      ErrorMessageOpen('삭제에 실패 했습니다.')
    }
  }

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
                    <Link to={`/write?save_id=${v.id}`}>
                      <Button>수정</Button>
                    </Link>
                    <Button theme="secondary" onClick={() => onClickDiaryDeleteModalOpen(v.id)}>
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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
