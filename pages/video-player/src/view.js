export default class View {
  #btnInitialize = document.querySelector('#initialize')
  #ulLogs = document.getElementById('logs')
  #videoFrameCanvas = document.createElement('canvas')
  #canvasContext = this.#videoFrameCanvas.getContext('2d', { willReadFrequently: true })
  #videoElement = document.getElementById('video-mp4')

  getVideoFrame (video) {
    const canvas = this.#videoFrameCanvas
    const [width, height] = [video.videoWidth, video.videoHeight]

    canvas.width = width
    canvas.height = height

    this.#canvasContext.drawImage(video, 0, 0, width, height)
    return this.#canvasContext.getImageData(0, 0, width, height)
  }

  buttonDisabled (disabled) {
    this.#btnInitialize.disabled = disabled

    if (disabled) {
      this.#btnInitialize.classList.add('disabled')
    } else {
      this.#btnInitialize.classList.remove('disabled')
    }
  }

  togglePlayVideo () {
    if (this.#videoElement.paused) {
      return this.#videoElement.play()
    }

    return this.#videoElement.pause()
  }

  onClickFunction (fn) {
    this.#btnInitialize.addEventListener('click', fn)
  }

  log (msg) {
    const log = document.createElement('li')

    log.classList.add('list-group-item')
    log.textContent = msg

    this.#ulLogs.prepend(log)
  }
}
