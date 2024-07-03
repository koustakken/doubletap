import React from 'react'
import { useEffect } from 'react'
import { calculateAge } from './@libs/calcAge'
import { Column } from './@types/columns'
import { Student } from './@types/students'
import { Header } from './components/Header/Header'
import { Table } from './components/Table/Table'
import { Avatar } from './components/ui/Avatar/Avatar'
import { ColorCircle } from './components/ui/ColorCircle/ColorCircle'
import { DropDown, Property } from './components/ui/DropDown/DropDown'
import { Input } from './components/ui/Input/Input'
import { axiosInstance } from './axios/config'

function App() {
  const sortProperties: Property[] = [
    { label: 'Имя Я-А', sortType: 'name' },
    { label: 'Сначала моложе', sortType: 'birthday' },
    { label: 'Сначала старше', sortType: 'birthday-reverse' },
    { label: 'Высокий рейтинг', sortType: 'rating' },
    { label: 'Низкий рейтинг', sortType: 'rating-reverse' }
  ]

  const [students, setStudents] = React.useState<Student[]>([])
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [sortedData, setSortedData] = React.useState<Student[]>(students)
  const [sortType, setSortType] = React.useState<Property | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)

  const columns: Column[] = [
    {
      title: '',
      dataIndex: 'avatar',
      render: (value: string) => <Avatar src={value} />
    },
    {
      title: 'ФИО',
      dataIndex: 'name'
    },
    {
      title: 'Специальность',
      dataIndex: 'specialty',
      render: (value: string) => value.toLocaleUpperCase()
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      render: (value: string) => value.toLocaleUpperCase()
    },
    {
      title: 'Возраст',
      dataIndex: 'birthday',
      render: (value: string | number) => calculateAge(value)
    },
    {
      title: 'Рейтинг',
      dataIndex: 'rating'
    },
    {
      title: '',
      dataIndex: 'color',
      render: (value: string) => <ColorCircle color={value} />
    }
  ]

  const getStudents = async () => {
    try {
      const localStorageData: Student[] = JSON.parse(localStorage.getItem('students') || '')
      if (localStorageData.length) {
        setStudents(localStorageData)
        setLoading(false)
        return
      }

      const response = await axiosInstance.get('/persons')
      const data = await response.data.students

      setStudents(data)
      setLoading(false)
      localStorage.setItem('students', JSON.stringify(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStudents()
  }, [])

  useEffect(() => {
    if (!searchTerm.length) return setSortedData(students)
    setSortedData(students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm, students])

  useEffect(() => {
    if (!sortType) return setSortedData(students)
    switch (sortType.sortType) {
      case 'name':
        setSortedData([...students].sort((a, b) => (a.name > b.name ? 1 : -1)))
        break
      case 'birthday':
        setSortedData([...students].sort((a, b) => (a.birthday > b.birthday ? -1 : 1)))
        break
      case 'birthday-reverse':
        setSortedData([...students].sort((a, b) => (a.birthday > b.birthday ? 1 : -1)))
        break
      case 'rating':
        setSortedData([...students].sort((a, b) => (a.rating > b.rating ? -1 : 1)))
        break
      case 'rating-reverse':
        setSortedData([...students].sort((a, b) => (a.rating > b.rating ? 1 : -1)))
        break
    }
  }, [sortType, students])

  const handleDelete = (id: number) => {
    localStorage.setItem('students', JSON.stringify(students.filter((student) => student.id !== id)))
    setStudents(students.filter((student) => student.id !== id))
  }

  return (
    <>
      <Header />
      <div className="wrapper">
        <h1>Студенты</h1>
        <div className="settings">
          <Input icon="./search-icon.svg" placeholder="Поиск по имени" value={searchTerm} onChange={setSearchTerm} />
          <DropDown properties={sortProperties} onSelectSortType={setSortType} />
        </div>
        {loading ? <p>Loading...</p> : <Table columns={columns} data={sortedData} onDelete={handleDelete} />}
      </div>
    </>
  )
}

export default App
