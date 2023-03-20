import cardsFactory from './factories/cardsFactory.js'
import titlesFactory from './factories/titlesFactory.js'
import handGesturesfactory from './factories/handGesturesFactory.js'

await titlesFactory.initialize()
await cardsFactory.initalize()
await handGesturesfactory.initialize()
