export default class Camera {
  constructor () {
    this.video = document.createElement('video')
  }

  async play (element) {
    this.video.srcObject = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: globalThis.screen.availWidth,
        height: globalThis.screen.availHeight,
        frameRate: { ideal: 60 }
      }
    })

    this.video.height = 240
    this.video.width = 320

    await new Promise((resolve) => {
      this.video.onloadedmetadata = () => {
        resolve(this.video)
      }
    })

    this.video.play()

    if (element) {
      element.append(this.video)
    }
  }

  static async init (element = null) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Browser API navigator.mediaDevices.getUserMedia is not available')
    }

    const camera = new Camera()

    await camera.play(element)

    return camera
  }
}
