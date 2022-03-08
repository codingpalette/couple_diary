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
  stage: number
  location: string
  description: string
  mapList: [] | mapListTypes[]
}

const diaryState = atom<diaryStateTypes>({
  key: 'diary-state',
  default: {
    stage: 1,
    location: '',
    description: '',
    mapList: [],
  },
})

export default diaryState
