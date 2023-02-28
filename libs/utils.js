function supportsWorkerType () {
  let support = false
  const tester = {
    get type () { support = true }
  }

  try {
    // eslint-disable-next-line no-new
    new Worker('blob://', tester)
  } finally {
    console.log(`support: ${support}`)
    // eslint-disable-next-line no-unsafe-finally
    return support
  }
}

export {
  supportsWorkerType
}
