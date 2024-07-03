import { ReactNode } from 'react'
import { Student } from './students'

export type Column = {
  title: string
  dataIndex: string
  render?: (value: string | number | Student) => ReactNode
}
