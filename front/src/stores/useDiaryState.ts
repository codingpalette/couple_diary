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
    mapList: [],
  },
})

export default diaryState
