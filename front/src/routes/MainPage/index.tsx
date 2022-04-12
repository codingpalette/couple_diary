import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContentBox, Section1, Section2 } from './styles'
import Header from '../../components/common/Header'
import iphone from '../../assets/images/iPhone12.png'
import sample from '../../assets/images/sample.png'
import Button from '../../components/common/Button'
import useLoginModalSWR from '../../stores/useLoginModalSWR'
import useSWR from 'swr'
import fetcher from '../../hooks/fetcher'

const MainPage = () => {
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)
  const { mutate: setIsActive } = useLoginModalSWR()
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <ContentBox>
        <Section1>
          <p>
            사랑하는 사람에게 특별한 이벤트를 만들어 보세요.
            <br />
            소중한 사람과의 추억을 쉽고 편리하게 보여주는 모바일 서비스, <br />
            커다와 함께라면 당신의 소중한 나날이 더욱 특별해질 거예요.
          </p>
        </Section1>
        <Section2>
          <div className="section2_content">
            <div className="title_box">
              <h1>
                연인과 함께 했던, <br />
                장소를 기억하고 <br />
                보관하세요
              </h1>
            </div>

            <div className="button_box">
              {userData && userData.result === 'success' ? (
                <Button onClick={() => navigate('/menu')}>시작하기</Button>
              ) : (
                <Button onClick={() => setIsActive(true)}>시작하기</Button>
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
