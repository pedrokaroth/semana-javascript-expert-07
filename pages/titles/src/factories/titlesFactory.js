import TitleView from '../views/titlesView.js'
import TitlesService from '../services/titlesService.js'
import TitlesController from '../controllers/titlesController.js'

const factory = {
  async initialize () {
    return TitlesController.initialize({
      view: new TitleView(),
      service: new TitlesService()
    })
  }
}

export default factory
