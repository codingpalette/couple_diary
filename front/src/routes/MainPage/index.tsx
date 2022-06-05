import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ContentBox, Section1, Section2 } from './styles'
import Header from '../../components/common/Header'
import iphone from '../../assets/images/iPhone12.png'
import sample from '../../assets/images/sample.png'
import Button from '../../components/common/Button'
import fetcher from '../../hooks/fetcher'
import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import loginModalState from '../../stores/useLoginModalState'

const MainPage = () => {
  const {
    isLoading: userLoading,
    isError: userIsError,
    data: userData,
    error: userError,
  } = useQuery('user_check', () => fetcher('/api/user/check'), {
    // refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    // retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: data => {
      // 성공시 호출
      // console.log(data)
    },
    onError: (e: any) => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      // console.log(e.message)
    },
  })

  const setLoginModal = useSetRecoilState(loginModalState)
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <ContentBox>
        <Section1>
          <p>
            특별한 사람에게 특별한 이벤트를 만들어 보세요.
            <br />
            소중한 사람과의 추억을 쉽고 편리하게 보여주는 모바일 서비스, <br />
            냐모와 함께라면 당신의 소중한 나날이 더욱 특별해질 거예요.
          </p>
        </Section1>
        <Section2>
          <div className="section2_content">
            <div className="title_box">
              <h1>
                모두와 함께 했던, <br />
                장소를 기억하고 <br />
                보관하세요
              </h1>
            </div>

            <div className="button_box">
              {userData && userData.result === 'success' ? (
                <Button onClick={() => navigate('/menu')}>시작하기</Button>
              ) : (
                <Button onClick={() => setLoginModal(true)}>시작하기</Button>
              )}
            </div>

            <div>
              <div className="image_box">
                <img src={iphone} alt="iphone" className="iphone" />
                {/*<img src={sample} alt="sample" className="content" />*/}
              </div>
            </div>
          </div>
        </Section2>
      </ContentBox>
    </>
  )
}

export default MainPage
