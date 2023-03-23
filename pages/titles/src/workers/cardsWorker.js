onmessage = ({ data: { maxItems } }) => {
  for (let counter = 0; counter < maxItems; counter++) console.log('.')

  postMessage({ response: 'ok' })
}
