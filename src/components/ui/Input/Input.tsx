import { ChangeEvent, InputHTMLAttributes, memo } from 'react'
import styles from './Input.module.scss'
import { Icon } from '../Icon/Icon'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>

interface InputProps extends HTMLInputProps {
  value?: string
  onChange?: (value: string) => void
  icon?: string
  className?: string
}

export const Input = memo((props: InputProps) => {
  const {
    value,
    onChange,
    type = 'text',
    placeholder,
    icon,
    className,
    ...otherProps
  } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={styles.root + ' ' + className}>
      {icon && <Icon src={icon} alt={icon} className={styles.icon} />}
      <input
        type={type}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        {...otherProps}
      />
    </div>
  )
})
