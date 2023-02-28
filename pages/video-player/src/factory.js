import Camera from '../../../libs/camera.js'
import { supportsWorkerType } from '../../../libs/utils.js'
import Controller from './controller.js'
import Service from './service.js'
import View from './view.js'

await Camera.init()

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
      service: new Service({}),
      view: new View({})
    })
  }
}

export default factory
