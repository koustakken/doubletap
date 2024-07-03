import WindowStore from '../../stores/WindowStore'
import styles from './Header.module.scss'

export const Header = () => {
  const { isMobile } = WindowStore
  return (
    <header className={styles.header}>
      <img src="/logo.svg" alt="logo" />
      <p>
        STUDENTS{' '}
        {!isMobile && (
          <>
            by <span>koustakken</span>
          </>
        )}
      </p>
    </header>
  )
}
