import { atom } from 'recoil'

export interface imagesTypes {
  id: string
  url: string
}

export interface mapListTypes {
  contentText: string
  diaryTitle: string
  date: string
  fullAddr: string
  images: imagesTypes[]
  position: {
    lat: number
    lng: number
  }
}

export interface diaryStateTypes {
  title: string
  location: string
  description: string
  mapList: [] | mapListTypes[]
}

const diaryState = atom<diaryStateTypes>({
  key: 'diary-state',
  default: {
    title: '',
    location: '',
    description: '',
    mapList: [
      {
        contentText: 'asdasd',
        date: '2022-04-14',
        diaryTitle: 'sdf',
        fullAddr: '서울 종로구 돈화문로5길 28-3 (낙원동)',
        images: [
          {
            id: 'e6fb2e60-fa0a-4b4b-b380-f8c9dcbffb00',
            url: 'https://imagedelivery.net/V2CXLGEb_82hSjTiy12QJw/e6fb2e60-fa0a-4b4b-b380-f8c9dcbffb00/public',
          },
        ],
        position: { lat: 37.5708764408522, lng: 126.990430237695 },
      },
    ],
  },
})

export default diaryState
