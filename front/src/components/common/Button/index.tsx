import React from 'react'
import { ButtonTag } from './styles'

export type ButtonProps = {
  /** 버튼 안의 내용 */
  children: React.ReactNode
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  /** 버튼의 생김새를 설정합니다. */
  theme: 'primary' | 'secondary' | 'tertiary'
  // /** 버튼의 크기를 설정합니다 */
  // size: 'medium' | 'big'
  // /** 버튼을 비활성화 시킵니다. */
  // disabled?: boolean
  /** 버튼의 너비를 임의로 설정합니다. */
  width: string
  /** 버튼의 타입을 설정합니다. */
  type?: 'button' | 'submit' | 'reset'
  // /** 클래스 네임 설정 */
  // className?: string
  // 로딩 설정
  // loading?: boolean
}

const Button = ({ children, onClick, theme, width, type }: ButtonProps) => {
  return (
    <>
      <ButtonTag onClick={onClick} width={width} theme={theme} type={type}>
        {children}
      </ButtonTag>
    </>
  )
}

Button.defaultProps = {
  width: 'auto',
  type: 'button',
  theme: 'primary',
  loading: false,
}

export default Button
