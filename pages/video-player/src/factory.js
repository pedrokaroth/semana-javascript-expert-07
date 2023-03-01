import Camera from '../../../libs/camera.js'
import { supportsWorkerType } from '../../../libs/utils.js'
import Controller from './controller.js'
import View from './view.js'

const camera = await Camera.init()

async function getWorker () {
  if (supportsWorkerType()) {
    return new Worker('./src/worker.js', { type: 'module' })
  } else {
    return {
      async postMessage () {},
      onmessage (msg) { console.log(msg) }
    }
  }
}

const worker = await getWorker()
worker.postMessage('Hello from factory')

const factory = {
  async initialize () {
    return Controller.initialize({
      view: new View(),
      camera,
      worker
    })
  }
}

export default factory
