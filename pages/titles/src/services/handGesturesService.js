export default class HandGesturesService {
  #handPoseDetection
  #handVersion
  #detector = null
  #gestureEstimator
  #gestures

  constructor ({ fingerPose, handPoseDetection, handVersion, gestures }) {
    this.#gestures = gestures
    this.#handPoseDetection = handPoseDetection
    this.#handVersion = handVersion
    this.#gestureEstimator = new fingerPose.GestureEstimator(gestures.knownGestures)
  }

  async estimate (keypoints3D) {
    const predictions = await this.#gestureEstimator.estimate(
      this.#getLandMarksFromKeypoints(keypoints3D),
      9
    )

    return predictions
  }

  async * detectGestures (predictions) {
    for (const hand of predictions) {
      if (!hand.keypoints3D) {
        continue
      }

      const { gestures } = await this.estimate(hand.keypoints3D)

      if (!gestures.length) {
        continue
      }

      const validGesture = gestures.reduce((prev, curr) =>
        curr.score > prev.score ? curr : prev)

      const { x, y } = this.#getFingerPosition(hand, 'index_finger_tip')

      yield { event: validGesture.name, x, y }
    }
  }

  #getFingerPosition ({ keypoints }, fingerName) {
    return keypoints.find(({ name }) => name === fingerName)
  }

  async estimateHands (video) {
    return this.#detector.estimateHands(video, { flipHorizontal: true })
  }

  async initializeDetector () {
    if (this.#detector) {
      return this.#detector
    }

    this.#detector = await this.#handPoseDetection.createDetector(
      this.#handPoseDetection.SupportedModels.MediaPipeHands,
      {
        runtime: 'mediapipe',
        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handVersion}`,
        modelType: 'lite',
        maxHands: 2
      }
    )

    return this.#detector
  }

  #getLandMarksFromKeypoints (keypoints3D) {
    return keypoints3D.map(keypoint => [
      keypoint.x, keypoint.y, keypoint.z
    ])
  }
}
