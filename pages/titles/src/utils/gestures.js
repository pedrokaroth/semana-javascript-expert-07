const gestures = {
  getGestures ({ GestureDescription, Finger, FingerCurl }) {
    const ScrollDownGesture = new GestureDescription('scroll-down') // ✊️
    const ScrollUpGesture = new GestureDescription('scroll-up') // 🖐

    // Scroll Down
    // -----------------------------------------------------------------------------

    // thumb: half curled
    // accept no curl with a bit lower confidence
    ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
    ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5)

    // all other fingers: curled
    for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
      ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0)
      ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9)
    }

    // ScrollUp
    // -----------------------------------------------------------------------------

    // no finger should be curled
    for (const finger of Finger.all) {
      ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0)
    }

    const knownGestures = [
      ScrollDownGesture,
      ScrollUpGesture
    ]

    const gestureStrings = {
      'scroll-up': '🖐',
      'scroll-down': '✊️'
    }

    return {
      knownGestures,
      gestureStrings
    }
  }
}

export default gestures
