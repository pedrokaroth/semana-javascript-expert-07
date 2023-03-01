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

function date () {
  const date = new Date()
  return date.toLocaleString('pt-BR', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3
  })
}

function prepareRunChecker ({ timerDelay }) {
  let lastEvent = Date.now()
  return {
    shoudRun () {
      const result = (Date.now() - lastEvent) > timerDelay

      if (result) {
        lastEvent = Date.now()
      }

      return result
    }
  }
}

export {
  supportsWorkerType,
  date,
  prepareRunChecker
}
