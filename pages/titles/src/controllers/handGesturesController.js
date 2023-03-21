import { prepareRunChecker } from '../../../../libs/utils.js'
const { shoudRun: shouldScroll } = prepareRunChecker({ timerDelay: 200 })
const { shoudRun: shouldClick } = prepareRunChecker({ timerDelay: 300 })

export default class HandGesturesController {
  #service
  #view
  #camera
  #scrollPosition = {
    y: 0,
    lastDirection: ''
  }

  constructor ({ service, view, camera }) {
    this.#service = service
    this.#view = view
    this.#camera = camera
  }

  async init () {
    console.log('iniciando validacao de gestos')
    return this.#loop()
  }

  #scrollPage (direction) {
    if (!shouldScroll()) {
      return
    }

    const pixelPerScroll = 100

    if (direction !== this.#scrollPosition.lastDirection) {
      this.#scrollPosition.lastDirection = direction
      return
    }

    const newPosition = direction === 'scroll-down'
      ? this.#scrollPosition.y + pixelPerScroll
      : this.#scrollPosition.y - pixelPerScroll

    // TODO: validar scroll maximo da pagina
    if (newPosition < 0) {
      return
    }

    this.#scrollPosition.y = newPosition

    this.#view.scrollPage(this.#scrollPosition.y)
  }

  async #estimateHands () {
    try {
      const hands = await this.#service.estimateHands(this.#camera.video)

      if (!hands.length) {
        return
      }

      this.#view.clearHands()
      this.#view.drawHands(hands)

      for await (const { event, x, y } of this.#service.detectGestures(hands)) {
        console.log(event)
        if (event === 'click' && shouldClick()) {
          this.#view.handClickEvent(x, y)
          continue
        }

        if (event.includes('scroll')) {
          this.#scrollPage(event)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  async #loop () {
    await this.#service.initializeDetector()
    await this.#estimateHands(this.#camera.video)
    this.#view.loop(this.#loop.bind(this))
  }

  static async initialize (deps) {
    const controller = new HandGesturesController(deps)
    return controller.init()
  }
}
