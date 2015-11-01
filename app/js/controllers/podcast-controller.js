import BaseController from './base-controller';
import PodcastPageTemplate from '../../views/pages/podcast.html';
import PodcastSidebarPartialTemplate from '../../views/partials/podcast-sidebar.html';
import { RouterEngine } from '../plugins/router';

class PodcastController extends BaseController {

	constructor(data) {
		super({
			data,
			template: PodcastPageTemplate,
			partials: {
				podcastSidebar: PodcastSidebarPartialTemplate
			},
			defaultNavigation: false,
			domEvents: {
				'click|.podcast-sidebar a': 'navTo',
				'click|.podcast-episodes a': 'navToEpisode'
			}
		});
	}

	navToEpisode(event, $target) {
		let href = $target.getAttribute('href'),
			episodeId = href.match(/.*\/(\d*_\d)*/)[1],
			episode;

		event.preventDefault();

		episode = this.data.podcast.episodes.find((episode) => {
			return episode.id === episodeId;
		});

		RouterEngine.navTo(href, {
			podcast: this.data.podcast,
			episode
		});
	}

}

export default PodcastController;
