export default class HandGesturesView {
  #handsCanvas = document.querySelector('#hands')
  #canvasContext = this.#handsCanvas.getContext('2d')
  #fingerLookupIndexes

  constructor ({ fingerLookupIndexes }) {
    this.#handsCanvas.width = globalThis.screen.availWidth
    this.#handsCanvas.height = globalThis.screen.availHeight
    this.#fingerLookupIndexes = fingerLookupIndexes
  }

  clearHands () {
    this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
  }

  drawHands (hands) {
    for (const { keypoints } of hands) {
      this.#canvasContext.fillStyle = 'red'
      this.#canvasContext.strokeStyle = 'white'
      this.#canvasContext.lineWidth = 10
      this.#canvasContext.lineJoin = 'round'

      this.#drawJoients(keypoints)
      this.#drawFingers(keypoints)
    }
  }

  handClickEvent (x, y) {
    const clickedElement = document.elementFromPoint(x, y)

    if (clickedElement) {
      const rect = clickedElement.getBoundingClientRect()

      const click = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: rect.left + x,
        clientY: rect.top + y
      })

      clickedElement.dispatchEvent(click)
    }
  }

  #drawFingers (keypoints) {
    const fingers = Object.keys(this.#fingerLookupIndexes)

    for (const finger of fingers) {
      const points = this.#fingerLookupIndexes[finger]
        .map(index => keypoints[index])

      const region = new Path2D()

      // pega a primeira parte da mao
      const [{ x, y }] = points
      region.moveTo(x, y)

      for (const { x, y } of points) {
        region.lineTo(x, y)
      }

      this.#canvasContext.stroke(region)
    }
  }

  #drawJoients (keypoints) {
    for (const { x, y } of keypoints) {
      this.#canvasContext.beginPath()

      const newX = x + 2
      const newY = y + 2
      const raduis = 3
      const startAngle = 0
      const endAngle = 2 * Math.PI

      this.#canvasContext.arc(newX, newY, raduis, startAngle, endAngle)
      this.#canvasContext.fill()
    }
  }

  loop (fn) {
    requestAnimationFrame(fn)
  }

  scrollPage (top) {
    scroll({
      behavior: 'smooth',
      top
    })
  }
}
