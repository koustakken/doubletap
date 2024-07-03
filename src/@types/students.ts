export interface Student {
  id: number
  email: string
  name: string
  sex: string
  specialty: string
  group: string
  color: string
  rating: number
  birthday: string
  avatar: string

  [key: string]: string | number
}
