import Camera from '../../../../libs/camera.js'

export default class TitleView {
  #infoButtons = document.getElementsByClassName('infos')
  #playButtons = document.getElementsByClassName('watch')
  #camera

  async showVideo (className) {
    const imageCover = document.querySelector(`.${className}`)

    const video = document.createElement('div')
    video.classList.add('video-player')

    imageCover.append(video)

    if (!this.#camera) {
      this.#camera = await Camera.init(video)
    } else {
      this.#camera.play(video)
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
      element.addEventListener('click', this.showVideo.bind(this, 'image-cover'))
    })
  }

  configurePlayVideo () {
    Array.from(this.#playButtons).forEach(element => {
      element.addEventListener('click', this.showVideo.bind(this, 'modal-player'))
    })
  }

  configureCloseButtons () {
    document.querySelector('.close-btn')
      .addEventListener('click', this.stopVideo.bind(this))
  }
}
