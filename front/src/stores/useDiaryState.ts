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
  mapList: [] | mapListTypes[]
}

const diaryState = atom<diaryStateTypes>({
  key: 'diary-state',
  default: {
    location: '',
    mapList: [],
  },
})

export default diaryState
