export default class Camera {
  constructor () {
    this.video = document.createElement('video')
  }

  static async init () {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Browser API navigator.mediaDevices.getUserMedia is not available')
    }

    const camera = new Camera()

    camera.video.srcObject = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: globalThis.screen.availWidth,
        height: globalThis.screen.availHeight,
        frameRate: { ideal: 60 }
      }
    })

    camera.video.height = 240
    camera.video.width = 320

    const videoElement = document.getElementById('video')

    if (false) {
      videoElement.append(camera.video)
    }

    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(camera.video)
      }
    })

    camera.video.play()

    return camera
  }
}
