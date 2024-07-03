import { makeAutoObservable, observable } from 'mobx'
import { Student } from '../@types/students'
import { axiosInstance } from '../axios/config'
import { calculateAge } from '../@libs/calcAge'

class StudentStore {
  students: Student[] = []
  searchTerm: string = ''
  @observable sortedData: Student[] = []
  sortType: string | null = null
  loading: boolean = true

  constructor() {
    makeAutoObservable(this)
    this.getStudents()
  }

  async getStudents() {
    try {
      console.log('@start')
      const localStorageData: Student[] = JSON.parse(localStorage.getItem('students') || '[]')
      if (localStorageData.length) {
        console.log('@localstore', localStorageData)
        this.students = localStorageData
        this.sortedData = this.students
        this.loading = false
      } else {
        console.log('@fetch')
        const response = await axiosInstance.get('/persons')
        const data = response.data.students
        this.students = data
        this.sortedData = this.students
        this.loading = false
        console.log('@data', data)
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
    console.log(this.sortedData)
    localStorage.setItem('students', JSON.stringify(this.students.filter((student) => student.id !== id)))
    this.students = this.students.filter((student) => student.id !== id)
    this.filterStudents()
  }
}

export default new StudentStore()
