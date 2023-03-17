
export default class TitlesController {
  #view
  #service

  constructor ({ view, service }) {
    this.#service = service
    this.#view = view
    this.promise = new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', async () => {
        await this.#sleep(1000)
        resolve()
      })
    })
  }

  #sleep (s) {
    return new Promise(resolve => setTimeout(resolve, s))
  }

  async init () {
    await this.promise
    this.#view.configureTitleVideo()
    this.#view.configurePlayVideo()
  }

  static async initialize (deps) {
    const controller = new TitlesController(deps)
    return controller.init()
  }
}
