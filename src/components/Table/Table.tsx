import React from 'react'
import { Column } from '../../@types/columns'
import { Student } from '../../@types/students'
import styles from './Table.module.scss'
import { TableButton } from '../ui/TableButton/TableButton'

interface TableProps {
  className?: string
  onDelete?: (id: number) => void
  columns: Column[]
  data: Student[]
}

export const Table: React.FC<TableProps> = ({ className, columns, data, onDelete }) => {
  const renderHeader = () => (
    <tr>
      {columns.map((column) => (
        <th key={column.dataIndex}>{column.title}</th>
      ))}
      <th></th>
    </tr>
  )

  const renderRows = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length}>Ничего не найдено</td>
        </tr>
      )
    }

    return data.map((row: Student) => (
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
          <TableButton icon="./delete-icon.svg" onClick={() => onDelete?.(row.id)} />
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
}
