import { date } from '../../../libs/utils.js'

export default class Controller {
  #view
  #worker
  #camera
  #blinkCounter = 0

  /**
   * @param {Object} deps
   * @param {View} deps.view
   * @param {Worker}
   */
  constructor ({ view, worker, camera }) {
    this.#view = view
    this.#view.onClickFunction(this.onBtnStart.bind(this))
    this.#worker = this.#configureWorker(worker)
    this.#camera = camera
  }

  static async initialize (deps) {
    const controller = new Controller(deps)
    controller.log('not yet detecting eye blink! click to start')
    return controller.init()
  }

  loop () {
    const video = this.#camera.video
    const image = this.#view.getVideoFrame(video)

    this.#worker.send(image)
    setTimeout(() => this.loop(), 50)
  }

  async init () {
  }

  log (msg) {
    this.#view.log(msg)
  }

  onBtnStart () {
    this.log('Initializing detection...')
    this.loop()
  }

  #configureWorker (worker) {
    let ready = false
    worker.onmessage = ({ data }) => {
      if (data.model === 'loaded') {
        ready = true
        return this.#view.buttonDisabled(false)
      }

      if (data.blinked) {
        this.#view.togglePlayVideo()
        return this.log(`Blinked at ${date()}`)
      }
    }

    return {
      send (msg) {
        if (ready) {
          worker.postMessage(msg)
        }
      }
    }
  }
}
