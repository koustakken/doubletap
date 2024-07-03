import { calculateAge } from '../../../@libs/calcAge'
import { Student } from '../../../@types/students'
import StudentStore from '../../../stores/StudentStore'
import { Avatar } from '../../ui/Avatar/Avatar'
import { ColorCircle } from '../../ui/ColorCircle/ColorCircle'
import { Icon } from '../../ui/Icon/Icon'
import { TableButton } from '../../ui/TableButton/TableButton'

import styles from './StudentsListItem.module.scss'

interface StudentsListItemProps {
  student: Student
}

export const StudentsListItem: React.FC<StudentsListItemProps> = (props) => {
  const { student } = props
  const agePrefix = calculateAge(student.birthday) % 10 >= 5 || calculateAge(student.birthday) % 10 === 0
  const age = calculateAge(student.birthday)

  const { handleDelete } = StudentStore

  return (
    <div className={styles.root}>
      <div className={styles.up}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Avatar src={student.avatar} />
            <div className={styles.info}>
              <p>{student.name}</p>
              <div className={styles.stats}>
                <ColorCircle color={student.color} className={styles.color} />
                <Icon src="./star-icon.svg" alt="star-icon" />
                <span>{student.rating}</span>
              </div>
            </div>
          </div>
          <TableButton
            icon="./delete-icon.svg"
            onClick={() => {
              handleDelete(student.id)
            }}
          />
        </div>
        <div className={styles.bottom}>
          <ul>
            <li>
              <span>{agePrefix ? age + ' лет' : age + ' года'}</span>
            </li>
            <li>
              <span>{student.specialty.toLocaleUpperCase()}</span>
            </li>
            <li>
              <span>{student.group.toLocaleUpperCase()}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
