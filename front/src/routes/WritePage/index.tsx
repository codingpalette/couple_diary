import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CardButtonGroup, CardInputGroup, ControllerBox } from './styles'
import axios from 'axios'
import useInput from '../../hooks/useInput'
import useBoolean from '../../hooks/useBoolean'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import NavBar from '../../components/diary/NavBar'
import Button from '../../components/common/Button'
import ImageBox from '../../components/write/ImageBox'
import MapContainer from '../../containers/MapContainer'
import UploadBox from '../../components/write/UploadBox'
import Textarea from '../../components/common/Textarea'
import ModalContainer from '../../containers/ModalContainer'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import 'react-datepicker/dist/react-datepicker.css'
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk'
import SlideModal from '../../components/diary/SlideModal'
import { ErrorMessageOpen, SuccessMessageOpen } from '../../hooks/useToast'
import BackLoading from '../../components/common/BackLoading'
import SaveFormModal from '../../components/write/SaveFormModal'
import { useRecoilState } from 'recoil'
import diaryState from '../../stores/useDiaryState'
import { checkSpecial } from '../../hooks/useStringCheck'
import fetcher from '../../hooks/fetcher'
import OverlapListModal from '../../components/diary/OverlapListModal'
import dayjs from 'dayjs'
import PostCodeProps from '../../components/common/PostCode'
import CardListModal from '../../components/write/CardListModal'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SelectContainerBox from '../../components/common/SelectContainerBox'
import { useQuery } from 'react-query'

const WritePage = () => {
  const { isError: userIsError, data: userData } = useQuery('user_check', () => fetcher('/api/user/check'), {
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // 다이어리 값
  const [useDiary, setUseDiary] = useRecoilState(diaryState)
  // 시작하고 바로 다이어리값을 초기화를 해준다.
  useEffect(() => {
    const data = {
      title: '',
      location: '',
      description: '',
      mapList: [],
    }
    setUseDiary(data)
  }, [])

  const [formMode, setFormMode] = useState<'create' | 'diary_save' | 'diary'>('create')

  // 다이어리 데이터 가져오기
  const {
    isLoading: diaryLoading,
    isError: diaryIsError,
    data: diaryData,
    error: diaryError,
  } = useQuery<any, any>('diary_modify_data', () => fetcher(`/api/diary/modify?id=${searchParams.get('id')}`), {
    enabled: !!searchParams.get('id'),
    refetchOnWindowFocus: false,
    retry: 0,
  })

  useEffect(() => {
    if (diaryIsError) {
      ErrorMessageOpen(diaryError.response.data.detail)
      navigate('/menu')
    }
  }, [diaryIsError])

  useEffect(() => {
    if (!diaryLoading) {
      if (diaryData) {
        if (diaryData.user_id === userData.data.id) {
          const data = {
            title: diaryData.title,
            location: diaryData.location,
            description: diaryData.description,
            mapList: diaryData.content,
          }
          setUseDiary(data)
          setFormMode('diary')
        } else {
          navigate('/menu')
        }
      }
    }
  }, [diaryLoading, diaryData, userData])

  // 임시저장 데이터 가져오기
  const {
    isLoading: diarySaveLoading,
    isError: diarySaveIsError,
    data: diarySaveData,
    error: diarySaveError,
  } = useQuery<any, any>('diary_save_data', () => fetcher(`/api/diary_save?save_id=${searchParams.get('save_id')}`), {
    enabled: !!searchParams.get('save_id'),
    refetchOnWindowFocus: false,
    retry: 0,
  })

  useEffect(() => {
    if (diarySaveIsError) {
      ErrorMessageOpen(diarySaveError.response.data.detail)
      navigate('/menu')
    }
  }, [diarySaveIsError, diarySaveError])

  useEffect(() => {
    if (!diarySaveLoading) {
      if (diarySaveData) {
        if (diarySaveData.user_id === userData.data.id) {
          const data = {
            title: diarySaveData.title,
            location: diarySaveData.location,
            description: diarySaveData.description,
            mapList: diarySaveData.content,
          }
          setUseDiary(data)
          setFormMode('diary_save')
        } else {
          navigate('/menu')
        }
      }
    }
  }, [diarySaveLoading, diarySaveData, userData])

  // 달력 상태값
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  // 모달창 주소검색 인풋 상태값
  const [mapInputAddress, onChangeMapInputAddress, onResetMapInputAddress, onSetMapInputAddress] = useInput('')
  // 카카오 주소검색 온,오프 상태값
  const [addressSearchOpen, setAddressSearchOpen] = useState(false)
  // 주소 검색 후 좌표 상태값
  const [mapObjData, setMapObjData] = useState<any>({
    coords: {},
  })
  // 다이어리 제목 상태값
  const [diaryTitle, onChangeDiaryTitle, onResetDiaryTitle, onSetDiaryTitle] = useInput('')
  // 이미지 리스트 값
  const [images, setImages] = useState<any>([])
  // 내용 상태 값
  const [contentText, onChangeContentText, onResetContentText, onSetContentText] = useInput('')
  // 마커 생성을 위함 폼 신규생성인지 수정인지에 대한 상태값
  const [markerMode, setMarkerMode] = useState('create')
  // 마커 생성을 위한 폼 모달 온,오프 상태값
  const [createModalActive, setCreateModalActive] = useState(false)
  // 마커 클릭시 나오는 슬라이드 모달 온,오프 상태값
  const [slideModalActive, setSlideModalActive] = useState(false)
  // back 로딩 상태값
  const [backLoadingActive, setBackLoadingActive] = useState(false)
  // save form 모달 상태값
  const [saveFromModalActive, setSaveFormModalActive] = useState(false)
  // 오버랩 모달 내용 값
  const [overlapData, setOverLapData] = useState<any>([])
  // 오버랩 모달 상태값
  const [overlapListModalActive, setOverlapListModalActive] = useState(false)
  // 선택된 리스트 인덱스값
  const [selectList, setSelectList] = useState<number | null>(null)
  // 카드 리스트 모달 상태값
  const [cardListModalActive, setCardListModalActive] = useState(false)
  // 카드 삭제 모달 온, 오프 상태값
  const [cardDeleteModalActive, setCardDeleteModalActive] = useState(false)
  // 삭제될 카드 인덱스값
  const [selectDeleteCard, setSelectDeleteCard] = useState<number | null>(null)
  // 슬라이드 모달 닫기 함수
  const onClickSlideModalClose = () => {
    setSlideModalActive(false)
  }
  // 마커 생성 폼 모달 오픈 함수
  const onClickCreateModalOpen = () => {
    setMarkerMode('create')
    setStartDate(new Date())
    onResetDiaryTitle()
    onResetContentText()
    onResetMapInputAddress()
    setMapObjData({ coords: {} })
    setImages([])
    setSelectList(null)
    setCreateModalActive(true)
  }
  // 마커 생성 폼 모달 닫기 함수
  const onClickCreateModalClose = () => {
    setAddressSearchOpen(false)
    setCreateModalActive(false)
  }
  // 주소검색 버튼 클릭시 카카오 주소검색 오픈 함수
  const onClickSearch = () => {
    setAddressSearchOpen(true)
  }
  // 주소검색 닫기 이벤트
  const addressSearchClose = () => {
    setAddressSearchOpen(false)
  }
  // 주소 검색 완료후 이벤트
  const onCompletePost = (data: any) => {
    setAddressSearchOpen(false)
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

      const geocoder = new window.kakao.maps.services.Geocoder()
      // console.log(fullAddr)

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(fullAddr, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)
          // console.log(coords)
          onSetMapInputAddress(fullAddr)
          setMapObjData({
            ...mapObjData,
            coords,
          })
        }
      })
    }
  }
  // 이미지 업로드 작업
  const onFileChange = useCallback(
    async e => {
      const files = e.target.files
      const formData = new FormData()
      formData.append('file', files[0])
      setBackLoadingActive(true)
      try {
        const res = await axios.post('/api/image/upload', formData)
        // console.log(res)
        if (res.data.result === 'success') {
          setImages([...images, res.data.data])
        }
      } catch (e) {
        console.log(e)
      } finally {
        inputRef.current.value = null
        setBackLoadingActive(false)
      }
    },
    [images],
  )
  // 이미지 인풋 ref
  const inputRef = useRef<any>(null)
  // 이미지 삭제 모달 온,오프 상태값
  const [imageRemoveModalActive, imageRemoveModalActiveToggle] = useBoolean(false)
  // 삭제할 이미지 아이디 값
  const [removeImageId, setRemoveImageId] = useState<string>('')
  // 이미지 삭제 모달 오픈 함수
  const imageRemoveModalOpen = (id: string) => {
    setRemoveImageId(id)
    imageRemoveModalActiveToggle()
  }
  // 이미지 삭제 이벤트
  const onClickImageRemoveEvent = async () => {
    setImages(images.filter((v: any) => v.id !== removeImageId))
    imageRemoveModalActiveToggle()
  }
  // 마커 생성, 수정 이벤트
  const onClickMapSave = () => {
    if (markerMode === 'create') {
      if (mapObjData.fullAddr === '') {
        ErrorMessageOpen('주소를 입력해 주세요.')
        return
      }
      if (diaryTitle.trim().length === 0) {
        ErrorMessageOpen('타이틀을 입력해 주세요.')
        return
      }
      if (images.length === 0) {
        ErrorMessageOpen('한 장 이상의 이미지를 등록해 주세요.')
        return
      }
      if (contentText.trim().length === 0) {
        ErrorMessageOpen('내용을 입력해 주세요.')
        return
      }

      const data = {
        diaryTitle,
        date: dayjs(startDate).format('YYYY-MM-DD'),
        images,
        contentText,
        fullAddr: mapInputAddress,
        position: { lng: mapObjData.coords.La, lat: mapObjData.coords.Ma },
      }
      // console.log('data', data)
      // setMapList([...mapList, { content: '', position: { lng: 126.987024769656, lat: 37.5705611277251 } }])
      // setMapList([...mapList, data])
      setUseDiary({ ...useDiary, mapList: [...useDiary.mapList, data] })
      // setAddressSearchOpen(false)
    } else {
      // console.log(selectList)
      const data = {
        diaryTitle,
        date: dayjs(startDate).format('YYYY-MM-DD'),
        images,
        contentText,
        fullAddr: mapInputAddress,
        position: { lng: mapObjData.coords.La, lat: mapObjData.coords.Ma },
      }
      setUseDiary({
        ...useDiary,
        mapList: useDiary.mapList.map((v, i) => {
          if (i === selectList) {
            return { ...data }
          } else {
            return { ...v }
          }
        }),
      })
    }
    onClickCreateModalClose()
  }

  // 모달에 들어갈 데이터값
  const [modalData, setModalData] = useState<any>(null)

  // 저장 확인 모달 오픈 이벤트
  const onClickSaveModalOpen = () => {
    setSaveFormModalActive(true)
  }
  // 저장 확인 모달 닫기 이벤트
  const onClickSaveModalClose = () => {
    setSaveFormModalActive(false)
  }
  // 오버랩 모달 오픈 이벤트
  const onClickOverlapListModalOpen = () => {
    setOverlapListModalActive(true)
  }
  // 오버랩 모달 닫기 이벤트
  const onClickOverlapListModalClose = () => {
    setOverlapListModalActive(false)
  }
  // 오버랩 모달 리스트 클릭 이벤트
  const onClickOverlapList = (v: any) => {
    setOverlapListModalActive(false)
    setModalData(v)
    setSlideModalActive(true)
  }
  // 카드 리스트 모달 오픈 함수
  const onClickCardListModalOpen = () => {
    setCardListModalActive(true)
  }
  // 카드 리스트 모달 오프 함수
  const onClickCardListModalClose = () => {
    setCardListModalActive(false)
  }
  // 카드 리스트 모달 수정 버튼 클릭 이벤트
  const onClickCardListModify = (v: any, i: any) => {
    setMarkerMode('modify')
    setStartDate(new Date(v.date))
    onSetDiaryTitle(v.diaryTitle)
    onSetContentText(v.contentText)
    onSetMapInputAddress(v.fullAddr)
    setMapObjData({ coords: { La: v.position.lng, Ma: v.position.lat } })
    setImages(v.images)
    setSelectList(i)

    setCardListModalActive(false)
    setCreateModalActive(true)
  }
  // 카드 리스트 삭제 모달 오픈 함수
  const onClickCardDeleteModalOpen = (i: any) => {
    setSelectDeleteCard(i)
    setCardDeleteModalActive(true)
  }
  // 카드 리스트 삭제 모달 오프 함수
  const onClickCardDeleteModalClose = () => {
    setSelectDeleteCard(null)
    setCardDeleteModalActive(false)
  }
  // 카드 삭제 이벤트
  const onClickCardDelete = () => {
    setUseDiary({
      ...useDiary,
      mapList: useDiary.mapList.filter((v, i) => i !== selectDeleteCard),
    })
    onClickCardDeleteModalClose()
  }

  // 마커 클릭 했을 떄 이벤트
  const onClickMarker = (v: any) => {
    const mapList = useDiary.mapList.filter(f => f.position.lng === v.lng && f.position.lat === v.lat)
    // console.log(mapList)
    if (mapList.length > 1) {
      setOverLapData(mapList)
      onClickOverlapListModalOpen()
    } else {
      setModalData(mapList[0])
      setSlideModalActive(true)
    }
  }

  // 다이어리 임시저장
  const temporarySave = async () => {
    if (useDiary.title.trim().length === 0) {
      ErrorMessageOpen('다이어리 제목을 입력해 주세요.')
      return
    }
    setBackLoadingActive(true)
    try {
      let res = null
      if (formMode === 'create') {
        res = await axios.post('/api/diary_save', {
          user_id: userData.data.id,
          location: useDiary.location,
          title: useDiary.title,
          description: useDiary.description,
          mapList: useDiary.mapList,
        })
      } else if (formMode === 'diary_save') {
        res = await axios.put('/api/diary_save', {
          id: diarySaveData.id,
          user_id: userData.data.id,
          location: useDiary.location,
          title: useDiary.title,
          description: useDiary.description,
          mapList: useDiary.mapList,
        })
      }
      setBackLoadingActive(false)
      if (res?.status === 200) {
        SuccessMessageOpen('저장에 성공 했습니다.')
        navigate(`/write?save_id=${res.data.id}`)
        onClickSaveModalClose()
      }
    } catch (e: any) {
      setBackLoadingActive(false)
      ErrorMessageOpen('저장에 실패 했습니다.')
    }
  }

  // 다이어리 저장
  const onClickDiarySave = async () => {
    if (useDiary.location.trim().length === 0) {
      ErrorMessageOpen('다이어리 주소를 입력해 주세요.')
      return
    }
    if (checkSpecial(useDiary.location)) {
      ErrorMessageOpen('다이어리 주소는 특수문자가 불가능 합니다.')
      return
    }
    if (useDiary.title.trim().length === 0) {
      ErrorMessageOpen('다이어리 제목을 입력해 주세요.')
      return
    }
    setBackLoadingActive(true)
    try {
      let res = null
      if (formMode === 'create' || formMode === 'diary_save') {
        res = await axios.post('/api/diary', {
          user_id: userData.data.id,
          location: useDiary.location,
          title: useDiary.title,
          description: useDiary.description,
          mapList: useDiary.mapList,
        })
      } else if (formMode === 'diary') {
        res = await axios.put('/api/diary', {
          id: diaryData.id,
          user_id: userData.data.id,
          location: useDiary.location,
          title: useDiary.title,
          description: useDiary.description,
          mapList: useDiary.mapList,
        })
      }
      // console.log(res)
      setBackLoadingActive(false)
      if (res?.status === 200) {
        SuccessMessageOpen('저장에 성공 했습니다.')
        navigate(`/diary_list`)
        onClickSaveModalClose()
      }
    } catch (e: any) {
      setBackLoadingActive(false)
      if (e.response.data.detail) {
        ErrorMessageOpen(e.response.data.detail)
      } else {
        ErrorMessageOpen('저장에 실패 했습니다.')
      }
    }
  }

  useEffect(() => {
    if (userIsError) {
      navigate('/')
    }
  }, [navigate, userIsError])

  const clusterPositionsData = {
    positions: [
      {
        lat: 37.27943075229118,
        lng: 127.01763998406159,
      },
      {
        lat: 37.55915668706214,
        lng: 126.92536526611102,
      },
      {
        lat: 35.13854258261161,
        lng: 129.1014781294671,
      },
      {
        lat: 37.55518388656961,
        lng: 126.92926237742505,
      },
      {
        lat: 35.20618517638034,
        lng: 129.07944301057026,
      },
      {
        lat: 37.561110808242056,
        lng: 126.9831268386891,
      },
      {
        lat: 37.86187129655063,
        lng: 127.7410250820423,
      },
      {
        lat: 37.47160156778542,
        lng: 126.62818064142286,
      },
      {
        lat: 35.10233410927457,
        lng: 129.02611815856181,
      },
      {
        lat: 35.10215562270429,
        lng: 129.02579793018205,
      },
      {
        lat: 35.475423012251106,
        lng: 128.76666923366042,
      },
      {
        lat: 35.93282824693927,
        lng: 126.95307628834287,
      },
      {
        lat: 36.33884892276137,
        lng: 127.393666019664,
      },
      {
        lat: 37.520412849636,
        lng: 126.9742764161581,
      },
      {
        lat: 35.155139675209675,
        lng: 129.06154773758374,
      },
      {
        lat: 35.816041994696576,
        lng: 127.11046706211324,
      },
      {
        lat: 38.20441110638504,
        lng: 128.59038671285234,
      },
      {
        lat: 37.586112739308916,
        lng: 127.02949148517999,
      },
      {
        lat: 37.50380641844987,
        lng: 127.02130716617751,
      },
      {
        lat: 37.55155704387368,
        lng: 126.92161115892036,
      },
      {
        lat: 37.55413060051369,
        lng: 126.92207472929526,
      },
      {
        lat: 36.362321615174835,
        lng: 127.35000483225389,
      },
      {
        lat: 37.55227862908755,
        lng: 126.92280546294998,
      },
      {
        lat: 37.490413948014606,
        lng: 127.02079678472444,
      },
      {
        lat: 35.172358507549596,
        lng: 126.90545394866643,
      },
      {
        lat: 35.15474103200252,
        lng: 129.11827889154455,
      },
      {
        lat: 37.516081250973485,
        lng: 127.02369057166361,
      },
      {
        lat: 36.80711722863776,
        lng: 127.14020346037576,
      },
      {
        lat: 37.28957415752673,
        lng: 127.00103752005424,
      },
      {
        lat: 35.83953896766896,
        lng: 128.7566880321854,
      },
      {
        lat: 37.51027412948879,
        lng: 127.08227718124704,
      },
      {
        lat: 37.493581783270294,
        lng: 126.72541955660554,
      },
      {
        lat: 35.135291862962795,
        lng: 129.10060911448775,
      },
      {
        lat: 35.174574933144065,
        lng: 126.91389980787773,
      },
      {
        lat: 37.795887691878654,
        lng: 127.10660416587146,
      },
      {
        lat: 37.59288687521181,
        lng: 126.96560524627377,
      },
      {
        lat: 37.45076411130452,
        lng: 127.14593003749792,
      },
      {
        lat: 35.86008337557079,
        lng: 127.1263912488061,
      },
      {
        lat: 35.23773491330953,
        lng: 129.08371037429578,
      },
      {
        lat: 37.524297321304886,
        lng: 127.05018281937049,
      },
      {
        lat: 36.33386658021849,
        lng: 127.4461721466889,
      },
      {
        lat: 35.72963747546802,
        lng: 128.27079056365005,
      },
      {
        lat: 36.02726828142973,
        lng: 129.37257233594056,
      },
      {
        lat: 35.0708030360945,
        lng: 129.0593185494088,
      },
      {
        lat: 35.86835862950247,
        lng: 128.59755089175871,
      },
      {
        lat: 33.51133264696746,
        lng: 126.51852347452322,
      },
      {
        lat: 37.61284289586752,
        lng: 127.03120547238589,
      },
      {
        lat: 35.851696038722466,
        lng: 128.59092937125666,
      },
      {
        lat: 37.59084695083232,
        lng: 127.01872773588882,
      },
      {
        lat: 35.52114874288784,
        lng: 129.33573629945764,
      },
      {
        lat: 36.362326407439845,
        lng: 127.33577420148076,
      },
      {
        lat: 37.28941189110747,
        lng: 127.00446132665141,
      },
      {
        lat: 35.32049801117398,
        lng: 129.1810343576788,
      },
      {
        lat: 37.53338631541601,
        lng: 127.00615481678061,
      },
      {
        lat: 37.413461468258156,
        lng: 126.67735680840826,
      },
      {
        lat: 35.920390371093205,
        lng: 128.54411720249956,
      },
      {
        lat: 36.65489374054824,
        lng: 127.48374816871991,
      },
      {
        lat: 37.49491987110441,
        lng: 127.01493134206048,
      },
      {
        lat: 37.64985695608336,
        lng: 127.14496345268074,
      },
      {
        lat: 37.55686770317417,
        lng: 127.16927880543041,
      },
      {
        lat: 37.37014007589146,
        lng: 127.10614330185591,
      },
      {
        lat: 37.5350236507627,
        lng: 126.96157681184789,
      },
      {
        lat: 37.40549630594667,
        lng: 126.8980581820004,
      },
      {
        lat: 34.867950544005744,
        lng: 128.69069690081176,
      },
      {
        lat: 35.16317059543225,
        lng: 128.98452978748048,
      },
      {
        lat: 36.607484825953186,
        lng: 127.48520451195111,
      },
      {
        lat: 37.651724785213986,
        lng: 126.58306748337554,
      },
      {
        lat: 35.86059690063427,
        lng: 128.59193087665244,
      },
      {
        lat: 35.25685847585025,
        lng: 128.59912605060455,
      },
      {
        lat: 33.509258155694496,
        lng: 126.5109451464813,
      },
      {
        lat: 37.64366155701157,
        lng: 126.63255039247507,
      },
      {
        lat: 35.82667262227336,
        lng: 127.1030670574823,
      },
      {
        lat: 35.82003554991111,
        lng: 127.14810974062483,
      },
      {
        lat: 35.097485195649455,
        lng: 128.99486181862338,
      },
      {
        lat: 37.32204249590605,
        lng: 127.95591893585816,
      },
      {
        lat: 37.50535127272031,
        lng: 127.1047465440526,
      },
      {
        lat: 36.99081407156533,
        lng: 127.09338324956647,
      },
      {
        lat: 37.323486640444834,
        lng: 127.12285239871076,
      },
      {
        lat: 35.78973089440451,
        lng: 127.13644319545601,
      },
      {
        lat: 35.641373953578196,
        lng: 129.35463220719618,
      },
      {
        lat: 37.47423127310911,
        lng: 126.97625029161996,
      },
      {
        lat: 35.84357192991226,
        lng: 128.61143720719716,
      },
      {
        lat: 37.180974984085736,
        lng: 128.20294526341132,
      },
      {
        lat: 37.57895718642583,
        lng: 126.9316897337244,
      },
      {
        lat: 33.49077253755052,
        lng: 126.49314817000993,
      },
      {
        lat: 36.42175925330255,
        lng: 128.67409133225766,
      },
      {
        lat: 37.46405540570109,
        lng: 126.7153544119173,
      },
      {
        lat: 37.594758776232126,
        lng: 127.10099917489818,
      },
      {
        lat: 37.7239966558994,
        lng: 127.0478671731854,
      },
      {
        lat: 35.86680171505329,
        lng: 128.5923738376741,
      },
      {
        lat: 37.560573727266785,
        lng: 126.81239107485251,
      },
      {
        lat: 37.78692224857484,
        lng: 126.98966010341789,
      },
      {
        lat: 35.10368644802913,
        lng: 129.0206862606022,
      },
      {
        lat: 37.063839948992644,
        lng: 127.06856523030079,
      },
      {
        lat: 37.34344643728643,
        lng: 127.94382181350932,
      },
      {
        lat: 37.512521267219064,
        lng: 127.40054805648133,
      },
      {
        lat: 35.15286653837983,
        lng: 126.90419903971498,
      },
      {
        lat: 35.173238445546296,
        lng: 129.176082844468,
      },
      {
        lat: 36.082394201323524,
        lng: 129.40330471725923,
      },
      {
        lat: 37.51043665598106,
        lng: 127.03974070036524,
      },
      {
        lat: 36.627816673285054,
        lng: 127.44969866021904,
      },
      {
        lat: 37.59194624756919,
        lng: 127.01817545576053,
      },
      {
        lat: 37.387147045560866,
        lng: 127.1253365438929,
      },
      {
        lat: 35.89948383848115,
        lng: 128.60809550730653,
      },
      {
        lat: 37.555316235235324,
        lng: 127.14038447894715,
      },
      {
        lat: 36.09622092762977,
        lng: 128.43314679004078,
      },
      {
        lat: 37.582855922985544,
        lng: 126.91907857008522,
      },
      {
        lat: 37.516000983841586,
        lng: 128.72798872032757,
      },
      {
        lat: 37.48429363675198,
        lng: 127.0379630203579,
      },
      {
        lat: 37.54502575965604,
        lng: 126.95429338245707,
      },
      {
        lat: 35.236247173046394,
        lng: 128.8677618015292,
      },
      {
        lat: 37.40157536691968,
        lng: 127.11717457214067,
      },
      {
        lat: 36.95191038001258,
        lng: 127.91064040877527,
      },
      {
        lat: 37.491526492971346,
        lng: 126.85463749525812,
      },
      {
        lat: 36.124356479753196,
        lng: 128.09517052346138,
      },
      {
        lat: 37.15715169307048,
        lng: 128.15853461363773,
      },
      {
        lat: 37.5808156608605,
        lng: 126.95109705510639,
      },
      {
        lat: 37.46931787249714,
        lng: 126.89904775044873,
      },
      {
        lat: 35.52195614910054,
        lng: 129.3209904841746,
      },
      {
        lat: 37.58625703195563,
        lng: 126.9496035206742,
      },
      {
        lat: 37.28463639199199,
        lng: 126.85984474757359,
      },
      {
        lat: 35.534169458631226,
        lng: 129.31169021536095,
      },
      {
        lat: 37.553341234194285,
        lng: 127.15481222237025,
      },
      {
        lat: 37.62293367990081,
        lng: 126.83445005122417,
      },
      {
        lat: 35.5272027005698,
        lng: 127.72953798950101,
      },
      {
        lat: 35.180032285898854,
        lng: 128.06954509175367,
      },
    ],
  }

  const [positions, setPositions] = useState<any>([])

  useEffect(() => {
    console.log(clusterPositionsData)
    setPositions(clusterPositionsData.positions)
  }, [])

  return (
    <>
      <MapContainer>
        <Map center={{ lat: 36.2683, lng: 127.6358 }} style={{ width: '100%', height: '100%' }} level={12}>
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={10} // 클러스터 할 최소 지도 레벨
          >
            {useDiary.mapList.map((v: any, i: any) => (
              <MapMarker key={i} position={v.position} onClick={() => onClickMarker(v.position)} />
            ))}
          </MarkerClusterer>
        </Map>

        {/*<div style={{ width: '100%', height: '100%' }} id="map" ref={mapRef} />*/}
      </MapContainer>

      <ModalContainer isActive={createModalActive} closeEvent={onClickCreateModalClose} maxWidth="500px">
        <Card title="카드 추가">
          <CardInputGroup>
            <div className="title">날짜 선택</div>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              locale={ko} // 언어설정 기본값은 영어
              dateFormat="yyyy-MM-dd" // 날짜 형식 설정
              className="input-datepicker" // 클래스 명 지정 css주기 위해
              closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
              // placeholderText="체크인 날짜 선택" // placeholder
            />
          </CardInputGroup>

          <CardInputGroup>
            <div className="title">주소 검색</div>
            <div className="address_group">
              <Input type="text" value={mapInputAddress} onChange={onChangeMapInputAddress} disabled={true} />
              <Button width="100%" onClick={onClickSearch}>
                검색
              </Button>
            </div>
          </CardInputGroup>
          <CardInputGroup>
            <PostCodeProps
              addressSearchOpen={addressSearchOpen}
              onCompletePost={onCompletePost}
              addressSearchClose={addressSearchClose}
            />
          </CardInputGroup>
          <CardInputGroup>
            <div className="title">카드 제목</div>
            <Input type="text" value={diaryTitle} onChange={onChangeDiaryTitle} maxLength={30} />
          </CardInputGroup>
          <CardInputGroup>
            <div className="title">사진 추가</div>
            <div className="upload_group">
              {images.length > 0 &&
                images.map((v: any) => <ImageBox key={v.id} img={v.url} onClick={() => imageRemoveModalOpen(v.id)} />)}
              <UploadBox inputRef={inputRef} onFileChange={onFileChange} />
            </div>
          </CardInputGroup>
          <CardInputGroup>
            <div className="title">내용 입력</div>
            <div className="input_group">
              <Textarea
                value={contentText}
                onChange={onChangeContentText}
                maxLength={100}
                placeholder="100글자 이내로 작성해 주세요."
              />
            </div>
          </CardInputGroup>
          <CardButtonGroup>
            <Button onClick={onClickCreateModalClose} theme="tertiary">
              닫기
            </Button>
            <Button onClick={onClickMapSave}>저장</Button>
          </CardButtonGroup>
        </Card>
      </ModalContainer>

      <ModalContainer isActive={imageRemoveModalActive} closeEvent={imageRemoveModalActiveToggle} maxWidth="500px">
        <Card title="이미지 삭제">
          <SelectContainerBox
            title="이미지를 삭제 하시겠습니까?"
            okEvent={onClickImageRemoveEvent}
            okText="삭제"
            okTextType="secondary"
            closeEvent={imageRemoveModalActiveToggle}
            closeText="취소"
          />
        </Card>
      </ModalContainer>

      <SlideModal isActive={slideModalActive} onClickModalClose={onClickSlideModalClose} modalData={modalData} />

      <OverlapListModal
        isActive={overlapListModalActive}
        onClickModalClose={onClickOverlapListModalClose}
        modalData={overlapData}
        onClickOverlapList={onClickOverlapList}
      />

      <CardListModal
        isActive={cardListModalActive}
        onClickModalClose={onClickCardListModalClose}
        modalData={useDiary}
        onClickCardListModify={onClickCardListModify}
        onClickCardDeleteModalOpen={onClickCardDeleteModalOpen}
      />

      <ModalContainer isActive={cardDeleteModalActive} closeEvent={onClickCardDeleteModalClose} maxWidth="500px">
        <Card title="카드 삭제">
          <SelectContainerBox
            title="카드를 삭제 하시겠습니까?"
            okEvent={onClickCardDelete}
            okText="삭제"
            okTextType="secondary"
            closeEvent={onClickCardDeleteModalClose}
            closeText="취소"
          />
        </Card>
      </ModalContainer>

      <NavBar
        createModalOpen={onClickCreateModalOpen}
        onClickSaveModalOpen={onClickSaveModalOpen}
        onClickListModalOpen={onClickCardListModalOpen}
      />

      <SaveFormModal
        isActive={saveFromModalActive}
        closeEvent={onClickSaveModalClose}
        temporarySave={temporarySave}
        formMode={formMode}
        onClickDiarySave={onClickDiarySave}
      />

      <BackLoading isActive={backLoadingActive} />
    </>
  )
}

export default WritePage
