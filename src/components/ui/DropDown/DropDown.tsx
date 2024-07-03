import { useState } from 'react'
import { Icon } from '../Icon/Icon'

import styles from './DropDown.module.scss'
import { DropDownItem } from './DropDownItem/DropDownItem'
import WindowStore from '../../../stores/WindowStore'

export type Property = {
  label: string
  sortType: string
}

interface DropDownProps {
  className?: string
  properties: Property[]
  onSelectSortType: (property: Property | null) => void
}

export const DropDown = (props: DropDownProps) => {
  const { isMobile } = WindowStore
  const { properties, className, onSelectSortType } = props
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (index: number) => {
    const selectedSortType = properties[index].sortType

    if (selectedSortType === selectedProperty) {
      setSelectedProperty(null)
      onSelectSortType(null)
    } else {
      setSelectedProperty(selectedSortType)
      onSelectSortType(properties[index])
    }

    setIsOpen(false)
  }

  return (
    <div className={styles.root}>
      <div className={`${styles.select} ${className}`} onClick={handleClick}>
        {!isMobile && <span>Имя Я-А</span>}
        <Icon src="./sort-icon.svg" alt="dropdown-icon" />
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {properties.map((property, index) => (
            <DropDownItem
              key={property.label}
              label={property.label}
              onClick={() => handleSelect(index)}
              selected={property.sortType === selectedProperty}
            />
          ))}
        </div>
      )}
    </div>
  )
}
