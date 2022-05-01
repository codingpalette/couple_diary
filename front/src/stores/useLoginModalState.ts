import { atom } from 'recoil'

const loginModalState = atom({
  key: 'login-modal-state',
  default: false,
})

export default loginModalState
