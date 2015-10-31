import { RouterEngine } from '../plugins/router';
import BaseController from './base-controller';
import HomePageTemplate from '../../views/pages/home.html';
import PodcastSummaryPartialTemplate from '../../views/partials/podcast-summary.html';

class HomeController extends BaseController {

	constructor(data) {
		super(data, HomePageTemplate, {
			podcastSummary: PodcastSummaryPartialTemplate
		});

		this.events = {
			'click|.podcast-summary a': this.navToPodcast
		};
	}

	navToPodcast(event, $target) {
		event.preventDefault();
		RouterEngine.navTo($target.getAttribute('href'));
	}

}

export default HomeController;