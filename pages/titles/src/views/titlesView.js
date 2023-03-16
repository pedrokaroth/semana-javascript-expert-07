import Camera from '../../../../libs/camera.js'

export default class TitleView {
  #infoButtons = document.getElementsByClassName('infos')
  #closeButton
  #videoFrameCanvas = document.createElement('canvas')
  #canvasContext = this.#videoFrameCanvas.getContext('2d', { willReadFrequently: true })
  #camera

  isDOMLoaded () {
    return document.readyState === 'complete'
  }

  async showVideo () {
    if (!this.#camera) {
      this.#camera = await Camera.init()
    } else {
      this.#camera.play()
    }

    this.configureCloseButtons()
  }

  stopVideo () {
    this.#camera.video.srcObject
      .getTracks()
      .forEach(track => track.stop())
  }

  configureTitleVideo () {
    Array.from(this.#infoButtons).forEach(element => {
      element.addEventListener('click', this.showVideo.bind(this))
    })
  }

  configureCloseButtons () {
    const closeButton = document.querySelector('.close-btn')

    console.log()

    closeButton.addEventListener('click', this.stopVideo.bind(this))
  }
}
