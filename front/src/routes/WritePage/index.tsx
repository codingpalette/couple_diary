import React, { useEffect, useRef, useState } from 'react'
import MapContainer from '../../containers/MapContainer'
import { CardInputGroup, ControllerBox } from './styles'
import Button from '../../components/common/Button'
import DaumPostcode from 'react-daum-postcode'
import ModalContainer from '../../containers/ModalContainer'
import Card from '../../components/common/Card'
import useInput from '../../hooks/useInput'
import Input from '../../components/common/Input'
import UploadBox from '../../components/write/UploadBox'

const options = {
  center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  level: 3,
}

const WritePage = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [mapInputAddress, onChangeMapInputAddress] = useInput('')
  const [addressSearchOpen, setAddressSerarchOpen] = useState(false)
  // let map: any
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])

  const [test, setTest] = useState(false)

  const [isActive, setIsActive] = useState(false)

  const onClickModalOpen = () => {
    setIsActive(true)
  }

  const onClickModalClose = () => {
    setIsActive(false)
  }

  const onClickSearch = () => {
    console.log('eeee')
    setAddressSerarchOpen(true)
  }

  useEffect(() => {
    const map = new window.kakao.maps.Map(mapRef.current, options)
    // 마커가 표시될 위치입니다
    const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667)

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    })

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map)
    setMap(map)
  }, [])

  useEffect(() => {
    function onResize() {
      resizeEvent()
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const resizeEvent = () => {
    const winW = document.body.clientWidth
    // console.log(winW)
    // if (mapRef.current) {
    //   mapRef.current.style.width = `${winW}px`
    // }
  }

  const onCompletePost = (data: any) => {
    let fullAddr = data.address
    let extraAddr = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : ''
      setTest(false)
      const geocoder = new window.kakao.maps.services.Geocoder()
      console.log(fullAddr)

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(fullAddr, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)
          console.log(coords)

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          })

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          const infowindow = new window.kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
          })
          infowindow.open(map, marker)

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords)
        }
      })
    }
  }

  return (
    <>
      <MapContainer>
        <ControllerBox>
          <div>
            <Button onClick={onClickModalOpen}>리스트 추가</Button>

            <ModalContainer isActive={isActive} closeEvent={onClickModalClose} maxWidth="500px">
              <Card title="리스트 추가">
                <CardInputGroup>
                  <div className="title">주소 검색</div>
                  <div className="input_group">
                    <Input type="text" value={mapInputAddress} onChange={onChangeMapInputAddress} disabled={true} />
                    <Button onClick={onClickSearch}>검색</Button>
                  </div>
                </CardInputGroup>
                <CardInputGroup>
                  {addressSearchOpen && <DaumPostcode autoClose onComplete={onCompletePost} />}
                </CardInputGroup>
                <CardInputGroup>
                  <div className="title">사진 추가</div>
                  <div className="upload_group">
                    <UploadBox />
                  </div>
                </CardInputGroup>
              </Card>
            </ModalContainer>
          </div>
        </ControllerBox>
        <div style={{ width: '100%', height: '100%' }} id="map" ref={mapRef} />
      </MapContainer>
    </>
  )
}

export default WritePage
