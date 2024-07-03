import styles from './Avatar.module.scss'

interface AvatarProps {
  src: string
  className?: string
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { src, className } = props
  return (
    <div className={`${styles.root} ${className}`}>
      <img src={src} alt="avatar" />
    </div>
  )
}
