onmessage = ({ data: { maxItems } }) => {
  console.log('activating blocking operation...')
  console.time('blocking-op')

  for (let counter = 0; counter < maxItems; counter++) console.log('.')

  console.timeEnd('blocking-op')
  postMessage({ response: 'ok' })
}
