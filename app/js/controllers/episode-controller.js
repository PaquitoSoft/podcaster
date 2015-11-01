import BaseController from './base-controller';
import EpisodePageTemplate from '../../views/pages/episode.html';
import PodcastSidebarPartialTemplate from '../../views/partials/podcast-sidebar.html';

class EpisodeController extends BaseController {

	constructor(data) {
		super({
			data,
			template: EpisodePageTemplate,
			partials: {
				podcastSidebar: PodcastSidebarPartialTemplate
			}
		});
	}

}

export default EpisodeController;
