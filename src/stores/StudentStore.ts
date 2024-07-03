import { makeAutoObservable } from 'mobx'
import { Student } from '../@types/students'
import { axiosInstance } from '../axios/config'
import { calculateAge } from '../@libs/calcAge'
import { Property } from '../components/ui/DropDown/DropDown'

class StudentStore {
  students: Student[] = []
  searchTerm: string = ''
  sortedData: Student[] = []
  sortType: string | null = null
  loading: boolean = true

  sortProperties: Property[] = [
    { label: 'Имя Я-А', sortType: 'name' },
    { label: 'Сначала моложе', sortType: 'birthday' },
    { label: 'Сначала старше', sortType: 'birthday-reverse' },
    { label: 'Высокий рейтинг', sortType: 'rating' },
    { label: 'Низкий рейтинг', sortType: 'rating-reverse' },
    { label: 'По любимому цвету', sortType: 'color' }
  ]

  constructor() {
    makeAutoObservable(this)
    this.getStudents()
    this.handleDelete = this.handleDelete.bind(this)
  }

  async getStudents() {
    try {
      const localStorageData: Student[] = JSON.parse(localStorage.getItem('students') || '[]')
      if (localStorageData.length) {
        this.students = localStorageData
        this.sortedData = this.students
        this.loading = false
      } else {
        const response = await axiosInstance.get('/persons')
        const data = await response.data.students
        this.students = data
        this.sortedData = this.students
        this.loading = false
        localStorage.setItem('students', JSON.stringify(data))
      }
    } catch (error) {
      console.log(error)
    }
  }

  setSearchTerm(term: string) {
    this.searchTerm = term
    this.filterStudents()
  }

  setSortType(type: string | null) {
    this.sortType = type
    this.sortStudents()
  }

  filterStudents() {
    if (!this.searchTerm.length) {
      this.sortedData = this.students
    } else {
      this.sortedData = this.students.filter((student) =>
        student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  }

  sortStudents() {
    if (!this.sortType) {
      this.sortedData = this.students
    } else {
      switch (this.sortType) {
        case 'name':
          this.sortedData = [...this.students].sort((a, b) => (a.name > b.name ? 1 : -1))
          break
        case 'birthday':
          this.sortedData = [...this.students].sort((a, b) => (a.birthday > b.birthday ? -1 : 1))
          break
        case 'birthday-reverse':
          this.sortedData = [...this.students].sort((a, b) => (a.birthday > b.birthday ? 1 : -1))
          break
        case 'rating':
          this.sortedData = [...this.students].sort((a, b) => (a.rating > b.rating ? -1 : 1))
          break
        case 'rating-reverse':
          this.sortedData = [...this.students].sort((a, b) => (a.rating > b.rating ? 1 : -1))
          break
        case 'color':
          this.sortedData = [...this.students].sort((a, b) => (a.color > b.color ? 1 : -1))
          break
        default:
          this.sortedData = this.students
          break
      }
    }
  }

  calculateAge(birthday: string | number) {
    return calculateAge(birthday)
  }

  handleDelete(id: number) {
    localStorage.setItem('students', JSON.stringify(this.students.filter((student) => student.id !== id)))
    this.students = this.students.filter((student) => student.id !== id)
    this.filterStudents()
  }
}

export default new StudentStore()
