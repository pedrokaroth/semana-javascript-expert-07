import Camera from '../../../libs/camera.js'
import Controller from './controller.js'
import Service from './service.js'
import View from './view.js'

const [path] = window.location.href.split('/pages')

await Camera.init()

console.log(path)

const factory = {
  async initialize () {
    return Controller.initialize({
      service: new Service({}),
      view: new View({})
    })
  }
}

export default factory
