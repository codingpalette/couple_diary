import { atom } from 'recoil'

export interface imagesTypes {
  id: string
  url: string
}

export interface mapListTypes {
  contentText: string
  diaryTitle: string
  fullAddr: string
  images: imagesTypes[]
  position: {
    lat: number
    lng: number
  }
}

export interface diaryStateTypes {
  location: string
  description: string
  mapList: [] | mapListTypes[]
}

const diaryState = atom<diaryStateTypes>({
  key: 'diary-state',
  default: {
    location: '',
    description: '',
    mapList: [
      {
        contentText: 'ㄴㅇㄹ2',
        diaryTitle: '1223',
        fullAddr: '인천 남동구 백범로 455-1 (간석동, 가로판매대)',
        images: [
          {
            id: '1a0c1d6d-f3d8-44c6-c104-ec8ace7feb00',
            url: 'https://imagedelivery.net/V2CXLGEb_82hSjTiy12QJw/1a0c1d6d-f3d8-44c6-c104-ec8ace7feb00/public',
          },
        ],
        position: { lng: 126.500659640442, lat: 37.468077686823 },
      },
      {
        contentText: 'ㄴㅇㄹ2',
        diaryTitle: '1223',
        fullAddr: '인천 남동구 백범로 455-1 (간석동, 가로판매대)',
        images: [
          {
            id: '1a0c1d6d-f3d8-44c6-c104-ec8ace7feb00',
            url: 'https://imagedelivery.net/V2CXLGEb_82hSjTiy12QJw/1a0c1d6d-f3d8-44c6-c104-ec8ace7feb00/public',
          },
        ],
        position: { lng: 126.700659640442, lat: 37.468077686823 },
      },
      {
        contentText: 'ㄴㅇㄹ',
        diaryTitle: '123',
        fullAddr: '인천 남동구 백범로 455-1 (간석동, 가로판매대)',
        images: [
          {
            id: '1a0c1d6d-f3d8-44c6-c104-ec8ace7feb00',
            url: 'https://imagedelivery.net/V2CXLGEb_82hSjTiy12QJw/1a0c1d6d-f3d8-44c6-c104-ec8ace7feb00/public',
          },
        ],
        position: { lng: 126.700659640442, lat: 37.468077686823 },
      },
    ],
  },
})

export default diaryState
