export default class HandGesturesView {
  loop (fn) {
    requestAnimationFrame(fn)
  }

  scrollPage (top) {
    scroll({
      behavior: 'smooth',
      top
    })
  }
}
