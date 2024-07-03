import styles from './ColorCircle.module.scss'

interface ColorCircleProps {
  color: string
}

export const ColorCircle: React.FC<ColorCircleProps> = (props) => {
  const { color } = props
  return <div className={`${styles.root} ${styles[color]}`} />
}
