import { Icon } from '../../Icon/Icon'
import styles from './DropDownItem.module.scss'

interface DropDownItemProps {
  className?: string
  label: string
  selected?: boolean
  onClick?: () => void
}

export const DropDownItem = (props: DropDownItemProps) => {
  const { className, label, selected, onClick } = props
  return (
    <div
      className={
        styles.root + ' ' + className + ' ' + (selected ? styles.selected : '')
      }
      onClick={onClick}
    >
      {label} {selected && <Icon src="./check-icon.svg" alt="check-icon" />}
    </div>
  )
}
