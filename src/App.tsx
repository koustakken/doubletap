import { Header } from './components/Header/Header'
import { DropDown } from './components/ui/DropDown/DropDown'
import { Input } from './components/ui/Input/Input'

function App() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <h1>Студенты</h1>
        <div className="settings">
          <Input icon="./search-icon.svg" placeholder="Поиск по имени" />
          <DropDown />
        </div>
      </div>
    </>
  )
}

export default App
