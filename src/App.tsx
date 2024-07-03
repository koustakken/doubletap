import { observer } from 'mobx-react'
import studentStore from './stores/StudentStore'
import { Header } from './components/Header/Header'
import { Table } from './components/Table/Table'
import { Avatar } from './components/ui/Avatar/Avatar'
import { ColorCircle } from './components/ui/ColorCircle/ColorCircle'
import { DropDown, Property } from './components/ui/DropDown/DropDown'
import { Input } from './components/ui/Input/Input'
import { Column } from './@types/columns'

const sortProperties: Property[] = [
  { label: 'Имя Я-А', sortType: 'name' },
  { label: 'Сначала моложе', sortType: 'birthday' },
  { label: 'Сначала старше', sortType: 'birthday-reverse' },
  { label: 'Высокий рейтинг', sortType: 'rating' },
  { label: 'Низкий рейтинг', sortType: 'rating-reverse' }
]

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
    render: (value: string) => studentStore.calculateAge(value)
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

const App = observer(() => {
  const { loading, searchTerm } = studentStore

  const handleSearchTermChange = (term: string) => {
    studentStore.setSearchTerm(term)
    studentStore.filterStudents()
  }

  const handleSortTypeChange = (type: Property | null) => {
    if (type) {
      studentStore.setSortType(type.sortType)
      studentStore.sortStudents()
    } else {
      studentStore.setSortType(null)
      studentStore.sortStudents()
    }
  }

  return (
    <>
      <Header />
      <div className="wrapper">
        <h1>Студенты</h1>
        <div className="settings">
          <Input
            icon="./search-icon.svg"
            placeholder="Поиск по имени"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <DropDown properties={sortProperties} onSelectSortType={handleSortTypeChange} />
        </div>
        {loading ? <p>Loading...</p> : <Table columns={columns} />}
      </div>
    </>
  )
})

export default App
