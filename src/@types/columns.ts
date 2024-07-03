import { ReactNode } from 'react'

export type Column = {
  title: string
  dataIndex: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any) => ReactNode
}
