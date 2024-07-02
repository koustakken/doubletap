import { useState } from 'react'
import { Icon } from '../Icon/Icon'

import styles from './DropDown.module.scss'
import { DropDownItem } from './DropDownItem/DropDownItem'

interface DropDownProps {
  className?: string
}

export const DropDown = (props: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState(0)

  const properties = [
    'Имя Я-А',
    'Сначала моложе',
    'Сначала старше',
    'Высокий рейтинг',
    'Низкий рейтинг',
  ]

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (index: number) => {
    setSelectedProperty(index)
    setIsOpen(false)
  }

  const { className } = props
  return (
    <div className={styles.root}>
      <div className={styles.select + ' ' + className} onClick={handleClick}>
        <span>Имя Я-А</span>
        <Icon src="./sort-icon.svg" alt="dropdown-icon" />
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {properties.map((property) => (
            <DropDownItem
              key={property}
              label={property}
              onClick={() => handleSelect(properties.indexOf(property))}
              selected={selectedProperty === properties.indexOf(property)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
