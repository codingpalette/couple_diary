// 특수 문자 체크
export const checkSpecial = (str: string) => {
  const regExp = /[`~!@#$%^&*|\\\'\";:\/?]/gi
  return regExp.test(str)
}

export const checkEmail = (str: string) => {
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  return regExp.test(str)
}
