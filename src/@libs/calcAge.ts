export function calculateAge(birthDate: string | number) {
  let birthYear, birthMonth, birthDay

  if (typeof birthDate === 'string') {
    ;[birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number)
  } else if (typeof birthDate === 'number') {
    const dateObj = new Date(birthDate)
    birthYear = dateObj.getFullYear()
    birthMonth = dateObj.getMonth() + 1 // Месяцы начинаются с 0
    birthDay = dateObj.getDate()
  } else {
    throw new Error('Invalid birth date format')
  }

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const currentDay = currentDate.getDate()

  let age = currentYear - birthYear

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--
  }

  return age
}
