import React from 'react'
import { observer } from 'mobx-react'
import { Column } from '../../@types/columns'
import { Student } from '../../@types/students'
import styles from './Table.module.scss'
import { TableButton } from '../ui/TableButton/TableButton'
import StudentStore from '../../stores/StudentStore'

interface TableProps {
  className?: string
  columns: Column[]
}

export const Table: React.FC<TableProps> = observer(({ className, columns }) => {
  const { sortedData, handleDelete } = StudentStore

  const renderHeader = () => (
    <tr>
      {columns.map((column) => (
        <th key={column.dataIndex}>{column.title}</th>
      ))}
      <th></th>
    </tr>
  )

  const renderRows = () => {
    if (sortedData.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length}>Ничего не найдено</td>
        </tr>
      )
    }

    return sortedData.map((row: Student) => (
      <tr key={row.id}>
        {columns.map((column) => {
          const { dataIndex, render } = column
          const value = row[dataIndex]

          if (render && typeof render === 'function') {
            return <td key={dataIndex}>{render(value)}</td>
          }

          return <td key={dataIndex}>{value}</td>
        })}
        <td>
          <TableButton icon="./delete-icon.svg" onClick={() => handleDelete(row.id)} />
        </td>
      </tr>
    ))
  }

  return (
    <table className={`${styles.root} ${className}`}>
      <thead>{renderHeader()}</thead>
      <tbody>{renderRows()}</tbody>
    </table>
  )
})
