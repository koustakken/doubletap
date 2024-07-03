import styles from './TableButton.module.scss'
import { Icon } from '../Icon/Icon'
// import { Student } from '../../../@types/students'

interface TableButtonProps {
  onClick: () => void
  className?: string
  icon: string
}

export const TableButton: React.FC<TableButtonProps> = (props) => {
  const { className, icon, onClick } = props

  return (
    <button className={`${styles.root} ${className}`} onClick={onClick}>
      <Icon src={icon} alt={icon} />
    </button>
  )
}
