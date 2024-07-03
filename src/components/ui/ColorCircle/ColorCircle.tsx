import styles from './ColorCircle.module.scss'

interface ColorCircleProps {
  color: string
  className?: string
}

export const ColorCircle: React.FC<ColorCircleProps> = (props) => {
  const { color, className } = props
  return <div className={`${styles.root} ${styles[color]} ${className}`} />
}
