import { RouterEngine } from '../plugins/router';
import BaseController from './base-controller';
import PodcastPageTemplate from '../../views/pages/podcast.html';
import PodcastSidebarPartialTemplate from '../../views/partials/podcast-sidebar.html';

class PodcastController extends BaseController {

	constructor(data) {
		super(data, PodcastPageTemplate, {
			podcastSidebar: PodcastSidebarPartialTemplate
		});

		// this.events = {
		// 	'click|.podcast-summary a': this.navToPodcast
		// };
	}

	navToEpisode(event, $target) {
		event.preventDefault();
		RouterEngine.navTo($target.getAttribute('href'));
	}

}

export default PodcastController;
