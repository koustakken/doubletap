import { makeAutoObservable } from 'mobx'

class WindowStore {
  isMobile = false

  constructor() {
    makeAutoObservable(this)
    this.handleResize = this.handleResize.bind(this) // Explicit binding
    this.handleResize()
  }

  handleResize() {
    this.isMobile = window.innerWidth < 768
  }
}

export default new WindowStore()
