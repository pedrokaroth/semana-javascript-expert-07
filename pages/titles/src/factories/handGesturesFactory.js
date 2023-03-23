
import HandGesturesController from '../controllers/handGesturesController.js'
import HandGesturesService from '../services/handGesturesService.js'
import HandGesturesView from '../views/handGestuesView.js'

import 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.2.0/dist/tf-core.min.js'
import 'https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.min.js'
import 'https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.min.js'
import 'https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.min.js'
import 'https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js'

import Camera from '../../../../libs/camera.js'
import gestures from '../utils/gestures.js'

const styler = new PseudoStyler()

const {
  knownGestures,
  gestureStrings,
  fingerLookupIndexes
} = gestures.getGestures(window.fp)

const factory = {
  async initialize () {
    return HandGesturesController.initialize({
      camera: await Camera.init(document.body),
      view: new HandGesturesView({
        fingerLookupIndexes,
        styler
      }),
      service: new HandGesturesService({
        fingerPose: window.fp,
        handPoseDetection: window.handPoseDetection,
        handVersion: window.VERSION,
        gestures: { knownGestures, gestureStrings }
      })
    })
  }
}

export default factory
