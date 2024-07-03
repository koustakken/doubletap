import React from 'react'
import { Student } from '../../@types/students'
import { StudentsListItem } from './StudentsListItem/StudentsListItem'

import styles from './StudentsList.module.scss'

interface StudentsListProps {
  data: Student[]
}

export const StudentsList: React.FC<StudentsListProps> = (props) => {
  const { data } = props
  return (
    <div className={styles.root}>
      {data.map((student) => (
        <StudentsListItem key={student.id} student={student} />
      ))}
    </div>
  )
}
