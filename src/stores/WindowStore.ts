import { makeAutoObservable } from 'mobx'

class WindowStore {
  isMobile = false

  constructor() {
    makeAutoObservable(this)
    this.handleResize = this.handleResize.bind(this) // Explicit binding
    this.destroy = this.destroy.bind(this)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  handleResize() {
    this.isMobile = window.innerWidth < 768
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}

export default new WindowStore()
