import BaseController from './base-controller';
import HomePageTemplate from '../../views/pages/home.html';
import PodcastSummaryPartialTemplate from '../../views/partials/podcast-summary.html';

class HomeController extends BaseController {

	constructor(data) {
		super({
			data,
			template: HomePageTemplate,
			partials: {
				podcastSummary: PodcastSummaryPartialTemplate
			}
		});
	}

}

export default HomeController;