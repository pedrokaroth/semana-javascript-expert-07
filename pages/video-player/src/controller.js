export default class Controller {
  #service
  #view

  constructor ({ service, view }) {
    this.#service = service
    this.view = view
  }

  static async initialize (deps) {
    const controller = new Controller(deps)
    return controller.init()
  }

  async init () {
  }
}
