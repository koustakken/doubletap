import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src="/logo.svg" alt="logo" />
      <p>
        STUDENTS by <span>koustakken</span>
      </p>
    </header>
  )
}
